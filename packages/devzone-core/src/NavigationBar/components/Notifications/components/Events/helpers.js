import moment from 'moment';

export function convertDateLocal(date) {
  const dateFormat = 'YYYY-MM-DD HH:mm:ss';
  return moment.utc(date, dateFormat).local().format(dateFormat);
}
