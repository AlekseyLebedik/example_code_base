import { formatBattlepassData } from '../utils';

const data = [
  {
    titleId: 5827,
    seasonNo: 1,
    owned: true,
    rank: 500,
  },
  {
    titleId: 5827,
    owned: true,
    latestOwned: true,
    seasonNo: 2,
    rank: 500,
  },
  {
    titleId: 5830,
    seasonNo: 3,
    owned: true,
    latestOwned: true,
    rank: 10,
  },
];

describe('GameData Battlepass', () => {
  describe('formatBattlepassData', () => {
    const result = formatBattlepassData(data);
    it('returns correct pass for 5827', () => {
      expect(result.get(5827)).toEqual({
        rank: 500,
        seasonNo: 2,
        titleId: 5827,
      });
    });
    it('returns correct pass for 5830', () => {
      expect(result.get(5830)).toEqual({
        rank: 10,
        seasonNo: 3,
        titleId: 5830,
      });
    });
  });
});
