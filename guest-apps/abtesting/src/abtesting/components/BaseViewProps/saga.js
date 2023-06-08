import { call, put, takeEvery } from 'redux-saga/effects';

import { getAllTests } from 'abtesting/services/abtests';
import {
  fetchSuccess,
  fetchFailed,
} from '@demonware/devzone-core/helpers/actions';

import { FETCH_ALL_TESTS_PREFIX } from './constants';

function* fetchAllTests(action) {
  const {
    params: { instance, status },
  } = action;
  try {
    const { data } = yield call(getAllTests, {
      instance,
      status,
    });
    yield put(fetchSuccess(FETCH_ALL_TESTS_PREFIX, data));
  } catch (e) {
    yield put(fetchFailed(FETCH_ALL_TESTS_PREFIX, e));
  }
}

function* saga() {
  yield takeEvery(`${FETCH_ALL_TESTS_PREFIX}_FETCH`, fetchAllTests);
}

export default saga;
