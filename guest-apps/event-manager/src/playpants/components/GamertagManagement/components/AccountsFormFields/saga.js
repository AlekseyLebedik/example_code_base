import { projectSettings as api } from 'playpants/services';
import debounce from 'playpants/helpers/saga/debounce';
import { all, call, put, select } from 'redux-saga/effects';
import uniq from 'lodash/uniq';

import {
  titleEnvsListSelector,
  currentProjectIdSelector,
} from 'playpants/components/App/selectors';
import filterResultsErrors from 'playpants/helpers/filterResultsErrors';

import * as actions from './actions';
import * as AT from './actionTypes';

function* asyncFetchLinkedAccountsList({ callback, params }) {
  try {
    const titleEnvs = yield select(titleEnvsListSelector);
    const results = yield all(
      titleEnvs.map(({ titleId, env }) => {
        try {
          return call(api.fetchLinkedAccounts, { ...params, titleId, env });
        } catch (error) {
          return error;
        }
      })
    );
    const passedResults = filterResultsErrors(results);
    yield put(actions.asyncFetchLinkedAccountsListSuccess(passedResults));
    callback(passedResults);
  } catch (e) {
    yield put(actions.asyncFetchLinkedAccountsListFailed(e));
  }
}

function* asyncFetchAccountsGroup({ callback, accountList }) {
  try {
    const project = yield select(currentProjectIdSelector);
    const accounts = uniq(accountList.map(a => a.key)).toString();
    const { data } = yield call(api.fetchAccountsGroup, accounts, { project });
    yield put(actions.asyncFetchAccountsGroupSuccess(data));
    callback(accountList.map(a => ({ ...a, group: data[a.key] })));
  } catch (e) {
    yield put(actions.asyncFetchAccountsGroupFailed(e));
  }
}

export default function* saga() {
  yield debounce(
    500,
    AT.ASYNC_FETCH_LINKED_ACCOUNTS_LIST,
    asyncFetchLinkedAccountsList
  );
  yield debounce(500, AT.ASYNC_FETCH_ACCOUNTS_GROUP, asyncFetchAccountsGroup);
}
