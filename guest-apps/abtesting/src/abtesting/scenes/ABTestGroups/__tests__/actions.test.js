import * as errors from '@demonware/devzone-core/helpers/errors';

import * as actions from '../actions';
import {
  GROUPS_LIST_PREFIX,
  GROUPS_DETAILS_PREFIX,
  GROUPS_SERVICE,
} from '../constants';

errors.nonCriticalHTTPError = jest.fn(err => err);

describe('ABTestGroups - actions', () => {
  const context = '1:dev';

  it('fetchGroups returns GROUPS_LIST_FETCH action', () => {
    expect(actions.fetchGroups({ context })).toEqual({
      type: `${GROUPS_LIST_PREFIX}_FETCH`,
      urlID: null,
      params: { context, service: GROUPS_SERVICE, bypassContextValidation: 1 },
      append: false,
    });
  });

  it('createGroup returns GROUPS_DETAILS_CREATE_GROUP action', () => {
    const group = {
      groupName: 'test',
    };
    expect(actions.createGroup(group, context)).toEqual({
      type: `${GROUPS_DETAILS_PREFIX}_CREATE_GROUP`,
      group,
      context,
      service: GROUPS_SERVICE,
      bypassContextValidation: 1,
    });
  });

  it('getGroupDetails returns GROUPS_DETAILS_FETCH action', () => {
    const groupID = 7;
    expect(actions.getGroupDetails(groupID, context)).toEqual({
      type: `${GROUPS_DETAILS_PREFIX}_FETCH`,
      params: {
        context,
        groupID,
        service: GROUPS_SERVICE,
        bypassContextValidation: 1,
      },
      urlID: null,
      append: false,
    });
  });

  it('addGroupMember returns GROUPS_DETAILS_ADD_GROUP_MEMBER action', () => {
    const groupID = 7;
    const user = '1234567890';
    expect(actions.addGroupMember(groupID, user, context)).toEqual({
      type: `${GROUPS_DETAILS_PREFIX}_ADD_GROUP_MEMBER`,
      groupID,
      user,
      context,
      service: GROUPS_SERVICE,
      bypassContextValidation: 1,
    });
  });

  it('removeGroupMembers returns GROUPS_DETAILS_REMOVE_GROUP_MEMBERS action', () => {
    const groupID = '1';
    const users = [1, 2];
    expect(actions.removeGroupMembers(groupID, users, context)).toEqual({
      type: `${GROUPS_DETAILS_PREFIX}_REMOVE_GROUP_MEMBERS`,
      groupID,
      users,
      context,
      service: GROUPS_SERVICE,
      bypassContextValidation: 1,
    });
  });

  it('handleActionFailed returns an error when called the action', () => {
    const error = {
      response: {
        data: {
          error: {
            invalid: [{ msg: 'error' }],
          },
        },
      },
    };
    expect(actions.handleActionFailed(error)).toEqual(error);
  });

  it('replaceUsers returns GROUPS_DETAILS_REPLACE_USERS action', () => {
    const groupId = '1';
    const values = { source: { base64: 'test' } };
    expect(actions.replaceUsers(groupId, values, context)).toEqual({
      type: `${GROUPS_DETAILS_PREFIX}_REPLACE_USERS`,
      groupId,
      values,
      context,
      service: GROUPS_SERVICE,
      bypassContextValidation: 1,
    });
  });
});
