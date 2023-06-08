import React from 'react';
import AsyncComponent from 'dw/core/components/AsyncComponent';

import FeatureSwitchesCheck, {
  featureSwitches as fs,
} from '@demonware/devzone-core/access/FeatureSwitchesCheck';

import { CheckPermission } from '@demonware/devzone-core/access/CheckPermissions';
import * as P from '@demonware/devzone-core/access/PermissionCheck/permissions';

import Error404 from 'dw/core/components/Error404';

import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';

import securityEntries from './Security/routes';
import storageEntries from './Storage/routes';
import objectStoreEntries from './ObjectStore/routes';

const AsyncTitleInfo = AsyncComponent(() =>
  import(/* webpackChunkName: "TitleInfo" */ './TitleInfo')
);
const AsyncOnlineGames = AsyncComponent(() =>
  import(/* webpackChunkName: "OnlineGames" */ './OnlineGames')
);
const AsyncSessionViewer = AsyncComponent(() =>
  import(/* webpackChunkName: "SessionViewer" */ './SessionViewer')
);
const AsyncTournamentSessionViewer = AsyncComponent(() =>
  import(
    /* webpackChunkName: "TournamentSessionViewer" */ './TournamentSessionViewer'
  )
);
const AsyncAccounts = AsyncComponent(() =>
  import(/* webpackChunkName: "Accounts" */ './Accounts')
);
const AsyncAccountsDashboard = AsyncComponent(() =>
  import(/* webpackChunkName: "AccountsDashboard" */ './AccountsDashboard')
);
const AsyncLinkedAccounts = AsyncComponent(() =>
  import(/* webpackChunkName: "LinkedAccounts" */ './LinkedAccounts')
);
const AsyncTitleEnvStats = AsyncComponent(() =>
  import(/* webpackChunkName: "TitleEnvStats" */ './TitleEnvStats')
);
const AsyncLeaderboards = AsyncComponent(() =>
  import(/* webpackChunkName: "Leaderboards" */ './Leaderboards')
);
const AsyncMarketplaceActiveStore = AsyncComponent(() =>
  import(
    /* webpackChunkName: "MarketplaceActiveStore" */ './Marketplace/ActiveStore'
  )
);
const AsyncMarketplaceStores = AsyncComponent(() =>
  import(/* webpackChunkName: "MarketplaceStores" */ './Marketplace/Stores')
);
const AsyncMarketplacePlayerInventory = AsyncComponent(() =>
  import(
    /* webpackChunkName: "MarketplacePlayerInventory" */ './Marketplace/PlayerAssets'
  )
);
const AsyncMarketplaceBulkInventory = AsyncComponent(() =>
  import(
    /* webpackChunkName: "BulkInventoryUpdate" */ './Marketplace/BulkInventoryUpdate'
  )
);
const AsyncAchievementsActiveRuleset = AsyncComponent(() =>
  import(
    /* webpackChunkName: "AchievementsActiveRuleset" */ './Achievements/ActiveRuleset'
  )
);
const AsyncAchievementsRulesets = AsyncComponent(() =>
  import(
    /* webpackChunkName: "AchievementsRulesets" */ './Achievements/Rulesets'
  )
);
const AsyncAchievementsUserAchievements = AsyncComponent(() =>
  import(
    /* webpackChunkName: "AchievementsUserAchievements" */ './Achievements/PlayerAchievements'
  )
);
const AsyncDebuggingCallSearch = AsyncComponent(() =>
  import(/* webpackChunkName: "DebuggingCallSearch" */ './Debugging/CallSearch')
);
const AsyncDebuggingServerLogs = AsyncComponent(() =>
  import(/* webpackChunkName: "DebuggingServerLogs" */ './Debugging/ServerLogs')
);
const AsyncRemoteCalls = AsyncComponent(() =>
  import(/* webpackChunkName: "AsyncRemoteCalls" */ './RemoteCalls')
);

const AsyncIMP = AsyncComponent(() =>
  import(/* webpackChunkName: "IMP" */ './IMP')
);

