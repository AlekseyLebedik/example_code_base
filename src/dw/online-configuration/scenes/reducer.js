import { combineReducers } from 'redux';
import { reducer as accountsReducer } from './Accounts/reducer';
import accountsDashboardReducer from './AccountsDashboard/reducer';
import { reducer as linkedAccountsReducer } from './LinkedAccounts/reducer';
import { reducer as debuggingReducer } from './Debugging/reducer';
import { reducer as auditLogsReducer } from './AuditLogs/reducer';
import { reducer as leaderboardsReducer } from './Leaderboards/reducer';
import { reducer as onlineGamesReducer } from './OnlineGames/reducer';
import objectStoreReducer from './ObjectStore/reducer';
import { reducer as storageReducer } from './Storage/reducer';
import securityReducer from './Security/reducer';
import { reducer as marketplaceReducer } from './Marketplace/reducer';
import { reducer as impReducer } from './IMP/reducer';
import { reducer as achievementsReducer } from './Achievements/reducer';
import statsReducer from './TitleEnvStats/reducer';
import { reducer as sessionViewerReducer } from './SessionViewer/reducer';
import { reducer as tournamentSessionViewerReducer } from './TournamentSessionViewer/reducer';
import matchmakingReducer from './Matchmaking/reducer';
import { reducer as serverInventoryReducer } from './ServerInventory/reducer';
import { reducer as LootGenReducer } from './LootGen/reducer';
import thunderpantsLinkReducer from './LobbyViewer/components/ThunderpantsLink/reducer';
import titleInfoReducer from './TitleInfo/titleInfoSlice';
import remoteCallsReducer from './RemoteCalls/slice';
import loginQueueReducer from './LoginQueue/reducer';

const reducer = combineReducers({
  Accounts: accountsReducer,
  AccountsDashboard: accountsDashboardReducer,
  LinkedAccounts: linkedAccountsReducer,
  Debugging: debuggingReducer,
  AuditLogs: auditLogsReducer,
  Leaderboards: leaderboardsReducer,
  OnlineGames: onlineGamesReducer,
  Security: securityReducer,
  ObjectStore: objectStoreReducer,
  Storage: storageReducer,
  Marketplace: marketplaceReducer,
  TitleInfo: titleInfoReducer,
  Achievements: achievementsReducer,
  IMP: impReducer,
  TitleEnvStats: statsReducer,
  SessionViewer: sessionViewerReducer,
  TournamentSessionViewer: tournamentSessionViewerReducer,
  Matchmaking: matchmakingReducer,
  ServerInventory: serverInventoryReducer,
  LootGen: LootGenReducer,
  ThunderpantsLink: thunderpantsLinkReducer,
  RemoteCalls: remoteCallsReducer,
  LoginQueue: loginQueueReducer,
});

export default reducer;
