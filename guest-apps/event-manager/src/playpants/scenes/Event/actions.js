import {
  createFetch,
  createUpdate,
} from '@demonware/devzone-core/helpers/actions';

import * as AT from './actionTypes';

/**
 * Core factory action creator for fetching an event
 */
export const fetchEvent = eventId => createFetch(AT.EVENT_FETCH, eventId);

/**
 * Core factory action creator for fetching event discussions
 */
export const fetchDiscussion = eventId =>
  createFetch(AT.DISCUSSION_FETCH, eventId);

/**
 * Fetch responsibilities for current user
 */
export const fetchUserResponsibilities = params =>
  createFetch(AT.FETCH_USER_RESPONSIBILITIES, params);

/**
 * Core factory action creator for editing event data
 */
export const editEvent = (eventId, data) =>
  createUpdate(AT.UPDATE_EVENT, eventId, data);

/**
 * Core factory action creator for editing authorizations
 */
export const editAuths = (eventId, data) =>
  createUpdate(AT.UPDATE_AUTHS, eventId, data);

/**
 * Core factory action creator for deleting an event
 */
export const deleteEvent = eventId => createUpdate(AT.DELETE_EVENT, eventId);

export const createComment = (eventId, data) =>
  createUpdate(AT.CREATE_COMMENT, eventId, data);

export const unlockThenDelete = (eventId, redirect) => ({
  type: AT.UNLOCK_THEN_DELETE,
  eventId,
  redirect,
});

export const unlockThenClear = (canUnlock, eventId) => ({
  type: AT.UNLOCK_THEN_CLEAR,
  canUnlock,
  eventId,
});

export const clearEventStore = () => ({
  type: AT.CLEAR_EVENT_STORE,
});
