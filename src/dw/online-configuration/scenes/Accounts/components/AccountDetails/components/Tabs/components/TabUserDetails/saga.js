import { call, put, takeLatest } from 'redux-saga/effects';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { getFormError } from 'dw/core/helpers/form-error';

import * as api from 'dw/online-configuration/services/accounts';
import * as Actions from './actions';
import {
  ACCOUNTS_TAB_USER_DETAILS_FETCH,
  ACCOUNTS_TAB_USER_DETAILS_UPDATE_PROFILE,
  ACCOUNTS_TAB_USER_DETAILS_DELETE_PROFILE,
  ACCOUNTS_TAB_USER_DETAILS_CHANGE_REPUTATION,
} from './actionTypes';

function* fetchUserDetails(action) {
  try {
    const { data } = yield call(api.getUserDetails, action.userID);
    yield put(Actions.fetchUserDetailsSuccess(data));
  } catch (e) {
    yield put(Actions.fetchUserDetailsFailed(e));
  }
}

function* changeUserProfile({ userID, profileType, values }) {
  try {
    const { data } = yield call(
      api.changeUserProfile,
      userID,
      profileType,
      values
    );
    yield put(Actions.fetchUserDetailsSuccess(data));
    yield put(
      GlobalSnackBarActions.show('Fields successfully reset', 'success')
    );
  } catch (e) {
    yield put(nonCriticalHTTPError(e));
  }
}

function* deleteUserProfile({ userID }) {
  try {
    const { data } = yield call(api.deleteUserProfile, userID);
    yield put(Actions.fetchUserDetailsSuccess(data));
    yield put(
      GlobalSnackBarActions.show('Profiles successfully reseted', 'success')
    );
  } catch (e) {
    yield put(nonCriticalHTTPError(e));
  }
}

function* changeReputation({ userID, score, resolve, reject }) {
  try {
    yield call(api.changeReputation, userID, score);
    yield put(Actions.changeReputationSuccess(userID, score));
    yield put(
      GlobalSnackBarActions.show('Reputation successfully updated', 'success')
    );
    resolve();
  } catch (e) {
    const formErrors = getFormError(e) || { score: `Error: ${e}` };
    reject(formErrors);
  }
}

function* saga() {
  yield takeLatest(ACCOUNTS_TAB_USER_DETAILS_FETCH, fetchUserDetails);
  yield takeLatest(ACCOUNTS_TAB_USER_DETAILS_UPDATE_PROFILE, changeUserProfile);
  yield takeLatest(ACCOUNTS_TAB_USER_DETAILS_DELETE_PROFILE, deleteUserProfile);
  yield takeLatest(
    ACCOUNTS_TAB_USER_DETAILS_CHANGE_REPUTATION,
    changeReputation
  );
}

export default saga;
