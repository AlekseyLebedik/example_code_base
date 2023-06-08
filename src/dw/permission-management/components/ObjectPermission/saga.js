import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as api from '@demonware/devzone-core/services/permissions';
// mocks
import { nonCriticalError } from '@demonware/devzone-core/helpers/errors';
import { show } from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as actions from './actions';
import * as actionTypes from './actionTypes';

function* fetchContentTypePermissions(action) {
  const { id } = action;
  try {
    const {
      data: { data },
    } = yield call(api.getContentTypePermissions, id);
    yield put(actions.fetchContentTypeSuccess(id, data));
  } catch (e) {
    yield put(actions.fetchContentTypeFail(id, e));
  }
}

function* fetchCompanies(params) {
  try {
    const { next } = params;
    const { data } = yield call(api.getCompanies, next);
    yield put(actions.fetchCompaniesSuccess(data.data, !!next));
    if (!data.next) return;
    yield* fetchCompanies({ ...params, next: data.next });
  } catch (e) {
    yield put(actions.fetchCompaniesFail(e));
  }
}

function* fetchObjectPermissions(action) {
  const { entityType, ctypeId, objectId } = action;
  const apiFn = {
    user: api.getUserObjectPermissions,
    company: api.getCompanyObjectPermission,
    group: api.getCompanyGroupObjectPermissions,
  }[entityType];

  try {
    if (apiFn === undefined)
      throw new Error(`No function for entityType ${entityType}`);

    const {
      data: { data },
    } = yield call(apiFn, ctypeId, objectId);
    yield put(
      actions.fetchObjectPermissionsSuccess(entityType, ctypeId, objectId, data)
    );
  } catch (e) {
    actions.fetchObjectPermissionsFail(entityType, ctypeId, objectId, e);
  }
}

function* fetchCompanyGroups() {
  try {
    const {
      data: { data },
    } = yield call(api.getCompanyGroups);
    yield put(actions.fetchCompanyGroupsSuccess(data));
  } catch (e) {
    yield put(actions.fetchCompanyGroupsFail(e));
  }
}

function* grantPermissions(action) {
  const { entityType, ctypeId, objectId, permissions } = action;
  const apiFn = {
    user: api.addUserObjectPermissions,
    company: api.addCompanyObjectPermissions,
    group: api.addCompanyGroupObjectPermissions,
  }[entityType];

  try {
    if (apiFn === undefined)
      throw new Error(`No function for entityType ${entityType}`);

    if (permissions.length > 0)
      yield call(apiFn, ctypeId, objectId, permissions);

    yield put(
      actions.grantPermissionsSuccess(
        entityType,
        ctypeId,
        objectId,
        permissions
      )
    );
  } catch (e) {
    yield put(
      actions.grantPermissionsFail(
        entityType,
        ctypeId,
        objectId,
        permissions,
        e
      )
    );
  }
}

function* revokePermissions(action) {
  const { entityType, ctypeId, objectId, permissions } = action;
  const apiFn = {
    user: api.deleteUserObjectPermissions,
    company: api.deleteCompanyObjectPermissions,
    group: api.deleteCompanyGroupObjectPermissions,
  }[entityType];

  try {
    if (apiFn === undefined)
      throw new Error(`No function for entityType ${entityType}`);

    if (permissions.length > 0)
      yield call(apiFn, ctypeId, objectId, permissions);

    yield put(
      actions.revokePermissionsSuccess(
        entityType,
        ctypeId,
        objectId,
        permissions
      )
    );
  } catch (e) {
    yield put(
      actions.revokePermissionsFail(
        entityType,
        ctypeId,
        objectId,
        permissions,
        e
      )
    );
  }
}

function* showSuccessMessage() {
  yield put(show(`Permissions set successfully`, 'success'));
}

function* showGrantPermissionFailure({ entityType }) {
  yield put(nonCriticalError(`Error granting ${entityType} permissions`));
}

function* showRevokePermissionFailure({ entityType }) {
  yield put(nonCriticalError(`Error revoking ${entityType} permissions`));
}

function* fetchRelatedObjectPermissions({ contentTypeId, id }) {
  try {
    const { data } = yield call(api.getRelatedPermissions, id, contentTypeId);
    yield put(actions.fetchRelatedPermissionsSuccess(data));
  } catch (e) {
    console.log('error ', e);
  }
}

function* saga() {
  yield takeEvery(actionTypes.CONTENT_TYPE_FETCH, fetchContentTypePermissions);
  yield takeLatest(actionTypes.COMPANIES_FETCH, fetchCompanies);
  yield takeLatest(actionTypes.COMPANY_GROUPS_FETCH, fetchCompanyGroups);
  yield takeEvery(actionTypes.GRANT_PERMISSIONS, grantPermissions);
  yield takeEvery(actionTypes.REVOKE_PERMISSIONS, revokePermissions);
  yield takeEvery(
    actionTypes.GRANT_PERMISSIONS_FAIL,
    showGrantPermissionFailure
  );
  yield takeEvery(
    actionTypes.REVOKE_PERMISSIONS_FAIL,
    showRevokePermissionFailure
  );
  yield takeLatest(actionTypes.GRANT_PERMISSIONS_SUCCESS, showSuccessMessage);

  yield takeLatest(actionTypes.REVOKE_PERMISSIONS_SUCCESS, showSuccessMessage);
  yield takeEvery(actionTypes.OBJECT_PERMISSIONS_FETCH, fetchObjectPermissions);
  yield takeLatest(
    actionTypes.FETCH_RELATED_PERMISSONS,
    fetchRelatedObjectPermissions
  );
}

export default saga;
