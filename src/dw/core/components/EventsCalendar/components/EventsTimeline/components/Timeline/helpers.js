import { timestampToMoment } from 'dw/core/helpers/date-time';
import { ENV_GROUPS, HEADER_TIME_FORMATS, STATUS_GROUPS } from './constants';

// returns list of formatted events for timeline chart
export const formatTimelineItems = (events, userTimezone, groupKey) => {
  const formattedEvents = [];
  events.forEach(event => {
    const newEvent = {
      ...event,
      group: event[groupKey],
      start_time:
        event.type === 'abTesting'
          ? timestampToMoment(event.catchStart, userTimezone)
          : timestampToMoment(event.publish_at, userTimezone),
      end_time:
        event.type === 'abTesting'
          ? timestampToMoment(event.catchEnd, userTimezone)
          : timestampToMoment(event.end_at, userTimezone) ||
            timestampToMoment(event.publish_at, userTimezone)?.add(1, 'hour'),
    };
    if (newEvent.repeat_event_settings) {
      newEvent.origId = newEvent.id;
      newEvent.id = `${newEvent.id}-${newEvent.end_time.valueOf()}`;
    }
    formattedEvents.push(newEvent);
  });
  return formattedEvents;
};

// helper method to return the correct list format
const timelineGroupFormatter = groups =>
  Object.entries(groups).map(([id, title]) => ({ id, title, key: id }));

// return group options for selected group key
export const getTimelineGroups = (key, eventGroups, eventsCalendarSettings) => {
  if (key === 'type') {
    const selectedGroups = Object.entries(
      eventsCalendarSettings.filters.sources
    )
      .filter(([, value]) => Object.values(value).some(v => v))
      .map(([k]) => k);
    const filteredGroups = Object.values(eventGroups)
      .filter(g => selectedGroups.includes(g.type))
      .reduce((acc, g) => ({ ...acc, ...g.eventTypes }), {});
    const sourceGroups = Object.entries(filteredGroups).reduce(
      (acc, [k, value]) => ({ ...acc, [k]: value.name }),
      {}
    );
    return timelineGroupFormatter(sourceGroups);
  }
  if (key === 'env_type') {
    return timelineGroupFormatter(ENV_GROUPS);
  }
  return timelineGroupFormatter(STATUS_GROUPS);
};

// return formatted date type string for timeline subheader
export const formatTimelineHeader = (timestamp, unit, width, userTimezone) => {
  let labelWidth = 'short';
  if (width > 100) labelWidth = 'long';
  else if (width > 50) labelWidth = 'medium';
  return timestampToMoment(timestamp, userTimezone).format(
    HEADER_TIME_FORMATS[unit][labelWidth]
  );
};

// styling applied to event group while source filter group in selected
export const getRowClass = (eventGroups, groupKey, source) => {
  if (groupKey === 'type') {
    const { classes: groupClasses } = eventGroups.find(
      group => group.type === source
    );
    return groupClasses[`${source}-timeline-group`];
  }
  return null;
};

// styles applied to individual events for background color
export const getEventColorClass = (eventGroups, groupKey, source, status) => {
  const { classes: groupClasses } = eventGroups.find(
    group => group.type === source
  );
  if (groupKey === 'type') {
    return groupClasses[`${source}-${status}`];
  }
  return groupClasses[`${source}-${source}`];
};
