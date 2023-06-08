import download from 'downloadjs';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as AT from './actionTypes';

export const publisherStorageListItemClick = file => ({
  type: AT.PUBLISHER_STORAGE_LIST_ITEM_ONCLICK,
  file,
});

export function fetchPublisherStorage(params, append = false) {
  return dispatch => {
    dispatch({
      type: AT.PUBLISHER_STORAGE_FETCH,
      params,
      append,
    });
  };
}

export function fetchPublisherStorageSuccess(payload, extraPayload) {
  return dispatch => {
    const entries = payload.data;
    dispatch({
      type: AT.PUBLISHER_STORAGE_FETCH_SUCCESS,
      entries,
      nextPageToken: payload.nextPageToken,
      elementsOrder: payload.columns,
      q: extraPayload.q,
      append: extraPayload.append,
    });
    if (entries.length === 1) {
      dispatch(publisherStorageListItemClick(entries[0]));
    }
  };
}

export function fetchPublisherStorageFailed(err, params, append) {
  return dispatch => {
    dispatch(
      CriticalErrorActions.show(err, () =>
        fetchPublisherStorage(params, append)
      )
    );
  };
}

export function uploadPublisherStorageFile(values) {
  return dispatch => {
    dispatch({
      type: AT.PUBLISHER_STORAGE_FILES_UPLOAD,
      values,
    });
  };
}

export function uploadPublisherStorageFileSuccess(data) {
  return dispatch => {
    dispatch({
      type: AT.PUBLISHER_STORAGE_FILES_UPLOAD_SUCCESS,
      file: data.file,
    });
  };
}

export function uploadPublisherStorageFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function bulkDeletePublisherStorageFiles(items) {
  return {
    type: AT.PUBLISHER_STORAGE_FILES_BULK_DELETE,
    items,
  };
}

export function bulkDeletePublisherStorageFilesSuccess(fileIds) {
  return dispatch => {
    dispatch({
      type: AT.PUBLISHER_STORAGE_FILES_BULK_DELETE_SUCCESS,
      fileIds,
    });
    dispatch(GlobalSnackBarActions.show('Successfully deleted.', 'success'));
  };
}

export function bulkDeletePublisherStorageFilesFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function bulkDownloadPublisherStorageFiles(items) {
  return {
    type: AT.PUBLISHER_STORAGE_FILES_BULK_DOWNLOAD,
    items,
  };
}

export function bulkDownloadPublisherStorageFilesSuccess(data) {
  return () => {
    download(data.fileData, data.fileName);
  };
}

export function bulkDownloadPublisherStoragesFilesFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
