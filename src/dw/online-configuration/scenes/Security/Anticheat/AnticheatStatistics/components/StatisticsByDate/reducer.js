import * as AT from './actionTypes';

const INITIAL_STATE = {
  anticheatStatistics: [],
  nextPageToken: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ANTICHEAT_STATISTICS_FETCH_SUCCESS:
      return {
        ...state,
        anticheatStatistics: action.append
          ? [...state.anticheatStatistics, ...action.payload.data]
          : action.payload.data,
        nextPageToken: action.payload.nextPageToken || null,
      };
    default:
      return state;
  }
};

export default reducer;
