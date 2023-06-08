import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import { REVISION_HISTORY_FETCH, REVISION_HISTORY_REVERT } from './actionTypes';

function* fetchRevisions(action) {
  try {
    const { data } = yield call(API.getRevisions);
    yield put(Actions.fetchRevisionsSuccess(data));
  } catch (e) {
    yield put(Actions.fetchRevisionsFailed(e, action));
  }
}

function* revertRevision(action) {
  try {
    yield call(API.revertRevision, action.revisionId);
    yield put(Actions.revertRevisionSuccess(action.revisionId));
  } catch (e) {
    yield put(Actions.revertRevisionFailed(e, action));
  }
}

function* saga() {
  yield takeLatest(REVISION_HISTORY_FETCH, fetchRevisions);
  yield takeLatest(REVISION_HISTORY_REVERT, revertRevision);
}

export default saga;
