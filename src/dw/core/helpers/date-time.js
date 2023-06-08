import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';
import { createSelector } from 'reselect';

const DATE_TIME_FORMATS = {
  DEFAULT: 'MMM DD, YYYY hh:mm a z',
  DEFAULT24: 'MMM DD, YYYY HH:mm z',
  DEFAULT24_WITH_SECONDS: 'MMM DD, YYYY HH:mm:ss z',
  DEFAULT_WITHOUT_TIMEZONE: 'MMM DD, YYYY HH:mm',
  DEFAULT_WITH_SECONDS: 'MMM DD, YYYY hh:mm:ss a z',
  DEFAULT_DATE: 'MMM DD, YYYY',
  DEFAULT_DATE_LONG: 'MMMM D, YYYY',
  DEFAULT_TIME: 'hh:mm a z',
  DEFAULT_TIME24: 'HH:mm z',
  DATE_NO_YEAR: 'MMM DD',
  DATE_MYSQL: "'YYYY-MM-DD'",
  DATETIME_MYSQL: "'YYYY-MM-DD HH:mm:ss'",
  TIME_WITH_SECONDS: 'h:mm:ss a z',
};

const defaultTimezone = moment.tz.guess();

class DzMomentUtils extends MomentUtils {
  dateFormat = DATE_TIME_FORMATS.DEFAULT_DATE;

  dateTime12hFormat = DATE_TIME_FORMATS.DEFAULT;

  dateTime24hFormat = DATE_TIME_FORMATS.DEFAULT24;

  time12hFormat = DATE_TIME_FORMATS.DEFAULT_TIME;

  time24hFormat = DATE_TIME_FORMATS.DEFAULT_TIME24;

  date(value) {
    let result;
    if (value === undefined) {
      result = moment().tz(this.timezone);
    } else if (!value) {
      result = super.date(value);
    } else {
      result = moment.tz(value, this.timezone);
    }
    return result;
  }
}

const timezoneSelector = state => state.user.profile.timezone;

const timezoneOrDefaultSelector = createSelector(
  timezoneSelector,
  timezone => timezone || defaultTimezone
);

const getTimezoneOffset = timezone => timestamp =>
  moment.tz.zone(timezone).utcOffset(timestamp);

const getTimezoneOffsetSelector = createSelector(
  timezoneOrDefaultSelector,
  getTimezoneOffset
);

const offsetFn =
  timezone =>
  (timestamp, add = true) => {
    const m = add ? 1 : -1;
    const zone = moment.tz.zone(timezone);
    return timestamp - m * zone.utcOffset(timestamp * 1000) * 60;
  };

const offsetSelector = createSelector(timezoneOrDefaultSelector, offsetFn);

const dateToDefaultTimestamp = date => moment(date).unix();

const dateToUTCTimestamp = (date, timezone = 'UTC') => {
  if (moment.isMoment(date)) {
    return Math.round(moment.tz(date, timezone).valueOf() / 1000);
  }
  const defaultTZTimestamp = dateToDefaultTimestamp(date);
  const defaultLocalTimestamp = offsetFn(defaultTimezone)(defaultTZTimestamp);
  const targetTZTimestamp = offsetFn(timezone)(defaultLocalTimestamp, false);
  return targetTZTimestamp;
};

const dateToUTCTimestampSelector = createSelector(
  timezoneOrDefaultSelector,
  timezone => date => dateToUTCTimestamp(date, timezone)
);

const formatDateTime = (
  dateOrTimestamp,
  format = DATE_TIME_FORMATS.DEFAULT,
  timezone = 'UTC'
) => {
  if (!dateOrTimestamp || dateOrTimestamp === '0') return 'N/A';
  const zoneAbbr = moment.tz(timezone).zoneAbbr();
  const newFormat =
    zoneAbbr === 'UTC' || zoneAbbr === 'GMT'
      ? format.replace(' z', '').replace('Z', '')
      : format;
  const timestamp =
    moment.isDate(dateOrTimestamp) || moment.isMoment(dateOrTimestamp)
      ? dateToUTCTimestamp(dateOrTimestamp, timezone)
      : parseFloat(dateOrTimestamp);
  return moment.tz(timestamp * 1000, timezone).format(newFormat);
};

