import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as API from 'dw/permission-management/services/permissions';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import {
  DELETE_PERMISSION_GROUP,
  FORM_NAME,
  GROUP_USERS_LIST_PREFIX,
  GROUP_USERS_PREFIX,
  GROUPS_LIST_PREFIX,
  GROUPS_PREFIX,
  RESOURCE_TYPE,
} from './constants';
import * as groupActions from './actions';
import {
  getPermissionsSagas,
  getContentTypesDetailsSaga,
  availableUsers,
} from '../sagaCreators';

const fetchGroupsListSaga = getSaga(GROUPS_LIST_PREFIX, params =>
  API.fetchGroups(params)
);

function* fetchGroupUsersListSaga(action) {
  const { params } = action;
  try {
    const { data } = yield call(API.getGroupUsers, params);
    let { nextPageToken } = data;
    const aggrData = [...data.data];
    while (nextPageToken !== null) {
      const response = yield call(API.getGroupUsers, {
        ...params,
        nextPageToken,
      });
      // eslint-disable-next-line prefer-destructuring
      nextPageToken = response.data.nextPageToken;
      aggrData.push(...response.data.data);
    }
    yield put(groupActions.fetchGroupUsersSuccess(aggrData));
  } catch (e) {
    yield put(groupActions.fetchGroupUsersFailed(e));
  }
}

function* createObjectGroup(action) {
  try {
    const { groupName, companyId, members } = action.group;
    const { data } = yield call(API.createCompanyGroup, companyId, groupName);
    yield call(API.editGroupUsers, data.id, {
      users: members.map(id => ({ id })),
    });
    yield put(groupActions.createGroupSuccess(action.group));
    yield put(groupActions.fetchGroups());
  } catch (e) {
    yield put(groupActions.createGroupFailed(e));
  }
}

function* deleteObjectGroup({ group }) {
  try {
    yield call(API.deleteCompanyGroup, group.id);
    yield put({ type: `${DELETE_PERMISSION_GROUP}_SUCCESS` });
    yield put(
      GlobalSnackBarActions.show(
        `Group "${group.name}" successfully deleted.`,
        'success'
      )
    );
    yield put(groupActions.fetchGroups());
  } catch (e) {
    yield put({ type: `${DELETE_PERMISSION_GROUP}_FAILED` });
    yield put(nonCriticalHTTPError(e));
  }
}

const permissionsSagas = getPermissionsSagas(
  GROUPS_PREFIX,
  FORM_NAME,
  RESOURCE_TYPE
);

const contentTypesDetailsSaga = getContentTypesDetailsSaga(GROUPS_PREFIX);

function* editGroupUsers(action) {
  const { groupId, data } = action;
  try {
    yield call(API.editGroupUsers, groupId, data);
  } catch (e) {
    yield put(groupActions.editGroupUsersFailed(e));
  }
}

function* groupObjectPermissionsSaga() {
  yield takeLatest(`${GROUP_USERS_PREFIX}_PUT`, editGroupUsers);
  yield takeLatest(`${GROUPS_LIST_PREFIX}_CREATE_GROUP`, createObjectGroup);
  yield takeLatest(DELETE_PERMISSION_GROUP, deleteObjectGroup);
  yield takeLatest(`${GROUP_USERS_LIST_PREFIX}_FETCH`, fetchGroupUsersListSaga);
}

export default [
  fetchGroupsListSaga,
  groupObjectPermissionsSaga,
  availableUsers,
  contentTypesDetailsSaga,
  ...permissionsSagas,
];
