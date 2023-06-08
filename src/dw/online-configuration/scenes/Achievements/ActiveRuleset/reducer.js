import * as AT from './actionTypes';

const INITIAL_STATE = {
  activeRuleset: undefined,
  achievements: undefined,
  nextPageToken: undefined,
  loading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ACTIVE_RULESET_FETCH_SUCCESS:
      return {
        ...state,
        activeRuleset: action.activeRuleset,
      };
    case AT.ACTIVE_RULESET_ACHIEVEMENTS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case AT.ACTIVE_RULESET_ACHIEVEMENTS_FETCH_SUCCESS:
      return {
        ...state,
        achievements: action.append
          ? [...state.achievements, ...action.achievements]
          : action.achievements,
        nextPageToken: action.nextPageToken,
        loading: false,
      };
    case AT.ACTIVE_RULESET_ACHIEVEMENTS_FETCH_FAILED:
      return {
        ...state,
        achievements: null,
        loading: false,
      };
    default:
      return state;
  }
};
