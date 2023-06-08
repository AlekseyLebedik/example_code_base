import { takeLatest, put, call, select } from 'redux-saga/effects';
import { prettyPrint } from 'playpants/helpers/json';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { projectSettings as api } from 'playpants/services';
import { projectSettingsIdSelector } from 'playpants/components/App/selectors';
import { updateProjectSettingSucceed } from 'playpants/scenes/ProjectSettings/actions';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import * as AT from './actionTypes';

const fetchClientRulesSchemaSaga = getSaga(
  AT.FETCH_CLIENT_RULES_SCHEMA,
  api.fetchProjectSchema,
  null
);

function* updateProjectSettings({ clientEvents, clearFileCb, closeDrawerCb }) {
  try {
    const projectId = yield select(projectSettingsIdSelector);
    const settings = yield call(api.updateProjectSetting, projectId, {
      client_events: prettyPrint(clientEvents),
    });
    clearFileCb();
    closeDrawerCb();
    yield put(updateProjectSettingSucceed(settings));
  } catch (e) {
    clearFileCb();
    yield put(nonCriticalHTTPError(e));
  }
}

function* saga() {
  yield takeLatest(AT.UPDATE_PROJECT_SETTINGS, updateProjectSettings);
}

export default [saga, fetchClientRulesSchemaSaga];
