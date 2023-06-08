import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('IMP', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchIMPs', () => {
      it('returns IMPS_FETCH action', () => {
        expect(actions.fetchIMPs({ test: 1 }, true)).toMatchObject({
          type: AT.IMPS_FETCH,
          params: { test: 1 },
          append: true,
        });
      });
    });

    describe('fetchIMPsSuccess', () => {
      it('returns IMPS_FETCH_SUCCESS action', () => {
        expect(
          actions.fetchIMPsSuccess(
            { data: [1, 2], nextPageToken: 'ABC' },
            false
          )
        ).toMatchObject({
          type: AT.IMPS_FETCH_SUCCESS,
          data: [1, 2],
          nextPageToken: 'ABC',
          append: false,
        });
      });
    });

    describe('uploadToIMPHistory', () => {
      it('returns IMP_UPLOAD action', () => {
        expect(actions.uploadToIMPHistory({})).toMatchObject({
          type: AT.IMP_UPLOAD,
        });
      });
    });

    describe('uploadToIMPHistorySuccesss', () => {
      it('dispatches IMP_UPLOAD_SUCCESS and fetch actions', () => {
        expect(actions.uploadToIMPHistorySuccess()).toAsyncDispatch(
          { type: AT.IMP_UPLOAD_SUCCESS },
          { type: AT.IMPS_FETCH }
        );
      });
    });

    describe('uploadToIMPHistoryFailed', () => {
      it('dispatches NonCriticalError show action', () => {
        const action = actions.uploadToIMPHistoryFailed(Error());
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('openUploadToIMPHistoryModal', () => {
      it('returns IMP_OPEN_UPLOAD_MODAL action', () => {
        expect(actions.openUploadToIMPHistoryModal()).toMatchObject({
          type: AT.IMP_OPEN_UPLOAD_MODAL,
        });
      });
    });

    describe('closeUploadToIMPHistoryModal', () => {
      it('returns IMP_CLOSE_UPLOAD_MODAL action', () => {
        expect(actions.closeUploadToIMPHistoryModal()).toMatchObject({
          type: AT.IMP_CLOSE_UPLOAD_MODAL,
        });
      });
    });
  });
});
