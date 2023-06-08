import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed,
} from 'redux-form';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import {
  getContentTypes,
  getContentTypeDetail,
  getPermissionsByContentType,
  editObjectPermissions,
  getObjectPermissionsById,
  getAvailableGroupUsers,
  getAvailableNextGroupUsers,
} from 'dw/permission-management/services/permissions';

import * as GenericActions from '@demonware/devzone-core/helpers/actions';

import * as Actions from './actionCreators';
import {
  AVAILABLE_COMPANY_GROUP_USERS_LIST_MODAL_PREFIX,
  AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX,
  CONTENT_TYPES,
  OBJECT_PERMISSIONS,
} from './constants';

export function* editObjectPermissionFailedSaga(prefix, id, error) {
  yield put(Actions.editObjectPermissionsFailed(prefix, id));
  yield put(nonCriticalHTTPError(error));
}

export function* fetchObjectPermissionFailedSaga(prefix, id, error) {
  yield put({
    type: `${prefix}_FETCH_FAILED`,
    id,
  });
  yield put(nonCriticalHTTPError(error));
}

export const createEditObjectPermissions = (prefix, resourceType) =>
  function* editObjectPermissionsSaga(action) {
    const editObjectPermissionsSuccess =
      Actions.createEditObjectPermissionsSuccess(prefix);
    try {
      const { data } = yield call(
        editObjectPermissions,
        action.id,
        action.data,
        resourceType
      );

      yield put(editObjectPermissionsSuccess(action.id, data));
    } catch (e) {
      yield editObjectPermissionFailedSaga(prefix, action.id, e);
    }
  };

export const createFetchObjectPermissions = (prefix, resourceType) =>
  function* fetchObjectPermissions(action) {
    const fetchObjectPermissionsSuccess =
      Actions.createFetchObjectPermissionsSuccess(prefix);
    try {
      let data;
      let {
        data: { data: details, nextPageToken },
      } = yield call(getObjectPermissionsById, action.id, resourceType);
      while (nextPageToken) {
        ({
          data: { data, nextPageToken },
        } = yield call(getObjectPermissionsById, action.id, resourceType, {
          nextPageToken,
        }));
        details = [...details, ...data];
      }
      yield put(
        fetchObjectPermissionsSuccess(action.id, {
          data: details,
          nextPageToken,
        })
      );
    } catch (e) {
      yield fetchObjectPermissionFailedSaga(prefix, action.id, e);
    }
  };

export const createFetchContentDetail = prefix =>
  function* fetchDetail(action) {
    const { cType, companyIds } = action;
    try {
      const companyId = companyIds ? companyIds.join() : undefined;
      let data;
      let {
        data: { data: details, nextPageToken },
      } = yield call(getContentTypeDetail, cType.Links.self.href, {
        companyId,
      });
      while (nextPageToken) {
        ({
          data: { data, nextPageToken },
        } = yield call(getContentTypeDetail, cType.Links.self.href, {
          nextPageToken,
          companyId,
        }));
        details = [...details, ...data];
      }
      const { data: permissionsData } = yield call(
        getPermissionsByContentType,
        cType.id
      );
      return {
        ...cType,
        details,
        permissions: permissionsData.data,
      };
    } catch (e) {
      yield put(GenericActions.fetchFailed(`${prefix}`, e));
      yield put(nonCriticalHTTPError(e));
      return {
        ...cType,
        details: [],
        permissions: [],
      };
    }
  };

export const createFetchContentTypes = prefix =>
  function* fetchContentTypes() {
    try {
      const { data } = yield call(getContentTypes);
      yield put(GenericActions.fetchSuccess(`${prefix}`, data));
    } catch (e) {
      yield put(GenericActions.fetchFailed(`${prefix}`, e));
    }
  };

