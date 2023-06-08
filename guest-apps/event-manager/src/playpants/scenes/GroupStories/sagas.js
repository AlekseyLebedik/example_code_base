import { getSaga, getUpdateSaga } from '@demonware/devzone-core/helpers/sagas';
import { takeLatest, put, take } from 'redux-saga/effects';
import { stories as api } from 'playpants/services';
import groupStoriesDetailSagas from './components/GroupStoriesDetail/sagas';
import groupStoriesSidebarSagas from './components/GroupStoriesSidebar/sagas';
import * as AT from './actionTypes';
import * as actions from './actions';

function* deleteThenRedirect({ storyId, redirect }) {
  yield put(actions.deleteGroupStory(storyId));
  const result = yield take([
    `${AT.DELETE_GROUP_STORY}_UPDATE_SUCCESS`,
    `${AT.DELETE_GROUP_STORY}_UPDATE_FAILED`,
  ]);
  if (result.type === `${AT.DELETE_GROUP_STORY}_UPDATE_SUCCESS`) {
    redirect();
  }
}

function* saga() {
  yield takeLatest(AT.DELETE_THEN_REDIRECT, deleteThenRedirect);
}

export default [
  saga,
  getSaga(AT.SEARCH_GROUP_STORIES, api.fetchStories, 'results'),
  getUpdateSaga(AT.DELETE_GROUP_STORY, api.deleteStory),
  ...groupStoriesDetailSagas,
  ...groupStoriesSidebarSagas,
];
