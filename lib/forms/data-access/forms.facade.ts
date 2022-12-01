import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';
import { AbstractControlOptions, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

import { setServerErrorToForm } from '@app/operators';
import { formQuery } from './form/form.selectors';
import { formActions } from './form/form.actions';
import { toFormData } from '../form-utils';

export interface Formable {
  form: UntypedFormGroup;
}

@Injectable({ providedIn: 'root' })
export class Forms {
  form?: UntypedFormGroup;

  error$ = this.store.select(formQuery.selectError);
  loading$ = this.store.select(formQuery.selectLoading);

  constructor(
    private store: Store,
    public readonly fb: UntypedFormBuilder
  ) { }

  post(url: string, sourceAction: Action, formData: boolean = false) {
    const body = formData ? toFormData({ ...this.form?.getRawValue() }) : this.form?.getRawValue();
    this.store.dispatch(formActions.request({ method: 'post', url, body, actionType: sourceAction.type }));
  }

  put(url: string, sourceAction: Action) {
    this.store.dispatch(formActions.request({ method: 'put', url, body: this.form?.getRawValue(), actionType: sourceAction.type }));
  }

  newForm(component: Formable, controlsConfig: {
    [key: string]: any;
  }, options?: AbstractControlOptions | null): UntypedFormGroup {
    this.form = this.fb.group(controlsConfig, options);
    this.error$.pipe(
      untilDestroyed(component),
      setServerErrorToForm(this.form),
      finalize(() => this.clear())
      ).subscribe();
      return this.form;
  }

  private clear() {
    this.form = undefined;
    this.store.dispatch(formActions.clear());
  }
}
