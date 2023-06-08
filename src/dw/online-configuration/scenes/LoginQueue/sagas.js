import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/loginqueue';

import * as AT from './actionTypes';

import * as Actions from './actions';

function* editQueueSettings(action) {
  try {
    yield call(API.editLoginQueueSettings, action.queueId, action.queue);
    yield put(Actions.editQueueSettingsSuccess());
  } catch (e) {
    yield put(Actions.editQueueSettingsFailed(e));
  }
}

function* editTitleSettings(action) {
  try {
    yield call(API.editLoginQueueTitleSettings, action.maxCCU);
    yield put(Actions.editTitleSettingsSuccess());
  } catch (e) {
    yield put(Actions.editTitleSettingsFailed(e));
  }
}

function* editLoginQueueVIPList(action) {
  try {
    yield call(API.editLoginQueueVIPList, action.queueId, action.vipList);
    yield put(Actions.editLoginQueueVIPListSuccess(action.queueId));
  } catch (e) {
    yield put(Actions.editLoginQueueVIPListFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.LOGIN_QUEUE_SPECIFIC_SETTINGS, editQueueSettings);
  yield takeLatest(AT.LOGIN_QUEUE_TITLE_SETTINGS, editTitleSettings);
  yield takeLatest(AT.LOGIN_QUEUE_VIP_LIST, editLoginQueueVIPList);
}

export default [
  getSaga(
    AT.LOGIN_QUEUE_STATUS,
    API.getLoginQueueStatus,
    null,
    undefined,
    undefined,
    Actions.fetchLoginQueueFailed
  ),
  getSaga(
    AT.LOGIN_QUEUE_VIP_LIST,
    ({ queueId }) => API.getLoginQueueVIPList(queueId),
    null
  ),
  saga,
];
