import moment from 'moment-timezone';

import * as dateUtils from '../date-time';

describe('helpers/date-time', () => {
  it('validates timezoneSelector', () => {
    expect(
      dateUtils.timezoneSelector({
        user: { profile: { timezone: 'Europe/Kiev' } },
      })
    ).toBe('Europe/Kiev');
  });

  it('validates timezoneSelector is null', () => {
    expect(
      dateUtils.timezoneSelector({ user: { profile: { timezone: null } } })
    ).toBe(null);
  });

  it('validates timezoneOrDefaultSelector', () => {
    const defaultTimezone = moment.tz.guess();
    expect(
      dateUtils.timezoneOrDefaultSelector({
        user: { profile: { timezone: null } },
      })
    ).toBe(defaultTimezone);
  });

  it('validates timezoneOrDefaultSelector is set', () => {
    expect(
      dateUtils.timezoneOrDefaultSelector({
        user: { profile: { timezone: 'Europe/Kiev' } },
      })
    ).toBe('Europe/Kiev');
  });

  it('validates formatDateTime with default (utc) timezone and default format', () => {
    const ts = 1234567890;
    expect(dateUtils.formatDateTime(ts)).toBe('Feb 13, 2009 11:31 pm');
  });

  it('validates formatDateTime with custom format', () => {
    const ts = 1234567890;
    expect(dateUtils.formatDateTime(ts, 'MMM Do YYYY hA')).toBe(
      'Feb 13th 2009 11PM'
    );
  });

  it('validates formatDateTime with Date object', () => {
    const date = new Date('2007-08-17 00:24:00');
    expect(dateUtils.formatDateTime(date, undefined, 'Europe/Kiev')).toBe(
      'Aug 17, 2007 12:24 am EEST'
    );
  });

  it('validates formatDateTime with no date', () => {
    expect(dateUtils.formatDateTime(0)).toBe('N/A');
    expect(dateUtils.formatDateTime(null)).toBe('N/A');
  });

  it('validates formatDateTimeSelector', () => {
    const formatFn = dateUtils.formatDateTimeSelector({
      user: { profile: { timezone: 'America/Vancouver' } },
    });
    const ts = 1234567890;
    expect(formatFn(ts)).toBe('Feb 13, 2009 03:31 pm PST');
  });

  it('validates offsetFn', () => {
    const formatFn = dateUtils.offsetFn('Europe/Kiev');
    const ts = 1234567890;
    const expected = 1234575090; // Adds two hours.
    expect(formatFn(ts)).toBe(expected);
  });

  it('validates offsetSelector', () => {
    const formatFn = dateUtils.offsetSelector({
      user: { profile: { timezone: 'Europe/Kiev' } },
    });
    const ts = 1234567890;
    const expected = 1234575090; // Adds two hours.
    expect(formatFn(ts)).toBe(expected);
  });

  it('validates timestampToMoment', () => {
    const ts = 1234567890;
    expect(
      dateUtils
        .timestampToMoment(ts)
        .format(dateUtils.DATE_TIME_FORMATS.DEFAULT)
    ).toBe('Feb 13, 2009 11:31 pm UTC');
  });

  it('validates timestampToMomentSelector', () => {
    const formatFn = dateUtils.timestampToMomentSelector({
      user: { profile: { timezone: 'Europe/Kiev' } },
    });
    const ts = 1234567890;
    expect(formatFn(ts).format(dateUtils.DATE_TIME_FORMATS.DEFAULT)).toBe(
      'Feb 14, 2009 01:31 am EET'
    );
  });

  it('validates timestampToLocalDate', () => {
    const ts = 1234567890;
    const expected = new Date('2009-02-13 15:31:30');
    expect(dateUtils.timestampToLocalDate(ts, 'America/Vancouver')).toEqual(
      expected
    );
  });

  it('validates dateToUTCTimestamp', () => {
    const date = new Date('2009-02-13 23:31:30');
    const expected = 1234567890;
    expect(dateUtils.dateToUTCTimestamp(date)).toEqual(expected);
  });

  it('validates dateToUTCTimestampSelector', () => {
    const formatFn = dateUtils.dateToUTCTimestampSelector({
      user: { profile: { timezone: 'Europe/Kiev' } },
    });
    const date = new Date('2009-02-14 01:31:30');
    const expected = 1234567890;
    expect(formatFn(date)).toEqual(expected);
  });

  it('validates getDateTimeFromTimestamp', () => {
    const ts = 1234567890;
    expect(dateUtils.getDateTimeFromTimestamp(ts)).toEqual(
      'Feb 13, 2009 11:31 pm UTC'
    );
  });
});
