import { timestampToMoment, formatDateTime } from 'playpants/helpers/dateTime';

import flatMap from 'lodash/flatMap';
import uniq from 'lodash/uniq';
import partition from 'lodash/partition';
import uniqBy from 'lodash/uniqBy';

import { REPEAT_EVENT_INTERVALS } from 'playpants/components/ScheduleComponent/constants';

// End date as seen on event detail display
export const displayViewDate = (dateAt, userTimezone) => {
  const date = timestampToMoment(dateAt, userTimezone);
  return formatDateTime(date, 'LLLL', userTimezone);
};

// Event duration as seen on event detail display
export const displayViewEventDuration = (endAt, publishAt, userTimezone) =>
  endAt
    ? `${displayViewDate(publishAt, userTimezone)} - ${displayViewDate(
        endAt,
        userTimezone
      )}`
    : displayViewDate(publishAt, userTimezone);

// Gets distinct event activity titles
export const getEventActivityTitles = activities =>
  flatMap(
    uniq(
      activities
        .filter(activity => activity.title_envs.length > 0)
        .map(activity => activity.title_envs)
    )
  );

/**
 * Returns the frequency and interval of repeating event
 * @param {{}} repeatEventSettings
 */
export const getRepeatFrequencyStr = ({ frequency, interval }) =>
  `${frequency} ${REPEAT_EVENT_INTERVALS[interval]}`;

// Get start and end activities
export const getPartitionedPublishDateActivities = activities =>
  partition(activities, {
    publish_on: 'on_start',
  });

// Get event activity titles
export const getEventSummaryTitles = (projectTitles, eventActivityTitles) =>
  projectTitles && eventActivityTitles
    ? projectTitles.filter(eventDetailTitle =>
        eventDetailTitle.environments.find(env =>
          eventActivityTitles.find(t => t === env.id)
        )
      )
    : [];

// Get unique activity types of given list of activities
export const getUniqActivityTypes = activities => uniqBy(activities, 'type');

/**
 * Updates the baseUrl used for routing users to event page.
 * Replaces currentProject.id with event.project for projects
 * that are opened in global view or as affiliated projects
 * @param {string} baseUrl - base url path passed to summary dialog
 * @param {{}} event - current event passed to summary dialog
 * @returns {string} path updated with correct projectId
 */
export const setBaseUrl = (baseUrl, event) => {
  const path = baseUrl.split('/');
  if (event.project) path[2] = event.project;
  return path.join('/');
};
