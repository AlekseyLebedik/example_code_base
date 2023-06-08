import isEmpty from 'lodash/isEmpty';
import lowerCase from 'lodash/lowerCase';
import sortBy from 'lodash/sortBy';
import {
  datePlusOffsetToTimestamp,
  datesAreSameDay,
  dateToUTCTimestamp,
  roundUpDateHour,
  timestampToLocalDate,
  timestampToMoment,
} from 'playpants/helpers/dateTime';
import {
  getStartEndRange,
  tagFiltersHelpers,
  eventHasPlatform,
  eventHasStatus,
  eventHasEnvType,
} from 'dw/core/components/EventsCalendar/helpers';

import getPublishAtRange from 'playpants/helpers/getPublishAtRange';
import { PROJECT_ENVIRONMENTS } from 'playpants/scenes/ProjectSettings/constants';
import {
  EM_EVENT_TYPES,
  EXPY_STATUS_TRANSLATION,
  SOURCES_EVENT_TYPES,
} from './constants';

// Event Manager Helpers

/**
 * Gets the number of matching tags between a tag filter set
 * and the tags of an event
 * @param {*} tags
 * @param {*} filterTags
 */
const getNumberOfTagMatches = (tags, filterTags) =>
  tags.filter(tag =>
    filterTags.find(filterTag => lowerCase(filterTag) === lowerCase(tag))
  ).length;

/**
 * This helper will search through the list of custom tag sets and
 * return the index of the first one that both has the highest
 * number of matching tags and is checked in the custom filter tab,
 * and it will also return whether or not the event has a tag set
 * at all, checked or unchecked
 * @param {*} customFilterData
 * @param {*} event
 */
export const getBestMatchFilterIndex = (customFilterData, event) => {
  let tagIdx = -1;
  let tagsFound = 0;
  let hasTagSet = false;
  Object.entries(customFilterData).forEach(([idx, tags]) => {
    let numberOfTags = 0;
    if (event.auto_tags && event.manual_tags) {
      numberOfTags = getNumberOfTagMatches(
        [...event.auto_tags, ...event.manual_tags],
        tags.tags
      );
    } else {
      numberOfTags = getNumberOfTagMatches(
        [event.context, event.status, ...event.name.split(' ')],
        tags.tags
      );
    }
    if (numberOfTags === tags.tags.length) {
      hasTagSet = true;
    }
    if (
      numberOfTags > tagsFound &&
      numberOfTags >= tags.tags.length &&
      customFilterData[idx].checked
    ) {
      tagIdx = idx;
      tagsFound = numberOfTags;
    }
  });

  return [tagIdx, hasTagSet];
};

/**
 * Gets the name, children, and selectedByDefault for a
 * source checkbox
 * @param {*} statuses
 */
export const getEventStatusSettings = statuses =>
  Object.entries(statuses).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: {
        name: value.name,
        children: null,
        selectedByDefault: true,
      },
    }),
    {}
  );

/**
 * Format the end date for events without an end date
 * @param {*} startDateTime
 * @param {*} timezone
 */
const formatEndDate = (startDateTime, timezone) => {
  // Check for Demonware events without start dates
  if (!startDateTime) return null;
  return timestampToMoment(startDateTime, timezone).isBefore(
    timestampToMoment(startDateTime, timezone).set({
      hour: '23',
      minute: '00',
      second: '00',
    })
  )
    ? timestampToMoment(startDateTime, timezone).add(1, 'hours').toDate()
    : timestampToMoment(startDateTime, timezone)
        .set({
          hour: '23',
          minute: '59',
          second: '00',
        })
        .toDate();
};

/**
 * Makes events compatible with EventsCalendar/react-big-calendar by
 * giving them start, end, allDay, and type properties
 * @param {*} events
 * @param {*} timezone
 * @param {*} type
 */
const formatEvents = (events, timezone, type) => {
  const newEvents = events.map(event => {
    const start = event.publish_at
      ? timestampToLocalDate(event.publish_at)
      : null;
    const end = event.end_at
      ? timestampToLocalDate(event.end_at)
      : formatEndDate(event.publish_at, timezone);
    const formattedEvent = {
      ...event,
      start,
      end,
      allDay: end && !datesAreSameDay(start, end, timezone),
      type,
    };
    return formattedEvent;
  });
  return newEvents;
};

/**
 * Determines if an event has a tag set or not, if it doesn't
 * have a tag set, then it shows event or not based on whether
 * unspecified is checked or not
 * @param {*} event
 * @param {*} tagSets
 */
export const eventHasTagSet = (event, tagSets) => {
  if (tagSets?.userTags) {
    const [tagIdx, hasTagSet] = getBestMatchFilterIndex(
      tagSets.userTags,
      event
    );
    if (tagIdx > -1) {
      return tagSets.userTags[tagIdx].checked;
    }
    if (hasTagSet) {
      return false;
    }
  }
  return tagSets?.unspecified;
};

