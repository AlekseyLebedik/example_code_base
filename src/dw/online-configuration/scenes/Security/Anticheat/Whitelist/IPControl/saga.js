import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchIPControl(action) {
  try {
    const { data } = yield call(API.getIPControl, action.params);
    yield put(Actions.fetchIPControlSuccess(data, action.append));
  } catch (e) {
    yield put(Actions.fetchIPControlFailed(e, action));
  }
}

function* fetchAllIPControl(action) {
  try {
    let response = yield call(API.getIPControl, action.params);
    let { data, nextPageToken } = response.data;
    let results = data;
    while (nextPageToken) {
      response = yield call(API.getIPControl, {
        ...action.params,
        nextPageToken,
      });
      ({ data, nextPageToken } = response.data);
      results = [...results, ...data];
    }
    yield put(
      Actions.fetchAllIPControlSuccess({ data: results }, action.append)
    );
  } catch (e) {
    yield put(Actions.fetchAllIPControlFailed(e, action));
  }
}

function* fetchWhitelistedUsers(action) {
  try {
    const { data } = yield call(API.getWhitelistedUsers, action.params);
    yield put(Actions.fetchWhitelistedUsersSuccess(data, action.append));
  } catch (e) {
    yield put(Actions.fetchWhitelistedUsersFailed(e, action));
  }
}

function* fetchIPGroups(action) {
  try {
    let response = yield call(API.getIPGroups, action.params);
    let { data, nextPageToken } = response.data;
    let results = data;
    while (nextPageToken) {
      response = yield call(API.getIPGroups, {
        ...action.params,
        nextPageToken,
      });
      ({ data, nextPageToken } = response.data);
      results = [...results, ...data];
    }
    yield put(Actions.fetchIPGroupsSuccess({ data: results }, action.append));
  } catch (e) {
    yield put(Actions.fetchIPGroupsFailed(e, action));
  }
}

function* fetchIPNotes(action) {
  try {
    let response = yield call(API.getIPNotes, action.params);
    let { data, nextPageToken } = response.data;
    let results = data;
    while (nextPageToken) {
      response = yield call(API.getIPNotes, {
        ...action.params,
        nextPageToken,
      });
      ({ data, nextPageToken } = response.data);
      results = [...results, ...data];
    }
    yield put(Actions.fetchIPNotesSuccess({ data: results }, action.append));
  } catch (e) {
    yield put(Actions.fetchIPNotesFailed(e, action));
  }
}
function* addIPControl(action) {
  try {
    yield call(API.addIPControl, action.values);
    yield put(Actions.addIPControlSuccess(action.values));
  } catch (e) {
    yield put(Actions.addIPControlFailed(e));
  }
}

function* deleteIPControl(action) {
  try {
    yield call(API.deleteIPControl, action.ips);
    yield put(Actions.deleteIPControlSuccess(action.ips));
  } catch (e) {
    yield put(Actions.deleteIPControlFailed(e));
  }
}

function* addIPNote(action) {
  try {
    const response = yield call(API.addIPNote, action.values);
    yield put(Actions.addIPNoteSuccess(response.data));
  } catch (e) {
    yield put(Actions.addIPNoteFailed(e));
  }
}

function* updateIPNote(action) {
  try {
    const response = yield call(API.updateIPNote, action.values);
    yield put(Actions.updateIPNoteSuccess(response.data));
  } catch (e) {
    yield put(Actions.updateIPNoteFailed(e));
  }
}

function* deleteIPNote(action) {
  try {
    const response = yield call(API.deleteIPNote, action.values);
    yield put(Actions.deleteIPNoteSuccess(response.data));
  } catch (e) {
    yield put(Actions.deleteIPNoteFailed(e));
  }
}

function* addIPGroup(action) {
  try {
    const response = yield call(API.addIPGroup, action.values);
    yield put(Actions.addIPGroupSuccess(response.data));
  } catch (e) {
    yield put(Actions.addIPGroupFailed(e));
  }
}

function* deleteIPGroup(action) {
  try {
    const response = yield call(API.deleteIPGroup, action.values);
    yield put(Actions.deleteIPGroupSuccess(response.data));
  } catch (e) {
    yield put(Actions.deleteIPGroupFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.IP_CONTROL_FETCH, fetchIPControl);
  yield takeLatest(AT.IP_CONTROL_FETCH_ALL, fetchAllIPControl);
  yield takeLatest(AT.WHITELISTED_USERS_FETCH, fetchWhitelistedUsers);
  yield takeLatest(AT.IP_CONTROL_ADD, addIPControl);
  yield takeLatest(AT.IP_CONTROL_DELETE, deleteIPControl);
  yield takeLatest(AT.IP_CONTROL_FETCH_GROUPS, fetchIPGroups);
  yield takeLatest(AT.IP_CONTROL_FETCH_NOTES, fetchIPNotes);
  yield takeLatest(AT.IP_CONTROL_ADD_NOTE, addIPNote);
  yield takeLatest(AT.IP_CONTROL_UPDATE_NOTE, updateIPNote);
  yield takeLatest(AT.IP_CONTROL_DELETE_NOTE, deleteIPNote);
  yield takeLatest(AT.IP_CONTROL_ADD_GROUP, addIPGroup);
  yield takeLatest(AT.IP_CONTROL_DELETE_GROUP, deleteIPGroup);
}

export default saga;
