import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import ReactGA from 'react-ga';
import * as GlobalSnackBarActions from '../../components/GlobalSnackBar/actions';
import { logout } from '../../auth';
import * as API from '../../services/user';
import { actions, actionTypes as AT } from '.';

function* fetchUserProfile() {
  try {
    const { data } = yield call(API.getUserSelfProfile);
    yield put(actions.fetchUserProfileSuccess(data));

    // Set the user id for further Google Analytics events
    ReactGA.set({ userId: data.id });
  } catch (e) {
    yield put(actions.fetchUserProfileFailed(e));
  }
}

function* fetchUserProfileSettings() {
  try {
    const { data } = yield call(API.getUserSelfProfileSettings);
    yield put(actions.fetchUserProfileSettingsSuccess(data));
  } catch (e) {
    yield put(actions.fetchUserProfileSettingsFailed(e));
  }
}

function* fetchUserProjects() {
  try {
    const { data } = yield call(API.getUserSelfProjects);
    yield put(actions.fetchUserProjectsSuccess(data));
  } catch (e) {
    yield put(actions.fetchUserProjectsFailed(e));
  }
}

function* logoutUser() {
  try {
    // Logout the user session
    yield call(API.logoutProfile);

    // Remove JWT token from local storage and redirect to the auth provider
    logout();
  } catch (e) {
    /**
     * This case should not be considered as an error. Maybe the user was
     * offline? Maybe the request failed? Maybe it was a double request
     * to the logout endpoint?
     */

    // eslint-disable-next-line
    console.error('Failed to logout user', e);
  }
}

function* addBookmark(action) {
  try {
    yield call(API.addBookmark, action.params);

    yield put(actions.addBookmarkSuccess(action.params));
    yield put(
      GlobalSnackBarActions.show('Bookmarks Added Successfully', 'success')
    );
  } catch (e) {
    // error handler
  }
}

function* deleteBookmark(action) {
  try {
    yield call(API.deleteBookmark, action.params);

    yield put(actions.deleteBookmarkSuccess(action.params));
    yield put(
      GlobalSnackBarActions.show('Bookmarks Deleted Successfully', 'success')
    );
  } catch (e) {
    // error handler
  }
}

function* addFavoritePlayer(action) {
  try {
    yield call(API.addFavoritePlayer, action.params);
    yield put(actions.addFavoritePlayerSuccess(action.params));
    yield put(
      GlobalSnackBarActions.show(
        `"${action.params.username} | ${action.params.account_id}" Added to Favorites Successfully`,
        'success'
      )
    );
  } catch (e) {
    // error handler
  }
}

function* deleteFavoritePlayer(action) {
  try {
    yield call(API.deleteFavoritePlayer, action.params);
    yield put(actions.deleteFavoritePlayerSuccess(action.params));
    yield put(
      GlobalSnackBarActions.show(
        `"${action.params.username} | ${action.params.account_id}" Removed from Favorites Successfully`,
        'success'
      )
    );
  } catch (e) {
    // error handler
  }
}

function* saga() {
  yield takeLatest(AT.FETCH_USER_PROFILE, fetchUserProfile);
  yield takeLatest(AT.FETCH_USER_PROFILE_SETTINGS, fetchUserProfileSettings);
  yield takeLatest(AT.FETCH_USER_PROJECTS, fetchUserProjects);
  yield takeLatest(AT.BOOKMARKS_ADD, addBookmark);
  yield takeLatest(AT.BOOKMARKS_ADD_SUCCESS, fetchUserProfile);
  yield takeLatest(AT.BOOKMARKS_DELETE, deleteBookmark);
  yield takeLatest(AT.BOOKMARKS_DELETE_SUCCESS, fetchUserProfile);
  yield takeLatest(AT.FAVORITE_PLAYER_ADD, addFavoritePlayer);
  yield takeLatest(AT.FAVORITE_PLAYER_ADD_SUCCESS, fetchUserProfile);
  yield takeLatest(AT.FAVORITE_PLAYER_DELETE, deleteFavoritePlayer);
  yield takeLatest(AT.FAVORITE_PLAYER_DELETE_SUCCESS, fetchUserProfile);

  // We don't want to cancel logout request, so just take them all
  yield takeEvery(AT.LOGOUT_USER, logoutUser);
}

export default saga;
