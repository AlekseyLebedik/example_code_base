import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import {
  MONITORED_USERS_FETCH,
  MONITORED_USERS_ADD,
  MONITORED_USERS_DELETE,
} from './actionTypes';

function* fetchMonitoredUsers(action) {
  try {
    const { data } = yield call(API.getMonitoredUsers);
    yield put(Actions.fetchMonitoredUsersSuccess(data));
  } catch (e) {
    yield put(Actions.fetchMonitoredUsersFailed(e, action));
  }
}

function* addMonitoredUser(action) {
  try {
    yield call(API.addMonitoredUser, action.values);
    yield put(Actions.addMonitoredUserSuccess());
  } catch (e) {
    yield put(Actions.addMonitoredUserFailed(e));
  }
}

function* deleteMonitoredUsers(action) {
  const deleteAllMonitoredUsers = () =>
    action.userIds.map(userId => call(API.deleteMonitoredUser, userId));
  try {
    yield all(deleteAllMonitoredUsers());
    yield put(Actions.deleteMonitoredUsersSuccess(action.userIds));
  } catch (e) {
    yield put(Actions.deleteMonitoredUsersFailed(e));
  }
}

function* saga() {
  yield takeLatest(MONITORED_USERS_FETCH, fetchMonitoredUsers);
  yield takeLatest(MONITORED_USERS_ADD, addMonitoredUser);
  yield takeLatest(MONITORED_USERS_DELETE, deleteMonitoredUsers);
}

export default saga;
