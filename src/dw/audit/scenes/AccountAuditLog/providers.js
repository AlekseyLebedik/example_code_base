export const PROVIDERS = [
  { label: '3DS/Wii U', value: 'nintendo' },
  { label: 'Amazon', value: 'amazon' },
  { label: 'Apple Game Center', value: 'gamecenter' },
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

export const KEY_PROVIDERS = new Map(
  ['Uno', 'Xbox', 'Playstation', 'Blizzard'].map((s, i) => [s, i])
);
