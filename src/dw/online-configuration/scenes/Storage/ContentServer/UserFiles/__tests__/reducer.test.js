import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('UserFiles', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});
    const populatedState = {
      ...initialState,
      uploadedFiles: [],
      entries: [{ fileID: 1 }, { fileID: 2 }],
      selectedFile: { fileID: 1, summaryFileSize: '100' },
      nextPageToken: 'ABC',
      elementsOrder: ['fileID'],
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('STORAGE_USER_FILES_FETCH_SUCCESS', () => {
      const newEntries = [{ fileID: 300 }, { fileID: 400 }];

      it('replaces the entries with new ones when `append` is false, and update list metadata', () => {
        const action = {
          type: AT.STORAGE_USER_FILES_FETCH_SUCCESS,
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
          type: AT.STORAGE_USER_FILES_FETCH_SUCCESS,
          append: true,
          entries: newEntries,
          nextPageToken: 'YYZ',
          elementsOrder: ['fileID'],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_USER_FILES_LIST_ITEM_ONCLICK', () => {
      it('sets the selected file', () => {
        const action = {
          type: AT.STORAGE_USER_FILES_LIST_ITEM_ONCLICK,
          file: {
            fileID: 2,
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_USER_FILES_UPLOAD_SUCCESS', () => {
      it('add the new file to the entries list and select it', () => {
        const action = {
          type: AT.STORAGE_USER_FILES_UPLOAD_SUCCESS,
          file: {
            fileID: 300,
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_USER_FILES_DELETE_SUCCESS', () => {
      it('removes the given files from `entries` and unselect it', () => {
        const action = {
          type: AT.STORAGE_USER_FILES_DELETE_SUCCESS,
          fileID: 1,
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
