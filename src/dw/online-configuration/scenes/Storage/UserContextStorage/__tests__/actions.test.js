import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('UserContextStorage', () => {
  const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      CriticalErrorActions.show.mockReset();
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('reloadDetails', () => {
      it('returns USER_CONTEXT_STORAGE_RELOAD_DETAILS action', () => {
        expect(actions.reloadDetails('/')).toHaveProperty(
          'type',
          AT.USER_CONTEXT_STORAGE_RELOAD_DETAILS
        );
      });
    });

    describe('fetchUserContextStorage', () => {
      it('dispatches USER_CONTEXT_STORAGE_FETCH action', () => {
        expect(actions.fetchUserContextStorage({})).toAsyncDispatch({
          type: AT.USER_CONTEXT_STORAGE_FETCH,
        });
      });
    });

    describe('fetchUserContextStorageSuccess', () => {
      it('dispatches USER_CONTEXT_STORAGE_FETCH_SUCCESS action', () => {
        expect(actions.fetchUserContextStorageSuccess({})).toAsyncDispatch({
          type: AT.USER_CONTEXT_STORAGE_FETCH_SUCCESS,
        });
      });

      it('dispatches USER_CONTEXT_STORAGE_LIST_ITEM_ONCLICK when a fileID is specifie', () => {
        expect(
          actions.fetchUserContextStorageSuccess(
            { data: [{ fileID: 1 }] },
            true,
            1
          )
        ).toAsyncDispatch(
          { type: AT.USER_CONTEXT_STORAGE_FETCH_SUCCESS },
          { type: AT.USER_CONTEXT_STORAGE_LIST_ITEM_ONCLICK }
        );
      });
    });

    describe('fetchUserContextStorageFailed', () => {
      it('dispatches CriticalError show action', () => {
        const action = actions.fetchUserContextStorageFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_CRITICAL_ERROR,
        });
      });
    });

    describe('userContextStorageListItemClick', () => {
      it('returns USER_CONTEXT_STORAGE_LIST_ITEM_ONCLICK action', () => {
        const action = actions.userContextStorageListItemClick({});
        expect(action).toHaveProperty(
          'type',
          AT.USER_CONTEXT_STORAGE_LIST_ITEM_ONCLICK
        );
      });
    });

    describe('openUploadModal', () => {
      it('returns USER_CONTEXT_STORAGE_FILES_UPLOAD_OPEN_MODAL action', () => {
        expect(actions.openUploadModal({})).toMatchObject({
          type: AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_OPEN_MODAL,
        });
      });
    });

    describe('closeUploadModal', () => {
      it('dispatches USER_CONTEXT_STORAGE_FILES_UPLOAD_CLOSE_MODAL action', () => {
        expect(actions.closeUploadModal({})).toMatchObject({
          type: AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_CLOSE_MODAL,
        });
      });
    });

    describe('uploadUserContextStorageFile', () => {
      it('dispatches USER_CONTEXT_STORAGE_FILES_UPLOADaction', () => {
        expect(actions.uploadUserContextStorageFile({})).toAsyncDispatch({
          type: AT.USER_CONTEXT_STORAGE_FILES_UPLOAD,
        });
      });
    });

    describe('uploadUserContextStorageFileSuccess', () => {
      it('dispatches USER_CONTEXT_STORAGE_FILES_UPLOAD_CLOSE_MODAL and  USER_CONTEXT_STORAGE_RELOAD_DETAILS actions', () => {
        expect(actions.uploadUserContextStorageFileSuccess({})).toAsyncDispatch(
          { type: AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_CLOSE_MODAL },
          { type: AT.USER_CONTEXT_STORAGE_RELOAD_DETAILS }
        );
      });
    });

    describe('uploadUserContextStorageFileFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.uploadUserContextStorageFileFailed(
          Error(),
          {},
          true
        );
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('getStorageContexts', () => {
      it('returns USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS action', () => {
        const action = actions.getStorageContexts();
        expect(action).toHaveProperty(
          'type',
          AT.USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS
        );
      });
    });

    describe('getStorageContextsSuccess', () => {
      it('returns USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS_SUCCESS action', () => {
        const action = actions.getStorageContextsSuccess({});
        expect(action).toHaveProperty(
          'type',
          AT.USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS_SUCCESS
        );
      });
    });

    describe('getStorageContextsFailed', () => {
      it('dispatches NonCriticalError action', () => {
        const action = actions.getStorageContextsFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