const formatDateTimeSelector = createSelector(
  timezoneOrDefaultSelector,
  timezone =>
    (dateOrTimestamp, format = DATE_TIME_FORMATS.DEFAULT) =>
      formatDateTime(dateOrTimestamp, format, timezone)
);

const timestampToMoment = (value, timezone = 'UTC') => {
  if (!value) return value;
  const timestamp =
    moment.isMoment(value) || moment.isDate(value)
      ? value
      : parseFloat(value) * 1000;
  return moment.tz(timestamp, timezone);
};

const timestampToMomentSelector = createSelector(
  timezoneOrDefaultSelector,
  timezone => timestamp => timestampToMoment(timestamp, timezone)
);

const timestampToDate = (timestamp, timezone = 'UTC') =>
  timestamp ? timestampToMoment(timestamp, timezone).toDate() : null;

const timestampToLocalDate = (timestamp, timezone = defaultTimezone) => {
  if (!timestamp) return null;
  const targetTimezoneTimestamp = offsetFn(timezone)(timestamp);
  const localTimezoneTimestamp = offsetFn(defaultTimezone)(
    targetTimezoneTimestamp,
    false
  );
  return timestampToDate(localTimezoneTimestamp, defaultTimezone);
};

const getDateTimeFromTimestamp = (ts, format = DATE_TIME_FORMATS.DEFAULT) =>
  moment.unix(ts).utc().format(format);

const getNowTimestamp = () => moment().unix();

const getNowSubstracting = (number, unit) =>
  moment().subtract(number, unit).unix();

const roundUpMomentHour = m =>
  m.format('mm:ss.SSS') !== '00:00.000' ? m.add(1, 'hour').startOf('hour') : m;

const minMaxDateToMoment = (date, timezone) => {
  if (date === 'now') {
    return moment().tz(timezone);
  }
  const momentDate = timestampToMoment(date);
  if (momentDate) {
    return momentDate.tz(timezone);
  }
  return null;
};

const getDurationFromSeconds = seconds => ({
  d: Math.floor(moment.duration({ seconds }).asDays()),
  h: moment.duration({ seconds }).hours(),
  m: moment.duration({ seconds }).minutes(),
  s: moment.duration({ seconds }).seconds(),
});

const printDurationFromSeconds = seconds => {
  const duration = getDurationFromSeconds(seconds);
  const { d, h, m, s } = duration;
  const printTimePeriod = (period, n) =>
    `${n ? `${n} ${period}${n > 1 ? 's' : ''} ` : ''}`;
  return (
    printTimePeriod('day', d) +
    printTimePeriod('hour', h) +
    printTimePeriod('minute', m) +
    printTimePeriod('second', s)
  );
};

const datesAreSameDay = (date1, date2, timezone) =>
  timestampToMoment(date1, timezone).isSame(
    timestampToMoment(date2, timezone),
    'day'
  );

const dateIsBefore = (date1, date2, timezone = 'UTC') =>
  timestampToMoment(date1, timezone).isBefore(
    timestampToMoment(date2, timezone)
  );

const dateIsAfter = (date1, date2, timezone = 'UTC') =>
  timestampToMoment(date1, timezone).isAfter(
    timestampToMoment(date2, timezone)
  );

const getDateFromTimestampOrMoment = (date, timezone) => {
  if (moment.isDate(date)) return date;
  if (moment.isMoment(date)) return date.toDate();
  return timestampToDate(date, timezone);
};

const timeFromNow = (date, type = 'days') => moment().diff(date, type);

export {
  DATE_TIME_FORMATS,
  defaultTimezone,
  DzMomentUtils,
  timezoneSelector,
  timezoneOrDefaultSelector,
  getTimezoneOffset,
  getTimezoneOffsetSelector,
  offsetFn,
  offsetSelector,
  dateToDefaultTimestamp,
  dateToUTCTimestamp,
  dateToUTCTimestampSelector,
  formatDateTime,
  formatDateTimeSelector,
  timestampToMoment,
  timestampToMomentSelector,
  timestampToLocalDate,
  getDateTimeFromTimestamp,
  getNowTimestamp,
  getNowSubstracting,
  roundUpMomentHour,
  minMaxDateToMoment,
  getDurationFromSeconds,
  printDurationFromSeconds,
  datesAreSameDay,
  dateIsBefore,
  dateIsAfter,
  getDateFromTimestampOrMoment,
  timeFromNow,
};
