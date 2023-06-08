import AsyncComponent from 'dw/core/components/AsyncComponent';

const AsyncLeaderboardRangesPage = AsyncComponent(() =>
  import('./ACL/LeaderboardRanges')
);
const AsyncRevisionHistoryPage = AsyncComponent(() =>
  import('./ACL/RevisionHistory')
);
const AsyncTaskRulesPage = AsyncComponent(() => import('./ACL/TaskRules'));
const AsyncStorageFilenamesPage = AsyncComponent(() =>
  import('./ACL/StorageFilenames')
);
const AsyncIPControlPage = AsyncComponent(() =>
  import('./Anticheat/Whitelist/IPControl')
);
const AsyncConnectionLogsPage = AsyncComponent(() =>
  import('./Anticheat/Whitelist/ConnectionLogs')
);

const AsyncChallengeGenerationLogsPage = AsyncComponent(() =>
  import('./Anticheat/ChallengeGenerationLogs')
);
const AsyncChallengesPage = AsyncComponent(() =>
  import('./Anticheat/Challenges')
);
const AsyncChallengeGeneratorsPage = AsyncComponent(() =>
  import('./Anticheat/ChallengeGenerators')
);
const AsyncAnticheatStatisticsPage = AsyncComponent(() =>
  import('./Anticheat/AnticheatStatistics')
);
const AsyncFunctionsPage = AsyncComponent(() =>
  import('./Anticheat/Functions')
);

const AsyncChallengeLogsPage = AsyncComponent(() =>
  import('./Anticheat/ChallengeLogs')
);

const AsyncMonitoredUsersPage = AsyncComponent(() =>
  import('./Anticheat/MonitoredUsers')
);

export default [
  {
    name: 'security',
    title: 'Security',
    hasChilds: true,
  },
  {
    name: 'acl',
    title: 'ACL',
    routePath: 'security/acl',
    parent: 'security',
    hasChilds: true,
  },
  {
    name: 'task-rules',
    title: 'Task Rules',
    routePath: 'security/acl/task-rules',
    parent: 'acl',
    component: AsyncTaskRulesPage,
  },
  {
    name: 'storage-filenames',
    title: 'Storage Filenames',
    routePath: 'security/acl/storage-filenames',
    parent: 'acl',
    component: AsyncStorageFilenamesPage,
  },
  {
    name: 'leaderboard-ranges',
    title: 'Leaderboard Ranges',
    routePath: 'security/acl/leaderboard-ranges',
    parent: 'acl',
    component: AsyncLeaderboardRangesPage,
  },
  {
    name: 'revision-history',
    title: 'Revision History',
    routePath: 'security/acl/revisions',
    parent: 'acl',
    component: AsyncRevisionHistoryPage,
  },
  {
    name: 'anticheat-challenges',
    title: 'Anticheat Challenges',
    routePath: 'security/anticheat-challenges',
    parent: 'security',
    hasChilds: true,
  },
  {
    name: 'functions',
    title: 'Functions',
    routePath: 'security/anticheat-challenges/functions',
    parent: 'anticheat-challenges',
    component: AsyncFunctionsPage,
  },
  {
    name: 'challenges',
    title: 'Challenges',
    routePath: 'security/anticheat-challenges/challenges',
    parent: 'anticheat-challenges',
    component: AsyncChallengesPage,
  },
  {
    name: 'logs',
    title: 'Challenge Logs',
    routePath: 'security/anticheat-challenges/logs',
    parent: 'anticheat-challenges',
    component: AsyncChallengeLogsPage,
  },
  {
    name: 'monitored-users',
    title: 'Monitored Users',
    routePath: 'security/anticheat-challenges/monitored-users',
    parent: 'anticheat-challenges',
    component: AsyncMonitoredUsersPage,
  },
  {
    name: 'statistics',
    title: 'Anticheat Statistics',
    routePath: 'security/anticheat-challenges/statistics',
    parent: 'anticheat-challenges',
    component: AsyncAnticheatStatisticsPage,
  },
  {
    name: 'generators',
    title: 'Challenge Generators',
    routePath: 'security/anticheat-challenges/generators',
    parent: 'anticheat-challenges',
    component: AsyncChallengeGeneratorsPage,
  },
  {
    name: 'generation-logs',
    title: 'Challenge Generation Logs',
    routePath: 'security/anticheat-challenges/generation-logs',
    parent: 'anticheat-challenges',
    component: AsyncChallengeGenerationLogsPage,
  },
  {
    name: 'whitelist',
    title: 'Anticheat Whitelist',
    routePath: 'security/whitelist',
    parent: 'security',
    hasChilds: true,
  },
  {
    name: 'ip-control',
    title: 'Whitelist IP Control',
    routePath: 'security/whitelist/ip-control',
    parent: 'whitelist',
    component: AsyncIPControlPage,
  },
  {
    name: 'connection-logs',
    title: 'Client Connection Logs',
    routePath: 'security/whitelist/connection-logs',
    parent: 'whitelist',
    component: AsyncConnectionLogsPage,
  },
];
