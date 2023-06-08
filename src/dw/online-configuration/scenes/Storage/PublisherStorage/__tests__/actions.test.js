import download from 'downloadjs';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('downloadjs');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('PublisherStorage', () => {
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

    describe('fetchPublisherStorage', () => {
      it('dispatches PUBLISHER_STORAGE_FETCH action', () => {
        expect(actions.fetchPublisherStorage({})).toAsyncDispatch({
          type: AT.PUBLISHER_STORAGE_FETCH,
        });
      });
    });

    describe('fetchPublisherStorageSuccess', () => {
      it('dispatches PUBLISHER_STORAGE_FETCH_SUCCESS action', () => {
        expect(
          actions.fetchPublisherStorageSuccess({ data: [] }, {})
        ).toAsyncDispatch({
          type: AT.PUBLISHER_STORAGE_FETCH_SUCCESS,
        });
      });
    });

    describe('fetchPublisherStorageFailed', () => {
      it('dispatches CriticalError show action', () => {
        const action = actions.fetchPublisherStorageFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_CRITICAL_ERROR,
        });
      });
    });

    describe('publisherStorageListItemClick', () => {
      it('returns PUBLISHER_STORAGE_LIST_ITEM_ONCLICK action', () => {
        const action = actions.publisherStorageListItemClick({});
        expect(action).toHaveProperty(
          'type',
          AT.PUBLISHER_STORAGE_LIST_ITEM_ONCLICK
        );
      });
    });

    describe('uploadPublisherStorageFile', () => {
      it('dispatches PUBLISHER_STORAGE_FILES_UPLOAD action', () => {
        expect(actions.uploadPublisherStorageFile({})).toAsyncDispatch({
          type: AT.PUBLISHER_STORAGE_FILES_UPLOAD,
        });
      });
    });

    describe('uploadPublisherStorageFileSuccess', () => {
      it('dispatches PUBLISHER_STORAGE_FILES_UPLOAD_SUCCESS action', () => {
        expect(actions.uploadPublisherStorageFileSuccess({})).toAsyncDispatch({
          type: AT.PUBLISHER_STORAGE_FILES_UPLOAD_SUCCESS,
        });
      });
    });

    describe('uploadPublisherStorageFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.uploadPublisherStorageFileFailed(
          Error(),
          {},
          true
        );
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('bulkDeletePublisherStorageFiles', () => {
      it('returns PUBLISHER_STORAGE_FILES_BULK_DELETE action', () => {
        const action = actions.bulkDeletePublisherStorageFiles([1, 2]);
        expect(action).toHaveProperty(
          'type',
          AT.PUBLISHER_STORAGE_FILES_BULK_DELETE
        );
      });
    });

    describe('bulkDeletePublisherStorageFilesSuccess', () => {
      it('dispatches PUBLISHER_STORAGE_FILES_BULK_DELETE_SUCCESS action', () => {
        expect(
          actions.bulkDeletePublisherStorageFilesSuccess([1, 2])
        ).toAsyncDispatch({
          type: AT.PUBLISHER_STORAGE_FILES_BULK_DELETE_SUCCESS,
        });
      });
    });

    describe('bulkDeletePublisherStorageFilesFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.bulkDeletePublisherStorageFilesFailed(
          Error(),
          {},
          true
        );
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('bulkDownloadPublisherStorageFiles', () => {
      it('returns PUBLISHER_STORAGE_FILES_BULK_DOWNLOAD action', () => {
        expect(actions.bulkDownloadPublisherStorageFiles([1, 2])).toMatchObject(
          { type: AT.PUBLISHER_STORAGE_FILES_BULK_DOWNLOAD }
        );
      });
    });

    describe('bulkDownloadPublisherStorageFilesSuccess', () => {
      it('calls downloadjs', async () => {
        await actions.bulkDownloadPublisherStorageFilesSuccess({
          fileData: 'asd',
          fileName: 'publisherfile.txt',
        })();
        expect(download).toHaveBeenCalledWith('asd', 'publisherfile.txt');
      });
    });

    describe('bulkDownloadPublisherStoragesFilesFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.bulkDownloadPublisherStoragesFilesFailed(
          Error(),
          {},
          true
        );
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
