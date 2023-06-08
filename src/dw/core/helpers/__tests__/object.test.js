import { hasData } from '../object';

describe('helpers/object', () => {
  it('validates hasData is true', () => {
    expect(hasData({ key: 'blah' })).toBe(true);
    expect(hasData([{}])).toBe(true);
  });

  it('validates hasData is false', () => {
    expect(hasData({})).toBe(false);
    expect(hasData(undefined)).toBe(false);
    expect(hasData(null)).toBe(false);
  });
});
