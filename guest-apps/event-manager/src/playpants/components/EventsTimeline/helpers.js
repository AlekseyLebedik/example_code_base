import cloneDeep from 'lodash/cloneDeep';
import compact from 'lodash/compact';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import {
  dateToDefaultTimestamp,
  timestampToMoment,
} from 'dw/core/helpers/date-time';
import { envSelector } from 'dw/core/components/EventsCalendar/helpers';
import {
  PLATFORM_FILTERS,
  ENV_TYPE_FILTERS,
  DEMONWARE_EVENTS,
  CALENDAR_SETTINGS_SCHEMA,
} from 'dw/core/components/EventsCalendar/constants';
import { getSortedItems } from 'playpants/components/EventFilters/components/EventFilterGroup/helpers';

import { headerFormats } from './constants';

export const makeGroupKeyCallback = (e, groupBy) => {
  switch (groupBy) {
    case 'nogroup':
      return 'nogroup';
    case 'projects':
      return e.project || e.projectID;
    case 'platforms': {
      const platforms = cloneDeep(e.platforms) || [];
      if (e.platform && !platforms.includes(e.platform))
        platforms.push(e.platform);
      if (e.first_parties) {
        e.first_parties.forEach(p => {
          if (!platforms.includes(p.toUpperCase()))
            platforms.push(p.toUpperCase());
        });
      }
      if (platforms.length === 0) return undefined;
      if (platforms.length === 1)
        return platforms[0] !== 'Unspecified' ? platforms[0] : undefined;
      if (!platforms.includes('Multiple')) platforms.push('Multiple');
      return platforms;
    }
    case 'environments':
      return envSelector(e);
    case 'demonwareEvents':
      return DEMONWARE_EVENTS.find(evt => evt.id === e.event_type)
        ? e.event_type
        : undefined;
    case 'abTesting':
      if (e.type === 'expyTests') {
        if (e.status === 'Proposal') return 'proposed';
        if (e.status === 'Ready') return 'approved';
        return undefined;
      }
      return e.type === 'abTesting' ? e.status : undefined;
    case 'externalEvents':
      return e.type === 'externalEvents' ? e.event_type : undefined;
    case 'eventManager':
      return e.type === 'eventManager' ? e.status : undefined;
    default:
      return e.type;
  }
};

// returns list of formatted events for timeline chart
export const formatTimelineItems = (
  events,
  userTimezone,
  groupBy,
  selectedStyle
) => {
  const groupKeyCallback = e => makeGroupKeyCallback(e, groupBy);
  const colorKeyCallback = e => makeGroupKeyCallback(e, selectedStyle);
  const formattedEvents = [];
  events.forEach(event => {
    const startTimestamp = (() => {
      if (event.type === 'abTesting') return event.catchStart;
      if (event.type === 'expyTests')
        return dateToDefaultTimestamp(event.dateStart);
      return event.publish_at || event.start_at;
    })();
    const newEvent = {
      ...event,
      id: `${event.id}-${event.type}-${startTimestamp}-${event.env_type}`,
      origId: event.id,
      start_time: timestampToMoment(startTimestamp, userTimezone),
      end_time: (() => {
        if (event.type === 'abTesting')
          return timestampToMoment(event.catchEnd, userTimezone);
        if (event.type === 'expyTests')
          return timestampToMoment(
            dateToDefaultTimestamp(event.dateEnd),
            userTimezone
          );
        return (
          timestampToMoment(event.end_at, userTimezone) ||
          timestampToMoment(event.publish_at, userTimezone)?.add(1, 'hour')
        );
      })(),
      startTimestamp,
    };
    if (newEvent.repeat_event_settings) {
      newEvent.id = `${newEvent.id}-${newEvent.end_time.valueOf()}`;
    }
    let group = groupKeyCallback(event);
    if (!Array.isArray(group)) group = [group];
    group.forEach(g => {
      let color = groupBy === selectedStyle ? g : colorKeyCallback(newEvent);
      if (Array.isArray(color)) {
        if (selectedStyle === 'platforms') color = 'Multiple';
        else [color] = color;
      }
      const e = { ...newEvent, id: `${newEvent.id}-${g}`, group: g, color };
      formattedEvents.push(e);
    });
  });
  return sortBy(formattedEvents, e => e.startTimestamp);
};

