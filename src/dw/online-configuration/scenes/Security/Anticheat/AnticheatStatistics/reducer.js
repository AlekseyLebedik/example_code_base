import { combineReducers } from 'redux';
import { getNowTimestamp } from 'dw/core/helpers/date-time';
import anticheatStatisticsByChallengeReducer from './components/StatisticsByChallenge/reducer';
import anticheatStatisticsByDateReducer from './components/StatisticsByDate/reducer';
import anticheatStatisticsByUserReducer from './components/StatisticsByUser/reducer';

import * as AT from './actionTypes';

const INITIAL_STATE = {
  userID: null,
  date: getNowTimestamp(),
  challengeId: null,
};

const filtersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ANTICHEAT_STATISTICS_CHANGE_USER_ID:
      return { ...state, userID: action.userID };
    case AT.ANTICHEAT_STATISTICS_CHANGE_CHALLENGE_ID:
      return { ...state, challengeId: action.challengeId };
    case AT.ANTICHEAT_STATISTICS_CHANGE_DATE:
      return { ...state, date: action.date };
    default:
      return state;
  }
};

export default combineReducers({
  Filters: filtersReducer,
  ByChallenge: anticheatStatisticsByChallengeReducer,
  ByDate: anticheatStatisticsByDateReducer,
  ByUser: anticheatStatisticsByUserReducer,
});
