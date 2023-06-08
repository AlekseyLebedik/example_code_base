import * as AT from './actionTypes';

export const INITIAL_STATE = {
  isValidName: true,
  loading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CHECK_TEMPLATE_NAME:
      return {
        ...state,
        isValidName: true,
        loading: true,
      };
    case AT.CHECK_TEMPLATE_NAME_SUCCESS:
      return {
        ...state,
        isValidName: action.isValidName,
        loading: false,
      };
    case AT.CLEAR_ERROR:
      return {
        ...INITIAL_STATE,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
