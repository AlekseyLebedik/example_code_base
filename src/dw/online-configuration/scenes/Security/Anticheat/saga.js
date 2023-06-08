import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchMonitoringGroups() {
  try {
    const { data } = yield call(API.getMonitoringGroups);
    yield put(Actions.fetchMonitoringGroupsSuccess(data));
  } catch (e) {
    // TODO: handle error
  }
}

function* saga() {
  yield takeLatest(AT.MONITORING_GROUPS_FETCH, fetchMonitoringGroups);
}

export default saga;
