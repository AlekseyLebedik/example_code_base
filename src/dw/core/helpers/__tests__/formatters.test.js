import { formatFileSize, formatBool, valueOrNotAvailable } from '../formatters';

describe('helpers/formatters', () => {
  it('validates formatFileSize', () => {
    expect(formatFileSize(NaN)).toBe('0 bytes');
    expect(formatFileSize(10)).toBe('10 bytes');
    expect(formatFileSize(1010)).toBe('1.01 KB');
    expect(formatFileSize(10000000)).toBe('10 MB');
  });

  it('validates formatBool is Yes', () => {
    expect(formatBool(true)).toBe('Yes');
    expect(formatBool('blah')).toBe('Yes');
    expect(formatBool(42)).toBe('Yes');
  });

  it('validates formatBool is No', () => {
    expect(formatBool(false)).toBe('No');
    expect(formatBool(0)).toBe('No');
    expect(formatBool(undefined)).toBe('No');
  });

  it('validates valueOrNotAvailable', () => {
    expect(valueOrNotAvailable('blah')).toBe('blah');
    expect(valueOrNotAvailable(null, 'blah')).toBe('blah');
  });

  it('validates valueOrNotAvailable is not available', () => {
    expect(valueOrNotAvailable(null)).toBe('n/a');
    expect(valueOrNotAvailable(null, null)).toBe('n/a');
  });
});
