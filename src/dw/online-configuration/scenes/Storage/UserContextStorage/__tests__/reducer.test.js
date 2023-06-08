import { USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE_SUCCESS } from '../components/UserContextStorageDetails/actionTypes';
import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('UserContextStorage', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});
    const populatedState = {
      ...initialState,
      nextPageToken: 'ABC',
      elementsOrder: ['fileID'],
      uploadModalVisible: false,
      reloadDetailPath: '/a',
      entries: [{ fileID: 1 }, { fileID: 2 }],
      selectedFile: { fileID: 1 },
      contextsList: ['x360', 'x1'],
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('USER_CONTEXT_STORAGE_RELOAD_DETAILS', () => {
      it('sets the reload details path', () => {
        const action = {
          type: AT.USER_CONTEXT_STORAGE_RELOAD_DETAILS,
          path: '/b',
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('USER_CONTEXT_STORAGE_FETCH_SUCCESS', () => {
      const newEntries = [{ fileID: 300 }, { fileID: 400 }];

      it('replaces the entries with new ones when `append` is false, and update list metadata', () => {
        const action = {
          type: AT.USER_CONTEXT_STORAGE_FETCH_SUCCESS,
          append: false,
          entries: newEntries,
          nextPageToken: 'YYZ',
          elementsOrder: ['fileID'],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });

      it('combines both entry lists when `append` is true, and update list metadata', () => {
        const action = {
          type: AT.USER_CONTEXT_STORAGE_FETCH_SUCCESS,
          append: true,
          q: 'search',
          entries: newEntries,
          nextPageToken: 'YYZ',
          elementsOrder: ['fileID'],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('USER_CONTEXT_STORAGE_LIST_ITEM_ONCLICK', () => {
      it('sets the selected item', () => {
        const action = {
          type: AT.USER_CONTEXT_STORAGE_LIST_ITEM_ONCLICK,
          file: {
            fileID: 2,
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('USER_CONTEXT_STORAGE_FILES_UPLOAD_OPEN_MODAL', () => {
      it('sets modal visibility to `true`', () => {
        const action = {
          type: AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_OPEN_MODAL,
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('USER_CONTEXT_STORAGE_FILES_UPLOAD_CLOSE_MODAL', () => {
      it('sets modal visibility to `false`', () => {
        const closedState = { ...populatedState, uploadModalVisible: true };
        const action = {
          type: AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_CLOSE_MODAL,
        };
        expect(closedState).toMatchSnapshot();
        const state = reducer(closedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('USER_CONTEXT_STORAGE_FILES_UPLOAD_SUCCESS', () => {
      it('sets selectedFile and hide the modal', () => {
        const action = {
          type: AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_SUCCESS,
          selectedFile: {
            fileID: 500,
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE_SUCCESS', () => {
      it('Removes the file with the given id from the list and unselect it', () => {
        const action = {
          type: USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE_SUCCESS,
          fileID: 1,
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS_SUCCESS', () => {
      it('sets the contexts list', () => {
        const action = {
          type: AT.USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS_SUCCESS,
          contextsList: ['ps3', 'ps4'],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
