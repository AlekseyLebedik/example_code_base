import { createSelector } from 'reselect';
import { offsetFn as offsetFnSelector } from 'dw/core/helpers/date-time';
import {
  LOBBY_FORMED_PLAYER_LEVEL,
  SEARCH_EVENTS,
  LOBBY_EVENTS,
} from './constants';

const eventGroupsRawSelector = state => state.eventGroups;
const timezoneSelector = state => state.timezone;

export const eventGroupsSelector = createSelector(
  eventGroupsRawSelector,
  timezoneSelector,
  (eventGroups, timezone) => {
    const offsetFn = offsetFnSelector(timezone);
    return eventGroups
      .map(event => {
        const [start, end] = event.timeRange;
        if (event.id !== 'None') {
          return {
            ...event,
            timeRange: [offsetFn(start) * 1000, offsetFn(end) * 1000],
          };
        }
        return undefined;
      })
      .filter(Boolean);
  }
);

export const serverIDSelector = eventList => {
  const event = eventList.find(
    e =>
      e.type === LOBBY_FORMED_PLAYER_LEVEL &&
      e.is_listen_server === 0 &&
      e.obtained_dedi_dc !== undefined
  );
  return event ? event.lobby_host_user_id : null;
};

export const eventBucketDistributionSelector = createSelector(
  logs => logs,
  rawLogs => {
    const logs = [];
    rawLogs.forEach(event => {
      if (event.bucket !== undefined) {
        logs.push(event);
      } else {
        if (SEARCH_EVENTS.includes(event.type) || event.matchmaking_id) {
          logs.push({
            ...event,
            bucket: 'search',
          });
        }
        if (LOBBY_EVENTS.includes(event.type) || event.lobby_id) {
          logs.push({
            ...event,
            bucket: 'lobby',
          });
        }
      }
    });
    return logs;
  }
);

export const initialValuesSelector = (_, props) => props.values;
