import { call, put, takeLatest } from 'redux-saga/effects';
import * as API from 'dw/player-tooling/services/player-accounts';
import * as Actions from './actions';
import { ACCOUNTS_PII_PREFIX, ACCOUNTS_2FA_PREFIX } from './constants';

function* fetchPIIDetails(action) {
  const { urlID: accountID, params } = action;
  try {
    const { data } = yield call(API.getUNOAccountPIIDetails, {
      accountID,
      ...params,
    });
    yield put(Actions.fetchPIIDetailsSuccess(data));
  } catch (error) {
    yield put(Actions.fetchPIIDetailsFailed(error));
  }
}

function* fetch2FADetails(action) {
  const { urlID: accountID, params } = action;
  try {
    const { data } = yield call(API.getUNOAccount2FADetails, accountID, params);
    yield put(Actions.fetch2FADetailsSuccess(data));
  } catch (error) {
    yield put(Actions.fetch2FADetailsFailed(error));
  }
}

function* saga() {
  yield takeLatest(`${ACCOUNTS_PII_PREFIX}_FETCH`, fetchPIIDetails);
  yield takeLatest(`${ACCOUNTS_2FA_PREFIX}_FETCH`, fetch2FADetails);
}

export default saga;
