import { ofType } from '@ngrx/effects';
import { formActions } from '@app/forms';
import { UntypedFormGroup } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Action, ActionCreator, Creator } from '@ngrx/store';
import { catchError, filter, map, tap } from 'rxjs/operators';

import { HttpSuccess } from './models';

export type ActionTypeError<T> = (props: { error: HttpErrorResponse }) => T;
export type ActionTypeSuccess<T> = (props: { response: HttpSuccess<any> }) => T;

export function mapErrorToAction<S, T>(
  actionType: ActionTypeError<T>,
  extras?: object
) {
  return (source$: Observable<S | T>) =>
    source$.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.name !== 'HttpErrorResponse') {
          // rethrow runtime errors
          return throwError(() => error);
        }
        return of(actionType({ error, ...extras }));
      })
    );
}

export function mapSuccessToAction<S, T>(
  actionType: ActionTypeSuccess<T>,
  extras?: object
) {
  return (source$: Observable<S | T>) =>
    source$.pipe(
      map((response: any) => {
        return actionType({ response, ...extras });
      })
    );
}

export function setServerErrorToForm<S, T>(form: UntypedFormGroup) {
  return (source$: Observable<S | T>) =>
    source$.pipe(
      tap((error: any) => {
        // type HttpError | null
        if (error?.error?.errors) {
          Object.entries(error.error.errors).forEach(
            ([key, value]: [string, any]) => {
              form.get(key)?.setErrors({
                serverError: value[0],
              });
            }
          );
        }
      })
    );
}

export function ofForm(sourceAction: ActionCreator<string, Creator>) {
  return (source$: Observable<Action>) =>
    source$.pipe(
      ofType(formActions.requestSuccess),
      filter((action) => action.actionType === sourceAction.type)
    );
}
