import * as AT from './actionTypes';

const INITIAL_STATE = {
  connectionLogs: [],
  nextPageToken: null,
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
    default:
      return state;
  }
};

export default reducer;
