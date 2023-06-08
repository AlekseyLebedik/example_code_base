export const PROJECT_NAME_TRANSFORMATION_EXCEPTIONS = ['Guitar Hero'];

export const PROJECT_NAME_MAP = {
  WW2: 'WWII',
};

export const STAT_NAMES = ['users-online', 'unique-users'];
export const GAMEMODES_STAT = 'gamemodes';
export const STAT_NAMES_WITH_GAMEMODES = [
  'users-online',
  GAMEMODES_STAT,
  'unique-users',
];
export const PROJECTS_WITH_GAMEMODES = [1141];

export const EXCLUDE_PLATFORMS = ['PC-UWP'];

export const PLATFORMS_GROUPS_MAP = {
  'PC-Steam': 'PC',
  'PC-BNet': 'PC',
};

export const PLATFORMS_ORDER = [
  'PS4',
  'Xbox One',
  'PC',
  'PC-Steam',
  'PC-BNet',
  'PS3',
  'XBOX360',
  'Wii-U',
  'Wii',
];

export const sortPlatforms = origPlatforms => {
  const platforms = [...origPlatforms];
  return platforms.sort((platform1, platform2) => {
    const p1 = platform1.platform || platform1;
    const idx1 = PLATFORMS_ORDER.includes(p1)
      ? PLATFORMS_ORDER.indexOf(p1)
      : 1000;
    const p2 = platform2.platform || platform2;
    const idx2 = PLATFORMS_ORDER.includes(p2)
      ? PLATFORMS_ORDER.indexOf(p2)
      : 1000;
    return idx1 - idx2;
  });
};

export const matchPlatform = (platform, platforms) => {
  const lookFor = [
    platform,
    ...Object.entries(PLATFORMS_GROUPS_MAP)
      .filter(p => p[1] === platform)
      .map(p => p[0]),
  ];
  for (let i = 0; i < lookFor.length; i += 1) {
    if (platforms.find(p => p.platform === lookFor[i])) return lookFor[i];
  }
  return null;
};
