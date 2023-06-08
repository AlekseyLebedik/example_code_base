import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as AT from './actionTypes';

export function fetchLeaderboards(params, append = false) {
  return dispatch => {
    dispatch({
      type: AT.LEADERBOARDS_FETCH,
      params,
      append,
    });
  };
}

export const leaderboardsListItemClick = leaderboard => ({
  type: AT.LEADERBOARDS_LIST_ITEM_ONCLICK,
  leaderboard,
});

export function fetchLeaderboardsSuccess(
  payload,
  append,
  selectedLeaderboard = undefined,
  stillLoading
) {
  return dispatch => {
    const leaderboards = payload.data;
    dispatch({
      type: AT.LEADERBOARDS_FETCH_SUCCESS,
      leaderboards,
      nextPageToken: payload.nextPageToken,
      searchAvailable:
        payload.searchAvailable !== undefined ? payload.searchAvailable : true,
      q: payload.q,
      append,
      stillLoading,
    });
    if (leaderboards.length === 1) {
      dispatch(leaderboardsListItemClick(leaderboards[0]));
    }
    if (selectedLeaderboard) {
      dispatch(
        leaderboardsListItemClick(
          leaderboards?.filter(
            leaderboard => leaderboard.id === selectedLeaderboard
          )[0]
        )
      );
    }
  };
}

export function fetchLeaderboardsFailed(err, params, append) {
  return dispatch => {
    dispatch({ type: AT.LEADERBOARDS_FETCH_FAILED });
    dispatch(
      CriticalErrorActions.show(err, () => fetchLeaderboards(params, append))
    );
  };
}

export function resetLeaderboards(leaderboardIds, leaderboardNames) {
  return dispatch => {
    dispatch({
      type: AT.LEADERBOARDS_RESET,
      leaderboardIds,
      leaderboardNames,
    });
  };
}

export function resetLeaderboardsFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function fetchLeaderboardsStatus(leaderboardIds) {
  return dispatch => {
    dispatch({
      type: AT.LEADERBOARDS_FETCH_STATUS,
      leaderboardIds,
    });
  };
}

export function resetLeaderboardsSuccess(leaderboardIds) {
  return dispatch => {
    dispatch(fetchLeaderboardsStatus(leaderboardIds));
    dispatch(
      GlobalSnackBarActions.show(
        'Successfully queued Leaderboards for reset.',
        'success'
      )
    );
  };
}

export function fetchLeaderboardsStatusSuccess(payload) {
  return dispatch => {
    dispatch({
      type: AT.LEADERBOARDS_FETCH_STATUS_SUCCESS,
      status: payload,
    });
  };
}

export function fetchLeaderboardsStatusFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
