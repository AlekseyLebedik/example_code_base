import { call, put, takeLatest } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { getFormError } from 'dw/core/helpers/form-error';

import * as API from 'dw/online-configuration/services/matchmaking';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* getRulesets(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(API.getRulesets, params);
    yield put(Actions.fetchItemsSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchItemsFailed(e, params, append));
  }
}

function* getRuleset(action) {
  const { id } = action;
  try {
    const { data } = yield call(API.getRuleset, id);
    yield put(Actions.fetchDetailsSuccess(data));
  } catch (e) {
    yield put(Actions.fetchDetailsFailed());
  }
}

function* activateRuleset(action) {
  const { id } = action;
  try {
    yield call(API.activateRuleset, id);
    yield put(Actions.activateSuccess(id));
  } catch (e) {
    yield put(Actions.activateFailed(id, e));
  }
}

function* uploadRuleset(action) {
  const {
    values: {
      source: { base64: source },
    },
    callback,
    reject,
  } = action;
  try {
    const { data } = yield call(API.uploadRuleset, source);
    yield put(Actions.uploadRulesetSuccess(data, callback));
  } catch (e) {
    const validationErrors = getFormError(e);
    if (validationErrors === undefined) {
      yield put(Actions.uploadRulesetFailed(e));
    } else {
      if (validationErrors.errors) {
        validationErrors.source = validationErrors.errors;
      }
      reject(new SubmissionError(validationErrors));
    }
  }
}

function* saga() {
  yield takeLatest(AT.FETCH, getRulesets);
  yield takeLatest(AT.FETCH_DETAILS, getRuleset);
  yield takeLatest(AT.ACTIVATE, activateRuleset);
  yield takeLatest(AT.UPLOAD_RULESET, uploadRuleset);
}

export default saga;
