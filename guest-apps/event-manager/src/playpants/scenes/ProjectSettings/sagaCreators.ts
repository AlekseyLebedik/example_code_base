import { Action } from 'redux';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import {
  updateSuccess,
  updateFailed,
} from '@demonware/devzone-core/helpers/actions';
import { projectSettings as api } from 'playpants/services';

export const createFetchAvailableUsersSaga = (
  prefix: string
): ((params: never) => void) => getSaga(prefix, api.fetchUsers);

export const createFetchGroupsSaga = (
  prefix: string
): ((params: never) => void) => getSaga(prefix, api.fetchGroups, 'results');

export const generateSaga = (
  prefix: string,
  saga: ({ groupId, params, callback }: ActionType) => Generator
): (() => void) =>
  function* sagaHandler(): SagaIterator {
    yield takeLatest(prefix, saga);
  };

interface ActionType extends Action {
  groupId: number;
  params: never;
  callback: Action;
}

export const createDeleteGroupSaga = (prefix: string): (() => void) => {
  function* saga({ groupId, params, callback }: ActionType) {
    try {
      yield call(api.deleteGroup, groupId, params);
      yield put(updateSuccess(prefix));
      yield put(callback);
    } catch (e) {
      yield put(updateFailed(prefix, e));
    }
  }
  return generateSaga(prefix, saga);
};
