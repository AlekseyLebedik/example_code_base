import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchQuotaAllowance as apiFetchQuotaAllowance,
  addQuotaAllowance as apiAddQuotaAllowance,
} from 'dw/online-configuration/services/storages';
import * as Actions from './actions';
import {
  STORAGE_QUOTA_ALLOWANCE_FETCH,
  STORAGE_QUOTA_ALLOWANCE_ADD,
} from './actionTypes';

function* fetchQuotaAllowance(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchQuotaAllowance, params);
    yield put(Actions.fetchQuotaAllowanceSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchQuotaAllowanceFailed(e, params, append));
  }
}

function* addQuotaAllowance(action) {
  try {
    const { data } = yield call(apiAddQuotaAllowance, action.values);
    yield put(Actions.addQuotaAllowanceSuccess(data));
  } catch (e) {
    yield put(Actions.addQuotaAllowanceFailed(e));
  }
}

function* saga() {
  yield takeLatest(STORAGE_QUOTA_ALLOWANCE_FETCH, fetchQuotaAllowance);
  yield takeLatest(STORAGE_QUOTA_ALLOWANCE_ADD, addQuotaAllowance);
}

export default saga;
