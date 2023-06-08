import { call, put, takeLatest } from 'redux-saga/effects';

import { beat } from 'dw/devzone/services/healthCheck';
import { allGood, somethingWrong } from './actions';
import { HEALTH_CHECK_BEAT } from './actionTypes';

function* checkBeat() {
  try {
    yield call(beat);
    yield put(allGood());
  } catch (e) {
    yield put(somethingWrong(e));
  }
}

function* saga() {
  yield takeLatest(HEALTH_CHECK_BEAT, checkBeat);
}

export default saga;