/**
 * Check if an event has a project id or not
 * @param {*} event
 * @param {*} projectFilters
 * @param {*} projects
 */
const eventHasProjectId = (event, projectFilters, projects) => {
  const project = event.project || 'null';
  const { name } = projects.find(p => p.projectId === project) || {};
  return projectFilters[name];
};

/**
 * Check if an event has Group story, Schedule story, or
 * no story
 * @param {*} event
 * @param {*} storyFilters
 */
const eventHasStory = (event, storyFilters) => {
  if (event.story) {
    if (event.is_schedule) return storyFilters.Timewarp;
    return storyFilters.Group;
  }
  return storyFilters.None;
};

/**
 * Sorts events by publish_at
 * @param {*} events
 * @param {*} timezone
 * @param {*} type
 */
export const getSortedEvents = (events, timezone, type) =>
  sortBy(formatEvents(events, timezone, type), event => event.publish_at);

/**
 * Filters list of events by tags, platforms, environment,
 * projects, and status
 * @param {*} events
 * @param {*} filterData
 * @param {*} projects
 * @param {*} checkStatus
 */
export const filterCalendarSelections = (
  events,
  filterData,
  projects,
  checkStatus = true
) =>
  events.filter(
    event =>
      eventHasTagSet(event, filterData.customTags) &&
      eventHasPlatform(event, filterData.platforms) &&
      eventHasEnvType(event, filterData.environments) &&
      eventHasProjectId(event, filterData.projects, projects) &&
      eventHasStory(event, filterData.stories) &&
      (checkStatus ? eventHasStatus(event, filterData.sources) : true)
  );

/**
 * Filter events and return them sorted
 * @param {*} events
 * @param {*} type
 * @param {*} timezone
 * @param {*} filterData
 * @param {*} projects
 */
export const filterEvents = (events, type, timezone, filterData, projects) => {
  const newEvents = filterCalendarSelections(events, filterData, projects);
  return getSortedEvents(newEvents, timezone, type);
};

// Informational Events

/**
 * Filter list of informational events
 * @param {*} events
 * @param {*} type
 * @param {*} timezone
 * @param {*} filterData
 * @param {*} projects
 */
export const filterInformationalEvents = (
  events,
  type,
  timezone,
  filterData,
  projects
) => {
  let newEvents = [];
  const informationalEvents =
    filterData.sources?.informationalEvents || filterData.informationalEvents;
  if (!informationalEvents) return newEvents;
  newEvents = events.filter(e => informationalEvents[e.event_type]);
  newEvents = filterCalendarSelections(newEvents, filterData, projects, false);
  return getSortedEvents(newEvents, timezone, type);
};

// Demonware Events

/**
 * Filter list of demonware events
 * @param {*} events
 * @param {*} type
 * @param {*} timezone
 * @param {*} filterData
 */
export const filterDemonwareEvents = (events, type, timezone, filterData) => {
  let newEvents = [];
  if (!isEmpty(filterData.sources)) {
    const { demonwareEvents = {} } = filterData.sources;
    newEvents = events.filter(e => demonwareEvents[e.event_type]);
  }
  return getSortedEvents(newEvents, timezone, type);
};

// External Events

/**
 * Filter list of external events
 * @param {*} events
 * @param {*} type
 * @param {*} timezone
 * @param {*} filterData
 */
export const filterExternalEvents = (events, type, timezone, filterData) => {
  let newEvents = [];
  const externalEvents = filterData.sources?.externalEvents;
  if (!externalEvents) return newEvents;
  newEvents = events.filter(
    e =>
      // Holidays: filter if any tag exists whose tag value evaluates true in externalEvents['holidays'][t.value]
      // PMG: filter if (any tag exists whose tag value evaluates true in externalEvents['pmg'][t.value]) or if (no Title tag and 'Other' selected)
      (e.event_type === 'holidays' &&
        e.tags.some(t => externalEvents.holidays[t.value])) ||
      (e.event_type === 'pmg' &&
        (e.tags.some(t => externalEvents.pmg && externalEvents.pmg[t.value]) ||
          (e.tags.filter(t => t.tag_type === 'Title').length === 0 &&
            externalEvents.pmg?.Other)))
  );
  return getSortedEvents(newEvents, timezone, type);
};

// A/B Test Helpers

/**
 * Filters A/B Tests by tag sets, status, environments, and project id.
 * Filters out tests when platforms.Unspecified isn't checked.
 * Also makes A/B Tests compatible with calendar by adding title,
 * start, end, allDay, and type properties
 * @param {*} tests
 * @param {*} type
 * @param {*} timezone
 * @param {*} filterData
 * @param {*} projects
 */