const AsyncMMPTraceTool = AsyncComponent(() =>
  import(/* webpackChunkName: "MMPTrace" */ './MMPTrace')
);
const AsyncLobbyViewer = AsyncComponent(() =>
  import(/* webpackChunkName: "LobbyViewer" */ './LobbyViewer')
);
const AsyncMatchViewer = AsyncComponent(() =>
  import(/* webpackChunkName: "MatchViewer" */ './Matchmaking/MatchViewer')
);
const AsyncMatchmaking = AsyncComponent(() =>
  import(/* webpackChunkName: "Matchmaking" */ './Matchmaking')
);
const AsyncMatchmakingServerInventory = AsyncComponent(() =>
  import(/* webpackChunkName: "ServerInventory" */ './ServerInventory')
);

const AsyncLootGen = AsyncComponent(() =>
  import(/* webpackChunkName: "LootGen" */ './LootGen')
);

const AsyncLoginQueueTitleControls = AsyncComponent(() =>
  import(
    /* webpackChunkName: "LoginQueueTitleControls" */ './LoginQueue/LoginQueueTitleControls'
  )
);

const AsyncLoginQueueGroupsOverview = AsyncComponent(() =>
  import(
    /* webpackChunkName: "LoginQueueGroupsOverview" */ './LoginQueue/LoginQueueGroupsOverview'
  )
);

const AsyncLocalizedStrings = AsyncComponent(() =>
  import(/* webpackChunkName: "LocallizedStrings" */ './LocalizedStrings')
);

const AsyncAuditLogs = AsyncComponent(() =>
  import(/* webpackChunkName: "AuditLogs" */ './AuditLogs')
);

const AsyncAccountAuditLogs = AsyncComponent(() =>
  import(/* webpackChunkName: "AccountAuditLogs" */ './AccountAuditLog')
);

const AsyncGVS = AsyncComponent(() =>
  import(/* webpackChunkName: "GVS" */ './gvs')
);

