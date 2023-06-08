import { takeLatest, put, call } from 'redux-saga/effects';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { event as eventApi, schedule as scheduleApi } from 'playpants/services';
import scheduleStoryDetailFormSagas from './components/Fields/sagas';
import scheduleStoryDetailActionsSagas from './components/Actions/sagas';

import * as AT from './actionTypes';
import * as actions from './actions';

function* fetchScheduleStoryEventsCount({ params }) {
  try {
    const response = yield call(scheduleApi.fetchEvents, params);
    yield put(
      actions.fetchScheduleStoryEventsCountSuccess(response.data.count)
    );
  } catch (e) {
    yield put(actions.fetchScheduleStoryEventsCountFailed(e));
  }
}

function* saga() {
  yield takeLatest(
    AT.FETCH_SCHEDULE_STORY_EVENTS_COUNT,
    fetchScheduleStoryEventsCount
  );
}

export default [
  saga,
  getSaga(
    AT.FETCH_CATEGORIES,
    eventApi.fetchObjectStoreCategories,
    'categories'
  ),
  getSaga(AT.FETCH_CONTEXTS, eventApi.fetchContexts),
  ...scheduleStoryDetailFormSagas,
  ...scheduleStoryDetailActionsSagas,
];
