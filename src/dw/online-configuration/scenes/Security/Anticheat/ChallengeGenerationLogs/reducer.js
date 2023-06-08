import * as AT from './actionTypes';

const INITIAL_STATE = {
  challengeGenerationLogs: [],
  nextPageToken: null,
  filteringEnabled: false,
  order: null,
  q: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CHALLENGE_GENERATION_LOGS_FETCH_SUCCESS:
      return {
        ...state,
        challengeGenerationLogs: action.append
          ? [
              ...state.challengeGenerationLogs,
              ...action.challengeGenerationLogs,
            ]
          : action.challengeGenerationLogs,
        nextPageToken: action.nextPageToken,
        filteringEnabled: action.filteringEnabled,
      };
    case AT.CHALLENGE_GENERATION_LOGS_CHANGE_SEARCH_QUERY:
      return {
        ...state,
        q: action.q,
      };
    case AT.CHALLENGE_GENERATION_LOGS_CHANGE_ORDER:
      return {
        ...state,
        order: action.order,
      };
    default:
      return state;
  }
};

export default reducer;
