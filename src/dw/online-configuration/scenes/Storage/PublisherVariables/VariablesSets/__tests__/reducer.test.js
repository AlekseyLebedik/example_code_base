import reducer from '../reducer';
import * as AT from '../actionTypes';

describe('VariableSets', () => {
  describe('Reducer', () => {
    const initialState = {
      ...reducer(undefined, {}),

      entries: [{ variableSetId: 1 }, { variableSetId: 2 }],
      nextPageToken: 'ABC',
      selectedListItem: { variableSetId: 1 },
      q: 'a',
      selectedListItemDetails: { variableSetId: 1, variables: { a: 1, b: 2 } },
      isAddModalOpen: false,
      isUpdateVariablesSetModalOpen: false,
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    it('copies the current state on STORAGE_VARIABLES_SETS_FETCH', () => {
      const action = {
        type: AT.STORAGE_VARIABLES_SETS_FETCH,
      };
      const state = reducer(initialState, action);
      expect(state).toMatchSnapshot();
    });

    describe('STORAGE_VARIABLES_SETS_FETCH_SUCCESS', () => {
      const newEntries = [{ variableSetId: 100 }, { variableSetId: 200 }];

      it('replaces the entries with new ones when `append` is false, and update list metadata', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SETS_FETCH_SUCCESS,
          append: false,
          entries: newEntries,
          nextPageToken: 'YYZ',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });

      it('combines both entry lists when `append` is true, and update list metadata', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SETS_FETCH_SUCCESS,
          append: true,
          entries: newEntries,
          nextPageToken: 'YYZ',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_VARIABLES_SETS_LIST_ITEM_ONCLICK', () => {
      it('sets the selected entry', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SETS_LIST_ITEM_ONCLICK,
          listItem: {
            variableSetId: 2,
          },
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS_SUCCESS', () => {
      it('sets the selected details from data when the action has the same ID as the selected', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS_SUCCESS,
          variableSetId: 1,
          data: {
            variableSetId: 1,
            details: 'details',
          },
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });

      it('sets the selected details from the current state', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS_SUCCESS,
          data: {
            variableSetId: 2,
          },
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_VARIABLES_SETS_OPEN_ADD_MODAL', () => {
      it('sets the modal state to opened', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SETS_OPEN_ADD_MODAL,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_VARIABLES_SETS_CLOSE_ADD_MODAL', () => {
      it('sets the modal state to closed', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SETS_CLOSE_ADD_MODAL,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_VARIABLES_SETS_ADD_SUCCESS', () => {
      it('does nothing if the added entry already exists', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SETS_ADD_SUCCESS,
          listItem: {
            variableSetId: 2,
          },
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });

      it('appends the entry to the list if it is a new one', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SETS_ADD_SUCCESS,
          listItem: {
            variableSetId: 200,
          },
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_VARIABLES_SET_DELETE_SUCCESS', () => {
      it('removes entry from list and unselect it', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SET_DELETE_SUCCESS,
          variableSetId: 1,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_VARIABLES_SET_UPDATE_SUCCESS', () => {
      it('sets selected item detail', () => {
        const action = {
          type: AT.STORAGE_VARIABLES_SET_UPDATE_SUCCESS,
          variableSet: {
            variableSetId: 2,
            details: 'more details',
          },
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
