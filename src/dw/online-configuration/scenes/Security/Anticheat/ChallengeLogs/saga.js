import { call, put, takeLatest } from 'redux-saga/effects';

import { getChallengeLogs } from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchChallengeLogs(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(getChallengeLogs, params);
    yield put(Actions.fetchChallengeLogsSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchChallengeLogsFailed(e, params, append));
  }
}

function* saga() {
  yield takeLatest(AT.SECURITY_CHALLENGE_LOGS_FETCH, fetchChallengeLogs);
}

export default saga;
