import * as AT from './actionTypes';

export const INITIAL_STATE = {
  userKeys: undefined,
  fetchedUserID: undefined,
  addKeyModalVisible: false,
  addKeyModalLoading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ACCOUNTS_TAB_USER_KEYS_FETCH:
      return {
        ...state,
        fetchedUserID: action.userID,
      };
    case AT.ACCOUNTS_TAB_USER_KEYS_FETCH_SUCCESS:
      return {
        ...state,
        userKeys: action.userKeys,
      };
    case AT.ACCOUNTS_TAB_USER_KEYS_OPEN_MODAL:
      return {
        ...state,
        addKeyModalVisible: true,
      };
    case AT.ACCOUNTS_TAB_USER_KEYS_CLOSE_MODAL:
    case AT.ACCOUNTS_TAB_USER_KEYS_ADD_SUCCESS:
      return {
        ...state,
        addKeyModalVisible: false,
      };
    default:
      return state;
  }
};
