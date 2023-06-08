import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('VariableSets', () => {
  describe('Actions', () => {
    const item = { groupId: 2 };

    const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
    const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

    beforeEach(() => {
      CriticalErrorActions.show.mockReset();
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchMemberGroups', () => {
      it('returns a STORAGE_GROUP_MEMBERS_FETCH action', () => {
        expect(actions.fetchMemberGroups({})).toMatchObject({
          type: AT.STORAGE_GROUP_MEMBERS_FETCH,
        });
      });
    });

    describe('fetchMemberGroupsSuccess', () => {
      it('returns a STORAGE_GROUP_MEMBERS_FETCH_SUCCESS action', () => {
        expect(
          actions.fetchMemberGroupsSuccess(
            { entries: [], nextPageToken: 'ABC' },
            true
          )
        ).toMatchObject({
          type: AT.STORAGE_GROUP_MEMBERS_FETCH_SUCCESS,
          nextPageToken: 'ABC',
          append: true,
        });
      });
    });

    describe('fetchMemberGroupsFailed', () => {
      it('dipatches a Critical Error action', () => {
        expect(actions.fetchMemberGroupsFailed(Error())).toAsyncDispatch({
          type: MOCKED_CRITICAL_ERROR,
        });
      });
    });

    describe('groupMembersListItemClick', () => {
      it('dipatches STORAGE_GROUP_MEMBERS_LIST_ITEM_ONCLICK and STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS actions', () => {
        expect(actions.groupMembersListItemClick({})).toAsyncDispatch(
          { type: AT.STORAGE_GROUP_MEMBERS_LIST_ITEM_ONCLICK },
          { type: AT.STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS }
        );
      });
    });

    describe('openAddModal', () => {
      it('returns a STORAGE_GROUP_MEMBERS_OPEN_ADD_MODAL action', () => {
        expect(actions.openAddModal()).toMatchObject({
          type: AT.STORAGE_GROUP_MEMBERS_OPEN_ADD_MODAL,
        });
      });
    });

    describe('closeAddModal', () => {
      it('returns a STORAGE_GROUP_MEMBERS_CLOSE_ADD_MODAL action', () => {
        expect(actions.closeAddModal()).toMatchObject({
          type: AT.STORAGE_GROUP_MEMBERS_CLOSE_ADD_MODAL,
        });
      });
    });

    describe('openAddMembersModal', () => {
      it('returns a STORAGE_GROUP_MEMBERS_OPEN_ADD_MEMBERS_MODAL action', () => {
        expect(actions.openAddMembersModal()).toMatchObject({
          type: AT.STORAGE_GROUP_MEMBERS_OPEN_ADD_MEMBERS_MODAL,
        });
      });
    });

    describe('closeAddMembersModal', () => {
      it('returns a STORAGE_GROUP_MEMBERS_CLOSE_ADD_MEMBERS_MODAL action', () => {
        expect(actions.closeAddMembersModal()).toMatchObject({
          type: AT.STORAGE_GROUP_MEMBERS_CLOSE_ADD_MEMBERS_MODAL,
        });
      });
    });

    describe('addGroupMembers', () => {
      it('returns a STORAGE_GROUP_MEMBERS_ADD action', () => {
        expect(actions.addGroupMembers([])).toMatchObject({
          type: AT.STORAGE_GROUP_MEMBERS_ADD,
          values: [],
        });
      });
    });

    describe('addGroupMemberSuccess', () => {
      it('dipatches a STORAGE_GROUP_MEMBERS_ADD_SUCCESS action', () => {
        expect(actions.addGroupMemberSuccess(item)).toAsyncDispatch({
          type: AT.STORAGE_GROUP_MEMBERS_ADD_SUCCESS,
          listItem: 2,
        });
      });
    });

    describe('addGroupMemberFailed', () => {
      it('dipatches a Non Critical Error action', () => {
        expect(actions.addGroupMemberFailed(Error())).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('deleteGroupMembers', () => {
      it('returns a STORAGE_VARIABLES_SET_DELETE action', () => {
        expect(actions.deleteGroupMembers(1, [1])).toMatchObject({
          type: AT.STORAGE_GROUP_MEMBERS_DELETE,
          groupId: 1,
          userIds: [1],
        });
      });
    });

    describe('deleteGroupMembersSuccess', () => {
      it('dipatches a STORAGE_GROUP_MEMBERS_DELETE_SUCCESS action', () => {
        expect(actions.deleteGroupMembersSuccess(1, [1])).toAsyncDispatch({
          type: AT.STORAGE_GROUP_MEMBERS_DELETE_SUCCESS,
          groupId: 1,
          userIds: [1],
        });
      });
    });

    describe('deleteGroupMembersFailed', () => {
      it('dipatches a Non Critical Error action', () => {
        expect(actions.deleteGroupMembersFailed(Error())).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('fetchGroupDetailsSuccess', () => {
      it('returns a STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS_SUCCESS action', () => {
        expect(actions.fetchGroupDetailsSuccess(1, {})).toMatchObject({
          type: AT.STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS_SUCCESS,
          data: undefined,
          groupID: 1,
        });
      });
    });

    describe('fetchGroupDetailsFailed', () => {
      it('dipatches a Non Critical Error action', () => {
        expect(actions.fetchGroupDetailsFailed({})).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
