import { call, put, takeLatest } from 'redux-saga/effects';

import { SubmissionError } from 'redux-form';
import { getFormError } from 'dw/core/helpers/form-error';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchChallengeGenerators(action) {
  try {
    const { data } = yield call(API.getChallengeGenerators);
    yield put(Actions.fetchChallengeGeneratorsSuccess(data));
  } catch (e) {
    yield put(Actions.fetchChallengeGeneratorsFailed(e, action));
  }
}

function* addChallengeGenerator(action) {
  try {
    yield call(API.addChallengeGenerator, action.values);
    yield put(Actions.addChallengeGeneratorSuccess());
  } catch (e) {
    const validationErrors = getFormError(e);
    if (validationErrors === undefined) {
      yield put(Actions.addChallengeGeneratorFailed(e));
    } else {
      action.reject(new SubmissionError(validationErrors));
      yield put(Actions.addChallengeGeneratorFailed());
    }
  }
}

function* updateChallengeGenerator(action) {
  try {
    yield call(API.updateChallengeGenerator, action.values);
    yield put(Actions.updateChallengeGeneratorSuccess(action.values));
  } catch (e) {
    yield put(Actions.updateChallengeGeneratorFailed(e));
  }
}

function* deleteChallengeGenerators(action) {
  try {
    yield call(API.deleteChallengeGenerator, action.generatorId);
    yield put(Actions.deleteChallengeGeneratorSuccess());
  } catch (e) {
    yield put(Actions.deleteChallengeGeneratorFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.CHALLENGE_GENERATORS_FETCH, fetchChallengeGenerators);
  yield takeLatest(AT.CHALLENGE_GENERATOR_ADD, addChallengeGenerator);
  yield takeLatest(AT.CHALLENGE_GENERATOR_UPDATE, updateChallengeGenerator);
  yield takeLatest(AT.CHALLENGE_GENERATOR_DELETE, deleteChallengeGenerators);
}

export default saga;
