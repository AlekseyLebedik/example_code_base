import { isValid } from '../email-validation';

describe('helpers/email-validation', () => {
  it('validates isValid to be true', () => {
    expect(isValid('user@mail.com')).toBe(true);
  });

  it('validates isValid to be false', () => {
    expect(isValid('usér@mail.com')).toBe(false);
    expect(isValid('user_at_mail')).toBe(false);
  });
});
