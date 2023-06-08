import { formatDateTime } from 'playpants/helpers/dateTime';

// Gets the publish time
export const getPublishTime = (publishAt, userTimezone) =>
  formatDateTime(publishAt, 'hh:mm A', userTimezone);
