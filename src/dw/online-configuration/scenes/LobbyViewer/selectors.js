import * as d3 from 'd3';
import { createSelector } from 'reselect';
import { offsetFn as offsetFnSelector } from 'dw/core/helpers/date-time';
import { EVENT_TYPE_MAP } from './constants';

const dataSelector = state => state.data;
const timezoneSelector = state => state.timezone;

/* formerly eventsFormattedSelector */
export const eventsForTimelineSelector = createSelector(
  dataSelector,
  timezoneSelector,
  (data, timezone) => {
    const offsetFn = offsetFnSelector(timezone);
    return d3.entries(data).map(event => {
      const start =
        event.value.timestamp_sec ||
        event.value.headers__timestamp ||
        event.value.telemetry__utc_timestamp_sent;
      const end =
        event.value.timestamp_sec ||
        event.value.headers__timestamp ||
        event.value.telemetry__utc_timestamp_sent;
      return {
        id: event.value.id,
        label: '',
        category: event.value.displayName,
        timeRange: [offsetFn(start) * 1000, offsetFn(end + 1) * 1000],
      };
    });
  }
);

export const serverIDSelector = state => {
  const event = state.data.find(
    e =>
      e.displayName === EVENT_TYPE_MAP.LOBBY_FORMED_PLAYER_LEVEL &&
      e.is_listen_server === 0 &&
      e.obtained_dedi_dc !== undefined
  );
  return event ? event.lobby_host_user_id : null;
};
