import {
  YesNoFromBool,
  NoSetWhenNull,
  CollectionOrNone,
} from '../api-data-parser';

describe('helpers/api-data-parser', () => {
  it('validates YesNoFromBool', () => {
    expect(YesNoFromBool(true)).toBe('Yes');
    expect(YesNoFromBool(false)).toBe('No');
  });

  it('validates NoSetWhenNull', () => {
    expect(NoSetWhenNull(null)).toBe('Not set');
    expect(NoSetWhenNull('blah')).toBe('blah');
  });

  it('validates CollectionOrNone', () => {
    const c = [1, 2, 3];
    expect(CollectionOrNone(c)).toEqual(c);
    expect(CollectionOrNone([])).toBe('None');
  });
});
