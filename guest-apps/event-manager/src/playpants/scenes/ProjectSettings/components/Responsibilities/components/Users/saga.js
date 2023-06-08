import { projectSettings as api } from 'playpants/services';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { call, put, select } from 'redux-saga/effects';
import { generateSaga } from 'playpants/scenes/ProjectSettings/sagaCreators';

import { groupListSelector } from '../../selectors';
import responsibilityUserGroupsFormSaga from './components/Details/components/ResponsibilityUserGroups/components/ResponsibilityUserGroupsForm/saga';
import * as actions from './actions';
import * as AT from './actionTypes';

const fetchAssignedGroupsSaga = getSaga(
  AT.FETCH_ASSIGNED_GROUPS,
  api.fetchAssignedGroups,
  'results'
);

const addUserToGroup = generateSaga(
  AT.ADD_USER,
  function* addUserToGroup(action) {
    const { userID, groups, project } = action;
    const allGroups = yield select(groupListSelector);
    const updateGroups = groups.map(id =>
      allGroups.find(thisGroup => `${thisGroup.id}` === id)
    );
    try {
      yield call(api.addUserToGroup, userID, groups, project);
      yield put(actions.addUserToGroupSuccess(updateGroups));
    } catch (e) {
      yield put(actions.addUserToGroupFailed(e));
    }
  }
);

export default [
  addUserToGroup,
  fetchAssignedGroupsSaga,
  responsibilityUserGroupsFormSaga,
];
