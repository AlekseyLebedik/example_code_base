import React from 'react';
import moment from 'moment-timezone';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import Ajv from 'ajv';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import {
  DATE_TIME_FORMATS,
  datesAreSameDay,
  dateToUTCTimestamp,
  timestampToLocalDate,
  formatDateTime,
  getNowTimestamp,
  timestampToMoment,
} from 'dw/core/helpers/date-time';

import * as tagFiltersHelpers from 'dw/core/components/EventsCalendar/components/EventsCalendarSidebar/components/FiltersTable/components/TagFilters/helpers';

import CustomMonth from './components/CustomMonth';
import ConnectedCustomWeek from './components/CustomWeek';

import {
  CALENDAR_SETTINGS_SCHEMA,
  IGNORE_PRESET_KEYS,
  ENV_TYPE_FILTERS,
  HOUR,
} from './constants';

import styles from './index.module.css';

// Select the event group with a given type
export const selectGroup = (eventGroups, type) =>
  eventGroups.find(group => group.type === type) || {};

// For selectedDay and numberOfDays, get a date range to use for fetching events
export const getStartEndRange = (selectedDay, numberOfDays) =>
  numberOfDays < 32
    ? [
        moment(selectedDay).subtract(1, 'month').startOf('month').unix(),
        moment(selectedDay).add(1, 'month').endOf('month').unix(),
      ]
    : [
        moment(selectedDay).subtract(numberOfDays, 'day').unix(),
        moment(selectedDay)
          .add(numberOfDays * 2, 'day')
          .unix(),
      ];

/**
 * Determine if a given checkbox is checked or not
 * @param {{}} value - the specific group type from eventGroups
 * @returns {boolean} whether the checkbox is selected or not
 */
export const isChecked = value =>
  typeof value === 'object'
    ? Object.values(value).some(child => isChecked(child))
    : value;

/**
 * Fetch events for each event source, fetching checked groups only.
 * Passing in selectedDay/numberOfDays will generate a date range to fetch
 * @param {function} onFetchEvents - function to handle fetching events
 * @param {{}} eventGroups - the eventGroups passed to the calendar
 * @param {{}} checkboxes - filters.sources from eventsCalendarSettings
 * @param {{}} [selectedDay] - moment object of selected/start date
 * @param {number} [numberOfDays] - filters.platforms set from getCalendarDefaults()
 */
export const fetchEventGroups = (
  onFetchEvents,
  eventGroups,
  checkboxes,
  selectedDay,
  numberOfDays
) => {
  const [startRange, endRange] = selectedDay
    ? getStartEndRange(selectedDay, numberOfDays)
    : [undefined, undefined];
  const groups = sortBy(
    eventGroups,
    ({ type }) => !isChecked(checkboxes[type])
  ).map(group => group.type);
  onFetchEvents(groups, { startRange, endRange });
};

/**
 * Calculate the offset for a given timezone, the
 * offset from the local timezone, used for displaying
 * events in the appropriate spot in events calendar
 */
export const getLocalTimezoneOffset = userTimezone => {
  const current = moment();
  const localTimezoneOffset = current.utcOffset();
  current.tz(userTimezone);
  const userTimeszoneOffset = current.utcOffset();
  return (localTimezoneOffset - userTimeszoneOffset) * 60;
};

const addOffset = (date, offset) =>
  date ? moment.unix(moment(date).unix() - offset).toDate() : null;

const removeOffset = (date, offset) =>
  date ? moment.unix(moment(date).unix() + offset).toDate() : null;

// Add the offset to the start and end time for each event
export const addLocalTimezoneOffset = (event, offset) => ({
  ...event,
  start: addOffset(event.start, offset),
  end: addOffset(event.end, offset),
});

// Remove the offset to the start and end time for each event
export const removeLocalTimezoneOffset = (event, offset) => ({
  ...event,
  start: removeOffset(event.start, offset),
  end: removeOffset(event.end, offset),
});

/**
 * Calculates start time based on date or time delta provided
 * @param {string} userTimezone - Timezone such as PST
 * @param {number} date - date timestamp for launch and frozen groups
 * @param {number} delta - time delta for offset groups
 * @returns {{}} date object for start time
 */
