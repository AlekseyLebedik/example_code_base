import { call, put, takeLatest } from 'redux-saga/effects';
import { projectSettings as api } from 'playpants/services';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { prettyPrint } from 'playpants/helpers/json';

import responsibilitySagas from './components/Responsibilities/saga';

import { createFetchAvailableUsersSaga } from './sagaCreators';
import * as actions from './actions';
import * as AT from './actionTypes';

const fetchAvailableUsersSaga = createFetchAvailableUsersSaga(
  AT.FETCH_AVAILABLE_USERS
);

function* updateProjectSetting({ projectID, setting, data }) {
  try {
    const settings = yield call(api.updateProjectSetting, projectID, {
      [setting]: prettyPrint(data),
    });
    yield put(actions.updateProjectSettingSucceed(settings));
  } catch (e) {
    yield put(actions.fetchFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.UPDATE_PROJECT_SETTING, updateProjectSetting);
}

const fetchProjectSchema = getSaga(
  AT.FETCH_PROJECT_SCHEMA,
  api.fetchProjectSchema,
  null
);

export default [
  ...responsibilitySagas,
  fetchAvailableUsersSaga,
  fetchProjectSchema,
  saga,
];
