import { call, takeLatest, put } from 'redux-saga/effects';
import { getSaga, getLoopSaga } from '@demonware/devzone-core/helpers/sagas';
import * as API from 'dw/permission-management/services/users';
import { fetchNextUrl } from 'dw/devzone/services/general';
import {
  fetchUserCompanyMemberships as apiFetchMemberships,
  changeUserMemberships as apiChangeUserMemberships,
} from '@demonware/devzone-core/services/user';
import * as permissionsAPI from 'dw/permission-management/services/permissions';

import {
  USERS_LIST_PREFIX,
  AVAILABLE_GROUPS_LIST_PREFIX,
  ASSIGNED_GROUPS_LIST_PREFIX,
  PERMISSION_GROUPS_FORM_NAME,
  USERS_PREFIX,
  RESOURCE_TYPE,
  COMPANIES_LIST_PREFIX,
  USER_MEMBERSHIPS_PREFIX,
} from './constants';
import * as AT from './actionTypes';
import * as Actions from './actions';
import {
  getPermissionsSagas,
  getContentTypesDetailsSaga,
} from '../sagaCreators';

const fetchUsersSaga = getSaga(USERS_LIST_PREFIX, params =>
  API.getUsers(params)
);

const fetchAvailableGroupsSaga = getSaga(AVAILABLE_GROUPS_LIST_PREFIX, params =>
  API.getAvailableGroups(params)
);

const fetchAssignedGroupsSaga = getSaga(ASSIGNED_GROUPS_LIST_PREFIX, params =>
  API.getAssignedGroups(params)
);

const fetchUserMembershipsSaga = getSaga(
  USER_MEMBERSHIPS_PREFIX,
  apiFetchMemberships,
  null
);

const fetchCompaniesListSaga = getLoopSaga(
  COMPANIES_LIST_PREFIX,
  permissionsAPI.getCompaniesList,
  fetchNextUrl
);

function* saveUserCompaniesAndGroups(action) {
  const {
    userID,
    params: { companies, groups },
  } = action;
  try {
    yield call(apiChangeUserMemberships, userID, companies);
    yield call(API.addUserToGroup, userID, groups);
    yield put(Actions.saveUserCompaniesAndGroupsSuccess(userID));
  } catch (e) {
    yield put(Actions.saveUserCompaniesAndGroupsFailed(e));
  }
}

function* saga() {
  yield takeLatest(
    AT.SAVE_USER_COMPANIES_AND_GROUPS,
    saveUserCompaniesAndGroups
  );
}

const permissionsSagas = getPermissionsSagas(
  USERS_PREFIX,
  PERMISSION_GROUPS_FORM_NAME,
  RESOURCE_TYPE
);

const contentTypesDetailsSaga = getContentTypesDetailsSaga(USERS_PREFIX);

export default [
  fetchUsersSaga,
  fetchAvailableGroupsSaga,
  fetchAssignedGroupsSaga,
  fetchCompaniesListSaga,
  fetchUserMembershipsSaga,
  saga,
  contentTypesDetailsSaga,
  ...permissionsSagas,
];
