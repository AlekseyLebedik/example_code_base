import anticheatStatisticsSagas from './AnticheatStatistics/sagas';
import challengeGenerationLogsSaga from './ChallengeGenerationLogs/saga';
import challengeGeneratorsSaga from './ChallengeGenerators/saga';
import challengeLogsSaga from './ChallengeLogs/saga';
import challengesSaga from './Challenges/saga';
import functionsSaga from './Functions/saga';
import monitoringGroupsSaga from './saga';
import whitelistSagas from './Whitelist/sagas';
import monitoredUsersSaga from './MonitoredUsers/saga';

export default [
  challengeGenerationLogsSaga,
  challengeGeneratorsSaga,
  challengeLogsSaga,
  challengesSaga,
  functionsSaga,
  monitoringGroupsSaga,
  monitoredUsersSaga,
  ...anticheatStatisticsSagas,
  ...whitelistSagas,
];
