import { franchises as franchisesMock } from 'dw/reporting/__mocks__/franchises';
import { platformsSelector, getProjectPlatformsSelector } from '../selectors';

describe('Platforms selectors', () => {
  describe('platformsSelector', () => {
    it('returns platforms', () => {
      expect(platformsSelector(null, { franchise: franchisesMock[0] })).toEqual(
        ['PS4', 'Xbox One', 'PC', 'Wii']
      );
    });
    it('returns ordred and groupped platforms', () => {
      expect(platformsSelector(null, { franchise: franchisesMock[1] })).toEqual(
        ['PS4', 'Xbox One', 'PC', 'Wii']
      );
    });
  });
  describe('getProjectPlatformsSelector', () => {
    it('returns project platforms', () => {
      const projectId = 1;
      const getProjectPlatforms = getProjectPlatformsSelector(null, {
        franchise: franchisesMock[0],
      });
      expect(getProjectPlatforms(projectId)).toEqual([
        { platform: 'PS4' },
        { platform: 'Xbox One' },
        { platform: 'PC' },
        { platform: 'Wii' },
      ]);
    });
    it('returns ordered project platforms', () => {
      const projectId = 4;
      const getProjectPlatforms = getProjectPlatformsSelector(null, {
        franchise: franchisesMock[1],
      });
      expect(getProjectPlatforms(projectId)).toEqual([
        { platform: 'PS4' },
        { platform: 'Xbox One' },
        { platform: 'PC-Steam' },
        { platform: 'Wii' },
      ]);
    });
  });
});
