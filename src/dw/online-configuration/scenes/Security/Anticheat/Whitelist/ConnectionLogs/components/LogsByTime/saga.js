import { call, put, takeLatest } from 'redux-saga/effects';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchConnectionLogs(action) {
  const {
    successCallback,
    failCallback,
    ascending,
    updateTime,
    dateTo,
    nextPageToken,
  } = action.params;
  try {
    const { data } = yield call(API.getConnectionLogsByTime, {
      updateTime,
      dateTo,
      ascending,
      nextPageToken,
    });
    if (successCallback) successCallback(data?.data, data?.nextPageToken);
    if (!data?.supportTimerange && dateTo) {
      yield put(
        GlobalSnackBarActions.show(
          'Fetching logs within a time range is not supported on this title.',
          'error'
        )
      );
    }
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
