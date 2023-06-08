import { call, put, takeEvery } from 'redux-saga/effects';

import { fetchFailed } from '@demonware/devzone-core/helpers/actions';
import * as api from './services';

import {
  AVAILABLE_CONTEXTS_PREFIX,
  CONTEXT_REGISTRY_PREFIX,
} from './constants';
import * as Actions from './actions';

const fetch = (actionPrefix, apiCall, successAction) =>
  function* fetchContexts(action) {
    try {
      const { params: actionParams = {} } = action;
      const { sideEffect, ...params } = actionParams;
      const payload = yield call(apiCall, params);
      yield put(successAction(payload, params));
      if (sideEffect && sideEffect(payload, params)) {
        yield put(sideEffect(payload, params));
      }
    } catch (e) {
      const {
        response: { status },
      } = e;
      if (status === 404) {
        // The service is not configured for that title environment.
        // Ignoring error here as it would be raised on main route if actual call to the service needed.
        yield put(successAction({ data: { data: [] } }, action.params));
      } else {
        yield put(fetchFailed(actionPrefix, e));
      }
    }
  };

export default function* saga() {
  yield takeEvery(
    `${AVAILABLE_CONTEXTS_PREFIX}_FETCH`,
    fetch(
      AVAILABLE_CONTEXTS_PREFIX,
      api.fetchContextsForService,
      Actions.fetchSuccess[AVAILABLE_CONTEXTS_PREFIX]
    )
  );
  yield takeEvery(
    `${CONTEXT_REGISTRY_PREFIX}_FETCH`,
    fetch(
      CONTEXT_REGISTRY_PREFIX,
      api.fetchContextsRegistryForService,
      Actions.fetchSuccess[CONTEXT_REGISTRY_PREFIX]
    )
  );
}