const calculateGamertagStartTime = (userTimezone, date, delta) =>
  timestampToLocalDate(date, userTimezone) ||
  (delta
    ? moment().tz(userTimezone).add(delta, 'seconds').toDate()
    : moment().tz(userTimezone).toDate());

/**
 * Returns gamertag group with start time calculated
 * Adding the offset to the start time for each group
 * @param {{}} group - Gamertag group
 * @param {string} userTimezone - Timezone such as PST
 * @param {number} offset - Start time offset in minutes
 * @returns {{}} Updated gamertag group
 */
const addGroupLocalTimezoneOffset = (group, userTimezone, offset) => {
  const {
    date_time: date,
    time_delta: delta,
    type,
  } = group.timewarp_settings || {};
  const start = calculateGamertagStartTime(
    userTimezone,
    date,
    type === 'offset' && delta
  );
  return {
    ...group,
    start: moment.unix(moment(start).unix() - offset).toDate(),
  };
};

/**
 * Maps gamertag groups with start field calculated
 * @param {[]} gamertags - list of filtered gamertags to pass to ct-calendar
 * @param {string} userTimezone - Timezone such as PST
 * @param {number} offset - Start time offset in minutes
 * @returns {[]} list of updated gamertag groups
 */
export const getGamertagsStartTime = (gamertags, userTimezone, offset) =>
  gamertags.map(g => addGroupLocalTimezoneOffset(g, userTimezone, offset));

// Remove the offset to the start for each group
export const removeGroupLocalTimezoneOffset = (groupStart, offset) =>
  moment.unix(moment(groupStart).unix() + offset).toDate();

// Select the display name for an event source group
export const getEventGroupName = (groups, event) =>
  selectGroup(groups, event.type).eventTypes[event.type].name;

// Assignes for a checkbox either the child checkboxes or the default value
const assignCheckboxes = (group, children) =>
  Object.entries(children.children || {}).forEach(([childKey, childValue]) => {
    // eslint-disable-next-line no-param-reassign
    group[childKey] = childValue.children ? {} : childValue.selectedByDefault;
    assignCheckboxes(group[childKey], childValue);
  });

/**
 * Creates the object of checkboxes, their children, and their selected status
 * @param {{}} eventGroups - each event group passed in to the calendar
 * @returns {{}} the updated checkbox group
 */
export const createGroupCheckboxes = (sourceCheckboxes = {}, eventGroups) => {
  const checkboxes = { ...sourceCheckboxes };
  eventGroups.forEach(group => {
    if (isEmpty(checkboxes[group.type]))
      Object.entries(group.eventTypes).forEach(([groupKey, groupVal]) => {
        checkboxes[groupKey] = {};
        assignCheckboxes(checkboxes[groupKey], groupVal);
      });
  });
  return checkboxes;
};

/**
 * Initializes filters.platforms when empty with any platforms provided,
 * defaults all platforms checked state to true
 * @param {{}} platformCheckboxes - the current filters.platforms state
 * @param {[]} [platforms] - any platforms passed to calendar from ProjectSettings
 * @returns {{}} the updated checkbox group
 */
export const createPlatformCheckboxes = (platformCheckboxes, platforms) => {
  const updatedPlatformCheckboxes = { ...platformCheckboxes };
  if (isEmpty(platformCheckboxes)) {
    platforms.forEach(platform => {
      updatedPlatformCheckboxes[platform] = true;
    });
    updatedPlatformCheckboxes.Multiple = true;
    updatedPlatformCheckboxes.Unspecified = true;
  }
  return updatedPlatformCheckboxes;
};

/**
 * Initializes filters.projects when empty with any projects provided,
 * defaults all projects checked state to true
 * @param {{}} projectCheckboxes - the current filters.projects state
 * @param {[]} [affiliatedProjects] - any projects passed to calendar from ProjectSettings
 * @returns {{}} the updated checkbox group
 */
