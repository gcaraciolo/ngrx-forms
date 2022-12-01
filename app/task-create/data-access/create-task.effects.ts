import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ofForm } from '@app/operators';
import { Actions, createEffect } from '@ngrx/effects';

import { taskActions } from './task.actions';

@Injectable()
export class CreateTaskEffect {
  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofForm(taskActions.createTask),
      map((action) =>
        taskActions.createTaskSuccess({ response: action.response })
      )
    )
  );

  constructor(private actions$: Actions) { }
}
