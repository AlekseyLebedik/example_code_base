import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getAccounts as apiFetchAccounts,
  exportAccounts as apiExportAccounts,
} from 'dw/online-configuration/services/accounts';
import * as Actions from './actions';
import { ACCOUNTS_FETCH, ACCOUNTS_EXPORT } from './actionTypes';

function* fetchAccounts(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchAccounts, params);
    yield put(Actions.fetchAccountsSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchAccountsFailed(e, params, append));
  }
}

function* exportAccounts(action) {
  try {
    const { data } = yield call(apiExportAccounts, action.fileType);
    yield put(
      Actions.exportAccountsSuccess({
        fileData: data,
        fileName: `accounts.${action.fileType}`,
      })
    );
  } catch (e) {
    yield put(Actions.exportAccountsFailed(e));
  }
}

function* saga() {
  yield takeLatest(ACCOUNTS_FETCH, fetchAccounts);
  yield takeLatest(ACCOUNTS_EXPORT, exportAccounts);
}

export default saga;
