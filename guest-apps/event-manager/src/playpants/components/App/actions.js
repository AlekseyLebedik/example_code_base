import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * Core factory action creator for fetching project settings
 */
export const fetchProjectSettings = params =>
  createFetch(AT.FETCH_PROJECT_SETTINGS, null, params);

/**
 * Core factory action creator for fetching templates
 */
export const fetchTemplates = (params = {}) =>
  createFetch(
    AT.FETCH_TEMPLATES,
    null,
    {
      ...params,
    },
    params.nextPage
  );

/**
 * Core factory action creator for fetching stories
 */
export const fetchStories = (params = {}) =>
  createFetch(
    AT.FETCH_STORIES,
    null,
    {
      ...params,
    },
    params.nextPage
  );

/**
 * Core factory action creator for fetching schedules
 */
export const fetchSchedules = params =>
  createFetch(AT.FETCH_SCHEDULES, null, params);

/**
 * Updates the list of schedules with the given schedule
 * @param {{}} schedule - The schedule to be updated
 */
export const updateSchedules = schedule => ({
  type: AT.UPDATE_SCHEDULES,
  schedule,
});
