import { call, put, takeLatest } from 'redux-saga/effects';

import * as Services from 'abtesting/services/abtests';
import { createApiUrl } from 'dw/core/helpers/services';
// import { fetchTest as mockedTest } from 'abtesting/services/mocks/abtests';
import * as Actions from './actions';
import { FETCH_TEST } from './actionTypes';

function* fetchTest(action) {
  try {
    const { data } = yield call(
      Services.getTest,
      createApiUrl(
        `abtesting/tests/${action.id}`,
        action.titleID,
        action.environment,
        action.id
      )
    );
    yield put(Actions.fetchTestSuccess(data));
  } catch (e) {
    yield put(Actions.fetchTestFailed(e));
  }
}

function* saga() {
  yield takeLatest(FETCH_TEST, fetchTest);
}

export default saga;
