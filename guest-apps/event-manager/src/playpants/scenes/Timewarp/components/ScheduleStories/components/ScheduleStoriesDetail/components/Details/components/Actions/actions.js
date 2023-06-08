import { createUpdate } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * Core factory action creator for deleting an story
 */
export const deleteScheduleStory = storyId =>
  createUpdate(AT.DELETE_SCHEDULE_STORY, storyId);

export const deleteThenRedirect = (storyId, redirect) => ({
  type: AT.DELETE_THEN_REDIRECT,
  storyId,
  redirect,
});
