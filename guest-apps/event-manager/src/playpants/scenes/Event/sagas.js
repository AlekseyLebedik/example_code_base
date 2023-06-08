import { put, take, takeLatest, call } from 'redux-saga/effects';
import { getSaga, getUpdateSaga } from '@demonware/devzone-core/helpers/sagas';
import { event as eventAPI } from 'playpants/services';
import {
  handleLoadSaga,
  handleSaveSaga,
} from 'playpants/components/FeedbackWrapper/sagas';
import ActivitiesSagas from './components/Activities/sagas';
import ConflictsSagas from './components/Conflicts/sagas';
import DuplicateEventSagas from './components/Details/components/EventActions/components/DuplicateEvent/sagas';
import HistoryLogSagas from './components/HistoryLog/sagas';
import TaskMonitorSagas from './components/TaskMonitor/sagas';
import * as AT from './actionTypes';
import * as actions from './actions';

const handleLoadingEventsSagas = handleLoadSaga([
  `${AT.CREATE_COMMENT}_UPDATE`,
  `${AT.DELETE_EVENT}_UPDATE`,
  `${AT.DISCUSSION_FETCH}_FETCH`,
  `${AT.EVENT_FETCH}_FETCH`,
  `${AT.UPDATE_AUTHS}_UPDATE`,
  `${AT.UPDATE_EVENT}_UPDATE`,
]);

const handleSavingEventsSagas = handleSaveSaga([
  `${AT.CREATE_COMMENT}_UPDATE`,
  `${AT.DELETE_EVENT}_UPDATE`,
  `${AT.UPDATE_AUTHS}_UPDATE`,
  `${AT.UPDATE_EVENT}_UPDATE`,
]);

function* unlockEvent(eventId) {
  yield put(actions.editEvent(eventId, { locked_by: null }));
  return yield take([
    `${AT.UPDATE_EVENT}_UPDATE_SUCCESS`,
    `${AT.UPDATE_EVENT}_UPDATE_FAILED`,
  ]);
}

function* deleteEvent(eventId) {
  yield put(actions.deleteEvent(eventId));
  return yield take([
    `${AT.DELETE_EVENT}_UPDATE_SUCCESS`,
    `${AT.DELETE_EVENT}_UPDATE_FAILED`,
  ]);
}

function* fetchEvent(eventId) {
  yield put(actions.fetchEvent(eventId));
  return yield take([
    `${AT.EVENT_FETCH}_FETCH_SUCCESS`,
    `${AT.EVENT_FETCH}_FETCH_FAILED`,
  ]);
}

function* unlockThenDelete({ eventId, redirect }) {
  const updateAction = yield call(unlockEvent, eventId);
  if (updateAction.type === `${AT.UPDATE_EVENT}_UPDATE_SUCCESS`) {
    const deleteAction = yield call(deleteEvent, eventId);
    if (deleteAction.type === `${AT.DELETE_EVENT}_UPDATE_SUCCESS`) {
      const fetchAction = yield call(fetchEvent, eventId);
      if (fetchAction.type === `${AT.EVENT_FETCH}_FETCH_SUCCESS`) {
        redirect();
      }
    }
  }
}

function* unlockThenClear({ canUnlock, eventId }) {
  if (canUnlock) {
    const updateAction = yield call(unlockEvent, eventId);
    if (updateAction.type === `${AT.UPDATE_EVENT}_UPDATE_SUCCESS`) {
      yield put(actions.clearEventStore());
    }
  } else {
    yield put(actions.clearEventStore());
  }
}

function* saga() {
  yield takeLatest(AT.UNLOCK_THEN_DELETE, unlockThenDelete);
  yield takeLatest(AT.UNLOCK_THEN_CLEAR, unlockThenClear);
}

export default [
  saga,
  handleLoadingEventsSagas,
  handleSavingEventsSagas,
  getSaga(AT.EVENT_FETCH, eventAPI.getEventById, null),
  getSaga(AT.DISCUSSION_FETCH, eventAPI.fetchDiscussion, 'results'),
  getSaga(
    AT.FETCH_USER_RESPONSIBILITIES,
    eventAPI.fetchUserResponsibilities,
    'results'
  ),
  getUpdateSaga(AT.UPDATE_EVENT, eventAPI.editEvent),
  getUpdateSaga(AT.DELETE_EVENT, eventAPI.deleteEvent),
  getUpdateSaga(AT.UPDATE_AUTHS, eventAPI.updateAuthorizations),
  getUpdateSaga(AT.CREATE_COMMENT, eventAPI.createComment),
  ...ActivitiesSagas,
  ...ConflictsSagas,
  ...DuplicateEventSagas,
  ...HistoryLogSagas,
  ...TaskMonitorSagas,
];
