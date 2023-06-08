import moment from 'moment-timezone';

import {
  dateToDefaultTimestamp,
  getNowTimestamp,
  roundUpMomentHour,
  timestampToLocalDate,
  timezoneOrDefaultSelector,
  formatDateTime,
} from 'dw/core/helpers/date-time';

export * from 'dw/core/helpers/date-time';

export { timezoneOrDefaultSelector };

const getDurationFromNow = timestamp => {
  const duration = moment.duration(getNowTimestamp() - timestamp, 'seconds');
  // eslint-disable-next-line no-underscore-dangle
  return duration._data;
};

export const getDurationFromNowString = timestamp => {
  const duration = getDurationFromNow(timestamp);
  const { years, months, days, hours, minutes } = duration;
  const printTimePeriod = (period, n) =>
    `${n ? `${n} ${period}${n > 1 ? 's' : ''} ` : ''}`;
  return (
    printTimePeriod('year', years) +
    printTimePeriod('month', months) +
    printTimePeriod('day', days) +
    printTimePeriod('hour', hours) +
    printTimePeriod('minute', minutes)
  );
};

export const getSecondsFromDuration = ({
  s: seconds,
  m: minutes,
  h: hours,
  d: days,
  M: months = 0,
  Y: years = 0,
}) =>
  moment.duration({ seconds, minutes, hours, days, months, years }).asSeconds();

export const getDurationObjFromNow = timestamp => {
  const duration = getDurationFromNow(timestamp);
  const { years, months, days, hours, minutes, seconds } = duration;
  return {
    s: -seconds,
    m: -minutes,
    h: -hours,
    d: -days,
    M: -months,
    Y: -years,
  };
};

export const getDurationSecondsFromNow = timestamp => {
  const duration = getDurationObjFromNow(timestamp);
  return getSecondsFromDuration(duration);
};

export const calculateGamertagStartTime = (userTimezone, date, delta) =>
  timestampToLocalDate(date, userTimezone) ||
  (delta
    ? moment().tz(userTimezone).add(delta, 'seconds').toDate()
    : moment().tz(userTimezone).toDate());

export const getStartTimeFromDuration = (userTimezone, duration) => {
  const delta = getSecondsFromDuration(duration);
  return calculateGamertagStartTime(userTimezone, undefined, delta);
};

export const roundUpDateHour = (m, timezone) => {
  const nowRoundedHour = roundUpMomentHour(moment().tz(timezone));
  if (nowRoundedHour.isSame(moment('24:00:00', 'HH:mm:ss'))) {
    nowRoundedHour.subtract(1, 'minute');
  }
  return nowRoundedHour.set({
    year: m.get('year'),
    month: m.get('month'),
    date: m.get('date'),
  });
};

export const datePlusOffsetToTimestamp = (date, offset) =>
  moment((dateToDefaultTimestamp(date) + offset) * 1000).unix();

export const dateToDefaultTimestampWithIntCheck = date =>
  Number.isInteger(date) ? date : dateToDefaultTimestamp(date);

export const checkFormatDateTime = dateTime =>
  !dateTime ? null : dateToDefaultTimestampWithIntCheck(dateTime);

export const humanizedElapsedTime = (fromTimestamp, timezone) => {
  const relativity = fromTimestamp - getNowTimestamp();
  const duration = moment.duration(relativity, 'seconds');
  if (Math.abs(duration.asDays()) >= 1) {
    return formatDateTime(fromTimestamp, undefined, timezone);
  }
  if (
    Math.abs(duration.asSeconds()) < 60 &&
    Math.abs(duration.asSeconds()) > 0
  ) {
    return duration.humanize(true);
  }

  let message = getDurationFromNowString(fromTimestamp);
  if (relativity > 0) {
    message = `in${message}`;
  } else {
    message = `${message}ago`;
  }
  return message;
};

const addDaysToDate = (date, days) => {
  const dateClone = moment(date);
  return dateClone.add(days, 'days');
};

const subtractDaysFromDate = (date, days) => {
  const dateClone = moment(date);
  return dateClone.subtract(days, 'days');
};

export const momentPlusDaysToTimestamp = (date, days) =>
  dateToDefaultTimestamp(addDaysToDate(date, days));

export const momentPlusDaysToDate = (date, days) =>
  moment.utc(addDaysToDate(date, days)).format('YYYY-MM-DD HH:mm');

export const momentMinusDaysToTimestamp = (date, days) =>
  dateToDefaultTimestamp(subtractDaysFromDate(date, days));

export const momentMinusDaysToDate = (date, days) =>
  moment.utc(subtractDaysFromDate(date, days)).format('YYYY-MM-DD HH:mm');

export const startOfDayTimestamp = date => moment(date).startOf('day').unix();

export const endOfDayTimestamp = date => moment(date).endOf('day').unix();