export const createProjectCheckboxes = (
  projectCheckboxes,
  affiliatedProjects = []
) => {
  const updatedProjectCheckboxes = { ...projectCheckboxes };
  if (isEmpty(projectCheckboxes)) {
    affiliatedProjects.forEach(project => {
      updatedProjectCheckboxes[
        project.name || `Project ${project.projectId}`
      ] = true;
    });
  }
  return updatedProjectCheckboxes;
};

/**
 * Initializes filters.Gamertags when empty with any gamertag groups provided,
 * defaults all groups checked state to true
 * @param {{}} gamertagCheckboxes - the current filters.Gamertags state
 * @param {[]} [gamertagGroups] - any groups passed to calendar from ProjectSettings
 * @returns {{}} the updated checkbox group
 */
export const createGamertagCheckboxes = gamertagGroups =>
  (gamertagGroups &&
    gamertagGroups.reduce(
      (acc, { active, name }) => ({ ...acc, [name]: active }),
      {}
    )) ||
  {};

export const createStoriesCheckboxes = (storiesCheckboxes, disabledFilters) =>
  disabledFilters && disabledFilters.stories
    ? { Group: true, Timewarp: true, None: true }
    : storiesCheckboxes;

export const setCalendarFilters = (
  filters,
  eventGroups,
  affiliatedProjects,
  platforms,
  gamertagGroups,
  disabledFilters
) => ({
  customTags: filters.customTags,
  environments: filters.environments || {},
  gamertags: gamertagGroups && createGamertagCheckboxes(gamertagGroups),
  platforms: createPlatformCheckboxes(filters.platforms, platforms),
  projects: createProjectCheckboxes(filters.projects, affiliatedProjects),
  sources: createGroupCheckboxes(filters.sources, eventGroups),
  stories: createStoriesCheckboxes(filters.stories, disabledFilters),
});
// Determine if a date is in the selected range for the date picker
export const dateInPickedRange = (date, datePickerInfo, timezone) =>
  datePickerInfo &&
  datePickerInfo.startDate &&
  datePickerInfo.startDate <= dateToUTCTimestamp(date, timezone) &&
  datePickerInfo.endDate &&
  datePickerInfo.endDate >= dateToUTCTimestamp(date, timezone);

// Determine if the date has been selected or hovered over in the date picker
export const dateIsSelected = (date, datePickerInfo, timezone) =>
  datePickerInfo &&
  ((datePickerInfo.startDate &&
    datesAreSameDay(date, datePickerInfo.startDate, timezone)) ||
    (datePickerInfo.endDate &&
      datesAreSameDay(date, datePickerInfo.endDate, timezone)) ||
    (datePickerInfo.hoverDate &&
      datesAreSameDay(date, datePickerInfo.hoverDate, timezone)));

// If start or end is selected, find if date is between selected and hover dates
export const dateInHoverRange = (date, datePickerInfo, timezone) => {
  if (datePickerInfo) {
    const { endDate, hoverDate, startDate } = datePickerInfo;
    const dateTimestamp = dateToUTCTimestamp(date, timezone);
    const hoverTimestamp = dateToUTCTimestamp(hoverDate, timezone);

    // If either the start or the end is defined
    if (!!startDate ^ !!endDate) {
      const definedDate = startDate || endDate;
      return (
        (dateTimestamp >= definedDate && dateTimestamp <= hoverTimestamp) ||
        (dateTimestamp <= definedDate && dateTimestamp >= hoverTimestamp)
      );
    }

    return moment(date)
      .tz(timezone)
      .isSame(moment(hoverDate).tz(timezone), 'day');
  }

  return false;
};

// When start and end are selected, the hovered over date can be clicked to reset the picker
export const isResetHover = (date, datePickerInfo, timezone) =>
  datePickerInfo &&
  datePickerInfo.startDate &&
  datePickerInfo.endDate &&
  datePickerInfo.hoverDate &&
  datesAreSameDay(date, datePickerInfo.hoverDate, timezone);

// For the given views, return an object with those views and their appropriate components
export const setViewComponents = availableViews =>
  availableViews.reduce(
    (viewComponents, view) => ({
      ...viewComponents,
      [view]: view === 'month' ? CustomMonth : ConnectedCustomWeek,
    }),
    {}
  );

