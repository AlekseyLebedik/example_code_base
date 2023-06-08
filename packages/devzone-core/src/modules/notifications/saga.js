import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getReleaseNotes,
  getMaintenance,
  getCriticalEvents,
} from '../../services/notifications';

import * as GenericActions from '../../helpers/actions';
import {
  FETCH_RELEASE_NOTES,
  FETCH_MAINTENANCE,
  FETCH_CRITICAL_EVENTS,
} from './actions';

function* fetchReleaseNoteSaga() {
  try {
    const { data } = yield call(getReleaseNotes);
    yield put(GenericActions.fetchSuccess(FETCH_RELEASE_NOTES, data));
  } catch (e) {
    yield put(GenericActions.fetchFailed(FETCH_RELEASE_NOTES, e));
  }
}

function* fetchMaintenanceSaga(action) {
  const { endDate } = action.params;
  try {
    const { data } = yield call(getMaintenance, endDate);
    yield put(GenericActions.fetchSuccess(FETCH_MAINTENANCE, data));
  } catch (e) {
    yield put(GenericActions.fetchFailed(FETCH_MAINTENANCE, e));
  }
}

function* fetchCriticalEventsSaga(action) {
  const { endDate } = action.params;
  try {
    const { data } = yield call(getCriticalEvents, endDate);
    yield put(GenericActions.fetchSuccess(FETCH_CRITICAL_EVENTS, data));
  } catch (e) {
    yield put(GenericActions.fetchFailed(FETCH_CRITICAL_EVENTS, e));
  }
}

function* notificationSaga() {
  yield takeLatest(`${FETCH_RELEASE_NOTES}_FETCH`, fetchReleaseNoteSaga);
  yield takeLatest(`${FETCH_MAINTENANCE}_FETCH`, fetchMaintenanceSaga);
  yield takeLatest(`${FETCH_CRITICAL_EVENTS}_FETCH`, fetchCriticalEventsSaga);
}

export default notificationSaga;
