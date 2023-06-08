import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('IMP', () => {
  describe('Reducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      data: [
        { id: 1, status: 'applied' },
        { id: 2, status: 'failed' },
      ],
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('IMPS_FETCH_SUCCESS', () => {
      const newEntries = [
        { id: 300, status: 'failed' },
        { id: 400, status: 'applied' },
      ];

      it('replaces the entries with new ones when `append` is false, and update list metadata', () => {
        const action = {
          type: AT.IMPS_FETCH_SUCCESS,
          append: false,
          data: newEntries,
          nextPageToken: 'YYZ',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });

      it('combines both entry lists when `append` is true, and update list metadata', () => {
        const action = {
          type: AT.IMPS_FETCH_SUCCESS,
          append: true,
          data: newEntries,
          nextPageToken: 'YYZ',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('IMP_OPEN_UPLOAD_MODAL', () => {
      it('sets modal visibility to true', () => {
        const action = {
          type: AT.IMP_OPEN_UPLOAD_MODAL,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('IMP_UPLOAD', () => {
      it('sets modal loading to true', () => {
        const action = {
          type: AT.IMP_UPLOAD,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    const modalState = {
      ...initialState,
      impUploadModalVisible: true,
      impUploadModalLoading: true,
    };

    describe('IMP_CLOSE_UPLOAD_MODAL', () => {
      it('sets modal visibility and loading to false', () => {
        const action = {
          type: AT.IMP_CLOSE_UPLOAD_MODAL,
        };
        const state = reducer(modalState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('IMP_UPLOAD_SUCCESS', () => {
      it('sets modal visibility and loading to false', () => {
        const action = {
          type: AT.IMP_UPLOAD_SUCCESS,
        };
        const state = reducer(modalState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
