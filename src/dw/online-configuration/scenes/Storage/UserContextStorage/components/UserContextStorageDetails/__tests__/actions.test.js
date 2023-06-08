import download from 'downloadjs';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('downloadjs');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('UserContextStorageDetails', () => {
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

    describe('deleteUserContextStorageFile', () => {
      it('dispatches USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE action', () => {
        expect(actions.deleteUserContextStorageFile({})).toAsyncDispatch({
          type: AT.USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE,
        });
      });
    });

    describe('deleteUserContextStorageFileSuccess', () => {
      it('dispatches USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE_SUCCESS action', () => {
        expect(actions.deleteUserContextStorageFileSuccess({})).toAsyncDispatch(
          {
            type: AT.USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE_SUCCESS,
          }
        );
      });
    });

    describe('deleteUserContextStorageFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.deleteUserContextStorageFileFailed(
          Error(),
          {},
          true
        );
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('downloadUserContextStorageFile', () => {
      it('dispatches USER_CONTEXT_STORAGE_DETAILS_FILE_DOWNLOAD action', () => {
        expect(actions.downloadUserContextStorageFile({})).toAsyncDispatch({
          type: AT.USER_CONTEXT_STORAGE_DETAILS_FILE_DOWNLOAD,
        });
      });
    });

    describe('downloadUserContextStorageFileSuccess', () => {
      it('calls downloadjs', async () => {
        await actions.downloadUserContextStorageFileSuccess({
          fileData: 'asd',
          fileName: 'file.txt',
        })();
        expect(download).toHaveBeenCalledWith('asd', 'file.txt');
      });
    });

    describe('downloadUserContextStorageFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.downloadUserContextStorageFileFailed(
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
