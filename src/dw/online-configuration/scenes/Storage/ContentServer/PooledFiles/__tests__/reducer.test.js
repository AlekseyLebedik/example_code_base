import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('PooledFiles', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});
    const populatedState = {
      ...initialState,
      uploadedFiles: [],
      entries: [
        { fileID: 1, summaryFileSize: '100' },
        { fileID: 2, summaryFileSize: '200' },
      ],
      selectedFile: { fileID: 1, summaryFileSize: '100' },
      nextPageToken: 'ABC',
      elementsOrder: ['fileID'],
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('STORAGE_POOLED_FILES_FETCH_SUCCESS', () => {
      const newEntries = [
        { fileID: 300, summaryFileSize: '0' },
        { fileID: 400, summaryFileSize: '400' },
      ];

      it('replaces the entries with new ones when `append` is false, and update list metadata', () => {
        const action = {
          type: AT.STORAGE_POOLED_FILES_FETCH_SUCCESS,
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
          type: AT.STORAGE_POOLED_FILES_FETCH_SUCCESS,
          append: true,
          entries: newEntries,
          nextPageToken: 'YYZ',
          elementsOrder: ['fileID'],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_POOLED_FILES_LIST_ITEM_ONCLICK', () => {
      it('sets the selected file', () => {
        const action = {
          type: AT.STORAGE_POOLED_FILES_LIST_ITEM_ONCLICK,
          file: {
            fileID: 200,
            summaryFileSize: '200',
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_POOLED_FILES_UPLOAD_SUCCESS', () => {
      it('add the new file to the entries list and select it', () => {
        const action = {
          type: AT.STORAGE_POOLED_FILES_UPLOAD_SUCCESS,
          file: {
            fileID: 300,
            summaryFileSize: '0',
          },
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_POOLED_FILES_DELETE_SUCCESS', () => {
      it('removes the given files from `entries` and unselect it', () => {
        const action = {
          type: AT.STORAGE_POOLED_FILES_DELETE_SUCCESS,
          fileID: 1,
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('STORAGE_POOLED_FILES_SUMMARY_DELETE_SUCCESS', () => {
      it('sets the summary file size to zero in the given record', () => {
        const action = {
          type: AT.STORAGE_POOLED_FILES_SUMMARY_DELETE_SUCCESS,
          fileID: 1,
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
