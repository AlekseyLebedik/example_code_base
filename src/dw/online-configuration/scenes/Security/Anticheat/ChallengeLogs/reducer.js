import * as AT from './actionTypes';

const INITIAL_STATE = {
  challengeLogs: [],
  nextPageToken: undefined,
  selectedLog: undefined,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.SECURITY_CHALLENGE_LOGS_FETCH_SUCCESS:
      return {
        ...state,
        challengeLogs: action.append
          ? [...state.challengeLogs, ...action.challengeLogs]
          : action.challengeLogs,
        nextPageToken: action.nextPageToken,
        selectedLog: undefined,
      };
    case AT.SECURITY_CHALLENGE_LOGS_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedLog: action.log,
      };
    default:
      return state;
  }
};

export default reducer;
