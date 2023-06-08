import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

export const fetchAssignedGroups = (params = {}) =>
  createFetch(
    AT.FETCH_ASSIGNED_GROUPS,
    null,
    { ...params },
    params.nextPageToken
  );

export const addUserToGroup = (userID, { groups }, project) => ({
  type: AT.ADD_USER,
  userID,
  groups,
  project,
});

export const addUserToGroupSuccess = groups => dispatch => {
  dispatch({
    type: AT.ADD_USER_SUCCESS,
    groups,
  });
  dispatch(
    GlobalSnackBarActions.show(
      'User Group Memberships Successfully Saved',
      'success'
    )
  );
};

export const addUserToGroupFailed = err => dispatch => {
  dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
};
