import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { setSelectedRowKeys } from 'dw/core/components/TableHydrated';
import * as AT from './actionTypes';

export function fetchLeaderboardRanges(params) {
  return {
    type: AT.LEADERBOARD_RANGES_FETCH,
    params,
  };
}

export function fetchLeaderboardRangesSuccess(payload) {
  return {
    type: AT.LEADERBOARD_RANGES_FETCH_SUCCESS,
    leaderboardRanges: payload.data,
  };
}

export function fetchLeaderboardRangesFailed(err, action) {
  return dispatch => {
    dispatch(GlobalProgressActions.done());
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}

export function addLeaderboardRange(values) {
  return dispatch => {
    dispatch({
      type: AT.LEADERBOARD_RANGE_ADD,
      values,
    });
    dispatch(ModalHandlers.submit());
  };
}

export function addLeaderboardRangeSuccess() {
  return dispatch => {
    dispatch(ModalHandlers.close());
    dispatch(
      GlobalSnackBarActions.show(
        'Leaderboard Range was successfully added.',
        'success'
      )
    );
    dispatch(fetchLeaderboardRanges());
  };
}

export function addLeaderboardRangeFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
    dispatch({
      type: AT.LEADERBOARD_RANGE_ADD_FAILED,
    });
    dispatch(ModalHandlers.stopSubmitting());
  };
}

export function deleteLeaderboardRange(rangeIds) {
  return dispatch => {
    dispatch({
      type: AT.LEADERBOARD_RANGE_DELETE,
      rangeIds,
    });
    dispatch(
      GlobalSnackBarActions.show(
        'Leaderboard Ranges deleted properly.',
        'success'
      )
    );
  };
}

export const deleteLeaderboardRangeSuccess = rangeIds => dispatch => {
  dispatch({
    type: AT.LEADERBOARD_RANGE_DELETE_SUCCESS,
    rangeIds,
  });
  dispatch(setSelectedRowKeys([]));
};

export function deleteLeaderboardRangeFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