// Shows the correct date format for the date picker
const datePickerErrorMsg = `Incorrect Date Format (Must be ${DATE_TIME_FORMATS.DEFAULT_DATE_LONG})!`;

// Sets the new date if valid, or an error if date is in invalid format
export const changeDateValue = (
  value,
  setDate,
  setDateValue,
  setDateValueError
) => {
  const isValidDate = moment(
    value,
    DATE_TIME_FORMATS.DEFAULT_DATE_LONG,
    true
  ).isValid();
  if (isValidDate) {
    setDate(moment(value, DATE_TIME_FORMATS.DEFAULT_DATE_LONG).unix());
    setDateValue(value);
    setDateValueError(null);
  } else {
    setDateValue(value);
    setDateValueError(datePickerErrorMsg);
  }
};

// Shows the icon for clearing a selected date picker date
export const renderDatePickerClearDate = (value, setDate) =>
  value !== 'N/A' && (
    <InputAdornment position="end">
      <IconButton onClick={() => setDate(null)}>
        <Icon fontSize="small">clear</Icon>
      </IconButton>
    </InputAdornment>
  );

// Checks if one of the custom tag sets is selected
export const customFiltersSelected = userTags =>
  !isEmpty(userTags) &&
  !!Object.values(userTags).find(userTag => userTag.checked === true);

/**
 * Filters out unneeded keys from URL path generation
 * keys in IGNORE_PRESET_KEYS are irrelevant for presets
 * @param {{}} settings - eventCalendarSettings object
 * @returns {{}} eventCalendarSettings with irrelevant pairs filtered
 */
export const filterIgnoredPresetSettings = settings =>
  Object.keys(settings)
    .filter(key => !IGNORE_PRESET_KEYS.includes(key))
    .reduce((obj, key) => ({ ...obj, [key]: settings[key] }), {});

/**
 * Generates a query path from calendar settings object
 * @param {{}} settings - eventCalendarSettings object
 * @returns {string} URLSearchParams stringified URL
 */
export const generateFilterPath = settings => {
  const { filters } = settings;
  const query = {
    ...settings,
    filters: JSON.stringify(filters),
  };
  const params = new URLSearchParams(query);
  return params.toString();
};

/**
 * Check if str can be parsed to JSON or not
 * @param {string} str - Any string you want to test
 * @returns {bool} whether or not the string is valid JSON
 */
const isJSON = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Parses string only if valid JSON, returns {} if not
 * @param {string} str - Any string you want to parse
 * @returns {{}}
 */
export const parseJSON = str => (isJSON(str) ? JSON.parse(str) : {});

/**
 * Parses url path strings generated from generateFilterPath()
 * @param {string} query - filter URL path
 * @returns {{}} parsed object created by the URL params
 */
export const getSettingsFromQuery = query => {
  const updatedSettings = {};
  const urlParams = new URLSearchParams(query);
  urlParams.forEach((value, key) => {
    updatedSettings[key] = isJSON(value) ? JSON.parse(value) : value;
  });
  return updatedSettings;
};

// Create the loading status for each event group
export const createLoadingStatus = loading =>
  !isEmpty(loading)
    ? {
        ...loading,
      }
    : {
        error: null,
        isLoading: false,
      };

// Create the loading status objects for all event groups
export const createLoadingStatuses = eventGroups =>
  eventGroups.reduce(
    (acc, { loading, type }) => ({
      ...acc,
      [type]: createLoadingStatus(loading),
    }),
    {}
  );

/**
 * Sets numberOfDays to match selectedView
 * @param {{}} searchObj - the eventsCalendarSettings generated from the URL path
 * @returns {{}} the searchObj with cleaned date values
 */
const cleanDateParams = searchObj => {
  const { selectedView, numberOfDays } = searchObj;
  const cleanedObj = { ...searchObj };
  switch (selectedView) {
    case 'day':
      cleanedObj.numberOfDays = 1;
      break;
    case 'week':
      if (numberOfDays > 10) cleanedObj.numberOfDays = 9;
      break;
    case 'month':
      if (numberOfDays < 10) cleanedObj.numberOfDays = 10;
      break;
    default:
      break;
  }
  return cleanedObj;
};

