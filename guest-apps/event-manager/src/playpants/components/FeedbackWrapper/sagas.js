import { put, takeLatest, select, take } from 'redux-saga/effects';
import debounce from 'playpants/helpers/saga/debounce';
import { openRequestErrorDialog } from './components/RequestErrorDialog/actions';

import * as AT from './actionTypes';
import * as actions from './actions';
import * as selectors from './selectors';

function appendEach(actionTypes, suffixes) {
  const newActionTypes = [];
  actionTypes.forEach(actionType => {
    suffixes.forEach(suffix => {
      newActionTypes.push(`${actionType}_${suffix}`);
    });
  });
  return newActionTypes;
}

function* startLoading({ type }) {
  const loading = yield select(selectors.feedbackLoadingSelector);
  if (!loading) {
    yield put(actions.startLoading(type));
  }
}

function* stopLoading() {
  const loading = yield select(selectors.feedbackLoadingSelector);
  if (loading) {
    yield put(actions.stopLoading());
  }
}

function* trySaving() {
  yield put(actions.trySaving());
}

function* saveFailed({ error }) {
  yield put(actions.saveFailed(error));
  yield take(AT.STOP_LOADING); // wait for loading to stop
  yield put(openRequestErrorDialog());
}

function* saveSuccess() {
  yield put(actions.saveSuccess());
}

export const handleLoadSaga = actionList =>
  function* loadSaga() {
    yield takeLatest(actionList, startLoading);
    yield debounce(
      1000,
      appendEach(actionList, ['SUCCESS', 'FAILED']),
      stopLoading
    );
  };

export const handleSaveSaga = actionList =>
  function* saveSaga() {
    yield takeLatest(actionList, trySaving);
    yield takeLatest(appendEach(actionList, ['FAILED']), saveFailed);
    yield takeLatest(appendEach(actionList, ['SUCCESS']), saveSuccess);
  };
