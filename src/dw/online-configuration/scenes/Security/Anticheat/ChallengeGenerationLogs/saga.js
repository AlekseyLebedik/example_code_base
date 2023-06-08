import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchChallengeGenerationLogs(action) {
  try {
    const { data } = yield call(API.getChallengeGenerationLogs, action.params);
    yield put(Actions.fetchChallengeGenerationLogsSuccess(data, action.append));
  } catch (e) {
    yield put(Actions.fetchChallengeGenerationLogsFailed(e, action));
  }
}

function* saga() {
  yield takeLatest(
    AT.CHALLENGE_GENERATION_LOGS_FETCH,
    fetchChallengeGenerationLogs
  );
}

export default saga;
