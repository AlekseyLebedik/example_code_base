import { combineReducers } from 'redux';
import { hasData } from 'dw/core/helpers/object';

import anticheatStatisticsReducer from './AnticheatStatistics/reducer';
import challengeGenerationLogsReducer from './ChallengeGenerationLogs/reducer';
import challengeGeneratorsReducer from './ChallengeGenerators/reducer';
import challengeLogsReducer from './ChallengeLogs/reducer';
import challengesReducer from './Challenges/reducer';
import functionsReducer from './Functions/reducer';
import whitelistReducer from './Whitelist/reducer';
import { reducer as monitoredUsersReducer } from './MonitoredUsers/reducer';

import * as AT from './actionTypes';

const INITIAL_STATE = {
  monitoringGroups: {},
};

const MonitoringGroups = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.MONITORING_GROUPS_FETCH_SUCCESS:
      return {
        ...state,
        monitoringGroups: hasData(action.monitoringGroups)
          ? action.monitoringGroups
          : state.monitoringGroups,
      };
    default:
      return state;
  }
};

export default combineReducers({
  AnticheatStatistics: anticheatStatisticsReducer,
  ChallengeGenerationLogs: challengeGenerationLogsReducer,
  ChallengeGenerators: challengeGeneratorsReducer,
  ChallengeLogs: challengeLogsReducer,
  Challenges: challengesReducer,
  Functions: functionsReducer,
  Whitelist: whitelistReducer,
  MonitoredUsers: monitoredUsersReducer,
  MonitoringGroups,
});
