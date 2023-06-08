import { call, put, takeLatest } from 'redux-saga/effects';

import { getServersAllocation } from 'dw/online-configuration/services/matchmaking';
import * as Actions from './actions';
import { SERVERS_ALLOC_FETCH } from './actionTypes';

function* fetchServersAllocation() {
  try {
    const { data } = yield call(getServersAllocation);
    yield put(Actions.fetchServersAllocationSuccess(data.data));
  } catch (e) {
    yield put(Actions.fetchServersAllocationFailed(e));
  }
}

function* saga() {
  yield takeLatest(SERVERS_ALLOC_FETCH, fetchServersAllocation);
}

export default saga;
