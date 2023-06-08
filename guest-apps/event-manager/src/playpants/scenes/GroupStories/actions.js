import {
  createFetch,
  createUpdate,
} from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * Core factory action creator for fetching grouped stories
 */
export const searchGroupStories = (params = {}) =>
  createFetch(
    AT.SEARCH_GROUP_STORIES,
    null,
    {
      ...params,
    },
    params.nextPage
  );

/**
 * Core factory action creator for deleting a grouped story
 */
export const deleteGroupStory = storyId =>
  createUpdate(AT.DELETE_GROUP_STORY, storyId);

export const deleteThenRedirect = (storyId, redirect) => ({
  type: AT.DELETE_THEN_REDIRECT,
  storyId,
  redirect,
});

export const setSelectedGroupStory = story => ({
  type: AT.SET_SELECTED_GROUP_STORY,
  story,
});

/**
 * Resets all the Story Detail data stored to initial reducer state
 */
export const resetGroupStories = () => ({
  type: AT.RESET_GROUP_STORIES,
});
