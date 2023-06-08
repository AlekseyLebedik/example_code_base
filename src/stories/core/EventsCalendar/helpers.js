import { createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import lowerCase from 'lodash/lowerCase';
import sortBy from 'lodash/sortBy';

import { applyMiddleware } from 'dw/core/helpers/store';
import { middleware as criticalErrorMiddleware } from 'dw/core/components/CriticalError/middleware';

import {
  datesAreSameDay,
  timestampToLocalDate,
  timestampToMoment,
} from 'dw/core/helpers/date-time';

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
 * Determines the class to add to the event when styled by
 * tag filters
 * @param {*} event
 * @param {*} filterData
 */
export const addCustomTagsClass = (event, filterData) => {
  const [customTagsIdx] = getBestMatchFilterIndex(
    filterData.custom.userTags,
    event
  );

  if (customTagsIdx > -1) {
    return `customTags${customTagsIdx}-event`;
  }
  return 'noCustomTags-event';
};

/**
 * Determines if an event has a tag set or not, if it doesn't
 * have a tag set, then it shows event or not based on whether
 * unspecified is checked or not
 * @param {*} event
 * @param {*} tagSets
 */
export const eventHasTagSet = (event, tagSets) => {
  const [tagIdx, hasTagSet] = getBestMatchFilterIndex(tagSets.userTags, event);
  if (tagIdx > -1) {
    return tagSets.userTags[tagIdx].checked;
  }
  if (hasTagSet) {
    return false;
  }
  return tagSets.unspecified;
};

/**
 * Indicated if event has platform(s) or not
 * @param {*} event
 * @param {*} platformFilters
 */
const eventHasPlatform = (event, platformFilters) => {
  if (event.platforms.length === 1) {
    return platformFilters[event.platforms[0]];
  }
  if (event.platforms.length > 1) {
    return (
      event.platforms.filter(platform => platformFilters[platform]).length > 0
    );
  }
  return platformFilters.Unspecified;
};

/**
 * Check if an event has a particular source status or not
 * @param {*} event
 * @param {*} filters
 */
const eventHasStatus = (event, filters) => filters.eventManager[event.status];

/**
 * Check if an event has an environment or not
 * @param {*} param0
 * @param {*} envFilters
 */
const eventHasEnvType = ({ env_type: env }, envFilters) => {
  if (env === 'Unknown') return envFilters['Cross Environment'];
  return envFilters[env];
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
      (checkStatus ? eventHasStatus(event, filterData.sources) : true)
  );

/**
 * Format the end date for events without an end date
 * @param {*} startDateTime
 * @param {*} timezone
 */
const formatEndDate = (startDateTime, timezone) =>
  timestampToMoment(startDateTime, timezone).isBefore(
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

/**
 * Makes events compatible with EventsCalendar/react-big-calendar by
 * giving them start, end, allDay, and type properties
 * @param {*} events
 * @param {*} timezone
 * @param {*} type
 */
const formatEvents = (events, timezone, type) =>
  events.map(event => ({
    ...event,
    start: timestampToLocalDate(event.publish_at),
    end: event.end_at
      ? timestampToLocalDate(event.end_at)
      : formatEndDate(event.publish_at, timezone),
    allDay:
      event.allDay ||
      (event.end && !datesAreSameDay(event.start, event.end, timezone)),
    type,
  }));

/**
 * Sorts events by publish_at
 * @param {*} events
 * @param {*} timezone
 * @param {*} type
 */
export const getSortedEvents = (events, timezone, type) =>
  sortBy(formatEvents(events, timezone, type), event => event.publish_at);

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = _createStore(
    applyMiddleware('playpants', [
      criticalErrorMiddleware,
      thunk,
      sagaMiddleware,
    ])
  );

  return { sagaMiddleware, store };
}
