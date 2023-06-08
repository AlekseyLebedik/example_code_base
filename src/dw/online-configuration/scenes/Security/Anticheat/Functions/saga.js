import { all, call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import { FUNCTIONS_FETCH, FUNCTION_ADD, FUNCTION_DELETE } from './actionTypes';

function* fetchFunctions(action) {
  try {
    const { data } = yield call(API.getFunctions, action.params);
    yield put(Actions.fetchFunctionsSuccess(data));
  } catch (e) {
    yield put(Actions.fetchFunctionsFailed(e, action));
  }
}

function* addFunction(action) {
  try {
    yield call(API.addFunction, action.values);
    yield put(Actions.addFunctionSuccess());
  } catch (e) {
    yield put(Actions.addFunctionFailed(e));
  }
}

function* deleteFunctions(action) {
  const delFunctions = () =>
    action.functionIds.map(functionId => call(API.deleteFunction, functionId));
  try {
    yield all(delFunctions());
    yield put(Actions.deleteFunctionSuccess(action.functionIds));
  } catch (e) {
    yield put(Actions.deleteFunctionFailed(e));
  }
}

function* saga() {
  yield takeLatest(FUNCTIONS_FETCH, fetchFunctions);
  yield takeLatest(FUNCTION_ADD, addFunction);
  yield takeLatest(FUNCTION_DELETE, deleteFunctions);
}

export default saga;
