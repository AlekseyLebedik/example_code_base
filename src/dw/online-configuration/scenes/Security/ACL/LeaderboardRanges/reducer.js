import * as AT from './actionTypes';

const INITIAL_STATE = {
  leaderboardRanges: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.LEADERBOARD_RANGES_FETCH_SUCCESS:
      return {
        ...state,
        leaderboardRanges: action.leaderboardRanges,
      };
    case AT.LEADERBOARD_RANGE_DELETE_SUCCESS:
      return {
        ...state,
        leaderboardRanges: state.leaderboardRanges.filter(
          item => !action.rangeIds.includes(item.id)
        ),
      };
    default:
      return state;
  }
};

export default reducer;
