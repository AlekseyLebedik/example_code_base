import { call, put, takeLatest } from 'redux-saga/effects';

import { fetchUserCompanyMemberships as APIFetchUserCompanyMemberships } from '../../services/user';

import { actions, actionTypes as AT } from '.';

function* fetchUserMemberships() {
  try {
    const { data } = yield call(APIFetchUserCompanyMemberships);
    yield put(actions.fetchUserMembershipsSuccess(data));
  } catch (e) {
    yield put(actions.fetchUserMembershipsFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.FETCH_USER_MEMBERSHIPS, fetchUserMemberships);
}

export default saga;
