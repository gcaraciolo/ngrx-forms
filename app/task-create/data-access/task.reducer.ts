import { createFeature, createReducer, on } from '@ngrx/store';
import { taskActions } from './task.actions';

export interface TaskState {
  wasCreated: boolean;
}

export const taskInitialState: TaskState = {
  wasCreated: false
};

export const taskFeature = createFeature({
  name: 'task',
  reducer: createReducer(
    taskInitialState,
    on(taskActions.createSuccess, (state, action) => ({
      wasCreated: true,
    })),
  ),
});
