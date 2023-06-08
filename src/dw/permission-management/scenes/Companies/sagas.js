import { takeLatest, call, put } from 'redux-saga/effects';
import * as API from 'dw/permission-management/services/permissions';
import {
  getPermissionsSagas,
  getContentTypesDetailsSaga,
} from '../sagaCreators';

import {
  COMPANIES_PREFIX,
  FORM_NAME,
  RESOURCE_TYPE,
  COMPANY_USERS_PREFIX,
} from './constants';
import * as companyActions from './actions';

const permissionsSagas = getPermissionsSagas(
  COMPANIES_PREFIX,
  FORM_NAME,
  RESOURCE_TYPE
);

const contentTypesDetailsSaga = getContentTypesDetailsSaga(COMPANIES_PREFIX);

function* editCompanyUsers(action) {
  const { companyId, data } = action;
  try {
    yield call(API.editCompanyUsers, companyId, data);
  } catch (e) {
    yield put(companyActions.editCompanyUsersFailed(e));
  }
}

function* companyObjectPermissionsSaga() {
  yield takeLatest(`${COMPANY_USERS_PREFIX}_PUT`, editCompanyUsers);
}

export default [
  contentTypesDetailsSaga,
  companyObjectPermissionsSaga,
  ...permissionsSagas,
];
