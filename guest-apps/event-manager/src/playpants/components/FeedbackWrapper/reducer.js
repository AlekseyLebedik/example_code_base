import { combineReducers } from 'redux';
import getHttpErrorMsg from 'playpants/helpers/getHttpErrorMsg';
import { reducer as requestErrorDialogReducer } from './components/RequestErrorDialog/reducer';
import * as AT from './actionTypes';

export const INITIAL_STATE = {
  loading: false,
  error: {},
  saved: false,
};

const feedbackWrapperReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AT.STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    case AT.TRY_SAVING:
      return {
        ...state,
        saved: false,
        error: {},
      };
    case AT.SAVE_FAILED: {
      const { data, status } = action.error.response;
      return {
        ...state,
        error: getHttpErrorMsg(status, data),
      };
    }
    case AT.SAVE_SUCCESS:
      return {
        ...state,
        saved: true,
      };
    case AT.RESET_FEEDBACK:
      return {
        ...INITIAL_STATE,
      };
    default:
      return {
        ...state,
      };
  }
};

export const reducer = combineReducers({
  feedback: feedbackWrapperReducer,
  requestErrorDialog: requestErrorDialogReducer,
});
