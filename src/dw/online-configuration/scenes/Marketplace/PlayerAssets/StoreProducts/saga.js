import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import { postGrantPlayerProducts } from 'dw/online-configuration/services/marketplace';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as PlayerAssetsActions from '../actions';
import * as PlayerBalancesActions from '../PlayerBalances/actions';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* postGrantProducts(action) {
  const { playerId, data, params } = action;
  const { isClan } = params;
  try {
    const response = yield call(
      postGrantPlayerProducts,
      playerId,
      data,
      params
    );
    yield put(
      Actions.postGrantProductsSuccess(playerId, response.data, isClan)
    );
  } catch (e) {
    yield put(Actions.postGrantProductsFailed(playerId, e));
  }
}

function* reloadCurrencies({ playerId, data, isClan }) {
  if (!data.updatedBalances || !data.updatedBalances.length) {
    return;
  }
  yield put(PlayerBalancesActions.getPlayerBalances(playerId, isClan));
}

function* reloadItems({ playerId, data, isClan }) {
  if (!data.updatedInventoryItems || !data.updatedInventoryItems.length) {
    return;
  }
  yield put(PlayerAssetsActions.getPlayerItems(playerId, isClan));
}

function* grantProductsSuccess() {
  yield put(GlobalSnackBarActions.show('Products Granted', 'success'));
}

function* grantProductsFailed({ error }) {
  yield put(
    GlobalSnackBarActions.show(
      error.response ? error.response.data.error.msg : error.toString(),
      'error'
    )
  );
}

function* saga() {
  yield takeLatest(AT.GRANT_PRODUCTS_POST, postGrantProducts);

  // Form side-effects
  yield takeEvery(AT.GRANT_PRODUCTS_POST_SUCCESS, reloadCurrencies);
  yield takeEvery(AT.GRANT_PRODUCTS_POST_SUCCESS, reloadItems);
  yield takeEvery(AT.GRANT_PRODUCTS_POST_SUCCESS, grantProductsSuccess);
  yield takeEvery(AT.GRANT_PRODUCTS_POST_FAILED, grantProductsFailed);
}

export default saga;
