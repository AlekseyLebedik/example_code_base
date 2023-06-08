import { call, put, takeLatest } from 'redux-saga/effects';

import { getUserFriends as apiGetUserFriends } from 'dw/online-configuration/services/accounts';
import * as Actions from './actions';
import { ACCOUNTS_TAB_USER_FRIENDS_FETCH } from './actionTypes';

function* fetchUserFriends(action) {
  try {
    const { data } = yield call(
      apiGetUserFriends,
      action.userID,
      action.params
    );
    yield put(Actions.fetchUserFriendsSuccess(data, action.append));
  } catch (e) {
    yield put(Actions.fetchUserFriendsFailed(e));
  }
}

function* saga() {
  yield takeLatest(ACCOUNTS_TAB_USER_FRIENDS_FETCH, fetchUserFriends);
}

export default saga;
