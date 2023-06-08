import inRange from 'lodash/inRange';
import { isSameDay, differenceInDays } from 'date-fns';

import {
  dateToUTCTimestamp,
  getDateFromTimestampOrMoment,
} from 'dw/core/helpers/date-time';

export const timestampInRange = (date, startRange, endRange) =>
  inRange(
    dateToUTCTimestamp(date),
    dateToUTCTimestamp(startRange),
    dateToUTCTimestamp(endRange)
  );

export const eventDatesAreClose = (event, date, timezone) => {
  const start = getDateFromTimestampOrMoment(event.start, timezone);
  const end = getDateFromTimestampOrMoment(event.end, timezone);
  const maxDateDiff = 1;
  return (
    Math.abs(differenceInDays(start, date)) <= maxDateDiff ||
    Math.abs(differenceInDays(end, date)) <= maxDateDiff
  );
};

export const eventsAreSameDay = (event, timezone) =>
  isSameDay(
    getDateFromTimestampOrMoment(event.start, timezone),
    getDateFromTimestampOrMoment(event.end, timezone)
  );
