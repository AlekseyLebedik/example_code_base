import * as helpers from '../helpers';

describe('EventsList', () => {
  describe('handleEndDate():', () => {
    it('returns date if start !== end', () => {
      const start = new Date('December 17, 1995 03:24:00');
      const end = new Date('December 18, 1995 03:24:00');
      expect(helpers.handleEndDate(start, end)).toEqual(end);
    });

    it('returns null if start === end', () => {
      const start = new Date('December 17, 1995 03:24:00');
      const end = start;
      expect(helpers.handleEndDate(start, end)).toEqual(false);
    });
  });

  describe('dateValueGetter', () => {
    it('returns formatted date when passed valid timestamp', () => {
      const date = 1571694466;
      expect(helpers.dateValueGetter(date)).toEqual('Oct 21, 2019 09:47 pm');
    });

    it('returns --- when passed invalid timestamp', () => {
      const date = false;
      expect(helpers.dateValueGetter(date)).toEqual('---');
    });
  });
});
