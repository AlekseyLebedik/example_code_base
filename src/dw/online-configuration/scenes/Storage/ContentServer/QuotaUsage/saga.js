import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchQuotaUsage as apiFetchQuotaUsage,
  addQuotaUsage as apiAddQuotaUsage,
} from 'dw/online-configuration/services/storages';
import * as Actions from './actions';
import {
  STORAGE_QUOTA_USAGE_FETCH,
  STORAGE_QUOTA_USAGE_ADD,
} from './actionTypes';

function* fetchQuotaUsage(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchQuotaUsage, params);
    yield put(Actions.fetchQuotaUsageSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchQuotaUsageFailed(e, params, append));
  }
}

function* addQuotaUsage(action) {
  try {
    const { data } = yield call(apiAddQuotaUsage, action.values);
    yield put(Actions.addQuotaUsageSuccess(data));
  } catch (e) {
    yield put(Actions.addQuotaUsageFailed(e));
  }
}

function* saga() {
  yield takeLatest(STORAGE_QUOTA_USAGE_FETCH, fetchQuotaUsage);
  yield takeLatest(STORAGE_QUOTA_USAGE_ADD, addQuotaUsage);
}

export default saga;
