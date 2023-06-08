import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export function fetchLobbies(playlist, datacenter, nextPageToken) {
  return {
    type: AT.SESSION_VIEWER_LOBBIES_FETCH,
    params: { playlist, datacenter, nextPageToken },
  };
}

export function fetchLobbiesSuccess(payload, finished, pageTokens) {
  return dispatch => {
    dispatch({
      type: AT.SESSION_VIEWER_LOBBIES_FETCH_SUCCESS,
      payload,
      finished,
      pageTokens,
    });
  };
}

export function fetchLobbiesFailed(err) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => fetchLobbies()));
  };
}

export function fetchPlaylists() {
  return {
    type: AT.SESSION_VIEWER_PLAYLISTS_FETCH,
  };
}

export function fetchPlaylistsSuccess(payload) {
  return dispatch => {
    dispatch({
      type: AT.SESSION_VIEWER_PLAYLISTS_FETCH_SUCCESS,
      payload,
    });
  };
}

export function fetchPlaylistsFailed(err) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => fetchPlaylists()));
  };
}