/**
 * Recursive helper function to merge URL search groups with defaults
 * to create object confirming only valid keys are saved
 * @param {{}} group - default settings filter group
 * @param {{}} searchGroup - filters from URL query
 * @returns {{}} the merged checkbox group
 */
const reduceCheckboxFilters = (group, searchGroup) =>
  Object.entries(group).reduce(
    (acc, [k, v]) => ({
      ...acc,
      [k]:
        typeof v === 'boolean'
          ? searchGroup[k] || false
          : reduceCheckboxFilters(v, searchGroup[k] || searchGroup),
    }),
    {}
  );

/**
 * Clean and override received values from URL path for specific
 * keys that need extra validation. Uses default values to varify format.
 * @param {{}} searchObj - the eventsCalendarSettings generated from the URL path
 * @param {{}} groups - filters.sources set from getCalendarDefaults()
 * @param {{}} platforms - filters.platforms set from getCalendarDefaults()
 * @param {{}} projects - filters.projects set from getCalendarDefaults()
 * @returns {{}} the cleaned eventCalendarSettings object
 */
const sanityCheckParams = (searchObj, filters) => ({
  ...searchObj,
  ...cleanDateParams(searchObj),
  ...(searchObj.filters && {
    filters: {
      ...filters,
      ...searchObj.filters,
      ...(searchObj.filters.sources && {
        sources: reduceCheckboxFilters(
          filters.sources,
          searchObj.filters.sources
        ),
      }),
      ...(searchObj.filters.platforms && {
        platforms: reduceCheckboxFilters(
          filters.platforms,
          searchObj.filters.platforms
        ),
      }),
      ...(searchObj.filters.projects && {
        projects: reduceCheckboxFilters(
          filters.projects,
          searchObj.filters.projects
        ),
      }),
    },
  }),
});

/**
 * Check if search params are valid and and remove broken values
 * Uses AJV to validate against schema and then sanity checks for
 * further validation needed with some keys.
 * @param {{}} query - query path returned from location.search
 * @param {{}} groups - filters.sources set from getCalendarDefaults()
 * @param {{}} platforms - filters.platforms set from getCalendarDefaults()
 * @param {{}} projects - filters.projects set from getCalendarDefaults()
 * @returns {{}} the cleaned eventCalendarSettings object
 */
export const validateSearchParams = (query, filters) => {
  const searchObj = getSettingsFromQuery(query);
  const ajv = new Ajv({
    removeAdditional: 'all',
    useDefaults: true,
    coerceTypes: true,
  });
  const validate = ajv.compile(CALENDAR_SETTINGS_SCHEMA);
  const valid = validate(searchObj);
  if (!valid) {
    validate.errors.forEach(error => {
      delete searchObj[error.dataPath.substring(1)];
    });
  }
  return sanityCheckParams(searchObj, filters);
};

// Helper funtions for maintaining localStorage with project keys
export const setLocalStorage = (key, projectId, value) =>
  localStorage.setItem(`${key}_${projectId}`, JSON.stringify(value));

export const getLocalStorage = (key, projectId) =>
  localStorage.getItem(`${key}_${projectId}`);

export const removeLocalStorage = (key, projectId) =>
  localStorage.removeItem(`${key}_${projectId}`);

export { tagFiltersHelpers };

/**
 * Get the view styles for an event
 * @param {*} event
 * @param {*} view
 */
export const getSelectedViewStyles = (event, view) => {
  const hasDayViewPopUp =
    document.getElementsByClassName('dayViewPopUp rbc-overlay').length !== 0;
  // eslint-disable-next-line no-underscore-dangle
  return view === 'month' && !hasDayViewPopUp && !event.__isOverlayEvent
    ? styles.eventMonthView
    : '';
};

const sum = (a, b) => a + b;
const countLeaves = obj => {
  if (typeof obj !== 'object') {
    return 1;
  }
  return Object.values(obj).map(countLeaves).reduce(sum, 0);
};
const sumEventGroups = (acc, g) => acc + countLeaves(g.eventType);
export const sumEventGroupsEventTypes = eventGroups =>
  eventGroups.reduce(sumEventGroups, 0);

