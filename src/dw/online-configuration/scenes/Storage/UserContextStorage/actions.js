import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export const reloadDetails = path => ({
  type: AT.USER_CONTEXT_STORAGE_RELOAD_DETAILS,
  path,
});

export function fetchUserContextStorage(params, append = false) {
  return dispatch => {
    dispatch({
      type: AT.USER_CONTEXT_STORAGE_FETCH,
      params,
      append,
    });
  };
}

export const userContextStorageListItemClick = file => ({
  type: AT.USER_CONTEXT_STORAGE_LIST_ITEM_ONCLICK,
  file,
});

export function fetchUserContextStorageSuccess(payload, append, fileID) {
  return dispatch => {
    const entries = payload.data;
    dispatch({
      type: AT.USER_CONTEXT_STORAGE_FETCH_SUCCESS,
      entries,
      elementsOrder: payload.columns || [],
      q: payload.q,
      append,
    });
    if (fileID !== undefined) {
      const item = entries.find(e => e.fileID === fileID);
      dispatch(userContextStorageListItemClick(item));
    }
  };
}

export function fetchUserContextStorageFailed(err, params, append) {
  return dispatch => {
    dispatch(
      CriticalErrorActions.show(err, () =>
        fetchUserContextStorage(params, append)
      )
    );
  };
}

export const openUploadModal = () => ({
  type: AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_OPEN_MODAL,
});

export const closeUploadModal = () => ({
  type: AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_CLOSE_MODAL,
});

export function uploadUserContextStorageFile(values) {
  return dispatch => {
    dispatch({
      type: AT.USER_CONTEXT_STORAGE_FILES_UPLOAD,
      values,
    });
  };
}

export function uploadUserContextStorageFileSuccess(payload) {
  return dispatch => {
    const { userID, context, accountType, fileID } = payload;
    const path = `${userID}/${context}/${accountType}/${fileID}`;
    dispatch(reloadDetails(path));
    dispatch(closeUploadModal());
  };
}
export function uploadUserContextStorageFileFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function getStorageContexts() {
  return {
    type: AT.USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS,
  };
}

export function getStorageContextsSuccess(payload) {
  return {
    type: AT.USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS_SUCCESS,
    contextsList: payload.data,
  };
}

export function getStorageContextsFailed(err) {
  return dispatch => dispatch(nonCriticalHTTPError(err));
}
