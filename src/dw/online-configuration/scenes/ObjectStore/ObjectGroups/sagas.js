import React from 'react';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { startSubmit, stopSubmit, setSubmitSucceeded } from 'redux-form';
import get from 'lodash/get';
import slice from 'lodash/slice';

import * as API from 'dw/online-configuration/services/objectStore';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { getFormError, getFormErrorMsg } from 'dw/core/helpers/form-error';

import {
  GROUPS_LIST_PREFIX,
  GROUPS_DETAILS_PREFIX,
  CATEGORIES_LIST_PREFIX,
  REPLACE_USERS_FORM_NAME,
  FORM_NAME,
} from './constants';
import * as AT from './actionTypes';
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
  API.getObjectGroups,
  'groups'
);

const fetchCategoriesListSaga = getSaga(
  CATEGORIES_LIST_PREFIX,
  API.getPublisherCategories,
  'categories'
);

const fetchGroupDetailsSaga = getSaga(
  GROUPS_DETAILS_PREFIX,
  API.getGroupDetails,
  null
);

function* replaceUsers(action) {
  const {
    values: {
      source: { base64: source },
    },
    groupId,
    context,
  } = action;
  try {
    yield put(startSubmit(REPLACE_USERS_FORM_NAME));
    yield call(API.replaceUsersGroup, groupId, source, context);
    yield put(Actions.replaceUsersSuccess());
    yield put(Actions.getGroupDetails(groupId));
    yield put(setSubmitSucceeded(REPLACE_USERS_FORM_NAME));
    yield put(GlobalSnackBarActions.show(`Users were replaced.`, 'success'));
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

function* createObjectGroup(action) {
  try {
    yield call(API.createObjectGroup, action.group, action.context);
    yield put(Actions.createObjectGroupSuccess(action.group));
    yield put(Actions.fetchGroups());
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
  try {
    yield call(
      API.addGroupMember,
      action.groupID,
      {
        members: Array.isArray(action.user)
          ? action.user.map(user => user.userID)
          : [action.user.userID],
      },
      action.context
    );
    yield put(Actions.addGroupMemberSuccess(action.groupID, action.user));
  } catch (e) {
    yield put(Actions.handleActionFailed(e));
  }
}

function* removeGroupMembers(action) {
  try {
    yield call(
      API.removeGroupMembers,
      action.groupID,
      {
        members: action.users.map(
          ({ userID, accountType }) => `${accountType}-${userID}`
        ),
      },
      action.context
    );
    yield put(Actions.removeGroupMembersSuccess(action.groupID, action.users));
  } catch (e) {
    yield put(Actions.handleActionFailed(e));
  }
}

function* deleteGroup(action) {
  try {
    yield call(API.deleteGroup, action.group.groupID, action.context);
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
  yield takeEvery(
    `${GROUPS_DETAILS_PREFIX}_CREATE_OBJECT_GROUP`,
    createObjectGroup
  );
  yield takeLatest(AT.REPLACE_USERS, replaceUsers);
  yield takeLatest(`${GROUPS_LIST_PREFIX}_DELETE_GROUP`, deleteGroup);
}

export default [
  fetchGroupsListSaga,
  fetchGroupDetailsSaga,
  fetchCategoriesListSaga,
  saga,
];
