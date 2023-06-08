import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchTitleEnvironment as APIFetchTitleEnvironment } from 'dw/online-configuration/services/environment';
import * as Actions from './actions';
import { APP_FETCH_TITLE_ENVIRONMENT } from './actionTypes';

function* fetchTitleEnvironment(action) {
  try {
    const { data } = yield call(APIFetchTitleEnvironment, action.env);
    yield put(Actions.fetchTitleEnvironmentSuccess(data));
  } catch (e) {
    yield put(Actions.fetchTitleEnvironmentFailed(e));
  }
}

function* saga() {
  yield takeLatest(APP_FETCH_TITLE_ENVIRONMENT, fetchTitleEnvironment);
}

export default saga;
