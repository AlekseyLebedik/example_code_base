import { put, takeLatest } from 'redux-saga/effects';
import { reset } from 'redux-form';
import { stories as api } from 'playpants/services';
import {
  patchStorySaga,
  uploadScheduleSaga,
  setSelectedScheduleSaga,
} from 'playpants/components/StoryFormComponents/sagas';
import {
  handleLoadSaga,
  handleSaveSaga,
} from 'playpants/components/FeedbackWrapper/sagas';
import { SCHEDULE_STORY_DETAIL_FORM } from './constants';
import * as AT from './actionTypes';

function* resetScheduleStoryDetailForm() {
  yield put(reset(SCHEDULE_STORY_DETAIL_FORM));
}

function* saga() {
  yield takeLatest(
    `${AT.PATCH_SCHEDULE_STORY}_FAILED`,
    resetScheduleStoryDetailForm
  );
}

export default [
  handleLoadSaga([AT.PATCH_SCHEDULE_STORY]),
  handleSaveSaga([AT.PATCH_SCHEDULE_STORY]),
  patchStorySaga(AT.PATCH_SCHEDULE_STORY, api.patchStory),
  saga,
  setSelectedScheduleSaga(AT.SET_SELECTED_SCHEDULE),
  uploadScheduleSaga(AT.UPLOAD_STORY_SCHEDULE, api.uploadSchedule),
];
