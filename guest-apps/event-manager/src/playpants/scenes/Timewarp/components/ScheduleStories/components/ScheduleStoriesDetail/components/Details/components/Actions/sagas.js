import { takeLatest, put, take } from 'redux-saga/effects';
import { getUpdateSaga } from 'dw/core/helpers/sagas';
import { stories as storiesApi } from 'playpants/services';
import { handleSaveSaga } from 'playpants/components/FeedbackWrapper/sagas';
import * as AT from './actionTypes';
import * as actions from './actions';

const handleSavingScheduleStoriesSagas = handleSaveSaga([
  `${AT.DELETE_SCHEDULE_STORY}_UPDATE`,
]);

function* deleteThenRedirect({ storyId, redirect }) {
  yield put(actions.deleteScheduleStory(storyId));
  const result = yield take([
    `${AT.DELETE_SCHEDULE_STORY}_UPDATE_SUCCESS`,
    `${AT.DELETE_SCHEDULE_STORY}_UPDATE_FAILED`,
  ]);
  if (result.type === `${AT.DELETE_SCHEDULE_STORY}_UPDATE_SUCCESS`) {
    redirect();
  }
}

function* saga() {
  yield takeLatest(AT.DELETE_THEN_REDIRECT, deleteThenRedirect);
}

export default [
  getUpdateSaga(AT.DELETE_SCHEDULE_STORY, storiesApi.deleteStory),
  handleSavingScheduleStoriesSagas,
  saga,
];
