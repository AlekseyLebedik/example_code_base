import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
  getUserAchievements as apiFetchUserAchievements,
  deleteAchievements as apiDeleteAchievements,
} from 'dw/online-configuration/services/achievements';
import * as Actions from './actions';
import {
  USER_ACHIEVEMENTS_FETCH,
  USER_ACHIEVEMENTS_DELETE,
} from './actionTypes';

function* fetchUserAchievements(action) {
  const { successCallback, failCallback, ...params } = action.params;
  try {
    const { data } = yield call(apiFetchUserAchievements, params);
    if (successCallback)
      successCallback(data.userAchievements, data.nextPageToken);
    else yield put(Actions.fetchUserAchievementsSuccess(data, action.append));
  } catch (e) {
    if (failCallback) failCallback();
    yield put(Actions.fetchUserAchievementsFailed(e));
  }
}

function* deleteUserAchievements(action) {
  const { successCallback, ...params } = action.params;
  try {
    yield call(apiDeleteAchievements, action.playerId, action.values, params);
    if (successCallback) successCallback();
    yield put(
      Actions.deleteUserAchievementsSuccess(
        action.playerId,
        action.values.length
      )
    );
  } catch (e) {
    yield put(Actions.deleteUserAchievementsFailed(e));
  }
}

function* saga() {
  yield takeEvery(USER_ACHIEVEMENTS_FETCH, fetchUserAchievements);
  yield takeLatest(USER_ACHIEVEMENTS_DELETE, deleteUserAchievements);
}

export default saga;
