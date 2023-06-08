import { formatAchievementsServiceData } from '../utils';

const data = [
  {
    titleId: 5827,
    achievements: [{ name: 't9_battlepass_addxp_s1' }],
  },
  {
    titleId: 5830,
    achievements: [
      { name: 't9_battlepass_addxp_s2' },
      { name: 't9_battlepass_addxp_s3' },
    ],
  },
];

describe('RecentActivity Achievements', () => {
  describe('formatAchievementsServiceData', () => {
    const result = formatAchievementsServiceData(data);
    it('returns correct items for 5827', () => {
      expect(result.get(5827)).toEqual([{ name: 't9_battlepass_addxp_s1' }]);
    });
    it('returns correct items for 5830', () => {
      expect(result.get(5830)).toEqual([
        { name: 't9_battlepass_addxp_s2' },
        { name: 't9_battlepass_addxp_s3' },
      ]);
    });
  });
});
