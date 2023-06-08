import download from 'downloadjs';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export function fetchPooledFiles(params, append = false) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_POOLED_FILES_FETCH,
      params,
      append,
    });
  };
}

export const pooledFilesListItemClick = pooledFile => ({
  type: AT.STORAGE_POOLED_FILES_LIST_ITEM_ONCLICK,
  file: pooledFile,
});

export function fetchPooledFilesSuccess(payload, append) {
  return dispatch => {
    const entries = payload.data;
    dispatch({
      type: AT.STORAGE_POOLED_FILES_FETCH_SUCCESS,
      entries,
      nextPageToken: payload.nextPageToken,
      elementsOrder: payload.columns,
      q: payload.q,
      append,
    });
    if (entries.length === 1) {
      dispatch(pooledFilesListItemClick(entries[0]));
    }
  };
}

export function fetchPooledFilesFailed(err, params, append) {
  return dispatch => {
    dispatch(
      CriticalErrorActions.show(err, () => fetchPooledFiles(params, append))
    );
  };
}

export function uploadPooledFile(values) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_POOLED_FILES_UPLOAD,
      values,
    });
  };
}

export function uploadPooledFileSuccess(data) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_POOLED_FILES_UPLOAD_SUCCESS,
      file: data.file,
    });
  };
}

export function uploadPooledFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function deletePooledFile(fileID) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_POOLED_FILES_DELETE,
      fileID,
    });
  };
}

export function deletePooledFileSuccess(fileID) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_POOLED_FILES_DELETE_SUCCESS,
      fileID,
    });
  };
}

export function deletePooledFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function downloadPooledFile(fileID) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_POOLED_FILES_DOWNLOAD,
      fileID,
    });
  };
}

export function downloadPooledFileSuccess(data) {
  return () => {
    download(data.fileData, data.fileName);
  };
}

export function downloadPooledFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function deleteSummaryFile(fileID) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_POOLED_FILES_SUMMARY_DELETE,
      fileID,
    });
  };
}

export function deleteSummaryFileSuccess(fileID) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_POOLED_FILES_SUMMARY_DELETE_SUCCESS,
      fileID,
    });
  };
}

export function deleteSummaryFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function downloadSummaryFile(fileID) {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_POOLED_FILES_SUMMARY_DOWNLOAD,
      fileID,
    });
  };
}

export function downloadSummaryFileSuccess(data) {
  return () => {
    download(data.fileData, data.fileName);
  };
}

export function downloadSummaryFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