export const getTimelineGroups = (
  groupBy,
  filters,
  affiliatedProjects,
  eventGroups = []
) => {
  if (!filters.sources) return [];
  switch (groupBy) {
    case 'nogroup':
      return [{ id: 'nogroup', title: 'All Events' }];
    case 'projects':
      return affiliatedProjects
        .map(p => ({
          id: p.projectId,
          title: p.name || `Project ${p.projectId}`,
        }))
        .filter(g => filters.projects[g.title])
        .concat([{ id: undefined, title: 'Unspecified' }]);
    case 'platforms':
      return PLATFORM_FILTERS.filter(p => filters.platforms[p]).map(p => ({
        id: p === 'Unspecified' ? undefined : p,
        title: p,
      }));
    case 'environments':
      return getSortedItems(
        Object.entries(ENV_TYPE_FILTERS)
          .filter(([key]) => filters.environments[key])
          .map(([key]) => ({
            id: key,
            title: key,
            name: key,
          })),
        'environments'
      ).concat([{ id: undefined, title: 'Unspecified' }]);
    case 'demonwareEvents':
      return [
        ...DEMONWARE_EVENTS.filter(
          e =>
            !filters.sources.demonwareEvents ||
            filters.sources.demonwareEvents[e.id]
        ),
        { id: undefined, title: 'Other' },
      ];
    case 'externalEvents':
      return [
        { id: 'holidays', title: 'MaxCal Global Events' },
        { id: 'pmg', title: 'PMG Live Ops Schedule' },
      ]
        .filter(
          g =>
            !filters.sources.externalEvents ||
            !filters.sources.externalEvents[g.id] ||
            Object.values(filters.sources.externalEvents[g.id]).some(Boolean)
        )
        .concat([{ id: undefined, title: 'Other' }]);
    case 'abTesting':
      return compact([
        Object.entries(get(filters, 'sources.abTesting') || {}).find(
          ([k, v]) => k !== 'killed' && v
        ) && {
          id: 'DEMONWARE SERVICES',
          name: 'DEMONWARE SERVICES',
          title: 'DEMONWARE SERVICES',
          isSubgroupHeading: true,
        },
        ...CALENDAR_SETTINGS_SCHEMA.properties.filters.properties.sources.properties.abTesting.required
          .filter(
            t =>
              t !== 'killed' &&
              filters?.sources?.abTesting &&
              filters?.sources?.abTesting[t]
          )
          .map(t => ({ id: t, title: t, isSubgroupItem: true })),
        eventGroups.find(group => group.type === 'expyTests') &&
          Object.values(get(filters, 'sources.expyTests') || {}).find(
            expyTest => expyTest
          ) && {
            id: 'EXPY',
            name: 'EXPY',
            title: 'EXPY',
            isSubgroupHeading: true,
          },
        ...(eventGroups.find(group => group.type === 'expyTests')
          ? CALENDAR_SETTINGS_SCHEMA.properties.filters.properties.sources.properties.expyTests.required
              .filter(
                t =>
                  filters?.sources?.expyTests && filters?.sources?.expyTests[t]
              )
              .map(t => ({ id: t, title: t, isSubgroupItem: true }))
          : []),
        { id: undefined, title: 'Other' },
      ]);
    default:
      return [];
  }
};

export const labelFormat = (
  [timeStart],
  unit,
  labelWidth,
  formatOptions = headerFormats
) => {
  let format;
  if (labelWidth >= 150) {
    format = formatOptions[unit].long;
  } else if (labelWidth >= 100) {
    format = formatOptions[unit].mediumLong;
  } else if (labelWidth >= 50) {
    format = formatOptions[unit].medium;
  } else {
    format = formatOptions[unit].short;
  }
  return timeStart.format(format);
};
