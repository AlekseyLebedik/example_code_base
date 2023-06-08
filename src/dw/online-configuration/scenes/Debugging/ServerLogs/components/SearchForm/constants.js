export const FORM_NAME = 'server-logs-search-form';

export const LOG_LEVELS = ['error', 'warning', 'debug', 'info'];

export const SOURCE_TYPES = [
  'auth3',
  'marketplace',
  'mmp3',
  'dwsproxy',
  'loot-generation',
  'webservice',
  'achievements_engine',
  'tournament-engine',
  'lsg',
  'loginqueue',
  'abtesting',
  'objectstore',
  'commsservice',
  'storage-script-service',
  'uno',
  'umbrella',
];

export const DEFAULT_FORM_VALUES = {
  userId: null,
  connId: null,
  transId: null,
  startDate: null,
  endDate: null,
  error: true,
  warning: true,
  debug: true,
  info: true,
  auth3: true,
  marketplace: true,
  mmp3: true,
  dwsproxy: true,
  'loot-generation': true,
  webservice: true,
  achievements_engine: true,
  'tournament-engine': true,
  commsservice: true,
  lsg: true,
  loginqueue: true,
  abtesting: true,
  objectstore: true,
  'storage-script-service': true,
  /* many/most titles will not have the Uno client set up, and without it, this will break */
  uno: false,
  umbrella: false,
  dwThcnagios: false,
};

export const DEFAULT_URL_DISPLAY_TRUE = ['uno', 'umbrella'];
