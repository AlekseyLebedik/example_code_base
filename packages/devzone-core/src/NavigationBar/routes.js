import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import * as fs from '../access/FeatureSwitchesCheck/featureSwitches';
import { SERVICE_NAMES } from '../access/ServiceAvailability/constants';
import * as P from '../access/PermissionCheck/permissions';
import { DEVZONE_STUDIO_HOST, COREVIZ_HOST } from '../config';

export const getSuites = memoizeOne((currentEnv = {}) => {
  const { shortType, title, project } = currentEnv;
  const onlineConfigurationUrl =
    (title &&
      shortType &&
      `${DEVZONE_STUDIO_HOST}/online-configuration/${title}/${shortType}/`) ||
    `${DEVZONE_STUDIO_HOST}/online-configuration`;

  const eventManagerUrl =
    (project && `${DEVZONE_STUDIO_HOST}/event-manager/${project}/`) ||
    `${DEVZONE_STUDIO_HOST}/event-manager`;
  return [
    {
      title: 'Online Configuration',
      key: 'oc',
      url: onlineConfigurationUrl,
      icon: 'videogame_asset',
    },
    {
      title: 'A/B Testing',
      key: 'abtesting',
      url: `${DEVZONE_STUDIO_HOST}/abtesting`,
      icon: 'ab-icon-reworked-DW-ABTesting',
    },
    {
      title: 'Audit Logs',
      key: 'audit_logs',
      url: `${DEVZONE_STUDIO_HOST}/audit/audit-logs`,
      icon: 'al-icon-DW-Audit-Log',
      featureCheckProps: {
        feature: fs.AUDIT_LOGS_ENABLED,
        isStaffAllowed: true,
      },
      permissionCheck: {
        ANY: [
          {
            ALL: [P.VIEW_AUDIT_LOG],
            target: 'titleenv.current',
          },
          {
            ALL: [P.VIEW_AUDIT_LOG_ADMIN],
            target: 'company.all',
          },
        ],
      },
    },
    {
      title: 'Coreviz',
      key: 'coreviz',
      url: `${COREVIZ_HOST}`,
      icon: 'poll',
    },
    {
      title: 'Event Manager',
      key: 'event_manager',
      url: eventManagerUrl,
      icon: 'em-icon-v1-DW-EventManager',
    },
    {
      title: 'Permission Management',
      key: 'security',
      url: `${DEVZONE_STUDIO_HOST}/permission-management`,
      icon: 'lock',
      permissionCheck: {
        ANY: [P.PERMS_EDIT_MEMBERSHIPS],
        target: 'company.*',
      },
    },
  ];
}, isEqual);

export const getCompanyOwnColumns = memoizeOne(() => [
  {
    title: 'Devzone',
    key: 'dw',
    sectionKeys: [
      'ti',
      'ae',
      'mm',
      'acc',
      'em',
      'os',
      'store',
      'mkt',
      'al',
      'ab',
      'fr',
      'pm',
      'ta-online',
      'ma-online',
      'raven',
      'sledge',
      'forge',
      'player_tooling',
      'clans',
      'login_queue',
      'security',
      'og',
      'graphs',
      'localized_strings',
      'leaderboards',
      'imp',
      'lootgen',
      'debug',
      'gvs',
    ],
    icon: '',
    email: 'devzone@demonware.net',
    slackLink: 'https://demonware.slack.com/archives/C01PNGF5C00',
    slack: 'dw-devzone',
  },
  {
    title: 'Frameworks (Data)',
    key: 'data_services',
    sectionKeys: ['coreviz', 'coreviz_2'],
    icon: '',
    email: 'Coreviz-requests@activision.com',
    slackLink: 'https://atvi-ct.slack.com/archives/CM4QXNTBR',
    slack: 'data-coreviz-help',
  },
]);

