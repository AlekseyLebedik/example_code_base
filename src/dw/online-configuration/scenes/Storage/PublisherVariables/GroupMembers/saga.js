import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchMemberGroups as apiFetchMemberGroups,
  addGroupMembers as apiAddGroupMembers,
  deleteGroupMembers as apiDeleteGroupMembers,
  fetchGroupDetails as apiFetchGroupDetails,
} from 'dw/online-configuration/services/storages';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchMemberGroups(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchMemberGroups, params);
    yield put(Actions.fetchMemberGroupsSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchMemberGroupsFailed(e, params, append));
  }
}

function* addGroupMembers(action) {
  try {
    const { data } = yield call(apiAddGroupMembers, action.values);
    yield put(Actions.addGroupMemberSuccess(data));
  } catch (e) {
    yield put(Actions.addGroupMemberFailed(e));
  }
}

function* deleteGroupMembers(action) {
  try {
    yield call(apiDeleteGroupMembers, action.groupId, action.userIds);
    yield put(
      Actions.deleteGroupMembersSuccess(action.groupId, action.userIds)
    );
  } catch (e) {
    yield put(Actions.deleteGroupMembersFailed(e));
  }
}

function* fetchGroupDetails(action) {
  try {
    const { data } = yield call(apiFetchGroupDetails, action.groupID);
    yield put(Actions.fetchGroupDetailsSuccess(action.groupID, data));
  } catch (e) {
    yield put(Actions.fetchGroupDetailsFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.STORAGE_GROUP_MEMBERS_FETCH, fetchMemberGroups);
  yield takeLatest(AT.STORAGE_GROUP_MEMBERS_ADD, addGroupMembers);
  yield takeLatest(AT.STORAGE_GROUP_MEMBERS_DELETE, deleteGroupMembers);
  yield takeLatest(
    AT.STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS,
    fetchGroupDetails
  );
}

export default saga;
