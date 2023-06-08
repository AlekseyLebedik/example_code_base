import { takeLatest, put, call } from 'redux-saga/effects';
import { setSelectedGroupStory } from 'playpants/scenes/GroupStories/actions';
import { parseEventData } from 'playpants/helpers/parseEventData';
import {
  schedule as scheduleApi,
  event as eventApi,
  stories as storiesApi,
} from 'playpants/services';
import groupStoriesSidebarSagas from './components/GroupStoryFormDialog/sagas';
import * as actions from './actions';
import * as AT from './actionTypes';

function* setSelectedThenOpen(action) {
  yield put(actions.setSelectedEvent(action.eventData));
  action.openModal();
}

function* fetchAllGroupStoryEvents({ params }) {
  try {
    const { data } = yield call(scheduleApi.fetchEvents, {
      ...params,
    });
    yield put(
      actions.fetchAllGroupStoryEventsSuccess(
        data.results.map(event => parseEventData(event))
      )
    );
  } catch (e) {
    yield put(actions.fetchAllGroupStoryEventsFailed(e));
  }
}

function* removeGroupStoryFromEvent({ eventId }) {
  try {
    const { data: event } = yield call(eventApi.editEvent, eventId, {
      story: null,
    });
    yield put(actions.removeGroupStoryFromEventSuccess(parseEventData(event)));
  } catch (e) {
    let lockedError;
    if (e.response && e.response.status === 423) {
      lockedError = e;
      lockedError.response.data = { error: { msg: e.response.data } };
    }
    yield put(actions.removeGroupStoryFromEventFailed(lockedError || e));
  }
}

function* fetchGroupStoryThenSelect({ id }) {
  try {
    const { data } = yield call(storiesApi.fetchStory, id);
    yield put(setSelectedGroupStory(data));
    yield put(actions.fetchGroupStoryThenSelectSuccess(data));
  } catch (e) {
    yield put(actions.fetchGroupStoryThenSelectFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.FETCH_GROUP_STORY_THEN_SELECT, fetchGroupStoryThenSelect);
  yield takeLatest(AT.SET_SELECTED_THEN_OPEN, setSelectedThenOpen);
  yield takeLatest(AT.REMOVE_GROUP_STORY_FROM_EVENT, removeGroupStoryFromEvent);
  yield takeLatest(AT.FETCH_ALL_GROUP_STORY_EVENTS, fetchAllGroupStoryEvents);
}

export default [saga, ...groupStoriesSidebarSagas];
