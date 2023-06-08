import { call, put, takeLatest } from 'redux-saga/effects';

import { SubmissionError } from 'redux-form';

import { getFormError } from 'dw/core/helpers/form-error';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import { CHALLENGES_FETCH, CHALLENGE_ADD, CHALLENGE_EDIT } from './actionTypes';

function* fetchChallenges(action) {
  try {
    const { data } = yield call(API.getChallenges, action.params);
    yield put(Actions.fetchChallengesSuccess(data));
  } catch (e) {
    yield put(Actions.fetchChallengesFailed(e, action));
  }
}

function* addChallenge(action) {
  try {
    yield call(API.addChallenge, action.values);
    yield put(Actions.addChallengeSuccess());
  } catch (e) {
    const validationErrors = getFormError(e);
    if (validationErrors === undefined) {
      yield put(Actions.addChallengeFailed(e));
    } else {
      action.reject(new SubmissionError(validationErrors));
      yield put(Actions.addChallengeFailed());
    }
  }
}

function* editChallenge(action) {
  try {
    yield call(API.editChallenge, action.values);
    yield put(Actions.editChallengeSuccess());
  } catch (e) {
    const validationErrors = getFormError(e);
    if (validationErrors === undefined) {
      yield put(Actions.editChallengeFailed(e));
    } else {
      action.reject(new SubmissionError(validationErrors));
      yield put(Actions.editChallengeFailed());
    }
  }
}

function* saga() {
  yield takeLatest(CHALLENGES_FETCH, fetchChallenges);
  yield takeLatest(CHALLENGE_ADD, addChallenge);
  yield takeLatest(CHALLENGE_EDIT, editChallenge);
}

export default saga;
