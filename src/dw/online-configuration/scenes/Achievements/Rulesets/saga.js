import { call, put, takeLatest, all } from 'redux-saga/effects';

import {
  getRulesets as apiFetchRulesets,
  uploadRuleset as apiUploadRuleset,
  getRulesetDetail as apiGetRulesetDetail,
  propagateRuleset as apiPropagateRuleset,
  deleteRuleset as apiDeleteRuleset,
  activateRuleset as apiActivateRuleset,
  checkRuleset as apiCheckRuleset,
} from 'dw/online-configuration/services/achievements';
// import {
//   getRulesets as apiFetchRulesets,
//   getInactiveRulesets as apiFetchInactiveRulesets,
// } from 'dw/online-configuration/services/mock/achievements';
import * as Actions from './actions';
import {
  RULESETS_FETCH,
  ACTIVE_RULESETS_FETCH,
  RULESET_UPLOAD,
  RULESET_DETAIL_FETCH,
  RULESET_PROPAGATE,
  RULESET_DELETE,
  RULESETS_ACTIVATE,
  RULESET_CHECK,
} from './actionTypes';

function* fetchRulesets(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchRulesets, params);
    const extraPayload = { append, q: params.q };
    yield put(Actions.fetchRulesetsSuccess(data, extraPayload));
  } catch (e) {
    yield put(Actions.fetchRulesetsFailed(e, params, append));
  }
}

function* fetchActiveRuleset(action) {
  const { params } = action;
  try {
    const { data } = yield call(apiFetchRulesets, params);
    let { nextPageToken } = data;
    const rulesets = [...data.rulesets];
    while (!rulesets.some(r => r.isActive) && nextPageToken !== null) {
      const response = yield call(apiFetchRulesets, {
        ...params,
        nextPageToken,
      });
      ({ nextPageToken } = response.data);
      rulesets.push(...response.data.rulesets);
    }
    yield put(Actions.fetchRulesetsSuccess({ rulesets }, {}));
  } catch (e) {
    yield put(Actions.fetchRulesetsFailed(e, params, false));
  }
}

function* uploadRuleset(action) {
  try {
    yield call(apiUploadRuleset, action.values, action.context);
    yield put(Actions.uploadRulesetSuccess(action.values.label));
  } catch (e) {
    yield put(Actions.uploadRulesetFailed(e));
  }
}

function* fetchRulesetDetail(action) {
  try {
    const { label, context } = action;
    const { data } = yield call(apiGetRulesetDetail, label, { context });
    yield put(Actions.fetchRulesetDetailSuccess(data));
  } catch (e) {
    yield put(Actions.fetchRulesetDetailFailed(e));
  }
}

function* propagateRuleset(action) {
  const propagateRulesets = () =>
    action.values.environment.map(({ key: e }) =>
      call(
        apiPropagateRuleset,
        action.ruleset,
        {
          ...action.values,
          environment: e,
        },
        action.values.context[e]
      )
    );
  try {
    yield all(propagateRulesets());
    yield put(Actions.propagateRulesetSuccess());
  } catch (error) {
    yield put(Actions.propagateRulesetFailed(error));
  }
}

function* deleteRuleset(action) {
  try {
    const deleteCalls = () =>
      action.values.map(label =>
        call(
          apiDeleteRuleset,
          label.label ? label.label : label,
          action.context
        )
      );
    yield all(deleteCalls());
    yield put(Actions.deleteRulesetSuccess(action.q, action.values.length));
  } catch (e) {
    yield put(Actions.deleteRulesetFailed(e));
  }
}

function* activateRuleset(action) {
  try {
    yield call(apiActivateRuleset, action.ruleset, action.context);
    yield put(Actions.activateRulesetSuccess(action.ruleset.label));
  } catch (e) {
    yield put(Actions.activateRulesetFailed(e));
  }
}

function* checkRuleset(action) {
  try {
    const { label, context } = action;
    const { data } = yield call(apiCheckRuleset, label, { context });
    yield put(Actions.checkRulesetSuccess(data));
  } catch (e) {
    yield put(Actions.checkRulesetFailed(e));
  }
}

function* saga() {
  yield takeLatest(RULESETS_FETCH, fetchRulesets);
  yield takeLatest(ACTIVE_RULESETS_FETCH, fetchActiveRuleset);
  yield takeLatest(RULESET_DETAIL_FETCH, fetchRulesetDetail);
  yield takeLatest(RULESET_UPLOAD, uploadRuleset);
  yield takeLatest(RULESET_PROPAGATE, propagateRuleset);
  yield takeLatest(RULESET_DELETE, deleteRuleset);
  yield takeLatest(RULESETS_ACTIVATE, activateRuleset);
  yield takeLatest(RULESET_CHECK, checkRuleset);
}

export default saga;
