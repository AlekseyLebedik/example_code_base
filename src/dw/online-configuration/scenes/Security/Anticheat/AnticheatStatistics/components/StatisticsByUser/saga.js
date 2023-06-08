import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchAnticheatStatistics(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(API.getAnticheatStatisticsByUser, params);
    yield put(Actions.fetchAnticheatStatisticsSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchAnticheatStatisticsFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.ANTICHEAT_STATISTICS_FETCH, fetchAnticheatStatistics);
}

export default saga;
