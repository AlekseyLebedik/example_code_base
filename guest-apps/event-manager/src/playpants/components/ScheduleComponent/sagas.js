import { call, put, takeLatest } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import omit from 'lodash/omit';
import { updateFailed } from '@demonware/devzone-core/helpers/actions';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { schedule as scheduleApi, event as eventApi } from 'playpants/services';
import { parseEventData as parseEMEventData } from 'playpants/helpers/parseEventData';
import * as actions from './actions';
import * as AT from './actionTypes';

import GamertagSummarySagas from './components/GamertagSummaryDialog/sagas';
import { openEventGroupErrorDialog } from './components/EventGroupErrorDialog/actions';

const parseEventData = eventType => {
  switch (eventType) {
    case 'eventManager':
      return parseEMEventData;
    case 'demonwareEvents':
      return event => omit(event, ['end_time', 'start_time']);
    default:
      return event => event;
  }
};

const fetchEventBySourceEventIdSaga = getSaga(
  AT.FETCH_EVENT_BY_SOURCE_EVENT_ID,
  eventApi.getEventById,
  null
);

const exportEventsSaga = getSaga(
  AT.EXPORT_EVENTS,
  scheduleApi.exportEvents,
  null
);

function* createEvent(action) {
  const { baseUrl, data, history, formName, onCancel } = action;
  yield put(startSubmit(formName));
  try {
    const { data: event } = yield call(scheduleApi.createEvent, data);
    yield put(stopSubmit(formName));
    onCancel();
    history.push(`${baseUrl}events/${event.id}`);
  } catch (e) {
    yield put(actions.createEventFailed(e.response.data));
    yield put(stopSubmit(formName, e.response.data));
  }
}

function* updateEvent({ data, event, isDragDrop, reducerGroup }) {
  try {
    const { data: updatedEvent } = yield call(
      eventApi.editEvent,
      event.id,
      data
    );
    yield put(
      actions.updateEventSuccess(parseEventData(updatedEvent), reducerGroup)
    );
  } catch (e) {
    let lockedError;
    if (e.response && e.response.status === 423) {
      lockedError = e;
      lockedError.response.data = { error: { msg: e.response.data } };
    }
    if (isDragDrop) {
      yield put(
        actions.updateEventFailed(
          event,
          reducerGroup,
          isDragDrop,
          lockedError || e
        )
      );
      yield put(openEventGroupErrorDialog());
    } else {
      yield put(updateFailed(AT.UPDATE_EVENT, lockedError || e));
    }
  }
}

function* fetchEventDetails({ event }) {
  try {
    const {
      id: eventId,
      repeat_event_settings: repeatEventSettings,
      type,
    } = event;
    let eventData = {};
    if (repeatEventSettings) {
      const { iteration } = repeatEventSettings;
      ({ data: eventData } = yield call(
        eventApi.getRepeatEventById,
        eventId,
        iteration
      ));
    } else {
      let apiCall = eventApi.getEventById;
      switch (type) {
        case 'demonwareEvents':
          if (event.event_type === 'maintenance')
            apiCall = scheduleApi.fetchMaintenanceDetails;
          else apiCall = null;
          break;
        default:
          break;
      }
      if (apiCall) ({ data: eventData } = yield call(apiCall, eventId));
    }
    yield put(
      actions.fetchEventDetailsSuccess(parseEventData(type)(eventData))
    );
  } catch (error) {
    yield put(actions.fetchEventDetailsFailed(error));
  }
}

function* storeThenOpenEventDetailModal(action) {
  yield put(actions.storeEvent(action.eventData));
  action.openModal();
}

function* storeThenOpenABTestDetailModal(action) {
  yield put(actions.storeABTest(action.abTestData));
  action.openModal();
}

function* storeThenOpenDemonwareDetailModal(action) {
  yield put(actions.storeDemonwareEvent(action.data));
  action.openModal();
}

function* storeThenOpenExternalDetailModal(action) {
  yield put(actions.storeExternalEvent(action.data));
  action.openModal();
}

function* checkStoriesFilterDisabled({ params }) {
  try {
    const { data } = yield call(scheduleApi.fetchEvents, params);
    yield put(actions.checkStoriesFilterDisabledSuccess());
    if (data.count === 0) {
      yield put(actions.setFilterPropsDisabled('stories', true));
    } else {
      yield put(actions.setFilterPropsDisabled('stories', false));
    }
  } catch (error) {
    yield put(actions.checkStoriesFilterDisabledFailed(error));
  }
}

function* saga() {
  yield takeLatest(
    AT.STORE_THEN_OPEN_EVENT_DETAIL_MODAL,
    storeThenOpenEventDetailModal
  );
  yield takeLatest(
    AT.STORE_THEN_OPEN_AB_TEST_DETAIL_MODAL,
    storeThenOpenABTestDetailModal
  );
  yield takeLatest(
    AT.STORE_THEN_OPEN_DEMONWARE_DETAIL_MODAL,
    storeThenOpenDemonwareDetailModal
  );
  yield takeLatest(
    AT.STORE_THEN_OPEN_EXTERNAL_DETAIL_MODAL,
    storeThenOpenExternalDetailModal
  );
  yield takeLatest(AT.FETCH_EVENT_DETAILS, fetchEventDetails);
  yield takeLatest(AT.UPDATE_EVENT, updateEvent);
  yield takeLatest(AT.CREATE_EVENT, createEvent);
  yield takeLatest(
    AT.CHECK_STORIES_FILTER_DISABLED,
    checkStoriesFilterDisabled
  );
}

export default [
  ...GamertagSummarySagas,
  saga,
  exportEventsSaga,
  fetchEventBySourceEventIdSaga,
];
