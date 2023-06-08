import { call, put, takeLatest } from 'redux-saga/effects';

import { getCalls as apiFetchCalls } from 'dw/online-configuration/services/debugging';
import * as Actions from './actions';
import { CALLS_FETCH } from './actionTypes';

function* fetchCalls(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchCalls, params);
    yield put(Actions.fetchCallsSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchCallsFailed(e, params, append));
  }
}

function* saga() {
  yield takeLatest(CALLS_FETCH, fetchCalls);
}

export default saga;
