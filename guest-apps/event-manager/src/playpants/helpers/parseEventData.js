import flatMap from 'lodash/flatMap';
import uniqWith from 'lodash/uniqWith';
import {
  determineTestStatus,
  testEndSelector,
  testStartSelector,
} from 'dw/abtesting-utils';
import { checkFormatDateTime } from 'playpants/helpers/dateTime';
import { LEGACY_HOST } from 'dw/config';

export const parseEventData = event => ({
  ...event,
  activities: event.activities.map(obj => ({
    ...obj,
    activity: JSON.parse(obj.activity),
  })),
  auto_tags: event.auto_tags.length && JSON.parse(event.auto_tags),
  manual_tags: JSON.parse(event.manual_tags),
  platforms: JSON.parse(event.platforms),
});

export const parseEventListData = event => ({
  ...event,
  auto_tags: event.auto_tags.length && JSON.parse(event.auto_tags),
  manual_tags: JSON.parse(event.manual_tags),
  platforms: JSON.parse(event.platforms),
});

const formatExternalEvent = (key, event) => ({
  ...event,
  event_type: key,
  allDay: true,
  publish_at: checkFormatDateTime(event.start_at),
  end_at: checkFormatDateTime(event.end_at),
});

export const parseExternalEvents = eventGroups =>
  flatMap(
    Object.entries(eventGroups).map(([key, value]) =>
      value.data.results.map(event => formatExternalEvent(key, event))
    )
  );

export const parseABTests = tests =>
  flatMap(tests.map(test => test.data.data)).map(test => {
    const start = testStartSelector(test);
    const end = testEndSelector(test);
    const newStatus = determineTestStatus(test, start, end);
    return {
      ...test,
      id: test.testID,
      name: test.name,
      source: test.cohorts.map(cohorts => cohorts.source.type),
      status: newStatus,
      testPeriodFrom: test.catchStart,
      testPeriodTo: test.catchEnd,
      testPeriodStart: start,
      testPeriodEnd: end,
    };
  });

export const parseExpyTests = tests => tests?.data?.data;

const createEndpoint = (event, type) => {
  const TYPE_ENDPOINT_MAP = {
    criticalEvents: 'criticalevent',
    maintenance: 'maintenance',
    generalComments: 'generalcomment',
    incidents: 'incident',
  };
  return `${LEGACY_HOST}/admin/events/${TYPE_ENDPOINT_MAP[type]}/${event.id}/change/`;
};

const formatDemonwareEvent = (key, event, endpoint, project = {}) => ({
  ...event,
  endpoint,
  event_type: key,
  env_type: project.env || 'Unknown',
  title_id: project.titleId,
  title: event.name || event.subject,
  publish_at: checkFormatDateTime(event.start_time || event.startTime),
  end_at: checkFormatDateTime(event.end_time || event.endTime),
});

const comparator = (arrVal, othVal) =>
  arrVal.event_type === othVal.event_type &&
  arrVal.id === othVal.id &&
  arrVal.env_type === othVal.env_type;

export const parseDemonwareEvents = eventGroups =>
  uniqWith(
    flatMap(
      Object.entries(eventGroups).map(([key, value]) => {
        if (key === 'generalComments' || key === 'incidents') {
          return flatMap(
            value.map(title =>
              title.data[key].map(event =>
                formatDemonwareEvent(
                  key,
                  event,
                  createEndpoint(event, key),
                  title.data.project
                )
              )
            )
          );
        }
        return value.data.data.map(event =>
          formatDemonwareEvent(key, event, createEndpoint(event, key))
        );
      })
    ),
    comparator
  );
