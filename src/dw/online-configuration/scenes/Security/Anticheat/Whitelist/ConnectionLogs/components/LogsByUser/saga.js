import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchConnectionLogs(action) {
  const { successCallback, failCallback, ascending, userID, nextPageToken } =
    action.params;
  try {
    const { data } = yield call(API.getConnectionLogsByUser, {
      userID,
      ascending,
      nextPageToken,
    });
    if (successCallback) successCallback(data?.data, data?.nextPageToken);
    yield put(Actions.fetchConnectionLogsSuccess(data, action.append));
  } catch (e) {
    if (failCallback) failCallback(e);
    yield put(Actions.fetchConnectionLogsFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.CONNECTION_LOGS_FETCH, fetchConnectionLogs);
}

export default saga;
