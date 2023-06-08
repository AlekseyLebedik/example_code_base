import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { uuid } from 'dw/core/helpers/uuid';
import { setSelectedRowKeys } from 'dw/core/components/TableHydrated';
import * as AT from './actionTypes';
import { fetchLeaderboardsStatus } from '../../actions';

export const fetchLeaderboardData = (
  leaderboardID,
  params,
  append = false
) => ({
  type: AT.LEADERBOARD_DATA_FETCH,
  leaderboardID,
  params,
  append,
});

export const fetchLeaderboardDataSuccess = (payload, append) => ({
  type: AT.LEADERBOARD_DATA_FETCH_SUCCESS,
  entities: payload.entities,
  nextPageToken: payload.nextPageToken,
  append,
});

export const fetchLeaderboardFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));

export const deleteLeaderboardEntities = (leaderboardId, entityIds) => ({
  type: AT.LEADERBOARD_DELETE_ENTITIES,
  leaderboardId,
  entityIds,
});

export const deleteLeaderboardEntitiesSuccess = entityIds => dispatch => {
  dispatch({
    type: AT.LEADERBOARD_DELETE_ENTITIES_SUCCESS,
    entityIds,
    refreshId: uuid(),
  });
  dispatch(
    GlobalSnackBarActions.show('Entities successfully deleted.', 'success')
  );
  dispatch(setSelectedRowKeys([]));
};

export const deleteLeaderboardEntitiesFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));

export const resetLeaderboard = leaderboardId => ({
  type: AT.LEADERBOARD_RESET,
  leaderboardId,
});

export const resetLeaderboardSuccess = leaderboardId => dispatch => {
  dispatch(fetchLeaderboardsStatus([leaderboardId]));
  dispatch({
    type: AT.LEADERBOARD_RESET_SUCCESS,
    refreshId: uuid(),
  });
  dispatch(
    GlobalSnackBarActions.show('Leaderboard was successfuly reset.', 'success')
  );
};

export const resetLeaderboardFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));
