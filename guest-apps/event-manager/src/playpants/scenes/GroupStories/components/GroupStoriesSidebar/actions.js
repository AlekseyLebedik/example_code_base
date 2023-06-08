import * as AT from './actionTypes';

export const setSelectedEvent = eventData => ({
  type: AT.SET_SELECTED_EVENT,
  eventData,
});

export const setSelectedThenOpen = (eventData, openModal) => ({
  type: AT.SET_SELECTED_THEN_OPEN,
  eventData,
  openModal,
});

export const removeGroupStoryFromEvent = eventId => ({
  type: AT.REMOVE_GROUP_STORY_FROM_EVENT,
  eventId,
});

export const removeGroupStoryFromEventSuccess = event => ({
  type: AT.REMOVE_GROUP_STORY_FROM_EVENT_SUCCESS,
  event,
});

export const removeGroupStoryFromEventFailed = error => ({
  type: AT.REMOVE_GROUP_STORY_FROM_EVENT_FAILED,
  error,
});

export const fetchAllGroupStoryEvents = params => ({
  type: AT.FETCH_ALL_GROUP_STORY_EVENTS,
  params,
});

export const fetchAllGroupStoryEventsSuccess = storyEvents => ({
  type: AT.FETCH_ALL_GROUP_STORY_EVENTS_SUCCESS,
  storyEvents,
});

export const fetchAllGroupStoryEventsFailed = error => ({
  type: AT.FETCH_ALL_GROUP_STORY_EVENTS_FAILED,
  error,
});

/**
 * Fetches the story then set as selected story
 * @param {number} id - The story ID
 */
export const fetchGroupStoryThenSelect = id => ({
  type: AT.FETCH_GROUP_STORY_THEN_SELECT,
  id,
});

/**
 * Successful story fetch then set as selected story
 * @param {Object} data - GroupStory
 */
export const fetchGroupStoryThenSelectSuccess = data => ({
  type: AT.FETCH_GROUP_STORY_THEN_SELECT_SUCCESS,
  data,
});

/**
 * Failed story fetch then set as selected story
 * @param {*} error - Error response
 */
export const fetchGroupStoryThenSelectFailed = error => ({
  type: AT.FETCH_GROUP_STORY_THEN_SELECT_FAILED,
  error,
});

/**
 * Resets all the Grouped Stories Sidebar data stored to initial reducer state
 */
export const resetGroupStoriesSidebar = () => ({
  type: AT.RESET_GROUP_STORIES_SIDEBAR,
});
