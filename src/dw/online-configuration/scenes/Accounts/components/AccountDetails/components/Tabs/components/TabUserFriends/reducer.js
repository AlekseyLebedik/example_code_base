import * as AT from './actionTypes';

export const INITIAL_STATE = {
  userFriends: [],
  nextPageToken: undefined,
  fetchedUserID: undefined,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ACCOUNTS_TAB_USER_FRIENDS_FETCH:
      return {
        ...state,
        fetchedUserID: action.userID,
      };
    case AT.ACCOUNTS_TAB_USER_FRIENDS_FETCH_SUCCESS:
      return {
        ...state,
        userFriends: action.append
          ? [...state.userFriends, ...action.userFriends]
          : action.userFriends,
        nextPageToken: action.nextPageToken,
      };
    default:
      return state;
  }
};
