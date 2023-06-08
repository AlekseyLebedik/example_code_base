import { all, call, put, takeLatest } from 'redux-saga/effects';
import { handleLoadSaga } from 'playpants/components/FeedbackWrapper/sagas';
import compact from 'lodash/compact';

import { event as api } from 'playpants/services';
import * as actions from './actions';
import * as AT from './actionTypes';

const handleLoadingActivitiesSagas = handleLoadSaga([AT.GET_PUBVARS]);

function* getPubVars(action) {
  const { env, params, title } = action;
  try {
    const contextQuery = params && params.context ? `c:${params.context},` : '';
    const groupIdQuery =
      params && params.group_id ? `g:${params.group_id},` : '';
    const namespaceQuery =
      params && params.namespace ? `n:${params.namespace}` : '';
    const query = `${contextQuery}${groupIdQuery}${namespaceQuery}`;
    const { data } = yield call(api.getPubVars, title, env, query);
    const results = yield all(
      data.data.map(varSet =>
        call(
          api.getPubVarSetDetails,
          title,
          env,
          `${varSet.namespace},${varSet.groupId},${varSet.context}`
        )
      )
    );
    const varSets = compact(results).map(result => result.data.data);
    yield put(actions.getPubVarsSuccess(varSets));
  } catch (e) {
    yield put(actions.getPubVarsFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.GET_PUBVARS, getPubVars);
}

export default [saga, handleLoadingActivitiesSagas];
