import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as AT from './actionTypes';

export function fetchUserKeys(userID) {
  return {
    type: AT.ACCOUNTS_TAB_USER_KEYS_FETCH,
    userID,
  };
}

export function fetchUserKeysSuccess(payload) {
  return {
    type: AT.ACCOUNTS_TAB_USER_KEYS_FETCH_SUCCESS,
    userKeys: payload.data,
  };
}

export function fetchUserKeysFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function addUserKey(values) {
  return (dispatch, getState) => {
    dispatch({
      type: AT.ACCOUNTS_TAB_USER_KEYS_ADD,
      userID: getState().Scenes.Accounts.selectedAccount.userID,
      values,
    });
  };
}

export function addUserKeySuccess() {
  return {
    type: AT.ACCOUNTS_TAB_USER_KEYS_ADD_SUCCESS,
  };
}

export function addUserKeyFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function openAddKeyModal() {
  return {
    type: AT.ACCOUNTS_TAB_USER_KEYS_OPEN_MODAL,
  };
}

export function closeAddKeyModal() {
  return {
    type: AT.ACCOUNTS_TAB_USER_KEYS_CLOSE_MODAL,
  };
}
