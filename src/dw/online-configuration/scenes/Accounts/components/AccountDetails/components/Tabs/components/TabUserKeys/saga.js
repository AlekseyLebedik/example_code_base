import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getUserKeys as apiGetUserKeys,
  addUserKey as apiAddUserKey,
} from 'dw/online-configuration/services/accounts';

import * as Actions from './actions';
import {
  ACCOUNTS_TAB_USER_KEYS_FETCH,
  ACCOUNTS_TAB_USER_KEYS_ADD,
} from './actionTypes';

function* fetchUserKeys(action) {
  try {
    const { data } = yield call(apiGetUserKeys, action.userID);
    yield put(Actions.fetchUserKeysSuccess(data));
  } catch (e) {
    yield put(Actions.fetchUserKeysFailed(e));
  }
}

function* addUserKey(action) {
  try {
    yield call(apiAddUserKey, action.userID, action.values);
    yield put(Actions.addUserKeySuccess());
  } catch (e) {
    yield put(Actions.addUserKeyFailed(e));
  }
}

function* saga() {
  yield takeLatest(ACCOUNTS_TAB_USER_KEYS_FETCH, fetchUserKeys);
  yield takeLatest(ACCOUNTS_TAB_USER_KEYS_ADD, addUserKey);
}

export default saga;
