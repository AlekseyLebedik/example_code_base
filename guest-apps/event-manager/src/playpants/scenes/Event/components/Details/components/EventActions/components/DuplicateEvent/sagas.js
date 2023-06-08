import { call, put, takeLatest } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import * as eventAPI from 'playpants/services/event';
import { parseEventData } from 'playpants/helpers/parseEventData';
import {
  handleLoadSaga,
  handleSaveSaga,
} from 'playpants/components/FeedbackWrapper/sagas';
import { fetchEvent } from 'playpants/scenes/Event/actions';
import { redirectToDuplicatedEvent } from './helpers';
import * as actions from './actions';
import * as AT from './actionTypes';

const handleLoadingDuplicateSagas = handleLoadSaga([AT.DUPLICATE_EVENT]);
const handleSavingDuplicateSagas = handleSaveSaga([AT.DUPLICATE_EVENT]);

function* duplicateEvent(action) {
  const { baseUrl, sourceEvent, mods, formName, history } = action;
  if (formName) yield put(startSubmit(formName));
  try {
    const { data: event } = yield call(eventAPI.duplicateEvent, sourceEvent, {
      mods,
    });
    yield put(
      actions.duplicateEventSuccess(baseUrl, parseEventData(event), history)
    );
    redirectToDuplicatedEvent(baseUrl, event, history);
    yield put(fetchEvent(event.id));
  } catch (e) {
    yield put(actions.duplicateEventFailed(e));
    if (formName) yield put(stopSubmit(formName));
  }
}

function* saga() {
  yield takeLatest(AT.DUPLICATE_EVENT, duplicateEvent);
}

export default [saga, handleLoadingDuplicateSagas, handleSavingDuplicateSagas];
