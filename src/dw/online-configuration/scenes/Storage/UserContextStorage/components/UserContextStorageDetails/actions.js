import download from 'downloadjs';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as AT from './actionTypes';
import { reloadDetails } from '../../actions';

export function deleteUserContextStorageFile(params) {
  return dispatch => {
    dispatch({
      type: AT.USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE,
      params,
    });
  };
}

export function deleteUserContextStorageFileSuccess(payload) {
  return dispatch => {
    const { userID, context, accountType, fileID } = payload;
    const path = `/${userID}/${context}/${accountType}`;
    dispatch(reloadDetails(path));
    dispatch({
      type: AT.USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE_SUCCESS,
      fileID,
    });
  };
}

export function deleteUserContextStorageFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function downloadUserContextStorageFile(params) {
  return dispatch => {
    dispatch({
      type: AT.USER_CONTEXT_STORAGE_DETAILS_FILE_DOWNLOAD,
      params,
    });
  };
}

export function downloadUserContextStorageFileSuccess(data) {
  return () => download(data.fileData, data.fileName);
}

export function downloadUserContextStorageFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
