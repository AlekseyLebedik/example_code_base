import { createSelector } from 'reselect';
import moment from 'moment';

export const makeEventsSelector = createSelector(
  state => state.Scenes.TitleEnvStats,
  events => eventType =>
    (events[eventType] || []).map(event => ({
      ...event,
      x: moment(event.start_time).valueOf(),
    }))
);
