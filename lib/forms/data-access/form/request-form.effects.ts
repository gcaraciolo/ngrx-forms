import { map, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, filter, tap } from 'rxjs/operators';

import { formActions } from './form.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class RequestFormEffects {
  submitting$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.request),
      concatMap(action =>
        this.http.request(action.method, action.url, { body: action.body }).pipe(
          map((response: any) => formActions.requestSuccess({ response, actionType: action.actionType })),
          // generalize to error flash message
          catchError((error) => of(formActions.requestFailure({ error, actionType: action.actionType })))
        )
      )
    )
  );

  // generalize to success flash message
  success$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formActions.requestSuccess),
      filter(action => !!action.response.message),
      tap(action => this.snackBar.open(action.response.message, '', { duration: 2000 }))
    ), { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) { }
}
