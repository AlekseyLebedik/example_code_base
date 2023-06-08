import { call, put, takeEvery } from 'redux-saga/effects';

import { getThunderpantsLink as APIGetThunderpantsLink } from 'dw/online-configuration/services/sessionViewer';

import * as Actions from './actions';

import { LOBBIES_FETCH_THUNDERPANTS_LINK } from './actionTypes';

function* fetchThunderpantsLink(action) {
  try {
    const { data } = yield call(APIGetThunderpantsLink, action.serverID);
    yield put(Actions.fetchThunderpantsLinkSuccess(data.data, action.serverID));
  } catch (e) {
    yield put(Actions.fetchThunderpantsLinkFailed(e));
  }
}

function* saga() {
  yield takeEvery(LOBBIES_FETCH_THUNDERPANTS_LINK, fetchThunderpantsLink);
}

export default saga;
