import { fetchAvailableCompanyGroupUsers } from 'dw/permission-management/scenes/actionCreators';
import { AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX } from 'dw/permission-management/scenes/constants';
import * as actions from '../actions';
import {
  GROUPS_LIST_PREFIX,
  CONTENT_TYPES_PREFIX,
  OBJECT_PERMISSIONS_PREFIX,
  GROUP_USERS_LIST_PREFIX,
  GROUP_USERS_PREFIX,
} from '../constants';

describe('Groups - actions', () => {
  it('fetchGroups returns GROUPS_LIST_FETCH action', () => {
    expect(actions.fetchGroups()).toEqual({
      type: `${GROUPS_LIST_PREFIX}_FETCH`,
      params: {},
      urlID: null,
      append: false,
    });
  });

  it('fetchContentTypes returns CONTENT_TYPES_FETCH action', () => {
    expect(actions.fetchContentTypes()).toEqual({
      type: `${CONTENT_TYPES_PREFIX}_FETCH`,
      append: false,
    });
  });

  it('fetchObjectPermissions returns OBJECT_PERMISSIONS_FETCH action', () => {
    const id = 1;
    expect(actions.fetchObjectPermissions(id)).toEqual({
      type: `${OBJECT_PERMISSIONS_PREFIX}_FETCH`,
      id,
      append: false,
    });
  });

  it('editObjectPermissions returns OBJECT_PERMISSIONS_PUT action', () => {
    const id = 1;
    const data = 'test';
    expect(actions.editObjectPermissions(id, data)).toEqual({
      type: `${OBJECT_PERMISSIONS_PREFIX}_PUT`,
      id,
      data,
    });
  });

  it('fetchGroupUsers returns GROUP_USERS_LIST_FETCH action', () => {
    expect(actions.fetchGroupUsers()).toEqual({
      type: `${GROUP_USERS_LIST_PREFIX}_FETCH`,
      params: {},
    });
  });

  it('fetchAvailableCompanyGroupUsers returns AVAILABLE_COMPANY_GROUP_USERS_LIST_FETCH action', () => {
    expect(fetchAvailableCompanyGroupUsers()).toEqual({
      type: `${AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX}_FETCH`,
      params: {},
    });
  });

  it('editGroupUsers returns GROUP_USERS_PUT action', () => {
    const groupId = 1;
    const data = { users: [{ id: 1 }, { id: 2 }] };
    expect(actions.editGroupUsers(groupId, data)).toEqual({
      type: `${GROUP_USERS_PREFIX}_PUT`,
      groupId,
      data,
    });
  });
});
