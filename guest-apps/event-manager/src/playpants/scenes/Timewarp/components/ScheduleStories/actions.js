import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * Fetches the schedule story then set as selected story
 * @param {number} id - The story ID
 */
export const fetchScheduleStoryThenSelect = id => ({
  type: AT.FETCH_SCHEDULE_STORY_THEN_SELECT,
  id,
});

/**
 * Successful schedule story fetch then set as selected story
 * @param {Object} data - Story
 */
export const fetchScheduleStoryThenSelectSuccess = data => ({
  type: AT.FETCH_SCHEDULE_STORY_THEN_SELECT_SUCCESS,
  data,
});

/**
 * Failed timearp story fetch then set as selected story
 * @param {*} error - Error response
 */
export const fetchScheduleStoryThenSelectFailed = error => ({
  type: AT.FETCH_SCHEDULE_STORY_THEN_SELECT_FAILED,
  error,
});

/**
 * Core factory action creator for fetching schedule stories
 */
export const searchScheduleStories = (params = {}) =>
  createFetch(
    AT.SEARCH_SCHEDULE_STORIES,
    null,
    {
      ...params,
    },
    params.nextPage
  );

/**
 * Override search schedule stories success action for polling searched stories
 * @param {Object} data       - The response data
 * @param {boolean} next - The next URL
 */
export const searchScheduleStoriesSuccess = (data, next) => ({
  type: `${AT.SEARCH_SCHEDULE_STORIES}_FETCH_SUCCESS`,
  data,
  next,
});

/**
 * Override search schedule stories failed action for polling searched stories
 */
export const searchScheduleStoriesFailed = () => ({
  type: `${AT.SEARCH_SCHEDULE_STORIES}_FETCH_FAILED`,
});

export const setSelectedScheduleStory = story => ({
  type: AT.SET_SELECTED_SCHEDULE_STORY,
  story,
});

/**
 * Resets selected schedule story
 */
export const resetSelectedScheduleStory = () => ({
  type: AT.RESET_SELECTED_SCHEDULE_STORY,
});

/**
 * Resets all the Schedule data stored to initial reducer state
 */
export const resetScheduleStories = () => ({
  type: AT.RESET_SCHEDULE_STORIES,
});

/**
 * Starts the background saga for polling schedule stories
 */
export const startPollSchedules = () => ({
  type: AT.START_POLL_SCHEDULES,
});

/**
 * Stops the background saga for polling schedule stories
 */
export const stopPollSchedules = () => ({
  type: AT.STOP_POLL_SCHEDULES,
});

/**
 * Store selected schedule story to local storage timewarp history
 */
export const storeSelectedScheduleStory = story => ({
  type: AT.STORE_SELECTED_SCHEDULE_STORY,
  story,
});

/**
 * Triggers if successfully stored selected schedule story
 */
export const storeSelectedScheduleStorySuccess = () => ({
  type: AT.STORE_SELECTED_SCHEDULE_STORY_SUCCESS,
});

/**
 * Triggers if failed when storing selected schedule story
 */
export const storeSelectedScheduleStoryFailed = error => ({
  type: AT.STORE_SELECTED_SCHEDULE_STORY_FAILED,
  error,
});
