import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  setSubmitFailed,
  reset,
} from 'redux-form';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import get from 'lodash/get';
import * as helperActions from '@demonware/devzone-core/helpers/actions';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import {
  getItems,
  getProducts,
  getActiveStore,
  getStoreDetail,
  postPlayerAssetChanges,
} from 'dw/online-configuration/services/marketplace';

import { STORE_ITEMS_PREFIX, STORE_PRODUCTS_PREFIX } from './constants';

import * as BalancesActions from './PlayerBalances/actions';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* postAssetChanges(action) {
  const { form, playerId, data, params, sideEffect } = action;
  const { isClan } = params;
  try {
    const response = yield call(postPlayerAssetChanges, playerId, data, params);
    yield put(
      Actions.postAssetChangesSuccess(
        form,
        playerId,
        response.data.data,
        data,
        isClan
      )
    );
    if (sideEffect) {
      yield put(sideEffect());
    }
  } catch (e) {
    yield put(Actions.postAssetChangesFailed(form, playerId, e));
  }
}

function* startSubmitBalanceChange({ form }) {
  if (!form) {
    return;
  }
  yield put(startSubmit(form));
}

function* setSubmitSuccessBalanceChange({ form }) {
  if (!form) {
    return;
  }
  yield put(reset(form));
  yield put(setSubmitSucceeded(form));
  yield put(stopSubmit(form));
  yield put(ModalHandlers.close(form));
}

function* onBalanceChangeSuccess({ playerId, request, isClan }) {
  if (
    !get(request, 'fees.currencies', false) &&
    !get(request, 'grants.currencies', false)
  ) {
    return;
  }
  yield put(BalancesActions.getPlayerBalances(playerId, isClan));
  yield put(GlobalSnackBarActions.show('Balance saved', 'success'));
}

function* setSubmitFailedBalanceChange({ form, error }) {
  yield put(
    GlobalSnackBarActions.show(
      error.response ? error.response.data.error.msg : error.toString(),
      'error'
    )
  );
  if (!form) {
    return;
  }
  yield put(setSubmitFailed(form));
}

function* addRemoveItemsSuccess({ playerId, request, isClan }) {
  if (
    !get(request, 'fees.items', false) &&
    !get(request, 'grants.items', false)
  ) {
    return;
  }
  yield put(Actions.getPlayerItems(playerId, isClan));
  yield put(
    GlobalSnackBarActions.show(
      get(request, 'grants.items', false) ? 'Assets added' : 'Assets removed',
      'success'
    )
  );
}

function* storeDetailsFetch(action, skipDetails = false) {
  const { params } = action;
  try {
    const { data: storeInfo } = yield call(getActiveStore, params);
    yield put(Actions.setActiveStore(storeInfo));
    if (skipDetails) return null;
    const { data: storeData } = yield call(
      getStoreDetail,
      storeInfo.label,
      params
    );
    yield put(Actions.setActiveStoreDetails(storeData));
    return storeData;
  } catch (e) {
    yield put(helperActions.fetchFailed(STORE_ITEMS_PREFIX, e));
  }
  return null;
}

function* storeItemsFetch(action) {
  const { params } = action;
  try {
    yield* storeDetailsFetch(action, true);
    const {
      data: { data },
    } = yield call(getItems, { ...params, all: true });
    yield put(helperActions.fetchSuccess(STORE_ITEMS_PREFIX, { data }, false));
  } catch (e) {
    yield put(helperActions.fetchFailed(STORE_ITEMS_PREFIX, e));
  }
}

function* storeProductsFetch(action) {
  const { params } = action;
  try {
    const {
      data: { data },
    } = yield call(getProducts, { ...params, all: true });
    yield put(
      helperActions.fetchSuccess(STORE_PRODUCTS_PREFIX, { data }, false)
    );
  } catch (e) {
    yield put(helperActions.fetchFailed(STORE_PRODUCTS_PREFIX, e));
  }
}

function* saga() {
  yield takeLatest(AT.ASSET_CHANGE_POST, postAssetChanges);
  yield takeLatest(`${STORE_ITEMS_PREFIX}_FETCH`, storeItemsFetch);
  yield takeLatest(`${STORE_PRODUCTS_PREFIX}_FETCH`, storeProductsFetch);

  // Add/Remove items side-effect
  yield takeEvery(AT.ASSET_CHANGE_POST_SUCCESS, addRemoveItemsSuccess);

  // Balance side-effect
  yield takeEvery(AT.ASSET_CHANGE_POST_SUCCESS, onBalanceChangeSuccess);

  // Form side-effects
  yield takeEvery(AT.ASSET_CHANGE_POST, startSubmitBalanceChange);
  yield takeEvery(AT.ASSET_CHANGE_POST_SUCCESS, setSubmitSuccessBalanceChange);
  yield takeEvery(AT.ASSET_CHANGE_POST_FAILED, setSubmitFailedBalanceChange);
}

export default saga;
