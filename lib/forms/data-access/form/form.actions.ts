import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { ApiResponse, HttpError } from '@app/models';

export const formActions = createActionGroup({
  source: 'Form',
  events: {
    'Clear': emptyProps(),
    'Form Server Error': props<{ error: HttpError }>(),
    'Request': props<{ url: string; method: string; body: Record<string, any>, actionType: string }>(),
    'Request Success': props<{ response: ApiResponse<any>, actionType: string }>(),
    'Request Failure': props<{ error: HttpError, actionType: string }>(),
  },
});
