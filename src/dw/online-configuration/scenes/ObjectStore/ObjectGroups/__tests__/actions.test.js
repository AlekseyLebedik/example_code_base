import * as errors from '@demonware/devzone-core/helpers/errors';

import {
  mockState,
  DEFAULT_TITLE_CONTEXT,
} from 'dw/core/components/ContextSelector/test-utils';
import { Services } from 'dw/online-configuration/constants';

import * as actions from '../actions';
import { GROUPS_LIST_PREFIX, GROUPS_DETAILS_PREFIX } from '../constants';
import * as AT from '../actionTypes';

errors.nonCriticalHTTPError = jest.fn(err => err);

describe('Object Groups', () => {
  const dispatch = jest.fn();
  const getState = () =>
    mockState({
      serviceNames: Services.Groups,
    });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('Actions', () => {
    describe('fetchGroups', () => {
      it('returns GROUPS_LIST_FETCH action', () => {
        actions.fetchGroups()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith({
          type: `${GROUPS_LIST_PREFIX}_FETCH`,
          urlID: null,
          params: { context: DEFAULT_TITLE_CONTEXT },
          append: false,
        });
      });
    });
    describe('createObjectGroup', () => {
      it('returns GROUPS_DETAILS_CREATE_OBJECT_GROUP action', () => {
        const group = {
          groupName: 'test',
        };
        actions.createObjectGroup(group)(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith({
          type: `${GROUPS_DETAILS_PREFIX}_CREATE_OBJECT_GROUP`,
          group,
          context: DEFAULT_TITLE_CONTEXT,
        });
      });
    });

    describe('handleActionFailed', () => {
      it('returns an error when called the action', () => {
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
    });

    describe('getGroupDetails', () => {
      it('returns GROUPS_DETAILS_FETCH action', () => {
        const groupID = 7;
        actions.getGroupDetails(groupID)(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith({
          type: `${GROUPS_DETAILS_PREFIX}_FETCH`,
          params: { context: DEFAULT_TITLE_CONTEXT, groupID },
          urlID: null,
          append: false,
        });
      });
    });

    describe('addGroupMember', () => {
      it('returns GROUPS_DETAILS_ADD_GROUP_MEMBER action', () => {
        const groupID = 7;
        const user = '1234567890';
        actions.addGroupMember(groupID, user)(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith({
          type: `${GROUPS_DETAILS_PREFIX}_ADD_GROUP_MEMBER`,
          groupID,
          user,
          context: DEFAULT_TITLE_CONTEXT,
        });
      });
    });

    describe('removeGroupMembers', () => {
      it('returns GROUPS_DETAILS_REMOVE_GROUP_MEMBERS action', () => {
        const groupID = '1';
        const users = [1, 2];
        actions.removeGroupMembers(groupID, users)(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith({
          type: `${GROUPS_DETAILS_PREFIX}_REMOVE_GROUP_MEMBERS`,
          groupID,
          users,
          context: DEFAULT_TITLE_CONTEXT,
        });
      });
    });

    describe('replaceUsers', () => {
      it('returns REPLACE_USERS action', () => {
        const groupId = '1';
        const values = { source: { base64: 'test' } };
        actions.replaceUsers(groupId, values)(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith({
          type: AT.REPLACE_USERS,
          groupId,
          values,
          context: DEFAULT_TITLE_CONTEXT,
        });
      });
    });

    describe('replaceUsersSuccess', () => {
      it('returns REPLACE_USERS_SUCCESS action', () => {
        expect(actions.replaceUsersSuccess()).toMatchObject({
          type: AT.REPLACE_USERS_SUCCESS,
        });
      });
    });
  });
});
