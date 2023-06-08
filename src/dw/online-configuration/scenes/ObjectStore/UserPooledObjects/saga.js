import { call, put, takeLatest } from 'redux-saga/effects';

import { getSaga } from '@demonware/devzone-core/helpers/sagas';

import * as API from 'dw/online-configuration/services/objectStore';

import * as actions from './actions';
import * as AT from './actionTypes';

function* pooledObjectSearchSaga(action) {
  const { append, data, params } = action;
  try {
    const results = yield call(API.searchPooledObjects, data, params);
    yield put(actions.pooledObjectSearchSuccess(results, append));
  } catch (e) {
    yield put(actions.pooledObjectSearchFailed(e));
  }
}

const getPooledObjectValidTagsSaga = getSaga(
  AT.FETCH_POOLED_OBJECT_TAGS,
  API.getPooledObjectsTags
);

function* rootSaga() {
  yield takeLatest(AT.POOLED_OBJECT_SEARCH, pooledObjectSearchSaga);
}

export default [rootSaga, getPooledObjectValidTagsSaga];
