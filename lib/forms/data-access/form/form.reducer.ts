import { createFeature, createReducer, on } from '@ngrx/store';
import { HttpError } from '@app/models';
import { formActions } from './form.actions';


export interface FormState {
  error: HttpError | null;
  loading: boolean;
}

export const formInitialState: FormState = {
  error: null,
  loading: false,
};

export const formFeature = createFeature({
  name: 'form',
  reducer: createReducer(formInitialState,
    on(formActions.clear, (state, action) => ({
      error: null,
      loading: false,
    })),
    on(
      formActions.requestFailure,
      formActions.formServerError,
      (state, action) => ({
      ...state,
      error: action.error,
      loading: false,
    })),
    on(formActions.request, (state, action) => ({
      ...state,
      loading: true,
    })),
    on(formActions.requestSuccess, (state, action) => ({
      ...state,
      loading: false,
    })),
  )
});
