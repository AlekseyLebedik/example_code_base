import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { setSelectedRowKeys } from 'dw/core/components/TableHydrated';
import * as AT from './actionTypes';

export function fetchMonitoredUsers() {
  return {
    type: AT.MONITORED_USERS_FETCH,
  };
}

export function fetchMonitoredUsersSuccess(payload) {
  return {
    type: AT.MONITORED_USERS_FETCH_SUCCESS,
    users: payload.data,
  };
}

export function fetchMonitoredUsersFailed(err, action) {
  return dispatch => {
    dispatch(GlobalProgressActions.done());
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}

export function addMonitoredUser(values) {
  return dispatch => {
    dispatch({
      type: AT.MONITORED_USERS_ADD,
      values,
    });
    dispatch(ModalHandlers.submit());
  };
}

export function addMonitoredUserSuccess() {
  return dispatch => {
    dispatch(ModalHandlers.close());
    dispatch(
      GlobalSnackBarActions.show(
        'Monitor A User operation was successful.',
        'success'
      )
    );
    dispatch(fetchMonitoredUsers());
  };
}

export function addMonitoredUserFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
    dispatch({
      type: AT.MONITORED_USERS_ADD_FAILED,
    });
    dispatch(ModalHandlers.stopSubmitting());
  };
}

export function deleteMonitoredUsers(userIds) {
  return {
    type: AT.MONITORED_USERS_DELETE,
    userIds,
  };
}

export function deleteMonitoredUsersSuccess(userIds) {
  return dispatch => {
    dispatch({
      type: AT.MONITORED_USERS_DELETE_SUCCESS,
      userIds,
    });
    dispatch(
      GlobalSnackBarActions.show(
        'Stop Monitoring operation was successful.',
        'success'
      )
    );
    dispatch(setSelectedRowKeys([]));
  };
}

export function deleteMonitoredUsersFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
