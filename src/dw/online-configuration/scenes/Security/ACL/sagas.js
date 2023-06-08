import leaderboardRangesSaga from './LeaderboardRanges/saga';
import taskRulesSaga from './TaskRules/saga';
import storageFilenamesSaga from './StorageFilenames/saga';
import revisionHistorySaga from './RevisionHistory/saga';

export default [
  leaderboardRangesSaga,
  taskRulesSaga,
  storageFilenamesSaga,
  revisionHistorySaga,
];
