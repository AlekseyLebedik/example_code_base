import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('QuotaAllowance', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});
    const populatedState = {
      ...initialState,
      entries: [{ userID: 1 }, { userID: 2 }],
      selectedListItem: { userID: 1 },
      nextPageToken: 'ABC',
      elementsOrder: ['userID'],
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('STORAGE_QUOTA_ALLOWANCE_FETCH_SUCCESS', () => {
      const newEntries = [{ userID: 300 }, { userID: 400 }];

      it('replaces the entries with new ones when `append` is false, and update list metadata', () => {
        const action = {
          type: AT.STORAGE_QUOTA_ALLOWANCE_FETCH_SUCCESS,
          append: false,
          entries: newEntries,
          nextPageToken: 'YYZ',
          elementsOrder: ['userID'],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });

      it('combines both entry lists when `append` is true, and update list metadata', () => {
        const action = {
          type: AT.STORAGE_QUOTA_ALLOWANCE_FETCH_SUCCESS,
          append: true,
          entries: newEntries,
          nextPageToken: 'YYZ',
          elementsOrder: ['userID'],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_QUOTA_ALLOWANCE_LIST_ITEM_ONCLICK', () => {
      it('sets the selected item', () => {
        const action = {
          type: AT.STORAGE_QUOTA_ALLOWANCE_LIST_ITEM_ONCLICK,
          listItem: {
            userID: 2,
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_QUOTA_ALLOWANCE_ADD_MODAL_OPEN', () => {
      it('sets modal visibility to `true`', () => {
        const action = {
          type: AT.STORAGE_QUOTA_ALLOWANCE_ADD_MODAL_OPEN,
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_QUOTA_ALLOWANCE_ADD_MODAL_CLOSE', () => {
      it('sets modal visibility to `false`', () => {
        const closedState = { ...populatedState, addModalVisible: true };
        const action = {
          type: AT.STORAGE_QUOTA_ALLOWANCE_ADD_MODAL_CLOSE,
        };
        const state = reducer(closedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_QUOTA_ALLOWANCE_ADD_SUCCESS', () => {
      it('pushes new item to the entry list', () => {
        const action = {
          type: AT.STORAGE_QUOTA_ALLOWANCE_ADD_SUCCESS,
          listItem: {
            userID: 500,
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });

      it('replaces existent item in the entry list', () => {
        const action = {
          type: AT.STORAGE_QUOTA_ALLOWANCE_ADD_SUCCESS,
          listItem: {
            userID: 2,
            newAttribute: 1,
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
