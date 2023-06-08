import { combineReducers } from 'redux';
import leaderboardRangesReducer from './LeaderboardRanges/reducer';
import taskRulesReducer from './TaskRules/reducer';
import storageFilenamesReducer from './StorageFilenames/reducer';
import revisionHistoryReducer from './RevisionHistory/reducer';

export default combineReducers({
  LeaderboardRanges: leaderboardRangesReducer,
  TaskRules: taskRulesReducer,
  StorageFilenames: storageFilenamesReducer,
  RevisionHistory: revisionHistoryReducer,
});
