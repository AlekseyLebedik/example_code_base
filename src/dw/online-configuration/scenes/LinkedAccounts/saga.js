import { call, put, takeLatest } from 'redux-saga/effects';
import get from 'lodash/get';

import {
  fetchFailed,
  fetchSuccess,
  updateSuccess,
  updateFailed,
} from '@demonware/devzone-core/helpers/actions';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import * as API from 'dw/online-configuration/services/linked_accounts';
import * as Actions from './actions';

import {
  ACCOUNTS_LOOKUP_PREFIX,
  ACCOUNT_DETAILS_PREFIX,
  ACCOUNTS_BANS_PREFIX,
} from './constants';

function* lookupAccounts(action) {
  const {
    params: { successCallback, failCallback, ...params },
    append,
  } = action;
  try {
    const { data } = yield call(API.getLinkedAccounts, params);
    yield put(Actions.accountsLookupSuccess({ ...data, ...params }, append));
    if (successCallback) {
      successCallback(data.data, data.next);
    }
  } catch (error) {
    yield put(fetchFailed(ACCOUNTS_LOOKUP_PREFIX, error));
    if (failCallback) {
      failCallback([]);
    }
  }
}

function* fetchAccountDetails(action) {
  const { urlID, params } = action;
  try {
    const { data } = yield call(API.getLinkedAccountDetails, {
      urlID,
      ...params,
    });
    yield put(Actions.fetchAccountDetailsSuccess(urlID, data));
  } catch (error) {
    yield put(Actions.fetchAccountDetailsFailed(urlID, error));
  }
}

function* updateAccountDetails(action) {
  const { urlID, params } = action;
  const { provider, formName, payload } = params;

  try {
    const { data } = yield call(API.updateLinkedAccounts, {
      accountId: urlID,
      data: payload,
    });
    yield put(updateSuccess(ACCOUNT_DETAILS_PREFIX, data, false));
    const successMsg = `${get(data, 'data.uno.message', '')} ${get(
      data,
      'data.mkt.message',
      ''
    )}`;
    yield put(GlobalSnackBarActions.show(successMsg, 'success'));
    yield put(ModalHandlers.close(formName));
    yield put(
      Actions.accountsLookup({
        q: urlID,
        provider,
      })
    );
  } catch (error) {
    yield put(updateFailed(ACCOUNT_DETAILS_PREFIX, error));
  }
}

function* fetchAccountsBans(action) {
  const { params: accounts } = action;
  try {
    // Hack. Looks like twitter provider is not supported by the api, skippint it.
    const account = accounts.find(a => a.provider !== 'twitter');
    if (account) {
      const { accountID, provider } = account;
      const { data } = yield call(API.getAccountBans, { accountID, provider });
      yield put(fetchSuccess(ACCOUNTS_BANS_PREFIX, { data }, false));
    }
  } catch (e) {
    yield put(fetchFailed(ACCOUNTS_BANS_PREFIX, e));
  }
}

function* saga() {
  yield takeLatest(`${ACCOUNTS_LOOKUP_PREFIX}_FETCH`, lookupAccounts);
  yield takeLatest(`${ACCOUNT_DETAILS_PREFIX}_FETCH`, fetchAccountDetails);
  yield takeLatest(`${ACCOUNT_DETAILS_PREFIX}_UPDATE`, updateAccountDetails);
  yield takeLatest(`${ACCOUNTS_BANS_PREFIX}_FETCH`, fetchAccountsBans);
}

export default saga;
