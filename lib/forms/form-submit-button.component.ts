import { Component, Input } from '@angular/core';
import { Forms } from './data-access/forms.facade';

@Component({
  selector: 'form-submit-button',
  template: `
    <button
      mat-raised-button
      color="primary"
      type="submit"
      [disabled]="disabled || forms.form?.invalid || (forms.loading$ | async)"
    >
      <span [appAsyncButton]="forms.loading$ | async" [hideText]="forms.loading$ | async">
        <div #ref><ng-content></ng-content></div>
        <span *ngIf="!ref.innerHTML.trim()">{{ 'Submit' | translate }}</span>
      </span>
    </button>
  `,
  styleUrls: [],
  /** @todo: change detection does't work because forms.form?.invalid is not an input. is there a better design? actually, is this even a problem at all? */
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSubmitButtonComponent {
  @Input() disabled?: boolean;

  constructor(public forms: Forms) { }
}
