import { all, spawn, call, put, takeLatest } from 'redux-saga/effects';

import { getEvents as apiGetEvents } from 'dw/online-configuration/services/graphs';
import * as Actions from './actions';
import { EVENTS_FETCH } from './actionTypes';
import { EVENTS } from './constants';

function* fetchEvent(eventType, APICall, params = { append: false }) {
  try {
    const { data } = yield call(APICall, eventType, params);
    const result = { name: eventType, data: data[eventType] };
    yield put(Actions.fetchEventsSuccess(result, params.append));

    if (!data.nextPageToken) return;
    yield* fetchEvent(eventType, APICall, {
      nextPageToken: data.nextPageToken,
      append: true,
    });
  } catch (e) {
    yield put(Actions.fetchEventsFailed(e));
  }
}

function* fetchEvents() {
  try {
    yield all(
      Object.keys(EVENTS).map(eventType =>
        spawn(fetchEvent, eventType, apiGetEvents)
      )
    );
  } catch (e) {
    yield put(Actions.fetchEventsFailed(e));
  }
}

function* saga() {
  yield takeLatest(EVENTS_FETCH, fetchEvents);
}

export default saga;
