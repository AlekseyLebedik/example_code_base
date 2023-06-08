import { featureSwitches as fs } from '@demonware/devzone-core/access/FeatureSwitchesCheck';

export const SERVICE_NAMES = {
  ABTESTING: 'ab-testing',
  ACHIEVEMENTS: 'achievements',
  BATTLEPASS: 'battlepass',
  CLANS: 'clans',
  INVENTORY: 'inventory',
  LEADERBOARDS: 'leaderboards',
  MATCHMAKING: 'matchmaking',
  STORAGE: 'storage',
};

export const SERVICE_LABELS = {
  [SERVICE_NAMES.ABTESTING]: 'A/B Testing',
  [SERVICE_NAMES.ACHIEVEMENTS]: 'Achievements',
  [SERVICE_NAMES.BATTLEPASS]: 'Battlepass',
  [SERVICE_NAMES.CLANS]: 'Clans',
  [SERVICE_NAMES.INVENTORY]: 'Inventory',
  [SERVICE_NAMES.LEADERBOARDS]: 'Leaderboards',
  [SERVICE_NAMES.MATCHMAKING]: 'Matchmaking',
  [SERVICE_NAMES.STORAGE]: 'Storage',
};

export const SERVICE_SWITCHES = {
  [SERVICE_NAMES.LEADERBOARDS]: fs.DISPLAY_PLAYER_LEADERBOARDS,
};

export const OPTIONS_DEFAULTS = {
  globals: [],
  titles: [],
  services: [],
};
