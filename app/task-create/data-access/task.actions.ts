import { ApiResponse } from '@app/models';
import { createActionGroup, props } from '@ngrx/store';

export const taskActions = createActionGroup({
    source: 'Task',
    events: {
        'Create': props<{ form: object }>(),
        'Create Success':
            props<{ response: ApiResponse<{ message: string }> }>(),
    },
});
