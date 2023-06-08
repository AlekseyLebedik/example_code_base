import { createSelector } from 'reselect';

const getField = (obj, field) =>
  obj && obj[field] && obj[field].toString().replace('.', '').padEnd(16, '0');

export const getTimestamp = obj =>
  getField(obj, 'telemetry__created_at_us') ||
  getField(obj, 'timestamp_us') ||
  getField(obj, 'timestamp_millis') ||
  getField(obj, 'headers__ts') ||
  getField(obj, 'timestamp_sec') ||
  getField(obj, 'headers__timestamp') ||
  getField(obj, 'telemetry__utc_timestamp_sent');

export const sortTimestampSelector = createSelector(
  props => props,
  ({ a, b }) => getTimestamp(a) - getTimestamp(b)
);
