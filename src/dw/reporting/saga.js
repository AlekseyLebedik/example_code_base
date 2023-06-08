import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchFranchises as apiFetchFranchises } from 'dw/reporting/services';
import * as Actions from './actions';
import { REPORTING_FETCH_FRANCHISES } from './actionTypes';

export function* fetchFranchises(action) {
  try {
    const { data } = yield call(apiFetchFranchises, action.params);
    yield put(Actions.fetchFranchisesSucceed(data.data));
  } catch (e) {
    yield put(Actions.fetchFranchisesFail(e));
  }
}

function* saga() {
  yield takeLatest(REPORTING_FETCH_FRANCHISES, fetchFranchises);
}

export default saga;
