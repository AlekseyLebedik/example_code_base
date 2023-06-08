import * as AT from './actionTypes';

export const reducer = (state, action) => {
  switch (action.type) {
    case AT.MM_SERVER_LIST_FETCH:
      return {
        ...state,
        serverList: null,
      };
    case AT.MM_SERVER_LIST_FETCH_SUCCESS:
      return {
        ...state,
        serverList: action.data,
      };
    case AT.MM_SERVER_LIST_FETCH_FAILED:
      return {
        ...state,
        serverList: null,
      };
    default:
      return state;
  }
};
