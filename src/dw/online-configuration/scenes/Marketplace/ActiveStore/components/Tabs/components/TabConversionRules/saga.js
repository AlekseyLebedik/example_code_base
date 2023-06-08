import { call, put, takeLatest } from 'redux-saga/effects';

import { getConversionRules as apiGetConversionRules } from 'dw/online-configuration/services/marketplace';
import * as Actions from './actions';
import { ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH } from './actionTypes';

function* fetchConversionRules(action) {
  try {
    const { data } = yield call(apiGetConversionRules, {
      context: action.context,
    });
    yield put(Actions.fetchConversionRulesSuccess(data));
  } catch (e) {
    yield put(Actions.fetchConversionRulesFailed(e));
  }
}

function* saga() {
  yield takeLatest(
    ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH,
    fetchConversionRules
  );
}

export default saga;
