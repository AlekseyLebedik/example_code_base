import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getLeaderboardData as apiFetchLeaderboardData,
  deleteLeaderboardEntities as apiDeleteLeaderboardEntities,
  resetLeaderboard as apiResetLeaderboard,
} from 'dw/online-configuration/services/leaderboards';
import * as Actions from './actions';
import {
  LEADERBOARD_DATA_FETCH,
  LEADERBOARD_DELETE_ENTITIES,
  LEADERBOARD_RESET,
} from './actionTypes';

function* fetchLeaderboardData(action) {
  const { successCallback, failCallback, ...params } = action.params;
  try {
    const { data } = yield call(apiFetchLeaderboardData, action.leaderboardID, {
      ...params,
    });
    const { entities, nextPageToken } = data;
    if (successCallback) successCallback(entities, nextPageToken);
    yield put(Actions.fetchLeaderboardDataSuccess(data, action.append));
  } catch (e) {
    if (failCallback) failCallback(e);
    yield put(Actions.fetchLeaderboardFailed(e));
  }
}

function* deleteLeaderboardEntities(action) {
  try {
    yield call(
      apiDeleteLeaderboardEntities,
      action.leaderboardId,
      action.entityIds
    );
    yield put(Actions.deleteLeaderboardEntitiesSuccess(action.entityIds));
  } catch (e) {
    yield put(Actions.deleteLeaderboardEntitiesFailed(e));
  }
}

function* resetLeaderboard(action) {
  try {
    yield call(apiResetLeaderboard, action.leaderboardId);
    yield put(Actions.resetLeaderboardSuccess(action.leaderboardId));
  } catch (e) {
    yield put(Actions.resetLeaderboardFailed(e));
  }
}

function* saga() {
  yield takeLatest(LEADERBOARD_DATA_FETCH, fetchLeaderboardData);
  yield takeLatest(LEADERBOARD_DELETE_ENTITIES, deleteLeaderboardEntities);
  yield takeLatest(LEADERBOARD_RESET, resetLeaderboard);
}

export default saga;
