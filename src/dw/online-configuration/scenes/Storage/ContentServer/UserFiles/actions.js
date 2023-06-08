import download from 'downloadjs';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export function fetchUserFiles(params, append = false) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_USER_FILES_FETCH,
      params,
      append,
    });
  };
}

export function fetchUserFilesSuccess(payload, append) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_USER_FILES_FETCH_SUCCESS,
      entries: payload.data,
      nextPageToken: payload.nextPageToken,
      elementsOrder: payload.columns,
      q: payload.q,
      append,
    });
  };
}

export function fetchUserFilesFailed(err, params, append) {
  return dispatch => {
    dispatch(
      CriticalErrorActions.show(err, () => fetchUserFiles(params, append))
    );
  };
}

export const userFilesListItemClick = userFile => ({
  type: AT.STORAGE_USER_FILES_LIST_ITEM_ONCLICK,
  file: userFile,
});

export function uploadUserFile(values) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_USER_FILES_UPLOAD,
      values,
    });
  };
}

export function uploadUserFileSuccess(data) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_USER_FILES_UPLOAD_SUCCESS,
      file: data.file,
    });
  };
}

export function uploadUserFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function deleteUserFile(fileID) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_USER_FILES_DELETE,
      fileID,
    });
  };
}

export function deleteUserFileSuccess(fileID) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_USER_FILES_DELETE_SUCCESS,
      fileID,
    });
  };
}

export function deleteUserFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function downloadUserFile(fileID) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_USER_FILES_DOWNLOAD,
      fileID,
    });
  };
}

export function downloadUserFileSuccess(data) {
  return () => {
    download(data.fileData, data.fileName);
  };
}

export function downloadUserFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