const createFetchContentTypesDetails = prefix =>
  function* fetchContentTypesDetails(action) {
    const { contentTypes, companyIds } = action;
    const fetchDetail = createFetchContentDetail(prefix);
    try {
      const dataWithDetails = yield all(
        contentTypes.map(cType =>
          fetchDetail({
            cType,
            companyIds,
          })
        )
      );
      yield put(
        GenericActions.fetchSuccess(prefix, {
          data: dataWithDetails,
        })
      );
    } catch (e) {
      yield put(GenericActions.fetchFailed(prefix, e));
    }
  };

const createStartSubmitEdit = formName =>
  function* startSubmitEdit() {
    yield put(startSubmit(formName));
  };

const createEditSuccess = formName =>
  function* submitEditSuccess() {
    yield put(setSubmitFailed(formName));
    yield put(setSubmitSucceeded(formName));
    yield put(stopSubmit(formName, {}));
  };

const createEditFailed = formName =>
  function* submitEditFailed() {
    yield put(setSubmitFailed(formName));
  };

const createContentTypesSaga = prefix =>
  function* contentTypesSaga() {
    const fetchContentTypes = createFetchContentTypes(prefix);
    yield takeLatest(`${prefix}_FETCH`, fetchContentTypes);
  };

export const createObjectPermissionsSaga = (prefix, formName, resourceType) =>
  function* objectPermissionsSaga() {
    const editObjectPermissionsSaga = createEditObjectPermissions(
      `${prefix}`,
      resourceType
    );
    const fetchObjectPermissions = createFetchObjectPermissions(
      prefix,
      resourceType
    );
    const startSubmitEdit = createStartSubmitEdit(formName);
    const submitEditSuccess = createEditSuccess(formName);
    const submitEditFailed = createEditFailed(formName);

    yield takeLatest(`${prefix}_FETCH`, fetchObjectPermissions);
    yield takeLatest(`${prefix}_PUT`, editObjectPermissionsSaga);

    // FORM side-effects
    yield takeEvery(`${prefix}_PUT`, startSubmitEdit);
    yield takeEvery(`${prefix}_PUT_SUCCESS`, submitEditSuccess);
    yield takeEvery(`${prefix}_PUT_FAILED`, submitEditFailed);
  };

export const getPermissionsSagas = (prefix, formName, resourceType) => [
  createContentTypesSaga(`${prefix}${CONTENT_TYPES}`),
  createObjectPermissionsSaga(
    `${prefix}${OBJECT_PERMISSIONS}`,
    formName,
    resourceType
  ),
];

const createContentTypesDetailsSaga = prefix =>
  function* contentTypesSaga() {
    const fetchContentTypesDetails = createFetchContentTypesDetails(prefix);
    yield takeLatest(`${prefix}_DETAILS_FETCH`, fetchContentTypesDetails);
  };
export const getContentTypesDetailsSaga = prefix =>
  createContentTypesDetailsSaga(`${prefix}${CONTENT_TYPES}`);

function* fetchAvailableCompanyGroupUsersListSaga(action) {
  try {
    const { params, context } = action;
    const { data } = yield call(getAvailableGroupUsers, params);
    let { next } = data;
    const aggrData = [...data.data];
    while (next !== null) {
      const response = yield call(getAvailableNextGroupUsers, next);
      // eslint-disable-next-line prefer-destructuring
      next = response.data.next;
      aggrData.push(...response.data.data);
    }
    if (context === 'modal') {
      yield put(Actions.fetchAvailableCompanyGroupUsersModalSuccess(aggrData));
    } else {
      yield put(Actions.fetchAvailableCompanyGroupUsersSuccess(aggrData));
    }
  } catch (e) {
    if (context && context === 'modal') {
      yield put(Actions.fetchAvailableCompanyGroupUsersModalFailed(e));
    } else {
      yield put(Actions.fetchAvailableCompanyGroupUsersFailed(e));
    }
  }
}

export function* availableUsers() {
  yield takeLatest(
    `${AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX}_FETCH`,
    fetchAvailableCompanyGroupUsersListSaga
  );
  yield takeLatest(
    `${AVAILABLE_COMPANY_GROUP_USERS_LIST_MODAL_PREFIX}_FETCH`,
    fetchAvailableCompanyGroupUsersListSaga
  );
}
