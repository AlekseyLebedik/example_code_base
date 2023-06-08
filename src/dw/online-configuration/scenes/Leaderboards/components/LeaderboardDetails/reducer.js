import * as AT from './actionTypes';

export const INITIAL_STATE = {
  entities: [],
  nextPageToken: undefined,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.LEADERBOARD_DATA_FETCH_SUCCESS:
      return {
        ...state,
        entities: action.append
          ? [...state.entities, ...action.entities]
          : action.entities,
        nextPageToken: action.nextPageToken,
      };
    default:
      return state;
  }
};