export const filterTests = (tests, type, timezone, filterData, projects) => {
  const filteredTests = tests
    .filter(
      test =>
        eventHasTagSet(test, filterData.customTags) &&
        filterData.platforms.Unspecified &&
        filterData.sources.abTesting &&
        test.status !== 'killed' &&
        filterData.sources.abTesting[test.status] &&
        filterData.stories.None &&
        filterData.environments[PROJECT_ENVIRONMENTS[test.environment]] &&
        eventHasProjectId(
          { project: test.projectID },
          filterData.projects,
          projects
        )
    )
    .map(test => ({
      ...test,
      title: test.name,
      start: timestampToLocalDate(test.testPeriodStart),
      end: timestampToLocalDate(test.testPeriodEnd),
      allDay: test.end && !datesAreSameDay(test.start, test.end, timezone),
      type,
    }));

  return sortBy(filteredTests, test => Number(test.catchStart));
};

/**
 * Filter expy tests
 * @param {*} tests
 * @param {*} type
 * @param {*} timezone
 * @param {*} filterData
 * @returns
 */
export const filterExpyTests = (tests, type, timezone, filterData) =>
  tests
    .filter(
      test =>
        Object.keys(EXPY_STATUS_TRANSLATION).includes(test.status) &&
        filterData.sources.expyTests &&
        filterData.sources.expyTests[EXPY_STATUS_TRANSLATION[test.status]]
    )
    .map(expyTest => ({
      ...expyTest,
      allDay: false,
      detailsTitle: expyTest.title,
      title: expyTest.name,
      type: 'expyTests',
    }));

// Events/Tests Styles

/**
 * Determines the class to add to the event when styled by
 * tag filters
 * @param {*} event
 * @param {*} filterData
 */
export const addCustomTagsClass = (event, filterData) => {
  const [customTagsIdx] = getBestMatchFilterIndex(
    filterData.customTags.userTags,
    event
  );

  if (customTagsIdx > -1) {
    return `customTags${customTagsIdx}-event`;
  }
  return 'noCustomTags-event';
};

/**
 * Determines class to add by whether style is set by env type, platform,
 * project, source, or tag filters, and by event properties.
 * @param {*} event
 * @param {*} showAllColors
 * @param {*} filterData
 * @param {*} selectedStyle
 * @param {*} projects
 * @param {*} customClass
 */
export const customEventStyles = (
  event,
  showAllColors,
  filterData,
  selectedStyle,
  projects,
  customClass
) => {
  let newClass;
  switch (selectedStyle) {
    case 'environments': {
      if (event.type === 'abTesting')
        newClass = `filters-environments-${event.environment}-event`;
      else
        newClass = `filters-environments-${
          EM_EVENT_TYPES[event.env_type]
        }-event`;
      break;
    }
    case 'platforms': {
      if (event.platforms && event.platforms.length === 1)
        newClass = `filters-platforms-${event.platforms[0]}-event`;
      else if (event.platforms && event.platforms.length > 1)
        newClass = `filters-platforms-Multiple-event`;
      else newClass = `filters-platforms-Unspecified-event`;
      break;
    }
    case 'projects': {
      const colorIdx = sortBy(projects, p => p.name).findIndex(p =>
        event.type === 'abTesting'
          ? String(event.projectID) === String(p.projectId)
          : String(event.project) === String(p.projectId)
      );
      newClass =
        colorIdx > -1
          ? `filters-projects-${colorIdx}-event`
          : 'noCustomTags-event';
      break;
    }
    case 'sources': {
      newClass = `${event.type}-${
        showAllColors ? customClass || event.status : event.type
      }`;
      break;
    }
    case 'stories': {
      let storyType = 'None';
      if (event.story && event.is_schedule) storyType = 'Timewarp';
      else if (event.story && !event.is_schedule) storyType = 'Group';
      newClass = `filters-stories-${storyType}-event`;
      break;
    }
    case 'tagFilters': {
      newClass = addCustomTagsClass(event, filterData);
      break;
    }
    default:
      newClass = 'noCustomTags-event';
  }
  return newClass;
};

/**
 * Determines class to add by whether style is set by env type, platform,
 * project, source, or tag filters, and by event properties.
 * @param {*} event
 * @param {*} showAllColors
 * @param {*} filterData
 * @param {*} selectedStyle
 * @param {*} projects
 * @param {*} customClass
 */
