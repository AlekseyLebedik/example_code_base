import axios from 'axios';
import { cancel, call, fork, put, take } from 'redux-saga/effects';
import delay from '@redux-saga/delay-p';
import { getAccounts } from 'dw/online-configuration/services/accounts';
import { ACTION_TYPE_PREFIX } from './constants';
import { loadDetailsSuccess } from './actions';

const THROTTLE = 20; // Max ids to go in one request
const DELAY = 10;

function* fetchAccounts(cancelToken, ...actions) {
  yield delay(DELAY);
  const id = actions.map(action => action.params.id).join(',');
  const { data } = yield call(getAccounts, { id }, cancelToken);
  yield put(loadDetailsSuccess(data, id.split(',')));
}

const takeLatest = (pattern, saga) =>
  // eslint-disable-next-line func-names
  fork(function* () {
    let lastTask;
    let actions = [];
    let cancelToken;
    while (true) {
      const action = yield take(pattern);
      if (lastTask && lastTask.isRunning() && actions.length < THROTTLE) {
        yield cancelToken.cancel('Operation canceled due to next request');
        yield cancel(lastTask); // cancel is no-op if the task has already terminated
        actions.push(action);
      } else {
        actions = [action];
      }
      cancelToken = axios.CancelToken.source();
      lastTask = yield fork(saga, cancelToken.token, ...actions);
    }
  });

function* rootSaga() {
  yield takeLatest(`${ACTION_TYPE_PREFIX}_FETCH`, fetchAccounts);
}

export default rootSaga;