export const onlineConfigurationSections = memoizeOne(
  ({ rootUrl, rootPath, eventManagerUrl, eventManagerPath }) => [
    {
      title: 'Title Info',
      key: 'ti',
      items: [
        {
          title: 'Title Dashboard',
          url: `${rootUrl}dashboard`,
          path: `${rootPath}dashboard`,
        },
      ],
      permissionCheck: {
        ANY: [P.VIEW_TITLE_ENVIRONMENT, ...P.EXPLICIT_FEATURE_READ_PERMS],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Online Games',
      key: 'og',
      availabilityCheck: SERVICE_NAMES.ONLINE_GAMES,
      items: [
        {
          title: 'Online Games',
          url: `${rootUrl}online-games`,
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      isStaffAllowed: true,
      hideIfNotAvailable: true,
    },
    {
      title: 'Login Queue',
      key: 'login_queue',
      subnav: true,
      items: [
        {
          title: 'Login Queue',
          url: `${rootUrl}loginqueue/controls`,
        },
        {
          title: 'Groups',
          url: `${rootUrl}loginqueue/groups-overview`,
        },
      ],
      featureCheckProps: {
        feature: fs.LOGINQUEUE_ENABLED,
        isStaffAllowed: false,
      },
      permissionCheck: {
        ALL: [P.VIEW_LOGINQUEUE],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Player View',
      key: 'player_tooling',
      subnav: true,
      items: [
        {
          title: 'Accounts Lookup',
          url: `${DEVZONE_STUDIO_HOST}/player/accounts`,
        },
        {
          title: 'Game Data',
          url: `${DEVZONE_STUDIO_HOST}/player/game-data`,
          featureCheckProps: {
            feature: fs.PLAYER_VIEW_V2_ENABLED,
            isStaffAllowed: false,
          },
        },
      ],
      featureCheckProps: {
        feature: fs.PLAYER_TOOLING_ENABLED,
        isStaffAllowed: false,
      },
      permissionCheck: {
        ALL: [P.VIEW_PLAYER_CENTRIC_TOOLING],
        target: 'company.all',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Clans',
      key: 'clans',
      subnav: true,
      items: [
        {
          title: 'Members',
          url: `${DEVZONE_STUDIO_HOST}/clans/members`,
        },
      ],
      featureCheckProps: {
        feature: fs.CLANS_ENABLED,
        isStaffAllowed: false,
      },
      permissionCheck: {
        ALL: [P.CLANS_VIEW_CLAN],
        target: 'company.all',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Matchmaking',
      key: 'mm',
      availabilityCheck: SERVICE_NAMES.MATCHMAKING,
      items: [
        { title: 'Player Activity', url: `${rootUrl}mmp-trace` },
        { title: 'Session Viewer', url: `${rootUrl}session-viewer` },
        {
          title: 'Tournament Session Viewer',
          url: `${rootUrl}tournament-engine`,
          featureCheckProps: {
            feature: fs.TOURNAMENT_SESSION_VIEWER,
            isStaffAllowed: true,
          },
          hideIfNotAvailable: false,
        },
        {
          title: 'Server Inventory',
          url: `${rootUrl}matchmaking/server-inventory`,
          hideIfNotAvailable: true,
        },
        { title: 'RSDocs', url: `${rootUrl}matchmaking/rsdocs` },
        { title: 'Lobby Viewer', url: `${rootUrl}lobby-viewer` },
        {
          title: 'Match Viewer',
          url: `${rootUrl}match-viewer`,
          featureCheckProps: {
            feature: fs.MATCHMAKING_MATCH_VIEWER_ENABLED,
            isStaffAllowed: false,
          },
          hideIfNotAvailable: false,
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Accounts',
      key: 'acc',
      items: [
        { title: 'Accounts', url: `${rootUrl}accounts` },
        {
          title: 'Accounts Dashboard',
          url: `${rootUrl}accounts-dashboard`,
          permissionCheck: {
            ALL: [P.VIEW_ACCOUNTS_DASHBOARD],
            target: 'company.all',
          },
          hideIfNotAvailable: true,
          featureCheckProps: {
            feature: fs.PLAYER_ACCOUNTS_DASHBOARD,
            isStaffAllowed: false,
          },
        },
        {
          title: 'Accounts Audit Log',
          url: `${DEVZONE_STUDIO_HOST}/audit/account-audit-logs`,
          displaySubnav: true,
          label: 'new',
          featureCheckProps: {
            feature: fs.ACCOUNT_AUDIT_LOGS_ENABLED,
            isStaffAllowed: false,
          },
          permissionCheck: {
            ALL: [P.VIEW_ACCOUNTS_AUDIT_LOGS_PII_DETAILS],
            target: 'titleenv.current',
          },
          hideIfNotAvailable: true,
        },
        {
          title: 'Linked Accounts',
          url: `${rootUrl}linked-accounts`,
          availabilityCheck: SERVICE_NAMES.ACCOUNTS_MANAGEMENT,
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Event Manager',
      key: 'em',
      items: [
        {
          title: 'Events',
          url: `${eventManagerUrl}events`,
          path: `${eventManagerPath}events`,
        },
        {
          title: 'Admin',
          permissionCheck: {
            ALL: [P.PLAYPANTS_PROJECT_ADMIN],
            target: 'project.current',
          },
          url: `${eventManagerUrl}project-settings`,
          path: `${eventManagerPath}project-settings`,
          hidden: true,
          displaySubnav: true,
        },
        {
          title: 'Templates',
          permissionCheck: {
            ALL: [P.PLAYPANTS_PROJECT_ADMIN],
            target: 'project.current',
          },
          url: `${eventManagerUrl}templates`,
          path: `${eventManagerPath}templates/:eventId?/:tab?/:tabId?`,
        },
        {
          title: 'Stories',
          url: `${eventManagerUrl}stories`,
          path: `${eventManagerPath}stories/:storyId?`,
          hidden: true,
        },
      ],
    },
    {
      title: 'Graphs',
      key: 'graphs',
      items: [
        {
          title: 'Graphs',
          url: `${rootUrl}graphs`,
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Localized Strings',
      key: 'localized_strings',
      subnav: true,
      items: [
        {
          title: 'Localized Strings',
          url: `${rootUrl}localized-strings/`,
        },
      ],
      featureCheckProps: {
        feature: fs.LOCALIZED_STRINGS_ENABLED,
        isStaffAllowed: false,
      },
      permissionCheck: {
        ALL: [P.VIEW_LOCALIZED_STRINGS],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Leaderboards',
      key: 'leaderboards',
      items: [
        {
          title: 'Leaderboards',
          url: `${rootUrl}leaderboards`,
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'ObjectStore',
      key: 'os',
      availabilityCheck: SERVICE_NAMES.OBJECT_STORE,
      items: [
        {
          title: 'Publisher Objects',
          url: `${rootUrl}object-store/publisher`,
        },
        { title: 'User Objects', url: `${rootUrl}object-store/user` },
        {
          title: 'Object Stats',
          url: `${rootUrl}object-store/object-stats`,
          featureCheckProps: {
            feature: fs.OBJECT_STORE_STATS,
            isStaffAllowed: false,
          },
        },
        {
          title: 'Pooled Objects',
          url: `${rootUrl}object-store/pooled-objects`,
          featureCheckProps: {
            feature: fs.OBJECT_STORE_POOLED_OBJECTS,
            isStaffAllowed: false,
          },
        },
        {
          title: 'Object Groups',
          url: `${rootUrl}object-store/groups`,
          availabilityCheck: SERVICE_NAMES.GROUPS,
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Storage',
      key: 'store',
      availabilityCheck: SERVICE_NAMES.STORAGES,
      items: [
        {
          title: 'Publisher Storage',
          url: `${rootUrl}storage/publisher-storage`,
        },
        {
          title: 'User Context Storage',
          url: `${rootUrl}storage/user-context-storage`,
        },
        {
          title: 'Content Server',
          items: [
            {
              title: 'User Files',
              url: `${rootUrl}storage/content-server/user-files`,
            },
            {
              title: 'Quota Allowance',
              url: `${rootUrl}storage/content-server/quota-allowance`,
            },
            {
              title: 'Quota Usage',
              url: `${rootUrl}storage/content-server/quota-usage`,
            },
            {
              title: 'Pooled Files',
              url: `${rootUrl}storage/content-server/pooled-files`,
            },
          ],
        },
        {
          title: 'Publisher Objects',
          items: [
            {
              title: 'Variables Sets',
              url: `${rootUrl}storage/publisher-variables/variables-sets`,
            },
            {
              title: 'Group Members',
              url: `${rootUrl}storage/publisher-variables/group-members`,
            },
          ],
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Marketplace',
      key: 'mkt',
      availabilityCheck: SERVICE_NAMES.MARKETPLACE,
      items: [
        { title: 'Active Store', url: `${rootUrl}marketplace/active-store` },
        { title: 'Stores', url: `${rootUrl}marketplace/stores` },
        {
          title: 'Player Inventory',
          url: `${rootUrl}marketplace/player-inventory`,
          featureCheckProps: {
            feature: fs.PLAYER_INVENTORY_ENABLED,
            isStaffAllowed: false,
          },
          permissionCheck: {
            ALL: [P.VIEW_MARKETPLACE_PLAYER_INVENTORY],
            target: 'titleenv.current',
          },
          hideIfNotAvailable: true,
        },
        {
          title: 'Clan Inventory',
          url: `${rootUrl}marketplace/clan-inventory`,
          featureCheckProps: {
            feature: fs.CLAN_INVENTORY_ENABLED,
            isStaffAllowed: false,
          },
          permissionCheck: {
            ALL: [P.VIEW_MARKETPLACE_PLAYER_INVENTORY],
            target: 'titleenv.current',
          },
          hideIfNotAvailable: true,
        },
        {
          title: 'Bulk Inventory Update',
          url: `${rootUrl}marketplace/bulk-inventory-update`,
          featureCheckProps: {
            feature: fs.PLAYER_INVENTORY_ENABLED,
            isStaffAllowed: false,
          },
          permissionCheck: {
            ALL: [P.BULK_MARKETPLACE_PLAYER_INVENTORY_UPDATE],
            target: 'titleenv.current',
          },
          hideIfNotAvailable: true,
        },
      ],
      permissionCheck: {
        ANY: [P.VIEW_TITLE_ENVIRONMENT, P.VIEW_MARKETPLACE_STORES],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Achievements',
      key: 'ae',
      availabilityCheck: SERVICE_NAMES.ACHIEVEMENTS,
      items: [
        {
          title: 'Active Ruleset',
          url: `${rootUrl}achievements/active-ruleset`,
        },
        { title: 'Rulesets', url: `${rootUrl}achievements/rulesets` },
        {
          title: 'Player Achievements',
          url: `${rootUrl}achievements/player-achievements`,
          path: `${rootUrl}achievements/:path(player-achievements|audit-log|manage)/:id?`,
          featureCheckProps: {
            feature: fs.PLAYER_ACHIEVEMENTS_ENABLED,
            isStaffAllowed: false,
          },
          permissionCheck: {
            ALL: [P.AE_VIEW_PLAYER_ACHIEVEMENTS],
            target: 'titleenv.current',
          },
          hideIfNotAvailable: true,
        },
        {
          title: 'Clan Achievements',
          url: `${rootUrl}achievements/clan-achievements`,
          path: `${rootUrl}achievements/:path(clan-achievements)/:id?`,
          featureCheckProps: {
            feature: fs.CLAN_ACHIEVEMENTS_ENABLED,
            isStaffAllowed: false,
          },
          permissionCheck: {
            ALL: [P.AE_VIEW_PLAYER_ACHIEVEMENTS],
            target: 'titleenv.current',
          },
          hideIfNotAvailable: true,
        },
      ],
      permissionCheck: {
        ANY: [P.VIEW_TITLE_ENVIRONMENT, P.VIEW_ACHIEVEMENTS_RULESETS],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Debugging',
      key: 'debug',
      items: [
        { title: 'Call Search', url: `${rootUrl}debugging/call-search` },
        { title: 'Server Logs', url: `${rootUrl}debugging/server-logs` },
        { title: 'IMP History', url: `${rootUrl}imp` },
        {
          title: 'Remote Commands',
          url: `${rootUrl}remote-commands`,
          featureCheckProps: {
            feature: fs.REMOTE_COMMANDS_ENABLED,
            isStaffAllowed: false,
          },
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Security',
      key: 'security',
      items: [
        {
          title: 'ACL',
          items: [
            { title: 'Task Rules', url: `${rootUrl}security/acl/task-rules` },
            {
              title: 'Storage Filenames',
              url: `${rootUrl}security/acl/storage-filenames`,
            },
            {
              title: 'Leaderboard Ranges',
              url: `${rootUrl}security/acl/leaderboard-ranges`,
            },
            {
              title: 'Revision History',
              url: `${rootUrl}security/acl/revisions`,
            },
          ],
        },
        {
          title: 'Anticheat Challenges',
          items: [
            {
              title: 'Functions',
              url: `${rootUrl}security/anticheat-challenges/functions`,
            },
            {
              title: 'Challenges',
              url: `${rootUrl}security/anticheat-challenges/challenges`,
            },
            {
              title: 'Challenge Logs',
              url: `${rootUrl}security/anticheat-challenges/logs`,
            },
            {
              title: 'Monitored Users',
              url: `${rootUrl}security/anticheat-challenges/monitored-users`,
            },
            {
              title: 'Anticheat Statistics',
              url: `${rootUrl}security/anticheat-challenges/statistics`,
            },
            {
              title: 'Challenge Generators',
              url: `${rootUrl}security/anticheat-challenges/generators`,
            },
            {
              title: 'Challenge Generation Logs',
              url: `${rootUrl}security/anticheat-challenges/generation-logs`,
            },
          ],
        },
        {
          title: 'Anticheat Whitelist',
          items: [
            {
              title: 'Whitelist Control',
              url: `${rootUrl}security/whitelist/ip-control`,
            },
            {
              title: 'Client Connection Logs',
              url: `${rootUrl}security/whitelist/connection-logs`,
            },
          ],
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'IMP History',
      key: 'imp',
      items: [
        {
          title: 'IMP History',
          url: `${rootUrl}imp`,
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'LootGen',
      key: 'lootgen',
      featureCheckProps: {
        feature: fs.LOOT_GEN_ENABLED,
        isStaffAllowed: false,
      },
      items: [
        {
          title: 'LootGen',
          url: `${rootUrl}lootgen`,
        },
      ],
      permissionCheck: {
        ALL: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Game Variables Service',
      key: 'gvs',
      subnav: true,
      availabilityCheck: {
        target: 'titleenv.current',
        fn(currentEnv) {
          return Boolean(currentEnv.options.scopeURI);
        },
      },
      items: [
        {
          title: 'Configuration',
          url: `${rootUrl}gvs/configuration`,
        },
        {
          title: 'Release & Rollback',
          url: `${rootUrl}gvs/drafts`,
          path: `${rootUrl}gvs/:scene(drafts|events)`,
        },
        {
          title: 'Variable Definition',
          url: `${rootUrl}gvs/variable-definition`,
        },
        {
          title: 'Compare',
          url: `${rootUrl}gvs/compare`,
        },
        {
          title: 'Groups',
          url: `${rootUrl}gvs/groups`,
        },
      ],
      featureCheckProps: {
        feature: fs.GVS_ENABLED,
        isStaffAllowed: false,
      },
      permissionCheck: {
        ALL: [P.GVS_VIEW_CONFIGURATION],
        target: 'titleenv.current',
      },
      hideIfNotAvailable: true,
    },
  ],
  isEqual
);

export const getRoutes = memoizeOne((currentEnv = {}) => {
  const { shortType, title, project } = currentEnv;

  const onlineConfigurationUrl =
    (title &&
      shortType &&
      `${DEVZONE_STUDIO_HOST}/online-configuration/${title}/${shortType}/`) ||
    `${DEVZONE_STUDIO_HOST}/online-configuration`;
  const onlineConfigurationPath = `/online-configuration/:titleId/:shortType/`;

  const eventManagerUrl =
    (project && `${DEVZONE_STUDIO_HOST}/event-manager/${project}/`) ||
    `${DEVZONE_STUDIO_HOST}/event-manager`;
  const eventManagerPath = '/event-manager/:projectId/';

  const guestAppUrl = guestApp =>
    (title &&
      shortType &&
      `${DEVZONE_STUDIO_HOST}/${guestApp}/${title}/${shortType}/`) ||
    `${DEVZONE_STUDIO_HOST}/${guestApp}`;
  const guestAppPath = guestApp => `/${guestApp}/:titleId/:shortType/`;

  return [
    ...onlineConfigurationSections({
      rootUrl: onlineConfigurationUrl,
      rootPath: onlineConfigurationPath,
      eventManagerUrl,
      eventManagerPath,
    }),
    {
      title: 'Coreviz',
      key: 'coreviz',
      subnav: false,
      featureCheckProps: {
        feature: fs.NEW_COREVIZ_ROUTES_ENABLED,
        isStaffAllowed: false,
        reverseCheck: true,
      },
      items: [
        {
          title: 'Home',
          url: `${COREVIZ_HOST}`,
          path: '/coreviz',
          exact: true,
        },
        { title: 'Dashboards', url: `${COREVIZ_HOST}/dashboards/` },
        {
          title: 'Charts',
          url: `${COREVIZ_HOST}/charts/`,
          path: /(\/coreviz\/charts|\/coreviz\/chart\/[0-9]*|\/coreviz\/chart-view\/[0-9]*)/,
        },
        {
          title: 'Create New Chart',
          url: `${COREVIZ_HOST}/chart/new`,
          styleType: 'action',
        },
      ],
    },
    {
      title: 'Coreviz',
      key: 'coreviz_2',
      subnav: false,
      featureCheckProps: {
        feature: fs.NEW_COREVIZ_ROUTES_ENABLED,
        isStaffAllowed: false,
      },
      items: [
        {
          title: 'Home',
          url: `${COREVIZ_HOST}`,
          exact: true,
        },
        { title: 'Dashboards', url: `${COREVIZ_HOST}/dashboards` },
        {
          title: 'Queries',
          url: `${COREVIZ_HOST}/queries`,
        },
        {
          title: 'Visualizations',
          url: `${COREVIZ_HOST}/visualizations`,
        },
        {
          title: 'Create New Query',
          url: `${COREVIZ_HOST}/queries/new`,
          styleType: 'action',
        },
      ],
    },
    {
      title: 'A/B Testing',
      key: 'ab',
      items: [
        {
          title: 'Demonware A/B',
          items: [
            {
              title: 'Scheduled',
              url: `${DEVZONE_STUDIO_HOST}/abtesting/schedule`,
              path: [
                '/abtesting/schedule',
                '/abtesting',
                '/abtesting/(view|edit)/:titleId/:env/:testId',
              ],
              exact: true,
            },
            {
              title: 'Archived',
              url: `${DEVZONE_STUDIO_HOST}/abtesting/archive`,
              path: '/abtesting/archive',
              hidden: true,
              displaySubnav: true,
            },
            {
              title: 'Killed',
              url: `${DEVZONE_STUDIO_HOST}/abtesting/killed`,
              path: '/abtesting/killed',
              hidden: true,
              displaySubnav: true,
            },
            {
              title: 'Groups',
              url: `${DEVZONE_STUDIO_HOST}/abtesting/groups`,
              path: '/abtesting/groups/:id?',
              hidden: true,
              displaySubnav: true,
            },
            {
              title: 'Create new ABTest',
              url: `${DEVZONE_STUDIO_HOST}/abtesting/create`,
              styleType: 'action',
            },
          ],
        },
        {
          title: 'Expy',
          items: [
            {
              title: 'Test Catalog',
              url: `${DEVZONE_STUDIO_HOST}/abtesting/expy/test-catalog`,
              path: [
                '/abtesting/expy/test-catalog',
                '/abtesting/expy/test-catalog/:testId',
              ],
              featureCheckProps: {
                feature: fs.ABTESTING_DESIGN,
                isStaffAllowed: false,
              },
            },
            {
              title: 'Create new proposal',
              url: `${DEVZONE_STUDIO_HOST}/abtesting/expy/create`,
              path: '/abtesting/expy/create',
              featureCheckProps: {
                feature: fs.ABTESTING_DESIGN,
                isStaffAllowed: false,
              },
              styleType: 'action',
            },
          ],
        },
      ],
    },
    {
      title: 'Audit Logs',
      key: 'al',
      items: [
        {
          title: 'Audit Logs',
          url: `${DEVZONE_STUDIO_HOST}/audit/audit-logs`,
          featureCheckProps: {
            feature: fs.AUDIT_LOGS_ENABLED,
            isStaffAllowed: true,
          },
          permissionCheck: {
            ANY: [
              {
                ALL: [P.VIEW_AUDIT_LOG],
                target: 'titleenv.current',
              },
              {
                ALL: [P.VIEW_AUDIT_LOG_ADMIN],
                target: 'company.all',
              },
            ],
          },
        },
      ],
    },
    {
      title: 'Permission Mgt',
      key: 'pm',
      items: [
        {
          title: 'Users',
          url: `${DEVZONE_STUDIO_HOST}/permission-management/users`,
          path: ['/permission-management/users/:id?', '/permission-management'],
          exact: true,
        },
        {
          title: 'Groups',
          url: `${DEVZONE_STUDIO_HOST}/permission-management/groups`,
          path: '/permission-management/groups/:id?',
        },
        {
          title: 'Companies',
          url: `${DEVZONE_STUDIO_HOST}/permission-management/companies`,
          path: '/permission-management/companies/:id?',
        },
      ],
      permissionCheck: {
        ANY: [P.PERMS_EDIT_MEMBERSHIPS],
        target: 'company.*',
      },
    },
    {
      title: 'TA Online',
      key: 'ta-online',
      items: [
        {
          title: 'Player Progression',
          url: `${guestAppUrl('ta-online')}player-progression`,
          path: `${guestAppUrl('ta-online')}player-progression/:id?`,
          titleEnvOption: 'player_battle_pass_enabled',
        },
        {
          title: 'Player Battle Pass',
          url: `${guestAppUrl('ta-online')}player-battle-pass`,
          path: `${guestAppUrl('ta-online')}player-battle-pass/:id?`,
          titleEnvOption: 'player_battle_pass_enabled',
        },
      ],
      permissionCheck: {
        ANY: [
          P.AE_SEND_PLAYER_EVENTS,
          P.AE_VIEW_PLAYER_ACHIEVEMENTS,
          P.VIEW_PLAYER_BATTLEPASS,
        ],
        target: 'titleenv.current',
      },
      featureCheckProps: {
        feature: fs.TA_ONLINE_ENABLED,
        isStaffAllowed: false,
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'MA Online',
      key: 'ma-online',
      items: [
        {
          title: 'Events',
          url: `${guestAppUrl('ma-online')}events`,
        },
        {
          title: 'Challenges',
          url: `${guestAppUrl('ma-online')}challenges`,
          hidden: true,
          displaySubnav: true,
        },
        {
          title: 'Marketplace',
          url: `${guestAppUrl('ma-online')}marketplace`,
        },
        {
          title: 'Messaging',
          url: `${guestAppUrl('ma-online')}messaging`,
          hidden: true,
          displaySubnav: true,
        },
        {
          title: 'Playlists',
          url: `${guestAppUrl('ma-online')}playlists`,
          hidden: true,
          displaySubnav: true,
        },
        {
          title: 'Segments',
          url: `${guestAppUrl('ma-online')}segments`,
          hidden: true,
          displaySubnav: true,
        },
        {
          title: 'Schedule',
          url: `${guestAppUrl('ma-online')}schedule`,
        },
        {
          title: 'Health',
          url: `${guestAppUrl('ma-online')}health`,
          hidden: true,
          displaySubnav: true,
        },
        {
          title: 'Overview',
          url: `${guestAppUrl('ma-online')}overview`,
          hidden: true,
          displaySubnav: true,
        },
        {
          title: 'Config',
          url: `${guestAppUrl('ma-online')}config`,
          hidden: true,
          displaySubnav: true,
        },
      ],
      featureCheckProps: {
        feature: fs.MA_ONLINE_ENABLED,
        isStaffAllowed: false,
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Raven',
      key: 'raven',
      items: [
        {
          title: 'Test Scene',
          url: `${guestAppUrl('raven')}test-scene`,
          path: `${guestAppUrl('raven')}test-scene/:playerId?`,
        },
      ],
      permissionCheck: {
        ANY: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      featureCheckProps: {
        feature: fs.RAVEN_ENABLED,
        isStaffAllowed: false,
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Sledgehammer',
      key: 'sledge',
      items: [
        {
          title: 'Test Scene',
          url: `${guestAppUrl('sledge')}test-scene`,
          path: `${guestAppUrl('sledge')}test-scene/:playerId?`,
        },
      ],
      permissionCheck: {
        ANY: [P.VIEW_TITLE_ENVIRONMENT],
        target: 'titleenv.current',
      },
      featureCheckProps: {
        feature: fs.SLEDGE_ENABLED,
        isStaffAllowed: false,
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Forge',
      key: 'forge',
      items: [
        {
          title: 'Temp Forge SubHeading',
          url: `${guestAppUrl('forge')}`,
          path: guestAppPath('forge'),
        },
      ],
      featureCheckProps: {
        feature: fs.FORGE_ENABLED,
        isStaffAllowed: false,
      },
      permissionCheck: {
        ALL: [P.VIEW_FORGE],
        target: 'company.all',
      },
      hideIfNotAvailable: true,
    },
    {
      title: 'Devzone Guides',
      hidden: true,
      key: 'dd1',
      items: [
        {
          title: 'Demonware Admin',
          url: `${DEVZONE_STUDIO_HOST}/docs/demonware/admin`,
          path: ['/docs/demonware/admin/:id?', '/docs'],
          featureCheckProps: {
            feature: fs.ADMIN_DOCS_TAB_ENABLED,
            isStaffAllowed: true,
          },
          exact: true,
        },
        {
          title: 'Devzone Users',
          url: `${DEVZONE_STUDIO_HOST}/docs/devzone/users`,
          path: '/docs/devzone/users/:id?',
        },
        {
          title: 'Game Developer',
          url: `${DEVZONE_STUDIO_HOST}/docs/devzone/game-developers`,
          path: '/docs/devzone/game-developers/:id?',
        },
        {
          title: 'Devzone Developer',
          url: `${DEVZONE_STUDIO_HOST}/docs/devzone/devzone-developers`,
          path: '/docs/devzone/devzone-developers/:id?',
        },
        {
          title: 'Release Notes',
          url: `${DEVZONE_STUDIO_HOST}/docs/devzone/release-notes`,
          path: '/docs/devzone/release-notes/:id?',
        },
        {
          title: 'Upcoming Features',
          url: `${DEVZONE_STUDIO_HOST}/docs/devzone/upcoming-features`,
          path: '/docs/devzone/upcoming-features/:id?',
        },
      ],
    },
  ];
}, isEqual);
