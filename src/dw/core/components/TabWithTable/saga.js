import { call, put, takeLatest } from 'redux-saga/effects';

import * as Actions from './actions';

function* fetch(action, apiCall, actionPrefix, dataOrigin) {
  try {
    const { data } = !action.urlID
      ? yield call(apiCall, action.params)
      : yield call(apiCall, action.urlID, action.params);
    yield put(
      Actions.fetchSuccess(actionPrefix, data, action.append, dataOrigin)
    );
  } catch (e) {
    yield put(Actions.fetchFailed(e));
  }
}

export const getSaga = (actionPrefix, apiCall, dataOrigin = 'data') =>
  function* saga() {
    yield takeLatest(`${actionPrefix}_FETCH`, action =>
      fetch(action, apiCall, actionPrefix, dataOrigin)
    );
  };