export const customEventStylesEventsFilter = (
  event,
  showAllColors,
  filterData,
  selectedStyle,
  projects,
  customClass
) => {
  if (selectedStyle === 'environments') {
    return event.type === 'abTesting'
      ? `filters-environments-${event.environment}-event`
      : `filters-environments-${EM_EVENT_TYPES[event.env_type]}-event`;
  }
  if (selectedStyle === 'platforms') {
    if (event.platforms && event.platforms.length === 1) {
      return `filters-platforms-${event.platforms[0]}-event`;
    }
    if (event.platforms && event.platforms.length > 1) {
      return `filters-platforms-Multiple-event`;
    }
    return `filters-platforms-Unspecified-event`;
  }
  if (selectedStyle === 'projects') {
    const colorIdx = sortBy(projects, p => p.name).findIndex(p =>
      event.type === 'abTesting'
        ? String(event.projectID) === String(p.projectId)
        : String(event.project) === String(p.projectId)
    );
    return colorIdx > -1
      ? `filters-projects-${colorIdx}-event`
      : 'noCustomTags-event';
  }
  if (
    SOURCES_EVENT_TYPES.includes(selectedStyle) &&
    selectedStyle === event.type
  ) {
    return `${event.type}-${customClass || event.status}`;
  }
  return 'noCustomTags-event';
};

// Reducer Helpers

/**
 * Set the start date for new event
 * @param {*} param0
 * @param {*} offset
 * @param {*} view
 * @param {*} timezone
 */
export const setStartDate = ({ start }, offset, view, timezone) =>
  view !== 'month'
    ? datePlusOffsetToTimestamp(start, offset)
    : dateToUTCTimestamp(
        roundUpDateHour(timestampToMoment(start, timezone), timezone)
      );

/**
 * Sets the end date for a new event
 * @param {*} param0
 * @param {*} offset
 * @param {*} view
 * @param {*} timezone
 */
export const setEndDate = ({ action, start, end }, offset, view, timezone) => {
  if (action === 'select') {
    return datePlusOffsetToTimestamp(end, offset);
  }
  if (view !== 'month') {
    return timestampToMoment(datePlusOffsetToTimestamp(start, offset), timezone)
      .add(3, 'days')
      .unix();
  }
  const nowHourRoundedUp = roundUpDateHour(
    timestampToMoment(start, timezone),
    timezone
  );
  return timestampToMoment(nowHourRoundedUp, timezone).add(3, 'days').unix();
};

// Export helpers
const getParamListString = obj =>
  Object.entries(obj)
    .filter(([, checked]) => checked)
    .map(([key]) => key)
    .toString() || null;

const convertProjectNamesListToIds = (projectNames, projects) =>
  projectNames
    .split(',')
    .map(name => {
      const { projectId } = projects.find(p => p.name === name) || {};
      return projectId;
    })
    .toString();

/**
 * Formats export parameters for exporting events
 * @param {*} param0
 */
export const formatExportParams = ({
  affiliatedProjects,
  eventsCalendarSettings: {
    filters: { environments, sources, projects, platforms },
    numberOfDays,
    selectedDay,
  },
  story = {},
}) => {
  const [startRange, endRange] = getStartEndRange(selectedDay, numberOfDays);
  const projectNames = getParamListString(projects);
  return {
    project__in: convertProjectNamesListToIds(projectNames, affiliatedProjects),
    publish_at__range: getPublishAtRange({ startRange, endRange }),
    env_type__in: getParamListString({
      ...environments,
      Unknown: environments['Cross Environment'],
    }),
    status__in: getParamListString(sources.eventManager),
    platforms__in: getParamListString(platforms),
    event_type__in: getParamListString({
      ...sources.informationalEvents,
      'event-manager': Object.values(sources.eventManager).some(v => v),
    }),
    export: 'csv',
    story: story.id,
  };
};

// Tag Helpers

/**
 * Determine if there are duplicate tags or not
 * @param {*} existingTags
 * @param {*} newTags
 */
const findDuplicateTags = (existingTags, newTags) =>
  existingTags.filter(existingTag =>
    newTags.find(newTag => newTag.toLowerCase() === existingTag.toLowerCase())
  );

/**
 * Validates tag list.  Makes sure there are not duplicates and that
 * tags are at least 2 characters
 * @param {*} existingTags
 * @param {*} tagText
 */
export const validateTag = (existingTags, tagText) => {
  const duplicateTags = findDuplicateTags(
    existingTags,
    tagFiltersHelpers.extractTags(tagText)
  );
  if (tagText.length === 1) {
    return 'Tags must be at least 2 characters!';
  }
  if (duplicateTags.length) {
    return `Tag(s) already exist: ${duplicateTags.join(', ')}`;
  }

  return null;
};

/**
 * Updates list of header groups by updating the timewarp settings
 * for a particular group
 * @param {*} groups
 * @param {*} timewarpSettings
 */
export const updateGroupListTimewarpSettings = (groups, timewarpSettings) =>
  groups.map(group =>
    group.timewarp_settings.id === timewarpSettings.id
      ? {
          ...group,
          timewarp_settings: timewarpSettings,
        }
      : group
  );
