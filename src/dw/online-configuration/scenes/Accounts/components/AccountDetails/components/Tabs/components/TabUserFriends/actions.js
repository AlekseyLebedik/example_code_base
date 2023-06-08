import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as AT from './actionTypes';

export function fetchUserFriends(userID, params, append = false) {
  return {
    type: AT.ACCOUNTS_TAB_USER_FRIENDS_FETCH,
    userID,
    params,
    append,
  };
}

export function fetchUserFriendsSuccess(payload, append) {
  return {
    type: AT.ACCOUNTS_TAB_USER_FRIENDS_FETCH_SUCCESS,
    userFriends: payload.data,
    nextPageToken: payload.nextPageToken,
    append,
  };
}

export function fetchUserFriendsFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
