import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import {
  USERS_LIST_PREFIX,
  AVAILABLE_GROUPS_LIST_PREFIX,
  ASSIGNED_GROUPS_LIST_PREFIX,
} from '../constants';

jest.mock('@demonware/devzone-core/helpers/uuid', () => ({
  uuid: () => '61fe2ca1-1c23-fbcf-9cb8-f03f96a436a8',
}));

describe('Users - actions', () => {
  it('returns USERS_LIST_FETCH action', () => {
    expect(actions.fetchUsers()).toEqual({
      type: `${USERS_LIST_PREFIX}_FETCH`,
      params: { sort: 'name' },
      urlID: null,
      append: false,
    });
  });

  it('returns ASSIGNED_GROUPS_LIST_FETCH action', () => {
    expect(actions.fetchAssignedGroups()).toEqual({
      type: `${ASSIGNED_GROUPS_LIST_PREFIX}_FETCH`,
      params: {},
      urlID: null,
      append: false,
    });
  });

  it('returns AVAILABLE_GROUPS_LIST_FETCH action', () => {
    expect(actions.fetchAvailableGroups()).toEqual({
      type: `${AVAILABLE_GROUPS_LIST_PREFIX}_FETCH`,
      params: {},
      urlID: null,
      append: false,
    });
  });

  it('returns SAVE_USER_COMPANIES_AND_GROUPS action', () => {
    expect(
      actions.saveUserCompaniesAndGroups('1234567890', {
        groups: [1, 2],
        companies: [1, 2, 3],
      })
    ).toEqual({
      type: AT.SAVE_USER_COMPANIES_AND_GROUPS,
      userID: '1234567890',
      params: { groups: [1, 2], companies: [1, 2, 3] },
    });
  });

  it('returns saveUserCompaniesAndGroupsSuccess action triggers memberships and groups reload', () => {
    const userID = 10;
    const action = actions.saveUserCompaniesAndGroupsSuccess(userID);
    expect(action).toAsyncDispatch(actions.fetchMemberships({ userID }));
    expect(action).toAsyncDispatch(actions.fetchAssignedGroups({ userID }));
    expect(action).toAsyncDispatch(
      GlobalSnackBarActions.show(
        'Changes to User Company Memberships successfully Saved',
        'success'
      )
    );
  });

  it('should display an error on saveUserCompaniesAndGroupsFailed', () => {
    const err = { response: { data: { error: { msg: 'error' } } } };
    const action = actions.saveUserCompaniesAndGroupsFailed(err);
    expect(action).toEqual(GlobalSnackBarActions.show('error', 'error'));
  });
});
