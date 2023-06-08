import {
  createFetch,
  createUpdate,
} from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * Core factory action creator for fetching all object groups
 */
export const fetchGroups = (titleId, env, params) =>
  createFetch(AT.FETCH_GROUPS, titleId, { env, ...params });

/**
 * Core factory action creator for fetching all object categories
 */
export const fetchCategories = (titleId, env, params) =>
  createFetch(AT.FETCH_CATEGORIES, titleId, { env, ...params });

/**
 * Core factory action creator for downloading an existing object
 */
export const downloadObject = (fileId, fileName) =>
  createFetch(AT.DOWNLOAD_OBJECT, fileId, fileName);

/**
 * Core factory action creator for deleting an existing object
 */
export const deleteObject = fileId => createUpdate(AT.DELETE_OBJECT, fileId);

/**
 * Reset publisher objects state to initial state
 */
export const clearState = () => ({
  type: AT.CLEAR_PUBLISHER_OBJECTS,
});

export const uploadObject = (eventId, selectedActivity, formData) => ({
  type: AT.UPLOAD_OBJECT,
  eventId,
  selectedActivity,
  formData,
});

export const uploadObjectSuccess = () => ({
  type: AT.UPLOAD_OBJECT_SUCCESS,
});

export const uploadObjectFailed = error => ({
  type: AT.UPLOAD_OBJECT_FAILED,
  error,
});
