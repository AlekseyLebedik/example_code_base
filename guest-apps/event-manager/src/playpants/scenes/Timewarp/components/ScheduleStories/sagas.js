import isEqual from 'lodash/isEqual';
import delay from '@redux-saga/delay-p';
import {
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { stories as storiesApi } from 'playpants/services';
import { currentProjectIdSelector } from 'playpants/components/App/selectors';
import { setLocalStorageHistory } from 'playpants/helpers/localStorage';
import { handleLoadSaga } from 'playpants/components/FeedbackWrapper/sagas';
import scheduleStoriesDetailSagas from './components/ScheduleStoriesDetail/sagas';
import scheduleStoriesSidebarSagas from './components/ScheduleStoriesSidebar/sagas';
import { TIMEWARP_LS_KEY } from '../../constants';
import * as AT from './actionTypes';
import * as actions from './actions';
import {
  searchedScheduleStoriesParamsSelector,
  selectedScheduleStorySelector,
} from './selectors';

const handleLoadingScheduleStoriesSagas = handleLoadSaga([
  AT.FETCH_SCHEDULE_STORY_THEN_SELECT,
]);

function* fetchScheduleStoryThenSelect({ id }) {
  try {
    const { data } = yield call(storiesApi.fetchStory, id);
    yield put(actions.setSelectedScheduleStory(data));
    yield put(actions.fetchScheduleStoryThenSelectSuccess(data));
  } catch (e) {
    yield put(actions.fetchScheduleStoryThenSelectFailed(e));
  }
}

function* pollScheduleStories() {
  while (true) {
    const selectedScheduleStory = yield select(selectedScheduleStorySelector);
    const searchedScheduleStoriesParams = yield select(
      searchedScheduleStoriesParamsSelector
    );
    try {
      const { data } = yield call(storiesApi.fetchStories, {
        ...searchedScheduleStoriesParams,
      });
      const { results } = data;
      yield put(actions.searchScheduleStoriesSuccess(results, data.next));
      if (selectedScheduleStory.id) {
        const updatedSelectedScheduleStory = results.find(
          result => result.id === selectedScheduleStory.id
        );
        if (!isEqual(updatedSelectedScheduleStory, selectedScheduleStory)) {
          yield put(
            actions.setSelectedScheduleStory(updatedSelectedScheduleStory)
          );
        }
      }
    } catch (e) {
      yield put(actions.searchScheduleStoriesFailed(e));
    }
    yield delay(20000);
  }
}
function* setSelectedScheduleStory({ story }) {
  yield put(actions.storeSelectedScheduleStory(story));
}

function* storeSelectedScheduleStory({ story }) {
  const currentProjectId = yield select(currentProjectIdSelector);
  try {
    setLocalStorageHistory(
      currentProjectId,
      TIMEWARP_LS_KEY,
      'selectedScheduleStory',
      story
    );
    yield put(actions.storeSelectedScheduleStorySuccess());
  } catch (e) {
    yield put(actions.storeSelectedScheduleStoryFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.SET_SELECTED_SCHEDULE_STORY, setSelectedScheduleStory);
  yield takeLatest(
    AT.STORE_SELECTED_SCHEDULE_STORY,
    storeSelectedScheduleStory
  );
  yield takeLatest(
    AT.FETCH_SCHEDULE_STORY_THEN_SELECT,
    fetchScheduleStoryThenSelect
  );
  while (yield take(AT.START_POLL_SCHEDULES)) {
    const pollSchedulesTask = yield fork(pollScheduleStories);
    yield take(AT.STOP_POLL_SCHEDULES);
    yield cancel(pollSchedulesTask);
  }
}

export default [
  ...scheduleStoriesDetailSagas,
  ...scheduleStoriesSidebarSagas,
  getSaga(AT.SEARCH_SCHEDULE_STORIES, storiesApi.fetchStories, 'results'),
  handleLoadingScheduleStoriesSagas,
  saga,
];
