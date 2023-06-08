import { call, put, takeLatest } from 'redux-saga/effects';

import * as Actions from './actions';

function* fetch(action, apiCall, actionPrefix, dataOrigin) {
  const {
    urlID,
    append,
    params: { successCallback, failCallback, ...params },
  } = action;
  try {
    const { data } = !urlID
      ? yield call(apiCall, params)
      : yield call(apiCall, urlID, params);
    if (successCallback) successCallback(data.data, data.nextPageToken);
    else {
      yield put(Actions.fetchSuccess(actionPrefix, data, append, dataOrigin));
    }
  } catch (e) {
    if (failCallback) failCallback();
    yield put(Actions.fetchFailed(e));
  }
}

export const getSaga = (actionPrefix, apiCall, dataOrigin = 'data') =>
  function* saga() {
    yield takeLatest(`${actionPrefix}_FETCH`, action =>
      fetch(action, apiCall, actionPrefix, dataOrigin)
    );
  };
