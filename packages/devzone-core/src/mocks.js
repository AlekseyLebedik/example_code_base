export const specialSuitesGroups = ({ favKeys = [] }) => [
  {
    title: 'Global Search',
    key: 'search',
    sectionKeys: ['all'],
    icon: 'apps',
  },
  {
    title: 'Favorites sections',
    key: 'pinned',
    sectionKeys: favKeys,
    icon: 'bookmark',
  },
];

export const companyOwnColumns = [
  {
    title: 'Demonware',
    key: 'dw',
    sectionKeys: [
      'ae',
      'mm',
      'acc',
      'os',
      'store',
      'mkt',
      'al',
      'ab',
      'fr',
      'pm',
    ],
    icon: '',
    email: 'devzone@demonware.net',
    slack: '#dw-devzone',
  },
  {
    title: 'Coreviz',
    key: 'coreviz',
    sectionKeys: ['coreviz'],
    icon: '',
    email: 'coreviz@activision.com',
    slack: '#coreviz',
  },
  {
    title: 'Central Tech',
    key: 'ct',
    sectionKeys: ['em'],
    icon: '',
    email: 'eventmanager@activision.com',
    slack: '#central-tooling',
  },
];

export const suites = [
  {
    title: 'Online Configuration',
    key: 'oc',
    sectionKeys: ['ae', 'mm', 'acc', 'os', 'store', 'mkt', 'al'],
    icon: 'videogame_asset',
    path: '/online-configuration',
  },
  {
    title: 'ABTesting',
    key: 'abtesting',
    sectionKeys: ['ab'],
    icon: 'ab-icon-DW-ABTesting',
    path: '/abtesting',
  },
  {
    title: 'Audit Logs',
    key: 'audit_logs',
    sectionKeys: ['al'],
    icon: 'al-icon-DW-Audit-Log',
    path: '/audit/audit-logs',
  },
  {
    title: 'Coreviz',
    key: 'coreviz',
    sectionKeys: ['coreviz'],
    icon: 'poll',
    path: '/coreviz',
  },
  {
    title: 'Franchise Reporting',
    key: 'franchise_reporting',
    sectionKeys: ['fr'],
    icon: 'show_chart',
    path: '/reporting-executive',
  },
  {
    title: 'Event Manager',
    key: 'event_manager',
    sectionKeys: ['em'],
    icon: 'em-icon-v1-DW-EventManager',
    path: '/event-manager',
  },
  {
    title: 'Security',
    key: 'security',
    sectionKeys: ['pm'],
    icon: 'lock',
    path: '/permission-management',
  },
];

export const sections = [
  {
    title: 'Coreviz',
    key: 'coreviz',
    items: [
      { title: 'Home', path: '#' },
      { title: 'Favorites', path: '#' },
      { title: 'Dashboards', path: '#' },
      { title: 'Charts', path: '#' },
    ],
  },
  {
    title: 'ABTesting',
    key: 'ab',
    items: [
      { title: '+ Create ABTest', path: '#' },
      { title: 'Scheduled', path: '#' },
      { title: 'Archived', path: '#' },
      { title: 'Killed', path: '#' },
    ],
  },
  {
    title: 'Event Manager',
    key: 'em',
    items: [
      { title: 'Events', path: '#' },
      { title: 'Project Settings', path: '#' },
      { title: 'Templates', path: '#' },
    ],
  },
  {
    title: 'Achievements Engine',
    key: 'ae',
    items: [
      { title: 'Active Ruleset', path: '#' },
      { title: 'Rulesets', path: '#' },
      { title: 'User Achievements', path: '#' },
    ],
  },
  {
    title: 'Matchmaking',
    key: 'mm',
    items: [
      { title: 'Player Activity', path: '#' },
      { title: 'Session Viewer', path: '#' },
      { title: 'Tournament Session Viewer', path: '#' },
      { title: 'Server Inventory', path: '#' },
      { title: 'RS Docs', path: '#' },
      { title: 'Lobby viewer', path: '#' },
    ],
  },
  {
    title: 'Accounts',
    key: 'acc',
    items: [
      { title: 'Accounts', path: '#' },
      { title: 'Linked Accounts', path: '#' },
      { title: 'Link', path: '#' },
    ],
  },
  {
    title: 'ObjectStore',
    key: 'os',
    items: [
      { title: 'Publisher Objects', path: '#' },
      { title: 'User Objects', path: '#' },
      { title: 'Object Groups', path: '#' },
    ],
  },
  {
    title: 'Storage',
    key: 'store',
    items: [
      { title: 'Publisher Storage', path: '#' },
      { title: 'User Context Storage', path: '#' },
      { title: 'User Files', path: '#' },
      { title: 'Quota Allowance', path: '#' },
      { title: 'Quota Usage', path: '#' },
      { title: 'Pooled Files', path: '#' },
      { title: 'Variables Sets', path: '#' },
      { title: 'Group Members', path: '#' },
    ],
  },
  {
    title: 'Marketplace',
    key: 'mkt',
    items: [
      { title: 'Active Store', path: '#' },
      { title: 'Stores', path: '#' },
      { title: 'Player Inventory', path: '#' },
    ],
  },
  {
    title: 'Debugging',
    key: 'debug',
    items: [
      { title: 'Call Search', path: '#' },
      { title: 'Server Logs', path: '#' },
      { title: 'IMP History', path: '#' },
    ],
  },
  {
    title: 'ACL',
    key: 'acl',
    items: [
      { title: 'Task Rules', path: '#' },
      { title: 'Storage Filenames', path: '#' },
      { title: 'Leaderboard Ranges', path: '#' },
      { title: 'Revision History', path: '#' },
    ],
  },
  {
    title: 'Anticheat Challenges',
    key: 'cheat-challenges',
    items: [
      { title: 'Funxctions', path: '#' },
      { title: 'Challenges', path: '#' },
      { title: 'Challenge Logs', path: '#' },
      { title: 'Monitored Users', path: '#' },
      { title: 'Anticheat Statistics', path: '#' },
      { title: 'Challenge Generators', path: '#' },
      { title: 'Challenge Generation Logs', path: '#' },
    ],
  },
  {
    title: 'Anticheat Whitelist',
    key: 'cheat-whitelist',
    items: [
      { title: 'Whitelist Control', path: '#' },
      { title: 'Client Connection Logs', path: '#' },
    ],
  },
  {
    title: 'Audit Logs',
    key: 'al',
    items: [{ title: 'Audit Logs', path: '#' }],
  },
  {
    title: 'Permission Management',
    key: 'pm',
    items: [
      { title: 'Users', path: '#' },
      { title: 'Groups', path: '#' },
      { title: 'Companies', path: '#' },
    ],
  },
  {
    title: 'Franchise Reporting',
    key: 'fr',
    items: [{ title: 'Franchise Reporting', path: '/reporting-executive' }],
  },
];
