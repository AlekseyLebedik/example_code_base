import { CRITICAL_ERROR_SHOW, CRITICAL_ERROR_HIDE } from './actionTypes';

const INITIAL_STATE = {
  error: undefined,
  retry: undefined,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CRITICAL_ERROR_SHOW:
      return {
        ...state,
        error: action.error,
        retry: action.retry,
      };
    case CRITICAL_ERROR_HIDE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
