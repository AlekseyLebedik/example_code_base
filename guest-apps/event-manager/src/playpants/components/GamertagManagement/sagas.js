import { call, put } from 'redux-saga/effects';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { getSaga, getUpdateSaga } from '@demonware/devzone-core/helpers/sagas';
import {
  createDeleteGroupSaga,
  createFetchGroupsSaga,
  generateSaga,
} from 'playpants/scenes/ProjectSettings/sagaCreators';
import { projectSettings as api } from 'playpants/services';

import * as actions from './actions';
import * as AT from './actionTypes';

import AccountsFormFieldsSaga from './components/AccountsFormFields/saga';

/** GROUPS */

const fetchGroupsSaga = createFetchGroupsSaga(AT.FETCH_GROUPS);
const deleteGroupSaga = createDeleteGroupSaga(AT.DELETE_GROUP);

const createGroup = generateSaga(
  AT.CREATE_GROUP,
  function* createObjectGroup(action) {
    try {
      const { accounts, ...params } = action.group;
      const { project, type } = params;
      const { data } = yield call(api.createGroup, params);
      if (accounts) yield call(api.updateGroupAccounts, data.id, accounts);
      yield put(actions.createGroupSuccess(params));
      yield put(actions.fetchGroups({ project, type }));
    } catch (e) {
      yield put(nonCriticalHTTPError(e));
    }
  }
);

/** ACCOUNTS */

const fetchGroupAccountsSaga = getSaga(
  AT.FETCH_GROUP_ACCOUNTS,
  api.fetchGroupAccounts,
  'results'
);

const updateGroupAccountsSaga = getUpdateSaga(
  AT.UPDATE_GROUP_ACCOUNTS,
  api.updateGroupAccounts
);

/** TIMEWARP SETTINGS */

const fetchGroupTimewarpSettingsSaga = getSaga(
  AT.FETCH_GROUP_TIMEWARP_SETTINGS,
  api.fetchGroupTimewarpSettings,
  null
);

const updateGroupTimewarpSettingsSaga = getUpdateSaga(
  AT.UPDATE_GROUP_TIMEWARP_SETTINGS,
  api.updateGroupTimewarpSettings
);

export default [
  createGroup,
  deleteGroupSaga,
  fetchGroupAccountsSaga,
  fetchGroupsSaga,
  fetchGroupTimewarpSettingsSaga,
  AccountsFormFieldsSaga,
  updateGroupAccountsSaga,
  updateGroupTimewarpSettingsSaga,
];
