import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * Starts the fetch for schedule story events count
 * @param {{}} params - Query params
 */
export const fetchScheduleStoryEventsCount = params => ({
  type: AT.FETCH_SCHEDULE_STORY_EVENTS_COUNT,
  params,
});

/**
 * Stores the count of schedule story events
 * @param {number} count - The total results for schedule story events
 */
export const fetchScheduleStoryEventsCountSuccess = count => ({
  type: AT.FETCH_SCHEDULE_STORY_EVENTS_COUNT_SUCCESS,
  count,
});

/**
 * Stores the error message of failed schedule story events count fetch
 * @param {{}} error - The HTTP error
 */
export const fetchScheduleStoryEventsCountFailed = error => ({
  type: AT.FETCH_SCHEDULE_STORY_EVENTS_COUNT_FAILED,
  error,
});

export const fetchContexts = (titleId, env) =>
  createFetch(AT.FETCH_CONTEXTS, titleId, { env, contextType: 'ObjectStore' });

export const fetchCategories = (titleId, env, context) =>
  createFetch(AT.FETCH_CATEGORIES, titleId, { env, context });
