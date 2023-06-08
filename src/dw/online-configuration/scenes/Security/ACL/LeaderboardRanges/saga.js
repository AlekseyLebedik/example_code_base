import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import {
  LEADERBOARD_RANGES_FETCH,
  LEADERBOARD_RANGE_ADD,
  LEADERBOARD_RANGE_DELETE,
} from './actionTypes';

function* fetchLeaderboardRanges(action) {
  try {
    const { data } = yield call(API.getLeaderboardRanges, action.params);
    yield put(Actions.fetchLeaderboardRangesSuccess(data));
  } catch (e) {
    yield put(Actions.fetchLeaderboardRangesFailed(e, action));
  }
}

function* addLeaderboardRange(action) {
  try {
    yield call(API.addLeaderboardRange, action.values);
    yield put(Actions.addLeaderboardRangeSuccess());
  } catch (e) {
    yield put(Actions.addLeaderboardRangeFailed(e));
  }
}

function* deleteLeaderboardRanges(action) {
  const deleteRanges = () =>
    action.rangeIds.map(rangeId => call(API.deleteLeaderboardRange, rangeId));
  try {
    yield all(deleteRanges());
    yield put(Actions.deleteLeaderboardRangeSuccess(action.rangeIds));
  } catch (e) {
    yield put(Actions.deleteLeaderboardRangeFailed(e));
  }
}

function* saga() {
  yield takeLatest(LEADERBOARD_RANGES_FETCH, fetchLeaderboardRanges);
  yield takeLatest(LEADERBOARD_RANGE_ADD, addLeaderboardRange);
  yield takeLatest(LEADERBOARD_RANGE_DELETE, deleteLeaderboardRanges);
}

export default saga;
