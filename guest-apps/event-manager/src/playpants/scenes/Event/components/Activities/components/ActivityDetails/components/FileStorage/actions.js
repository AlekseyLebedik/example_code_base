import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

export const uploadFileAction = (
  selectedActivity,
  fileDetails,
  file,
  callback
) => ({
  type: AT.UPLOAD_FILE,
  selectedActivity,
  fileDetails,
  file,
  callback,
});

export const uploadFileSuccess = (activity, file) => ({
  type: AT.UPLOAD_FILE_SUCCESS,
  activity,
  file,
});

export const uploadFileFailed = error => ({
  type: AT.UPLOAD_FILE_FAILED,
  error,
});

// TO BE ADDED IN NEXT PR
// export const uploadProgressFetch = (id, callback) =>
//   createFetch(AT.UPLOAD_PROGRESS_FETCH, null, {
//     id,
//     callback,
//   });

export const uploadProgressFetch = (id, callback) => ({
  type: AT.UPLOAD_PROGRESS_FETCH,
  id,
  callback,
});

export const uploadProgressFetchSuccess = (progress, id) => ({
  type: AT.UPLOAD_PROGRESS_FETCH_SUCCESS,
  progress,
  id,
});

export const uploadProgressFetchFailed = error => ({
  type: AT.UPLOAD_PROGRESS_FETCH_FAILED,
  error,
});

export const downloadFile = (id, name, callback) => ({
  type: AT.DOWNLOAD_FILE,
  id,
  name,
  callback,
});

export const downloadFileSuccess = data => ({
  type: AT.DOWNLOAD_FILE_SUCCESS,
  data,
});

export const downloadFileFailed = error => ({
  type: AT.DOWNLOAD_FILE_FAILED,
  error,
});

export const removeFile = (id, callback) => ({
  type: AT.REMOVE_FILE,
  id,
  callback,
});

export const removeFileSuccess = id => ({
  type: AT.REMOVE_FILE_SUCCESS,
  id,
});

export const removeFileFailed = error => ({
  type: AT.REMOVE_FILE_FAILED,
  error,
});

export const updateFile = (file, id) => ({
  type: AT.UPDATE_FILE,
  file,
  id,
});

export const updateFileSuccess = () => ({
  type: AT.UPDATE_FILE_SUCCESS,
});

export const updateFileFailed = error => ({
  type: AT.UPDATE_FILE_FAILED,
  error,
});

export const fileDetailsFetch = selectedActivity => ({
  type: AT.FILE_DETAILS_FETCH,
  selectedActivity,
});

export const fileDetailsFetchSuccess = files => ({
  type: AT.FILE_DETAILS_FETCH_SUCCESS,
  files,
});

export const fileDetailsFetchFailed = error => ({
  type: AT.FILE_DETAILS_FETCH_FAILED,
  error,
});

// THIS WILL BE ADDED IN NEXT PR
// export const fileDetailsFetch = selectedActivity =>
// createFetch(AT.FILE_DETAILS_FETCH, null, { selectedActivity });

/**
 * Core factory action creator for fetching event contexts
 */
export const fetchFileStorageContexts = (titleId, env) =>
  createFetch(AT.FILESTORAGE_CONTEXTS_FETCH, null, { titleId, env });
