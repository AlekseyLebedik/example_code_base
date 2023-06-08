export const ACCOUNT_TYPES = [
  { label: 'x360', value: 'x360' },
  { label: 'xb1', value: 'xb1' },
  { label: 'xbsx', value: 'xbsx' },
  { label: 'xbl', value: 'xbl' },
  { label: 'ps3', value: 'ps3' },
  { label: 'ps4', value: 'ps4' },
  { label: 'ps5', value: 'ps5' },
  { label: 'wiiu', value: 'wiiu' },
  { label: 'pc', value: 'pc' },
  { label: 'psn', value: 'psn' },
  { label: '3DS/Wii U', value: 'nintendo' },
  { label: 'ucd', value: 'ucd' },
  { label: 'uno', value: 'uno' },
  { label: 'steam', value: 'steam' },
  { label: 'team', value: 'team' },
  { label: 'epic', value: 'epic' },
  { label: 'Switch', value: 'nin' },
  { label: 'Nintendo Account', value: 'na' },
];

export const HAS_CRASH_MSG = 'Something went wrong.';

export const PROVIDERS = [
  { label: '3DS/Wii U', value: 'nintendo' },
  { label: 'Amazon', value: 'amazon' },
  { label: 'Apple Game Center', value: 'gamecenter' },
  /* 'bnet' not supported for account search even though 'battle' is deprecated PRODSUP-1325 */
  { label: 'Blizzard', value: 'battle' },
  { label: 'Epic Games', value: 'epic' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Google Play', value: 'googleplay' },
  { label: 'Google Plus', value: 'googleplus' },
  { label: 'Nintendo Account', value: 'na' },
  { label: 'Playstation', value: 'psn' },
  { label: 'Steam', value: 'steam' },
  { label: 'Switch', value: 'nin' },
  { label: 'Twitch', value: 'twitch' },
  { label: 'Twitter', value: 'twitter' },
  { label: 'Uno', value: 'uno' },
  { label: 'WeGame', value: 'we' },
  { label: 'WeGame Global', value: 'wex' },
  { label: 'WeGame CN', value: 'wecn' },
  { label: 'Xbox', value: 'xbl' },
  { label: 'YouTube', value: 'youtube' },
];

export const PROVIDERS_MAP = {
  bnet: 'battle',
  ps2: 'psn',
  ps3: 'psn',
  ps4: 'psn',
  ps5: 'psn',
  xbl: 'xbl',
  xb1: 'xbl',
  xbox: 'xbl',
  xbox360: 'xbl',
  xbsx: 'xbl',
};
