import graphSaga from 'dw/devzone/components/Graph/saga';
import { sagas as accountsSagas } from './Accounts/sagas';
import { sagas as debuggingSagas } from './Debugging/sagas';
import { sagas as onlineGamesSagas } from './OnlineGames/sagas';
import { sagas as marketplaceSagas } from './Marketplace/sagas';
import { sagas as achievementsSagas } from './Achievements/sagas';
import { sagas as leaderboardsSagas } from './Leaderboards/sagas';
import { sagas as auditLogSagas } from './AuditLogs/sagas';
import securitySagas from './Security/sagas';
import objectStoreSagas from './ObjectStore/sagas';
import storageSagas from './Storage/sagas';
import accountsDashboardSagas from './AccountsDashboard/sagas';
import linkedAccountsSaga from './LinkedAccounts/saga';
import impSagas from './IMP/saga';
import statsSaga from './TitleEnvStats/saga';
import sessionViewerSaga from './SessionViewer/saga';
import TournamentSessionViewerSaga from './TournamentSessionViewer/saga';
import matchmakingSaga from './Matchmaking/saga';
import serverInventorySaga from './ServerInventory/saga';
import lootGenSagas from './LootGen/sagas';
import serverInventoryComponentSaga from './ServerInventory/components/DetailPanel/saga';
import thunderpantsLinkSaga from './LobbyViewer/components/ThunderpantsLink/saga';
import loginQueueSagas from './LoginQueue/sagas';

export default [
  ...accountsSagas,
  ...debuggingSagas,
  ...leaderboardsSagas,
  ...onlineGamesSagas,
  ...marketplaceSagas,
  ...securitySagas,
  ...objectStoreSagas,
  ...storageSagas,
  ...achievementsSagas,
  ...auditLogSagas,
  ...accountsDashboardSagas,
  linkedAccountsSaga,
  impSagas,
  statsSaga,
  sessionViewerSaga,
  TournamentSessionViewerSaga,
  graphSaga,
  matchmakingSaga,
  serverInventorySaga,
  serverInventoryComponentSaga,
  thunderpantsLinkSaga,
  ...lootGenSagas,
  ...loginQueueSagas,
];
