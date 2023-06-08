import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import { setSelectedRowKeys } from 'dw/core/components/TableHydrated';
import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as AT from './actionTypes';

export function fetchStorageFilenames(params) {
  return {
    type: AT.STORAGE_FILENAMES_FETCH,
    params,
  };
}

export function fetchStorageFilenamesSuccess(payload) {
  return {
    type: AT.STORAGE_FILENAMES_FETCH_SUCCESS,
    storageFilenames: payload.data,
  };
}

export function fetchStorageFilenamesFailed(err, action) {
  return dispatch => {
    dispatch(GlobalProgressActions.done());
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}

export function addStorageFilename(values) {
  return {
    type: AT.STORAGE_FILENAME_ADD,
    values,
  };
}

export function addStorageFilenameSuccess() {
  return dispatch => {
    dispatch({
      type: AT.STORAGE_FILENAME_ADD_SUCCESS,
    });
    dispatch(
      GlobalSnackBarActions.show(
        'Storage filename was successfully added.',
        'success'
      )
    );
    dispatch(fetchStorageFilenames());
  };
}

export function addStorageFilenameFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
    dispatch({
      type: AT.STORAGE_FILENAME_ADD_FAILED,
    });
  };
}

export function deleteStorageFilename(filenameIds) {
  return {
    type: AT.STORAGE_FILENAME_DELETE,
    filenameIds,
  };
}

export const deleteStorageFilenameSuccess = filenameIds => dispatch => {
  dispatch({
    type: AT.STORAGE_FILENAME_DELETE_SUCCESS,
    filenameIds,
  });
  dispatch(
    GlobalSnackBarActions.show('Filenames deleted properly.', 'success')
  );
  dispatch(setSelectedRowKeys([]));
};

export function deleteStorageFilenameFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function openAddFilenameModal() {
  return {
    type: AT.STORAGE_FILENAME_ADD_MODAL_OPEN,
  };
}

export function closeAddFilenameModal() {
  return {
    type: AT.STORAGE_FILENAME_ADD_MODAL_CLOSE,
  };
}
