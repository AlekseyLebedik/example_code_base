import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { createApiUrl } from 'dw/core/helpers/services';
import * as Services from 'abtesting/services/abtests';

import * as Actions from './actions';
import { CHANGE_TEST_STATUS, DELETE_TEST } from './actionTypes';

function* changeTestStatus(action) {
  try {
    yield call(Services.changeTestStatus, {
      url: createApiUrl(
        `abtesting/tests/${action.testID}`,
        action.titleID,
        action.envShortType
      ),
      status: action.status,
    });
    yield put(Actions.changeTestStatusSuccess(action.testID, action.status));
  } catch (e) {
    yield put(Actions.changeTestStatusFailed(e));
  }
}

function* deleteTest(action) {
  try {
    yield call(
      Services.deleteTest,
      createApiUrl(
        `abtesting/tests/${action.testID}`,
        action.titleID,
        action.envShortType
      )
    );
    yield put(Actions.deleteTestSuccess(action.testID));
  } catch (e) {
    yield put(Actions.deleteTestFailed(e));
  }
}

function* saga() {
  yield takeEvery(CHANGE_TEST_STATUS, changeTestStatus);
  yield takeLatest(DELETE_TEST, deleteTest);
}

export default saga;
