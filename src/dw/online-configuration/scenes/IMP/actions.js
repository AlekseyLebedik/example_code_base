import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as AT from './actionTypes';

export function fetchIMPs(params, append = false) {
  return {
    type: AT.IMPS_FETCH,
    params,
    append,
  };
}

export function fetchIMPsSuccess(payload, append) {
  return {
    type: AT.IMPS_FETCH_SUCCESS,
    data: payload.data,
    nextPageToken: payload.nextPageToken,
    append,
  };
}

export function fetchIMPsFailed(err, params, append) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => fetchIMPs(params, append)));
  };
}

export function uploadToIMPHistory(values) {
  return {
    type: AT.IMP_UPLOAD,
    values,
  };
}

export function uploadToIMPHistorySuccess() {
  return dispatch => {
    dispatch({
      type: AT.IMP_UPLOAD_SUCCESS,
    });
    dispatch(
      GlobalSnackBarActions.show(
        'File was successfully uploaded to IMP history.',
        'success'
      )
    );
    dispatch(fetchIMPs());
  };
}

export function uploadToIMPHistoryFailed(err) {
  return dispatch => dispatch(nonCriticalHTTPError(err));
}

export function openUploadToIMPHistoryModal() {
  return {
    type: AT.IMP_OPEN_UPLOAD_MODAL,
  };
}

export function closeUploadToIMPHistoryModal() {
  return {
    type: AT.IMP_CLOSE_UPLOAD_MODAL,
  };
}
