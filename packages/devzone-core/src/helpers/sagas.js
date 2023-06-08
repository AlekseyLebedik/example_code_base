import { runSaga } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import compact from 'lodash/compact';
import * as Actions from './actions';

function* apiCallHelper(action, apiCallFn) {
  return yield call(...compact([apiCallFn, action.urlID, action.params]));
}

function* fetch(
  action,
  apiCallFn,
  actionPrefix,
  dataOrigin,
  fetchSuccessOverride,
  fetchAllFn,
  fetchFailedOverride
) {
  const fetchSuccess = fetchSuccessOverride || Actions.fetchSuccess;
  const fetchFailed = fetchFailedOverride || Actions.fetchFailed;
  let data;
  try {
    if (!fetchAllFn) ({ data } = yield apiCallHelper(action, apiCallFn));
    else {
      const response = yield all(
        fetchAllFn(action.params).map(item =>
          call(...compact([apiCallFn, action.urlID, item]))
        )
      );
      data = response.map(objectReceived => objectReceived.data);
    }
    const fetchSuccessAction = fetchSuccess(
      actionPrefix,
      data,
      action.append,
      dataOrigin,
      action
    );
    if (fetchSuccessAction) {
      yield put(fetchSuccessAction);
    }
  } catch (e) {
    const fetchFailedAction = fetchFailed(
      actionPrefix,
      e,
      action.dispatchNonCriticalError,
      action
    );
    if (fetchFailedAction) {
      yield put(fetchFailedAction);
    }
  }
}

function* update(action, apiCallFn, actionPrefix, updateFailedCallback = null) {
  try {
    const { data } = yield apiCallHelper(action, apiCallFn);
    yield put(Actions.updateSuccess(actionPrefix, data, action.append));
  } catch (e) {
    yield put(Actions.updateFailed(actionPrefix, e));
    if (updateFailedCallback) yield put(updateFailedCallback());
  }
}

export const getSaga = (
  actionPrefix,
  apiCallFn,
  dataOrigin = 'data',
  fetchSuccess = undefined,
  fetchAllFn = undefined,
  fetchFailed = undefined
) =>
  function* saga() {
    yield takeLatest(`${actionPrefix}_FETCH`, action =>
      fetch(
        action,
        apiCallFn,
        actionPrefix,
        dataOrigin,
        fetchSuccess,
        fetchAllFn,
        fetchFailed
      )
    );
  };

function* fetchLoop(
  action,
  apiCallFn,
  apiNextCall,
  dataOrigin,
  actionPrefix,
  fetchSuccess,
  fetchFailed
) {
  const fetchSuccessOverride = fetchSuccess || Actions.fetchSuccess;
  const fetchFailedOverride = fetchFailed || Actions.fetchFailed;
  try {
    const { params } = action;
    let response = yield call(...compact([apiCallFn, params]));
    let results = response.data[dataOrigin];
    while (response.data.next) {
      response = yield call(apiNextCall, response.data.next);
      results = [...results, ...response.data[dataOrigin]];
    }
    const aggrResults = { [dataOrigin]: results };
    const fetchSuccessAction = fetchSuccessOverride(
      actionPrefix,
      aggrResults,
      null,
      dataOrigin
    );
    if (fetchSuccessAction) {
      yield put(fetchSuccessAction);
    }
  } catch (e) {
    const fetchFailedAction = fetchFailedOverride(actionPrefix, e);
    if (fetchFailedAction) {
      yield put(fetchFailedAction);
    }
  }
}

export const getLoopSaga = (
  actionPrefix,
  apiCallFn,
  apiNextCall,
  dataOrigin = 'data',
  fetchSuccess = undefined
) =>
  function* saga() {
    yield takeLatest(`${actionPrefix}_FETCH`, action =>
      fetchLoop(
        action,
        apiCallFn,
        apiNextCall,
        dataOrigin,
        actionPrefix,
        fetchSuccess
      )
    );
  };

export const getUpdateSaga = (
  actionPrefix,
  apiCallFn,
  updateFailedCallback = null
) =>
  function* saga() {
    yield takeLatest(`${actionPrefix}_UPDATE`, action =>
      update(action, apiCallFn, actionPrefix, updateFailedCallback)
    );
  };

export async function recordSaga(saga, initialAction) {
  const dispatched = [];

  await runSaga(
    {
      dispatch: action => dispatched.push(action),
    },
    saga,
    initialAction
  ).done;

  return dispatched;
}