/**
 * Indicated if event has platform(s) or not
 * @param {*} event
 * @param {*} platformFilters
 */
export const eventHasPlatform = (event, platformFilters) => {
  const platforms = event.platforms ? [...event.platforms] : [];
  if (
    event.platform &&
    !platforms.find(p => p.toLowerCase() === event.platform.toLowerCase())
  )
    platforms.push(event.platform);

  if (platforms.length === 0) return platformFilters.Unspecified;

  return platforms.filter(platform => platformFilters[platform]).length > 0;
};

/**
 * Check if an event has a particular source status or not
 * @param {*} event
 * @param {*} filters
 */
export const eventHasStatus = (event, filters) =>
  filters.eventManager && filters.eventManager[event.status];

/**
 * Returns the environment for the event
 * @param {*} event
 */
export const envSelector = event => {
  const matchFn = env =>
    env
      ? Object.entries(ENV_TYPE_FILTERS)
          .concat([['Cross Environment', 'Unknown']])
          .find(([key, value]) =>
            [key, value, key.toLowerCase(), value.toLowerCase()].includes(
              env.toLowerCase()
            )
          )
      : undefined;
  let match = matchFn(event.env_type);
  if (match) return match[0];
  match = matchFn(event.environment);
  if (match) return match[0];
  return undefined;
};

/**
 * Check if an event has an environment or not
 * @param {*} param0
 * @param {*} envFilters
 */
export const eventHasEnvType = (event, envFilters) => {
  const env = envSelector(event);
  return envFilters[env];
};

/**
 * Check if an event has a project id or not
 * @param {*} event
 * @param {*} projectFilters
 * @param {*} projects
 */
export const eventHasProjectId = (event, projectFilters, projects) => {
  const project = event.project || 'null';
  const { name } = projects.find(p => p.projectId === project) || {};
  return projectFilters[name];
};

// convert timetamp from seconds to milliseconds format
export const timestampToMilliseconds = timestamp =>
  moment.unix(timestamp).valueOf();

// convert timetamp from milliseconds to seconds format
export const timestampToSeconds = timestamp => moment(timestamp).unix();

// return current timestamp in milliseconds format
export const getNowMillisecondsTimestamp = () =>
  timestampToMilliseconds(getNowTimestamp());

// returns # of days diff between start/end range dates
export const getDayDiffFromTimestamps = (start, end) =>
  timestampToMoment(timestampToSeconds(end)).diff(
    timestampToMoment(timestampToSeconds(start)),
    'days'
  );

// returns millisecond timestamp for provided moment date
export const getMillisecondsTimestamp = (date, timezone) =>
  timestampToMilliseconds(dateToUTCTimestamp(date, timezone));

// convert any millisecond timestamp to moment
export const getMomentFromMillisecondTimestamp = (timestamp, userTimezone) =>
  timestampToMoment(timestampToSeconds(timestamp), userTimezone);

// returns list of formatted events for highcharts navigator
export const formatNavigatorItems = (events, groupKey) =>
  events.map(event => ({
    name: event[groupKey],
    start:
      event.type === 'abTesting'
        ? timestampToMilliseconds(event.catchStart)
        : timestampToMilliseconds(event.publish_at),
    end:
      event.type === 'abTesting'
        ? timestampToMilliseconds(event.catchEnd)
        : timestampToMilliseconds(event.end_at) ||
          timestampToMilliseconds(event.publish_at + HOUR),
  }));

// updates date format manually for instances that aren't handled by time.timezone config
export const formatTooltipDateTime = (
  timestamp,
  userTimezone,
  milliseconds = true
) =>
  formatDateTime(
    milliseconds ? timestampToSeconds(timestamp) : timestamp,
    undefined,
    userTimezone
  );

// returns bool for aggregate loading status of all event groups
export const isLoadingEventGroup = ({ groupLoadingStatuses }) =>
  Object.values(groupLoadingStatuses).some(g => g.isLoading);
