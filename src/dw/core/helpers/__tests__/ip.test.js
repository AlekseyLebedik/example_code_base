import { toInt, isValid, ntoa } from '../ip';

describe('helpers/ip', () => {
  it('validates isValid to be true', () => {
    expect(isValid('127.0.0.1')).toBe(true);
    expect(isValid('93.125.99.10')).toBe(true);
  });

  it('validates isValid to be false', () => {
    expect(isValid('127.0.0.1:16')).toBe(false);
    expect(isValid('.0.0.1')).toBe(false);
    expect(isValid('127')).toBe(false);
  });

  it('validates toInt', () => {
    expect(toInt('127.0.0.1')).toBe(2130706433);
    expect(toInt('93.125.99.10')).toBe(1568498442);
  });

  it('validates ntoa', () => {
    expect(ntoa(2130706433)).toBe('127.0.0.1');
    expect(ntoa(1568498442)).toBe('93.125.99.10');
  });
});
