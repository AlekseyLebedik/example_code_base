import reducer from '../reducer';
import * as AT from '../actionTypes';

describe('GroupMembers', () => {
  describe('Reducer', () => {
    const initialState = {
      ...reducer(undefined, {}),

      entries: [1, 2, 3],
      nextPageToken: 'ABC',
      selectedListItem: 1,
      selectedListItemDetails: [{ userID: '1' }, { userID: '2' }],
      q: 'a',
      isAddModalOpen: false,
      isAddMembersModalOpen: false,
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    it('copies the current state on STORAGE_GROUP_MEMBERS_FETCH', () => {
      const action = {
        type: AT.STORAGE_GROUP_MEMBERS_FETCH,
      };
      const state = reducer(initialState, action);
      expect(state).toMatchSnapshot();
    });

    describe('STORAGE_GROUP_MEMBERS_FETCH_SUCCESS', () => {
      const newEntries = [100, 200];

      it('replaces the entries with new ones when `append` is false, and update list metadata', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_FETCH_SUCCESS,
          append: false,
          entries: newEntries,
          nextPageToken: 'YYZ',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });

      it('combines both entry lists when `append` is true, and update list metadata', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_FETCH_SUCCESS,
          append: true,
          entries: newEntries,
          nextPageToken: 'YYZ',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_GROUP_MEMBERS_LIST_ITEM_ONCLICK', () => {
      it('sets the selected entry', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_LIST_ITEM_ONCLICK,
          listItem: 2,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS_SUCCESS', () => {
      it('sets the selected details from data when the action has the same ID as the selected', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS_SUCCESS,
          groupID: 1,
          data: [{ userID: '100' }, { userID: '200' }],
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });

      it('sets the selected details from the current state when the fetched item has different id', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS_SUCCESS,
          data: [{ userID: '100' }, { userID: '200' }],
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_GROUP_MEMBERS_OPEN_ADD_MODAL', () => {
      it('sets the modal state to opened', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_OPEN_ADD_MODAL,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_GROUP_MEMBERS_CLOSE_ADD_MODAL', () => {
      it('sets the modal state to closed', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_CLOSE_ADD_MODAL,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_GROUP_MEMBERS_OPEN_ADD_MEMBERS_MODAL', () => {
      it('sets the modal state to opened', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_OPEN_ADD_MEMBERS_MODAL,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_GROUP_MEMBERS_CLOSE_ADD_MEMBERS_MODAL', () => {
      it('sets the modal state to closed', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_CLOSE_ADD_MEMBERS_MODAL,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_GROUP_MEMBERS_ADD_SUCCESS', () => {
      it('does nothing if the added entry already exists', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_ADD_SUCCESS,
          listItem: 1,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });

      it('appends the entry to the list if it is a new one', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_ADD_SUCCESS,
          listItem: 200,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_GROUP_MEMBERS_DELETE_SUCCESS', () => {
      it('removes user from group details', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_DELETE_SUCCESS,
          groupId: 1,
          userIds: ['2'],
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });

      it('does nothing if groupId is different from the selected item', () => {
        const action = {
          type: AT.STORAGE_GROUP_MEMBERS_DELETE_SUCCESS,
          groupId: 2,
          userIds: ['2'],
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
