import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ofForm } from '@app/operators';
import { Actions, createEffect } from '@ngrx/effects';

import { feedbackActions } from './feedback.actions';

@Injectable()
export class CreateFeedbackEffect {
  createFeedback$ = createEffect(() =>
    this.actions$.pipe(
      ofForm(feedbackActions.createFeedback),
      map((action) =>
        feedbackActions.createFeedbackSuccess({ response: action.response })
      )
    )
  );

  constructor(private actions$: Actions) {}
}
