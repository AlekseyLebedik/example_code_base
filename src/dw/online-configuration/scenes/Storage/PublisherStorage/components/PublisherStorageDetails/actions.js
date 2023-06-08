import download from 'downloadjs';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as AT from './actionTypes';

export function deletePublisherStorageFile(fileID) {
  return dispatch => {
    dispatch({
      type: AT.PUBLISHER_STORAGE_DETAILS_DELETE_FILE,
      fileID,
    });
  };
}

export function deletePublisherStorageFileSuccess(fileID) {
  return dispatch => {
    dispatch({
      type: AT.PUBLISHER_STORAGE_DETAILS_DELETE_FILE_SUCCESS,
      fileID,
    });
  };
}

export function deletePublisherStorageFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function downloadPublisherStorageFile(fileID) {
  return dispatch => {
    dispatch({
      type: AT.PUBLISHER_STORAGE_DETAILS_FILE_DOWNLOAD,
      fileID,
    });
  };
}

export function downloadPublisherStorageFileSuccess(data) {
  return () => {
    download(data.fileData, data.fileName);
  };
}

export function downloadPublisherStorageFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
