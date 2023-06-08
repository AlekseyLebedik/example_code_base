import { sortProviders } from '../helpers';

const ORDERED_PROVIDERS = [
  {
    label: 'Uno',
    value: 'uno',
  },
  {
    label: 'Blizzard',
    value: 'battle',
  },
  {
    label: 'Playstation',
    value: 'psn',
  },
  {
    label: 'Xbox',
    value: 'xbl',
  },
  {
    label: '3DS/Wii U',
    value: 'nintendo',
  },
  {
    label: 'Amazon',
    value: 'amazon',
  },
  {
    label: 'Apple Game Center',
    value: 'gamecenter',
  },
  {
    label: 'Facebook',
    value: 'facebook',
  },
  {
    label: 'Google Play',
    value: 'googleplay',
  },
  {
    label: 'Google Plus',
    value: 'googleplus',
  },
  {
    label: 'Nintendo Account',
    value: 'na',
  },
  {
    label: 'Steam',
    value: 'steam',
  },
  {
    label: 'Switch',
    value: 'nin',
  },
  {
    label: 'Twitch',
    value: 'twitch',
  },
  {
    label: 'Twitter',
    value: 'twitter',
  },
  {
    label: 'WeGame',
    value: 'we',
  },
  {
    label: 'WeGame Global',
    value: 'wex',
  },
  {
    label: 'WeGame CN',
    value: 'wecn',
  },
  {
    label: 'YouTube',
    value: 'youtube',
  },
];

describe('sortProviders()', () => {
  it('sorts providers in expected order', () => {
    expect(sortProviders()).toEqual(ORDERED_PROVIDERS);
  });
});
