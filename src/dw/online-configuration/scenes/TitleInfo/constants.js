import styles from './gridPresentational.module.css';

export const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 Minutes

export const PROP_NAMES = {
  STATS: 'stats',
  MMP: 'mmp',
  CLUSTER: 'cluster',
  MARKETPLACE: 'marketplace',
  ACHIEVEMENTS: 'achievements',
  OBJECT_STORE: 'objectstore',
  ENV: 'env',
  MATCHMAKING: 'matchmaking',
  SOCIAL_SERVICE: 'socialservice',
};

export const COLUMN_DEFINITIONS = [
  {
    field: 'group',
    rowGroup: true,
    hide: true,
  },
  { field: 'name', width: 60, cellClass: styles.nameCell },
  { field: 'value' },
];
