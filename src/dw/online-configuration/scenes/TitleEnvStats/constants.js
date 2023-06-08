export const EVENTS = {
  generalComments: { color: '#34495E', icon: 'comments', position: 0 },
  maintenances: { color: '#EB9532', icon: 'build', position: 1 },
  incidents: { color: '#EF4836', icon: 'warning', position: 2 },
};

export const STAT_NAMES = ['users-online', 'games-online', 'unique-users'];

export const STAT_LABELS = {
  'users-online': 'Max Concurrent Online Users',
  'games-online': 'Concurrent Online Games',
  'unique-users': 'Max Daily Unique Users',
  gamemodes: 'Users By Gamemode',
};

export const STAT_LABELS_SHORT = {
  'users-online': 'Max Concurrent Users',
  'games-online': 'Concurrent Games',
  'unique-users': 'Max Daily Unique Users',
  gamemodes: 'Users By Gamemode',
};

export const BUBBLE_SERIE_BASE_CONFIG = {
  type: 'flags',
  shape: 'circlepin',
  showInLegend: false,
};
