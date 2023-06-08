import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { ACCOUNTS_UPDATE_SELECTED_ACCOUNT } from 'dw/online-configuration/scenes/Accounts/actionTypes';

import * as AT from './actionTypes';

export function fetchUserDetails(userID) {
  return {
    type: AT.ACCOUNTS_TAB_USER_DETAILS_FETCH,
    userID,
  };
}

export function fetchUserDetailsSuccess(payload) {
  return dispatch => {
    dispatch({
      type: AT.ACCOUNTS_TAB_USER_DETAILS_FETCH_SUCCESS,
      userDetails: payload.data,
    });
    dispatch({
      type: ACCOUNTS_UPDATE_SELECTED_ACCOUNT,
      data: payload.data,
    });
  };
}

export function fetchUserDetailsFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function changeUserProfile(userID, profileType, values) {
  return {
    type: AT.ACCOUNTS_TAB_USER_DETAILS_UPDATE_PROFILE,
    userID,
    profileType,
    values,
  };
}

export function deleteUserProfile(userID) {
  return {
    type: AT.ACCOUNTS_TAB_USER_DETAILS_DELETE_PROFILE,
    userID,
  };
}

export function changeReputation(userID, score, resolve, reject) {
  return {
    type: AT.ACCOUNTS_TAB_USER_DETAILS_CHANGE_REPUTATION,
    userID,
    score,
    resolve,
    reject,
  };
}

export function changeReputationSuccess(userID, score) {
  return {
    type: AT.ACCOUNTS_TAB_USER_DETAILS_CHANGE_REPUTATION_SUCCESS,
    userID,
    score,
  };
}