export const NAVBAR_ENTRIES = [
  {
    name: 'dashboard',
    title: 'Title Info',
    component: AsyncTitleInfo,
    default: true,
    exact: true,
    className: 'mobile-visible',
  },
  {
    name: 'online-games',
    title: 'Online Games',
    component: AsyncOnlineGames,
    availabilityCheck: SERVICE_NAMES.ONLINE_GAMES,
    hideIfNotAvailable: true,
  },
  {
    name: 'login-queue',
    title: 'Login Queue',
    hasChilds: true,
    exact: true,
    featureCheck: fs.LOGINQUEUE_ENABLED,
    hideIfNotAvailable: true,
  },
  {
    name: 'loginqueue-title-controls',
    title: 'Login Queue Title Controls',
    routePath: 'loginqueue/controls',
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.LOGINQUEUE_ENABLED]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <CheckPermission
          predicate={P.VIEW_LOGINQUEUE}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncLoginQueueTitleControls />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
    parent: 'login-queue',
    featureCheck: fs.LOGINQUEUE_ENABLED,
    hideIfNotAvailable: true,
  },
  {
    name: 'loginqueue-groups-overview',
    title: 'Login Queue Groups Overview',
    routePath: 'loginqueue/groups-overview',
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.LOGINQUEUE_ENABLED]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <CheckPermission
          predicate={P.VIEW_LOGINQUEUE}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncLoginQueueGroupsOverview />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
    parent: 'login-queue',
    featureCheck: fs.LOGINQUEUE_ENABLED,
    hideIfNotAvailable: true,
  },
  {
    name: 'matchmaking',
    title: 'Matchmaking',
    hasChilds: true,
    exact: true,
    availabilityCheck: SERVICE_NAMES.MATCHMAKING,
    hideIfNotAvailable: true,
  },
  {
    name: 'mmp-trace',
    navPath: 'mmp-trace',
    routePath: 'mmp-trace/:playerId?/:start?/:end?',
    title: 'Player Activity',
    parent: 'matchmaking',
    component: AsyncMMPTraceTool,
  },
  {
    name: 'session-viewer',
    title: 'Session Viewer',
    component: AsyncSessionViewer,
    availabilityCheck: SERVICE_NAMES.MATCHMAKING,
    hideIfNotAvailable: true,
    parent: 'matchmaking',
  },
  {
    name: 'tournament-engine',
    title: 'Tournament Session Viewer',
    parent: 'matchmaking',
    availabilityCheck: SERVICE_NAMES.MATCHMAKING,
    featureCheck: fs.TOURNAMENT_SESSION_VIEWER,
    component: () => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.TOURNAMENT_SESSION_VIEWER]}
        isStaffAllowed
      >
        <AsyncTournamentSessionViewer />
      </FeatureSwitchesCheck>
    ),
  },
  {
    name: 'server-inventory',
    routePath:
      'matchmaking/server-inventory/:context?/:buildName?/:dataCenter?',
    navPath: 'matchmaking/server-inventory',
    title: 'Server Inventory',
    component: AsyncMatchmakingServerInventory,
    hideIfNotAvailable: true,
    parent: 'matchmaking',
  },
  {
    name: 'rsdocs',
    routePath: 'matchmaking/rsdocs',
    title: 'RSDocs',
    component: AsyncMatchmaking,
    parent: 'matchmaking',
  },

  {
    name: 'lobby-viewer',
    navPath: 'lobby-viewer',
    routePath: 'lobby-viewer/:lobbyId?',
    title: 'Lobby Viewer',
    parent: 'matchmaking',
    component: AsyncLobbyViewer,
  },
  {
    name: 'match-viewer',
    navPath: 'match-viewer',
    routePath: 'match-viewer/:matchId?',
    title: 'Match Viewer',
    parent: 'matchmaking',
    featureCheck: fs.MATCHMAKING_MATCH_VIEWER_ENABLED,
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.MATCHMAKING_MATCH_VIEWER_ENABLED]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <CheckPermission
          predicate={P.VIEW_MATCH_DETAILS}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncMatchViewer {...props} />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
  },
  {
    name: 'accounts-management',
    title: 'Accounts',
    component: AsyncAccounts,
    hasChilds: true,
    exact: true,
  },
  {
    name: 'accounts',
    title: 'Accounts',
    navPath: 'accounts',
    routePath: 'accounts/:id?',
    component: AsyncAccounts,
    parent: 'accounts-management',
  },
  {
    name: 'accounts-dashboard',
    title: 'Accounts Dashboard',
    navPath: 'accounts-dashboard',
    routePath: 'accounts-dashboard/:id?',
    component: AsyncAccountsDashboard,
    parent: 'accounts-management',
  },
  {
    name: 'account-audit-log',
    title: 'Accounts Audit Log',
    routePath: '/account-audit-log',
    navPath: 'account-audit-log',
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.ACCOUNT_AUDIT_LOGS_ENABLED]}
        isStaffAllowed
      >
        <CheckPermission
          predicate={P.VIEW_ACCOUNTS_AUDIT_LOGS_PII_DETAILS}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncAccountAuditLogs {...props} />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
    hideIfNotAvailable: true,
  },
  {
    name: 'linked-accounts',
    title: 'Linked Accounts Lookup',
    navPath: 'linked-accounts',
    routePath: 'linked-accounts/:id?',
    component: AsyncLinkedAccounts,
    parent: 'accounts-management',
    availabilityCheck: SERVICE_NAMES.ACCOUNTS_MANAGEMENT,
  },
  {
    name: 'graphs',
    title: 'Graphs',
    component: AsyncTitleEnvStats,
    className: 'mobile-visible',
  },
  {
    name: 'localized-strings',
    title: 'Localized Strings',
    hasChilds: true,
    exact: true,
    featureCheck: fs.LOGINQUEUE_ENABLED,
    hideIfNotAvailable: true,
  },
  {
    name: 'localized-strings-view',
    title: 'Localized Strings',
    routePath: 'localized-strings/view',
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.LOCALIZED_STRINGS_ENABLED]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <CheckPermission
          predicate={P.VIEW_LOCALIZED_STRINGS}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncLocalizedStrings />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
    parent: 'localized-strings',
    featureCheck: fs.LOCALIZED_STRINGS_ENABLED,
    hideIfNotAvailable: true,
  },
  {
    name: 'leaderboards',
    title: 'Leaderboards',
    component: AsyncLeaderboards,
    routePath: 'leaderboards/:id?',
  },
  {
    name: 'gvs',
    routePath: 'gvs',
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.GVS_ENABLED]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <CheckPermission
          predicate={P.GVS_VIEW_CONFIGURATION}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncGVS />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
    availabilityCheck: {
      target: 'titleenv.current',
      fn(currentEnv) {
        return Boolean(currentEnv.options.scopeURI);
      },
    },
    hideIfNotAvailable: true,
  },
  ...objectStoreEntries,
  ...storageEntries,
  {
    name: 'marketplace',
    title: 'Marketplace',
    component: AsyncMarketplaceActiveStore,
    hasChilds: true,
    exact: true,
    availabilityCheck: SERVICE_NAMES.MARKETPLACE,
  },
  {
    name: 'marketplace-active-store',
    routePath: 'marketplace/active-store',
    title: 'Active Store',
    component: AsyncMarketplaceActiveStore,
    parent: 'marketplace',
  },
  {
    name: 'marketplace-stores',
    routePath: 'marketplace/stores/:id?',
    navPath: 'marketplace/stores',
    title: 'Stores',
    component: AsyncMarketplaceStores,
    parent: 'marketplace',
  },
  {
    name: 'marketplace-clan-inventory',
    routePath:
      'marketplace/:inventoryType(clan-inventory)/:tab(inventory)?/:userId(\\d+)?/:subtab?',
    navPath: 'marketplace/clan-inventory',
    title: 'Clan Inventory',
    hideIfNotAvailable: true,
    featureCheck: fs.CLAN_INVENTORY_ENABLED,
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.CLAN_INVENTORY_ENABLED]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <CheckPermission
          predicate={P.VIEW_MARKETPLACE_PLAYER_INVENTORY}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncMarketplacePlayerInventory {...props} />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
    parent: 'marketplace',
  },
  {
    name: 'marketplace-player-inventory',
    routePath:
      'marketplace/:inventoryType(player-inventory)/:tab(inventory|audit|manage)?/:userId(\\d+)?/:subtab?',
    navPath: 'marketplace/player-inventory',
    title: 'Player Inventory',
    hideIfNotAvailable: true,
    featureCheck: fs.PLAYER_INVENTORY_ENABLED,
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.PLAYER_INVENTORY_ENABLED]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <CheckPermission
          predicate={P.VIEW_MARKETPLACE_PLAYER_INVENTORY}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncMarketplacePlayerInventory {...props} />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
    parent: 'marketplace',
  },
  {
    name: 'marketplace-bulk-player-inventory',
    routePath:
      'marketplace/bulk-inventory-update/:tab(players-selection|status)?/:inventory_item(items|products|currencies)?',
    navPath: 'marketplace/bulk-inventory-update',
    title: 'Bulk Inventory Update',
    hideIfNotAvailable: true,
    featureCheck: fs.PLAYER_INVENTORY_ENABLED,
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.PLAYER_INVENTORY_ENABLED]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <CheckPermission
          predicate={P.BULK_MARKETPLACE_PLAYER_INVENTORY_UPDATE}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncMarketplaceBulkInventory {...props} />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
    parent: 'marketplace',
  },
  {
    name: 'achievements',
    title: 'Achievements',
    component: AsyncAchievementsActiveRuleset,
    hasChilds: true,
    exact: true,
    availabilityCheck: SERVICE_NAMES.ACHIEVEMENTS,
  },
  {
    name: 'achievements-active-ruleset',
    routePath: 'achievements/active-ruleset',
    title: 'Active Ruleset',
    component: AsyncAchievementsActiveRuleset,
    parent: 'achievements',
  },
  {
    name: 'achievements-rulesets',
    routePath: 'achievements/rulesets/:id?',
    navPath: 'achievements/rulesets',
    title: 'Rulesets',
    component: AsyncAchievementsRulesets,
    parent: 'achievements',
  },
  {
    name: 'achievements-clan-achievements',
    routePath: 'achievements/:path(clan-achievements)/:id?',
    navPath: 'achievements/clan-achievements',
    title: 'Clan Achievements',
    parent: 'achievements',
    hideIfNotAvailable: true,
    featureCheck: fs.CLAN_ACHIEVEMENTS_ENABLED,
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.CLAN_ACHIEVEMENTS_ENABLED]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <CheckPermission
          predicate={P.AE_VIEW_PLAYER_ACHIEVEMENTS}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncAchievementsUserAchievements {...props} />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
  },
  {
    name: 'achievements-player-achievements',
    routePath: 'achievements/:path(player-achievements|audit-log|manage)/:id?',
    navPath: 'achievements/player-achievements',
    title: 'Player Achievements',
    parent: 'achievements',
    hideIfNotAvailable: true,
    featureCheck: fs.PLAYER_ACHIEVEMENTS_ENABLED,
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.PLAYER_ACHIEVEMENTS_ENABLED]}
        isStaffAllowed={false}
        noAccessComponent={() => <Error404 />}
      >
        <CheckPermission
          predicate={P.AE_VIEW_PLAYER_ACHIEVEMENTS}
          // eslint-disable-next-line react/prop-types
          object={`titleenv.${props.currentEnvID}`}
          noPermissionsComponent={() => <Error404 />}
        >
          <AsyncAchievementsUserAchievements {...props} />
        </CheckPermission>
      </FeatureSwitchesCheck>
    ),
  },
  {
    name: 'debugging',
    title: 'Debugging',
    component: AsyncDebuggingCallSearch,
    hasChilds: true,
    exact: true,
  },
  {
    name: 'auditlogs',
    title: 'Audit Logs',
    hideIfNotAvailable: true,
    featureCheck: fs.AUDIT_LOGS_ENABLED,
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.AUDIT_LOGS_ENABLED]}
        isStaffAllowed
      >
        <AsyncAuditLogs {...props} />
      </FeatureSwitchesCheck>
    ),
  },
  {
    name: 'debugging-call-search',
    routePath: 'debugging/call-search/:id?',
    navPath: 'debugging/call-search',
    title: 'Call Search',
    component: AsyncDebuggingCallSearch,
    parent: 'debugging',
  },
  {
    name: 'debugging-server-logs',
    routePath: 'debugging/server-logs/:id?/:messageId?',
    navPath: 'debugging/server-logs',
    title: 'Server Logs',
    hideIfNotAvailable: true,
    component: AsyncDebuggingServerLogs,
    parent: 'debugging',
  },
  {
    name: 'remote-commands',
    routePath: 'remote-commands/:userId?',
    navPath: 'remote-commands',
    title: 'Remote Commands',
    hideIfNotAvailable: true,
    featureCheck: fs.REMOTE_COMMANDS_ENABLED,
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.REMOTE_COMMANDS_ENABLED]}
        isStaffAllowed={false}
      >
        <AsyncRemoteCalls {...props} />
      </FeatureSwitchesCheck>
    ),
  },
  {
    name: 'imp',
    title: 'IMP History',
    component: AsyncIMP,
  },
  ...securityEntries,
  {
    name: 'lootgen',
    title: 'LootGen',
    routePath: 'lootgen/:id?',
    navPath: 'lootgen',
    hideIfNotAvailable: true,
    featureCheck: fs.LOOT_GEN_ENABLED,
    component: props => (
      <FeatureSwitchesCheck
        featureSwitches={[fs.LOOT_GEN_ENABLED]}
        isStaffAllowed
      >
        <AsyncLootGen {...props} />
      </FeatureSwitchesCheck>
    ),
  },
];
