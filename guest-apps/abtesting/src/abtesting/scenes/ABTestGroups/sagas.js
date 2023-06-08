import React from 'react';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { startSubmit, stopSubmit, setSubmitSucceeded } from 'redux-form';
import get from 'lodash/get';
import slice from 'lodash/slice';

import * as API from 'abtesting/services/abtests';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { getSaga } from 'dw/core/helpers/sagas';
import { getFormError, getFormErrorMsg } from 'dw/core/helpers/form-error';

import {
  GROUPS_LIST_PREFIX,
  GROUPS_DETAILS_PREFIX,
  GROUPS_DETAILS_TESTS_PREFIX,
  GROUPS_DETAILS_CONFIGS_PREFIX,
  REPLACE_USERS_FORM_NAME,
  FORM_NAME,
} from './constants';
import * as Actions from './actions';
import styles from './presentational.module.css';

const messageConflict = (
  errorMsg,
  conflictingMembers,
  totalConflictMembers
) => (
  <span>
    {errorMsg}
    <div>Conflicting members:</div>
    {conflictingMembers}
    {totalConflictMembers > 10
      ? ` from a total of ${totalConflictMembers} conflicts.`
      : '.'}
  </span>
);

const fetchGroupsListSaga = getSaga(
  GROUPS_LIST_PREFIX,
  API.getABTestGroups,
  'groups'
);

const fetchGroupDetailsSaga = getSaga(
  GROUPS_DETAILS_PREFIX,
  API.getGroupDetails,
  null
);

const fetchTestsSaga = getSaga(GROUPS_DETAILS_TESTS_PREFIX, API.getTests);

const fetchConfigsSaga = getSaga(GROUPS_DETAILS_CONFIGS_PREFIX, API.getConfigs);

function* replaceUsers(action) {
  const {
    values: {
      source: { base64: source },
    },
    groupId,
    context,
    service,
    bypassContextValidation,
  } = action;
  try {
    yield put(startSubmit(REPLACE_USERS_FORM_NAME));
    yield call(API.replaceUsersGroup, groupId, source, context, {
      service,
      bypassContextValidation,
    });
    yield put(Actions.replaceUsersSuccess());
    yield put(Actions.getGroupDetails(groupId, context));
    yield put(setSubmitSucceeded(REPLACE_USERS_FORM_NAME));
    yield put(ModalHandlers.close(REPLACE_USERS_FORM_NAME));
  } catch (e) {
    const validationErrors = getFormError(e);
    if (validationErrors) {
      yield put(stopSubmit(REPLACE_USERS_FORM_NAME, validationErrors));
      yield put(
        GlobalSnackBarActions.show(getFormErrorMsg(validationErrors), 'error')
      );
    } else if (
      get(e, 'response.data.error.name') ===
      'Error:ClientError:GroupsAPIError:MembersAlreadyInGroupError'
    ) {
      const errorMsg = get(e, 'response.data.error.msg');
      const totalConflictMembers =
        e.response.data.error.conflictingMembers.length;
      const conflictingMembers = slice(
        e.response.data.error.conflictingMembers,
        0,
        10
      ).map(x => (
        <div key={x.memberID} className={styles.conflictingMembers}>
          {getFormErrorMsg(x)}
        </div>
      ));
      const message = messageConflict(
        errorMsg,
        conflictingMembers,
        totalConflictMembers
      );
      yield put(GlobalSnackBarActions.show(message, 'error'));
    } else {
      yield put(
        GlobalSnackBarActions.show(
          e.response ? e.response.data.error.msg : e.toString(),
          'error'
        )
      );
    }
  }
}

function* createGroup(action) {
  try {
    const { group, context, service, bypassContextValidation } = action;
    yield call(API.createGroup, group, context, {
      service,
      bypassContextValidation,
    });
    yield put(Actions.createGroupSuccess(action.group));
    yield put(
      GlobalSnackBarActions.show(
        `Group "${group.groupName}" successfully created.`
      )
    );
    yield put(Actions.fetchGroups({ context }));
    yield put(ModalHandlers.close(FORM_NAME));
  } catch (e) {
    yield put(Actions.handleActionFailed(e));
    yield put(
      GlobalSnackBarActions.show(
        e.response ? e.response.data.error.msg : e.toString(),
        'error'
      )
    );
  }
}

function* addGroupMember(action) {
  const { groupID, user, context, service, bypassContextValidation } = action;
  try {
    yield call(
      API.addGroupMember,
      groupID,
      {
        members: Array.isArray(user) ? user.map(u => u.userID) : [user.userID],
      },
      context,
      { service, bypassContextValidation }
    );
    yield put(Actions.addGroupMemberSuccess(groupID, user));

    let users = Array.isArray(user) ? user : [user];
    users = users.map(u => ({
      ...u,
      userName: u.userName.split(' | ')[0],
    }));
    yield put(
      GlobalSnackBarActions.show(
        `User${users.length > 1 ? 's' : ''} "${users
          .map(u => u.userName)
          .join(', ')}" successfully added to the group.`
      )
    );
  } catch (e) {
    yield put(Actions.handleActionFailed(e));
  }
}

function* removeGroupMembers(action) {
  const { groupID, users, context, service, bypassContextValidation } = action;
  try {
    yield call(
      API.removeGroupMembers,
      groupID,
      {
        members: users.map(({ userID }) => userID),
      },
      context,
      { service, bypassContextValidation }
    );
    yield put(Actions.removeGroupMembersSuccess(groupID, users));
    yield put(
      GlobalSnackBarActions.show(
        `Successfully removed ${users.length} ${
          users.length === 1 ? 'user' : 'users'
        } from the group.`
      )
    );
  } catch (e) {
    yield put(Actions.handleActionFailed(e));
  }
}

function* deleteGroup(action) {
  const { group, context, service, bypassContextValidation } = action;
  try {
    yield call(API.deleteGroup, group.groupID, context, {
      service,
      bypassContextValidation,
    });
    yield put(Actions.deleteGroupSuccess(action.group));
  } catch (e) {
    yield put(Actions.handleActionFailed(e));
  }
}

function* saga() {
  yield takeEvery(`${GROUPS_DETAILS_PREFIX}_ADD_GROUP_MEMBER`, addGroupMember);
  yield takeEvery(
    `${GROUPS_DETAILS_PREFIX}_REMOVE_GROUP_MEMBERS`,
    removeGroupMembers
  );
  yield takeEvery(`${GROUPS_DETAILS_PREFIX}_CREATE_GROUP`, createGroup);
  yield takeLatest(`${GROUPS_DETAILS_PREFIX}_REPLACE_USERS`, replaceUsers);
  yield takeLatest(`${GROUPS_LIST_PREFIX}_DELETE_GROUP`, deleteGroup);
}

export default [
  fetchGroupsListSaga,
  fetchGroupDetailsSaga,
  fetchTestsSaga,
  fetchConfigsSaga,
  saga,
];
