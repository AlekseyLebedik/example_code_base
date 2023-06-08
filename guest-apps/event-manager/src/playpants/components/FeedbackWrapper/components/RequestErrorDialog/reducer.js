import * as AT from './actionTypes';

export const INITIAL_STATE = {
  open: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.OPEN_REQUEST_ERROR_DIALOG:
      return {
        ...state,
        open: true,
      };
    case AT.CLOSE_REQUEST_ERROR_DIALOG:
      return {
        ...state,
        open: false,
      };
    default:
      return {
        ...state,
      };
  }
};
