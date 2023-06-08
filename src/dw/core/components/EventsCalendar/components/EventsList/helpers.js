import moment from 'moment';
import { formatDateTime } from 'dw/core/helpers/date-time';
import { dateComparator } from 'dw/core/helpers/aggrid';

export const customDateComparator = (date1, date2) => {
  if (!date1) return 1;
  if (!date2) return -1;
  return dateComparator(date1, date2);
};

export const handleEndDate = (start, end) => !moment(start).isSame(end) && end;

export const dateValueGetter = date => (date ? formatDateTime(date) : '---');

export const eventWriteCheck = (event, writeAccess) =>
  writeAccess &&
  event.status === 'open' &&
  !event.isReadOnly &&
  !event.is_manually_locked &&
  !event.is_restricted;
