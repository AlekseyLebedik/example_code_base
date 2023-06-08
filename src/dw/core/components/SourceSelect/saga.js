import { call, put, takeLatest } from 'redux-saga/effects';
import delay from '@redux-saga/delay-p';

import * as Actions from './actions';
import { SOURCE_SELECT_FETCH } from './actionTypes';

function* fetch(action) {
  try {
    yield delay(500);
    const { data } = yield call(action.apiCall, action.input);
    yield put(Actions.fetchSuccess(data));
  } catch (e) {
    yield put(Actions.fetchFailed(e));
  }
}

function* saga() {
  yield takeLatest(SOURCE_SELECT_FETCH, fetch);
}

export default saga;
