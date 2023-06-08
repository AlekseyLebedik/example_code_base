import { INITIAL_STATE } from '@demonware/devzone-core/helpers/reducers';

export const updateReducer =
  (prefix, append) =>
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case `${prefix}`:
        return {
          ...state,
          loading: true,
        };
      case `${prefix}_SUCCESS`: {
        return {
          ...state,
          data: append ? [...state.data, ...action.response] : action.response,
          loading: false,
        };
      }
      case `${prefix}_FAILED`: {
        return {
          ...state,
          error: action.error,
          loading: false,
        };
      }
      default:
        return {
          ...state,
        };
    }
  };
