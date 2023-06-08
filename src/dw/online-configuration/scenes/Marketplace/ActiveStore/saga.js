import { call, put, takeLatest } from 'redux-saga/effects';

import * as api from 'dw/online-configuration/services/marketplace';
import * as Actions from './actions';
import { ACTIVE_STORE_FETCH } from './actionTypes';

function* fetchActiveStore({ context }) {
  try {
    const { data: activeStore } = yield call(api.getActiveStore, { context });
    const { data: storeDetails } = yield call(
      api.getStoreDetail,
      activeStore.label,
      { context }
    );
    yield put(Actions.fetchActiveStoreSuccess(activeStore, storeDetails));
  } catch (e) {
    yield put(Actions.fetchActiveStoreFailed(e));
  }
}

function* saga() {
  yield takeLatest(ACTIVE_STORE_FETCH, fetchActiveStore);
}

export default saga;
