import * as AT from './actionTypes';

export const INITIAL_STATE = {
  userDetails: undefined,
  fetchedUserID: undefined,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ACCOUNTS_TAB_USER_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        userDetails: action.userDetails,
        fetchedUserID: action.userDetails.id,
      };
    case AT.ACCOUNTS_TAB_USER_DETAILS_CHANGE_REPUTATION_SUCCESS:
      return {
        ...state,
        userDetails: { ...state.userDetails, reputation: action.score },
      };
    default:
      return state;
  }
};
