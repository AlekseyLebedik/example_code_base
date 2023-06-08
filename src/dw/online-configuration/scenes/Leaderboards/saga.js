import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getLeaderboards as apiFetchLeaderboards,
  getLeaderboardsStatus as apiFetchLeaderboardsStatus,
  resetLeaderboards as apiResetLeaderboards,
} from 'dw/online-configuration/services/leaderboards';
import * as Actions from './actions';
import {
  LEADERBOARDS_FETCH,
  LEADERBOARDS_FETCH_STATUS,
  LEADERBOARDS_RESET,
} from './actionTypes';
import { selectedLeaderboardDataFetched } from './helpers';

function* fetchLeaderboards(action) {
  const {
    params: { selectedLeaderboard = undefined, ...params },
    append,
  } = action;
  try {
    let { data } = yield call(apiFetchLeaderboards, params);

    // If the selected leaderboard is not in the fetched data,
    // set stillLoading to true so that more leaderboards can
    // be fetched until either the selected leaderboard data is
    // in the fetched data or all have been fetched
    let stillLoading =
      selectedLeaderboard &&
      !selectedLeaderboardDataFetched(data.data, selectedLeaderboard);

    yield put(
      Actions.fetchLeaderboardsSuccess(
        data,
        append,
        selectedLeaderboard,
        stillLoading
      )
    );

    // Keep fetching until the selected leaderboard is in the fetched data.
    // If nextPageToken was passed through params, this indicates that this
    // isn't the initial fetch, and this comes from clicking "SHOW MORE", so
    // don't keep fetching in that instance
    let { nextPageToken } = data;
    while (
      !!selectedLeaderboard &&
      !params.nextPageToken &&
      nextPageToken &&
      !selectedLeaderboardDataFetched(data.data, selectedLeaderboard)
    ) {
      ({ data } = yield call(apiFetchLeaderboards, {
        ...params,
        nextPageToken,
      }));
      nextPageToken = data.nextPageToken;
      // If there's a nextPageToken and the selected leaderboard hasn't
      // been found, keep fetching
      stillLoading =
        nextPageToken &&
        !selectedLeaderboardDataFetched(data.data, selectedLeaderboard);

      yield put(
        Actions.fetchLeaderboardsSuccess(
          data,
          true,
          selectedLeaderboard,
          stillLoading
        )
      );
    }
  } catch (e) {
    yield put(Actions.fetchLeaderboardsFailed(e, params, append));
  }
}

function* resetLeaderboards(action) {
  try {
    yield call(
      apiResetLeaderboards,
      action.leaderboardIds,
      action.leaderboardNames
    );
    yield put(Actions.resetLeaderboardsSuccess(action.leaderboardIds));
  } catch (e) {
    yield put(Actions.resetLeaderboardsFailed(e));
  }
}

function* fetchLeaderboardsStatus(action) {
  try {
    const { data } = yield call(
      apiFetchLeaderboardsStatus,
      action.leaderboardIds
    );
    yield put(Actions.fetchLeaderboardsStatusSuccess(data));
  } catch (e) {
    yield put(Actions.fetchLeaderboardsStatusFailed(e));
  }
}

function* saga() {
  yield takeLatest(LEADERBOARDS_FETCH, fetchLeaderboards);
  yield takeLatest(LEADERBOARDS_RESET, resetLeaderboards);
  yield takeLatest(LEADERBOARDS_FETCH_STATUS, fetchLeaderboardsStatus);
}

export default saga;
