import { timestampToMoment, formatDateTime } from 'playpants/helpers/dateTime';

export const displayViewTestDate = (testFrom, userTimezone) => {
  const testFromDate = timestampToMoment(testFrom, userTimezone);
  return formatDateTime(testFromDate, 'LLLL', userTimezone);
};

// Event duration as seen on event detail display
export const displayViewEventDuration = (
  testToDate,
  testFromDate,
  userTimezone
) =>
  `${displayViewTestDate(testFromDate, userTimezone)} - ${displayViewTestDate(
    testToDate,
    userTimezone
  )}`;

// Gets the publish time
export const getTestFromTime = (testFromDate, userTimezone) =>
  formatDateTime(testFromDate, 'hh:mm A', userTimezone);
