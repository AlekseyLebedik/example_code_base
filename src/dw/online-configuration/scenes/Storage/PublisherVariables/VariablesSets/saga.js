import { call, put, takeLatest } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { getFormError } from 'dw/core/helpers/form-error';

import {
  fetchVariablesSets as apiFetchVariablesSets,
  addVariablesSets as apiAddVariablesSets,
  propagateVariablesSet as apiPropagateVariablesSet,
  deleteVariablesSet as apiDeleteVariablesSet,
  fetchVariablesSetDetails as apiFetchVariablesSetDetails,
  updateVariablesSet as apiUpdateVariablesSet,
} from 'dw/online-configuration/services/storages';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchVariablesSets(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchVariablesSets, params);
    yield put(Actions.fetchVariablesSetsSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchVariablesSetsFailed(e, params, append));
  }
}

function* addVariablesSets(action) {
  try {
    yield call(apiAddVariablesSets, action.values);
    yield put(Actions.addVariablesSetSuccess(action.values));
  } catch (e) {
    const validationErrors = getFormError(e);
    if (validationErrors === undefined) {
      yield put(Actions.addVariablesSetFailed(e));
    } else {
      action.reject(new SubmissionError(validationErrors));
    }
  }
}

function* deleteVariablesSet(action) {
  try {
    yield call(apiDeleteVariablesSet, action.variableSetId);
    yield put(Actions.deleteVariablesSetSuccess(action.variableSetId));
  } catch (e) {
    yield put(Actions.deleteVariablesSetFailed(e));
  }
}

function* updateVariablesSet(action) {
  try {
    yield call(apiUpdateVariablesSet, action.variableSetId, action.variableSet);
    yield put(
      Actions.updateVariablesSetSuccess(
        action.variableSetId,
        action.variableSet
      )
    );
  } catch (e) {
    yield put(Actions.updateVariablesSetFailed(e));
  }
}

function* fetchVariablesSetDetails(action) {
  try {
    const { data } = yield call(
      apiFetchVariablesSetDetails,
      action.variableSetId
    );
    yield put(
      Actions.fetchVariablesSetDetailsSuccess(action.variableSetId, data)
    );
  } catch (e) {
    yield put(Actions.fetchVariablesSetDetailsFailed(e));
  }
}

function* propagateVariablesSet(action) {
  try {
    const { values } = action;
    yield call(apiPropagateVariablesSet, values);
    yield put(Actions.propagateVariablesSetSuccess(values));
  } catch (e) {
    const validationErrors = getFormError(e);
    if (validationErrors === undefined) {
      yield put(Actions.addVariablesSetFailed(e));
    } else {
      action.reject(new SubmissionError(validationErrors));
    }
  }
}

function* saga() {
  yield takeLatest(AT.STORAGE_VARIABLES_SETS_FETCH, fetchVariablesSets);
  yield takeLatest(AT.STORAGE_VARIABLES_SETS_ADD, addVariablesSets);
  yield takeLatest(AT.STORAGE_VARIABLES_SET_DELETE, deleteVariablesSet);
  yield takeLatest(AT.STORAGE_VARIABLES_SET_UPDATE, updateVariablesSet);
  yield takeLatest(AT.STORAGE_VARIABLES_SET_PROPAGATE, propagateVariablesSet);
  yield takeLatest(
    AT.STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS,
    fetchVariablesSetDetails
  );
}

export default saga;
