import { projectSettings as api } from 'playpants/services';
import debounce from 'playpants/helpers/saga/debounce';
import { call, put } from 'redux-saga/effects';

import * as actions from './actions';
import * as AT from './actionTypes';

function* asyncFetchGroupList({ callback, params }) {
  try {
    const {
      data: { results },
    } = yield call(api.fetchGroups, params);
    yield put(actions.asyncFetchGroupListSuccess(results));
    callback(results);
  } catch (e) {
    yield put(actions.asyncFetchGroupListFailed(e));
    callback('');
  }
}

export default function* saga() {
  yield debounce(500, AT.ASYNC_FETCH_GROUP_LIST, asyncFetchGroupList);
}
