import download from 'downloadjs';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('downloadjs');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('PooledFiles', () => {
  const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      download.mockReset();
      CriticalErrorActions.show.mockReset();
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchPooledFiles', () => {
      it('dispatches STORAGE_POOLED_FILES_FETCH action', () => {
        expect(actions.fetchPooledFiles({})).toAsyncDispatch({
          type: AT.STORAGE_POOLED_FILES_FETCH,
        });
      });
    });

    describe('fetchPooledFilesSuccess', () => {
      it('dispatches STORAGE_POOLED_FILES_FETCH_SUCCESS action', () => {
        expect(actions.fetchPooledFilesSuccess({ data: [] })).toAsyncDispatch({
          type: AT.STORAGE_POOLED_FILES_FETCH_SUCCESS,
        });
      });
    });

    describe('fetchPooledFilesFailed', () => {
      it('dispatches CriticalError show action', () => {
        const action = actions.fetchPooledFilesFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_CRITICAL_ERROR,
        });
      });
    });

    describe('pooledFilesListItemClick', () => {
      it('returns STORAGE_POOLED_FILES_LIST_ITEM_ONCLICK action', () => {
        const action = actions.pooledFilesListItemClick({});
        expect(action).toHaveProperty(
          'type',
          AT.STORAGE_POOLED_FILES_LIST_ITEM_ONCLICK
        );
      });
    });

    describe('uploadPooledFile', () => {
      it('dispatches STORAGE_POOLED_FILES_UPLOAD action', () => {
        expect(actions.uploadPooledFile({})).toAsyncDispatch({
          type: AT.STORAGE_POOLED_FILES_UPLOAD,
        });
      });
    });

    describe('uploadPooledFileSuccess', () => {
      it('dispatches STORAGE_POOLED_FILES_UPLOAD_SUCCESS action', () => {
        expect(actions.uploadPooledFileSuccess({})).toAsyncDispatch({
          type: AT.STORAGE_POOLED_FILES_UPLOAD_SUCCESS,
        });
      });
    });

    describe('uploadPooledFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.uploadPooledFileFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('deletePooledFile', () => {
      it('dispatches STORAGE_POOLED_FILES_DELETE action', () => {
        expect(actions.deletePooledFile(1)).toAsyncDispatch({
          type: AT.STORAGE_POOLED_FILES_DELETE,
        });
      });
    });

    describe('deletePooledFileSuccess', () => {
      it('dispatches STORAGE_POOLED_FILES_DELETE_SUCCESS action', () => {
        expect(actions.deletePooledFileSuccess(1)).toAsyncDispatch({
          type: AT.STORAGE_POOLED_FILES_DELETE_SUCCESS,
        });
      });
    });

    describe('deletePooledFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.deletePooledFileFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('downloadPooledFile', () => {
      it('dispatches STORAGE_POOLED_FILES_DOWNLOAD action', () => {
        expect(actions.downloadPooledFile(1)).toAsyncDispatch({
          type: AT.STORAGE_POOLED_FILES_DOWNLOAD,
        });
      });
    });

    describe('downloadPooledFileSuccess', () => {
      it('calls downloadjs', async () => {
        await actions.downloadPooledFileSuccess({
          fileData: 'asd',
          fileName: 'pooled.txt',
        })();
        expect(download).toHaveBeenCalledWith('asd', 'pooled.txt');
      });
    });

    describe('downloadPooledFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.downloadPooledFileFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('deleteSummaryFile', () => {
      it('dispatches STORAGE_POOLED_FILES_SUMMARY_DELETE action', () => {
        expect(actions.deleteSummaryFile(1)).toAsyncDispatch({
          type: AT.STORAGE_POOLED_FILES_SUMMARY_DELETE,
        });
      });
    });

    describe('deleteSummaryFileSuccess', () => {
      it('dispatches STORAGE_POOLED_FILES_SUMMARY_DELETE_SUCCESS action', () => {
        expect(actions.deleteSummaryFileSuccess(1)).toAsyncDispatch({
          type: AT.STORAGE_POOLED_FILES_SUMMARY_DELETE_SUCCESS,
        });
      });
    });

    describe('deleteSummaryFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.deleteSummaryFileFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('downloadSummaryFile', () => {
      it('dispatches STORAGE_POOLED_FILES_SUMMARY_DOWNLOAD action', () => {
        expect(actions.downloadSummaryFile(1)).toAsyncDispatch({
          type: AT.STORAGE_POOLED_FILES_SUMMARY_DOWNLOAD,
        });
      });
    });

    describe('downloadSummaryFileSuccess', () => {
      it('calls downloadjs', async () => {
        await actions.downloadSummaryFileSuccess({
          fileData: 'asd',
          fileName: 'summary.txt',
        })();
        expect(download).toHaveBeenCalledWith('asd', 'summary.txt');
      });
    });

    describe('downloadSummaryFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.downloadSummaryFileFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
