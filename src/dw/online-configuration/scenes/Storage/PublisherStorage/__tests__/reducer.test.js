import { reducer } from '../reducer';
import * as AT from '../actionTypes';
import { PUBLISHER_STORAGE_DETAILS_DELETE_FILE_SUCCESS } from '../components/PublisherStorageDetails/actionTypes';

describe('PublisherStorage', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});
    const populatedState = {
      ...initialState,
      entries: [
        { fileID: 1, fileName: 'one.txt' },
        { fileID: 2, fileName: 'two.txt' },
      ],
      selectedFile: { fileID: 1, fileName: 'one.txt' },
      nextPageToken: 'ABC',
      elementsOrder: ['fileID'],
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('PUBLISHER_STORAGE_FETCH_SUCCESS', () => {
      const newEntries = [
        { fileID: 300, fileName: 'threehundred.txt' },
        { fileID: 400, fileName: 'fourhundred.txt' },
      ];

      it('replaces the entries with new ones when `append` is false, and update list metadata', () => {
        const action = {
          type: AT.PUBLISHER_STORAGE_FETCH_SUCCESS,
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
          type: AT.PUBLISHER_STORAGE_FETCH_SUCCESS,
          append: true,
          entries: newEntries,
          nextPageToken: 'YYZ',
          elementsOrder: ['fileID'],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('PUBLISHER_STORAGE_LIST_ITEM_ONCLICK', () => {
      it('sets the selected file', () => {
        const action = {
          type: AT.PUBLISHER_STORAGE_LIST_ITEM_ONCLICK,
          file: {
            fileID: 2,
            fileName: 'two.txt',
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('PUBLISHER_STORAGE_FILES_UPLOAD_SUCCESS', () => {
      it('add the new file to the entries list and select it', () => {
        const action = {
          type: AT.PUBLISHER_STORAGE_FILES_UPLOAD_SUCCESS,
          file: {
            fileID: 300,
            fileName: 'threehundred.txt',
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('PUBLISHER_STORAGE_FILES_BULK_DELETE_SUCCESS', () => {
      it('removes the multiple files from `entries` and unselect it', () => {
        const action = {
          type: AT.PUBLISHER_STORAGE_FILES_BULK_DELETE_SUCCESS,
          fileIds: [1, 2],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('PUBLISHER_STORAGE_DETAILS_DELETE_FILE_SUCCESS', () => {
      it('removes the given file from `entries` and unselect it', () => {
        const action = {
          type: PUBLISHER_STORAGE_DETAILS_DELETE_FILE_SUCCESS,
          fileID: 1,
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
