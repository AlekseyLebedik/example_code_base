import { getSecondsFromDuration } from 'playpants/helpers/dateTime';

describe('getSecondsFromDuration()', () => {
  it('successfully parses date object into seconds', () => {
    expect(getSecondsFromDuration({ s: 5, m: 1 })).toEqual(65);
  });
});
