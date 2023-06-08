export const PROJECT_SETTINGS_LS_KEY = 'project_settings_history';
export const SETTINGS_TABS = {
  responsibilities: 'Responsibilities',
  'gamertag-management': 'Groups',
  settings: 'Settings',
};

export const RESPONSIBILITIES_SUB_TABS = {
  groups: 'Groups',
  users: 'Users',
};

export const SETTINGS_SUB_TABS = {
  global: 'Global',
  events: 'Events',
  activities: 'Activities',
  'name-mapping': 'Name Mapping',
  notifications: 'Notifications',
  colors: 'Colors',
};

export const PROJECT_ENVIRONMENTS = {
  cert: 'Certification',
  dev: 'Development',
  live: 'Live',
};

export const ICONS = [
  'android',
  'iphone',
  'psp',
  'xbox',
  'pc-steam',
  'wii-u',
  'wii',
  'pc-bnet',
  'default',
];

export const GROUPS = ['All', 'Demonware', 'Treyarch', 'Infinity Ward'];

export const PROJECT_SETTINGS_URL = 'project-settings';

export const RESP_URL = `${PROJECT_SETTINGS_URL}/responsibilities`;

export const RESP_REDIRECT_URL = `${RESP_URL}/groups`;

export const GAMERTAGS_URL = `${PROJECT_SETTINGS_URL}/gamertag-management`;

export const GAMERTAGS_REDIRECT_URL = `${GAMERTAGS_URL}/groups`;

export const SETTINGS_URL = `${PROJECT_SETTINGS_URL}/settings`;

export const SETTINGS_REDIRECT_URL = `${SETTINGS_URL}/global`;
