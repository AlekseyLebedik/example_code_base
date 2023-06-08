import { call, put } from 'redux-saga/effects';

import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { getSaga, getUpdateSaga } from '@demonware/devzone-core/helpers/sagas';
import { projectSettings as api } from 'playpants/services';
import {
  createDeleteGroupSaga,
  generateSaga,
} from 'playpants/scenes/ProjectSettings/sagaCreators';

import { fetchGroups } from '../../actions';
import { createGroupSuccess } from './actions';
import * as AT from './actionTypes';

const createGroup = generateSaga(
  AT.CREATE_GROUP,
  function* createObjectGroup(action) {
    try {
      const { members, ...params } = action.group;
      const { project, type } = params;
      const { data } = yield call(api.createGroup, params);
      if (members) {
        yield call(api.updateGroupMembers, data.id, {
          members: members.map(id => ({ id })),
        });
      }
      yield put(createGroupSuccess(params));
      yield put(fetchGroups({ project, type }));
    } catch (e) {
      yield put(nonCriticalHTTPError(e));
    }
  }
);

const deleteGroupSaga = createDeleteGroupSaga(AT.DELETE_GROUP);

const fetchGroupMembersSaga = getSaga(
  AT.FETCH_GROUP_MEMBERS,
  api.fetchGroupMembers,
  'results'
);

const updateGroupMembers = getUpdateSaga(
  AT.UPDATE_GROUP_MEMBERS,
  api.updateGroupMembers
);

export default [
  createGroup,
  deleteGroupSaga,
  fetchGroupMembersSaga,
  updateGroupMembers,
];
