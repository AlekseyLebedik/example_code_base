import { call, put, takeLatest } from 'redux-saga/effects';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { handleLoadSaga } from 'playpants/components/FeedbackWrapper/sagas';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { event as api } from 'playpants/services';
import * as AT from './actionTypes';

const fetchDeployerListSaga = getSaga(
  AT.FETCH_DEPLOYER_LIST,
  api.fetchThunderpantsDeployerList,
  'data'
);

const fetchBuildListSaga = getSaga(
  AT.FETCH_BUILD_LIST,
  api.fetchThunderpantsBuildList,
  'data'
);

const fetchBuildSchemaSaga = getSaga(
  AT.FETCH_BUILD_SCHEMA,
  api.fetchThunderpantsBuildSchema,
  'data'
);

const fetchDeploymentListSaga = getSaga(
  AT.FETCH_DEPLOYMENT_LIST,
  api.fetchThunderpantsDeploymentList,
  'data'
);

const fetchTargetListSaga = getSaga(
  AT.FETCH_TARGET_LIST,
  api.fetchThunderpantsTargetList,
  'data'
);

const fetchUserParamsSchemaSaga = getSaga(
  AT.FETCH_USER_PARAMS_SCHEMA,
  api.fetchThunderpantsUserParamsSchema,
  'data'
);

const fetchViewListSaga = getSaga(
  AT.FETCH_VIEW_LIST,
  api.fetchThunderpantsViewList,
  'data'
);

function* setFormData({ onSuccess }) {
  yield onSuccess();
}

function* checkDeploymentPassword({ onSuccess, onFailure, data, params }) {
  try {
    yield call(api.checkDeploymentPassword, params, data);
    onSuccess();
  } catch (e) {
    onFailure();
  }
}

function* modifyLock({ onSuccess, onFailure, data, params }) {
  try {
    yield call(api.modifyLock, params, data);
    onSuccess();
  } catch (e) {
    onFailure();
  }
}

function* deleteDeployment({ uid, params }) {
  try {
    yield call(api.deleteThunderpantsDeployment, { params, uid });
  } catch (e) {
    yield put(nonCriticalHTTPError(e));
  }
}

function* saga() {
  yield takeLatest(AT.CHECK_DEPLOYMENT_PASSWORD, checkDeploymentPassword);
  yield takeLatest(AT.DELETE_DEPLOYMENT, deleteDeployment);
  yield takeLatest(AT.MODIFY_LOCK, modifyLock);
  yield takeLatest(AT.SET_FORM_DATA, setFormData);
}

export default [
  fetchBuildListSaga,
  fetchBuildSchemaSaga,
  fetchDeployerListSaga,
  fetchDeploymentListSaga,
  fetchTargetListSaga,
  fetchUserParamsSchemaSaga,
  fetchViewListSaga,
  handleLoadSaga([
    `${AT.FETCH_DEPLOYER_LIST}_FETCH`,
    `${AT.FETCH_BUILD_LIST}_FETCH`,
    `${AT.FETCH_TARGET_LIST}_FETCH`,
    `${AT.FETCH_DEPLOYMENT_LIST}_FETCH`,
    `${AT.FETCH_BUILD_SCHEMA}_FETCH`,
    `${AT.FETCH_USER_PARAMS_SCHEMA}_FETCH`,
    `${AT.FETCH_VIEW_LIST}_FETCH`,
  ]),
  saga,
];
