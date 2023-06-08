import download from 'downloadjs';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('downloadjs');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('UserFiles', () => {
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

    describe('fetchUserFiles', () => {
      it('dispatches STORAGE_USER_FILES_FETCH action', () => {
        expect(actions.fetchUserFiles({})).toAsyncDispatch({
          type: AT.STORAGE_USER_FILES_FETCH,
        });
      });
    });

    describe('fetchUserFilesSuccess', () => {
      it('dispatches STORAGE_USER_FILES_FETCH_SUCCESS action', () => {
        expect(actions.fetchUserFilesSuccess({})).toAsyncDispatch({
          type: AT.STORAGE_USER_FILES_FETCH_SUCCESS,
        });
      });
    });

    describe('fetchUserFilesFailed', () => {
      it('dispatches CriticalError show action', () => {
        const action = actions.fetchUserFilesFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_CRITICAL_ERROR,
        });
      });
    });

    describe('userFilesListItemClick', () => {
      it('returns STORAGE_USER_FILES_LIST_ITEM_ONCLICK action', () => {
        const action = actions.userFilesListItemClick({});
        expect(action).toHaveProperty(
          'type',
          AT.STORAGE_USER_FILES_LIST_ITEM_ONCLICK
        );
      });
    });

    describe('uploadUserFile', () => {
      it('dispatches STORAGE_USER_FILES_UPLOAD action', () => {
        expect(actions.uploadUserFile({})).toAsyncDispatch({
          type: AT.STORAGE_USER_FILES_UPLOAD,
        });
      });
    });

    describe('uploadUserFileSuccess', () => {
      it('dispatches STORAGE_USER_FILES_UPLOAD_SUCCESS action', () => {
        expect(actions.uploadUserFileSuccess({})).toAsyncDispatch({
          type: AT.STORAGE_USER_FILES_UPLOAD_SUCCESS,
        });
      });
    });

    describe('uploadUserFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.uploadUserFileFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('deleteUserFile', () => {
      it('dispatches STORAGE_USER_FILES_DELETE action', () => {
        expect(actions.deleteUserFile(1)).toAsyncDispatch({
          type: AT.STORAGE_USER_FILES_DELETE,
        });
      });
    });

    describe('deleteUserFileSuccess', () => {
      it('dispatches STORAGE_USER_FILES_DELETE_SUCCESS action', () => {
        expect(actions.deleteUserFileSuccess(1)).toAsyncDispatch({
          type: AT.STORAGE_USER_FILES_DELETE_SUCCESS,
        });
      });
    });

    describe('deleteUserFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.deleteUserFileFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('downloadUserFile', () => {
      it('dispatches STORAGE_USER_FILES_DOWNLOAD action', () => {
        expect(actions.downloadUserFile(1)).toAsyncDispatch({
          type: AT.STORAGE_USER_FILES_DOWNLOAD,
        });
      });
    });

    describe('downloadUserFileSuccess', () => {
      it('calls downloadjs', async () => {
        await actions.downloadUserFileSuccess({
          fileData: 'asd',
          fileName: 'userfile.txt',
        })();
        expect(download).toHaveBeenCalledWith('asd', 'userfile.txt');
      });
    });

    describe('downloadUserFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.downloadUserFileFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
