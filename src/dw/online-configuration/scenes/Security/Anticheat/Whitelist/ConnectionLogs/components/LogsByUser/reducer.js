import * as AT from './actionTypes';

const INITIAL_STATE = {
  connectionLogs: [],
  includeTestUsersEntries: false,
  nextPageToken: null,
  userID: null,
  ascending: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CONNECTION_LOGS_FETCH_SUCCESS:
      return {
        ...state,
        connectionLogs: action.append
          ? [...state.connectionLogs, ...action.payload.data]
          : action.payload.data,
        nextPageToken: action.payload.nextPageToken || null,
      };
    case AT.CONNECTION_LOGS_CHANGE_USER_ID:
      return {
        ...state,
        userID: action.userID,
      };
    case AT.CONNECTION_LOGS_CHANGE_ASCENDING:
      return {
        ...state,
        ascending: action.ascending,
      };
    case AT.TOGGLE_TEST_USERS_ENTRIES:
      return {
        ...state,
        includeTestUsersEntries: !state.includeTestUsersEntries,
      };
    default:
      return state;
  }
};

export default reducer;
