import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchTaskRules(action) {
  try {
    const { data } = yield call(API.getTaskRules, action.params);
    yield put(Actions.fetchTaskRulesSuccess(data, action.append));
  } catch (e) {
    yield put(Actions.fetchTaskRulesFailed(e, action));
  }
}

function* fetchServiceAndTaskInfo() {
  try {
    const { data } = yield call(API.getServiceAndTaskInfo);
    yield put(Actions.fetchServiceAndTaskInfoSuccess(data));
  } catch (e) {
    yield put(Actions.fetchServiceAndTaskInfoFailed(e));
  }
}

function* addTaskRule(action) {
  try {
    const { data } = yield call(API.addTaskRule, action.values);
    yield put(Actions.addTaskRuleSuccess(data, action.values));
  } catch (e) {
    yield put(Actions.addTaskRuleFailed(e));
  }
}

function* deleteTaskRule(action) {
  try {
    yield call(API.deleteTaskRule, action.taskId);
    yield put(Actions.deleteTaskRuleSuccess(action.taskId));
  } catch (e) {
    yield put(Actions.deleteTaskRuleFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.TASK_RULES_FETCH, fetchTaskRules);
  yield takeLatest(
    AT.TASK_RULES_SERVICE_AND_TASK_INFO_FETCH,
    fetchServiceAndTaskInfo
  );
  yield takeLatest(AT.TASK_RULES_ADD, addTaskRule);
  yield takeLatest(AT.TASK_RULES_DELETE, deleteTaskRule);
}

export default saga;
