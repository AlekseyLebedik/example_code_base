import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as errors from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';

const filenameId = 'Y2xpZW50X3R5cGU9MTtmaWxlbmFtZT10ZXN0LnR4dA==';
const filenameIds = [filenameId];
const clientType = '1';
const filename = 'test.txt';
const data = [
  {
    id: filenameId,
    clientType,
    filename,
  },
];
const values = {
  clientType,
  filename,
};
const err = 'error';

describe('Security - ACL - StorageFilenames', () => {
  describe('Action Creators', () => {
    const dispatch = jest.fn();
    const nonCriticalHTTPErrorMock = jest.fn();
    const snackBarShowMock = jest.fn(() => 'show');

    it('STORAGE_FILENAMES_FETCH', () => {
      expect(actions.fetchStorageFilenames()).toHaveProperty(
        'type',
        AT.STORAGE_FILENAMES_FETCH
      );
    });

    it('STORAGE_FILENAMES_FETCH_SUCCESS', () => {
      const action = actions.fetchStorageFilenamesSuccess({ data });
      expect(action).toHaveProperty('type', AT.STORAGE_FILENAMES_FETCH_SUCCESS);
      expect(action).toHaveProperty('storageFilenames', data);
    });

    it('fetchStorageFilenamesFailed', () => {
      const criticalErrorShowMock = jest.fn();
      CriticalErrorActions.show = criticalErrorShowMock;
      actions.fetchStorageFilenamesFailed()(dispatch);

      expect(criticalErrorShowMock).toHaveBeenCalled();
    });

    it('STORAGE_FILENAME_ADD', () => {
      const action = actions.addStorageFilename(values);
      expect(action).toHaveProperty('type', AT.STORAGE_FILENAME_ADD);
      expect(action).toHaveProperty('values', values);
    });

    it('STORAGE_FILENAME_ADD_SUCCESS', () => {
      snackBarShowMock.mockReset();
      GlobalSnackBarActions.show = snackBarShowMock;

      dispatch.mockReset();
      actions.addStorageFilenameSuccess()(dispatch);

      expect(dispatch.mock.calls[0]).toEqual([
        { type: AT.STORAGE_FILENAME_ADD_SUCCESS },
      ]);
      expect(dispatch).toHaveBeenCalledWith(snackBarShowMock());
      expect(dispatch.mock.calls[2]).toEqual([actions.fetchStorageFilenames()]);
    });

    it('addStorageFilenameFailed', () => {
      nonCriticalHTTPErrorMock.mockReset();
      errors.nonCriticalHTTPError = nonCriticalHTTPErrorMock;

      dispatch.mockReset();
      actions.addStorageFilenameFailed(err)(dispatch);

      expect(nonCriticalHTTPErrorMock).toHaveBeenCalledWith(err);
      expect(dispatch.mock.calls[1]).toEqual([
        { type: AT.STORAGE_FILENAME_ADD_FAILED },
      ]);
    });

    it('STORAGE_FILENAME_DELETE', () => {
      const action = actions.deleteStorageFilename(filenameIds);
      expect(action).toHaveProperty('type', AT.STORAGE_FILENAME_DELETE);
      expect(action).toHaveProperty('filenameIds', filenameIds);
    });

    it('STORAGE_FILENAME_DELETE_SUCCESS', () => {
      snackBarShowMock.mockReset();
      GlobalSnackBarActions.show = snackBarShowMock;
      const expectedAction = {
        type: AT.STORAGE_FILENAME_DELETE_SUCCESS,
        filenameIds,
      };

      dispatch.mockReset();
      actions.deleteStorageFilenameSuccess(filenameIds)(dispatch);

      expect(dispatch.mock.calls[0]).toEqual([expectedAction]);
      expect(dispatch).toHaveBeenCalledWith(snackBarShowMock());
    });

    it('deleteStorageFilenameFailed', () => {
      nonCriticalHTTPErrorMock.mockReset();
      errors.nonCriticalHTTPError = nonCriticalHTTPErrorMock;
      actions.deleteStorageFilenameFailed(err)(dispatch);

      expect(nonCriticalHTTPErrorMock).toHaveBeenCalledWith(err);
    });

    it('STORAGE_FILENAME_ADD_MODAL_OPEN', () => {
      expect(actions.openAddFilenameModal()).toHaveProperty(
        'type',
        AT.STORAGE_FILENAME_ADD_MODAL_OPEN
      );
    });

    it('STORAGE_FILENAME_ADD_MODAL_CLOSE', () => {
      expect(actions.closeAddFilenameModal()).toHaveProperty(
        'type',
        AT.STORAGE_FILENAME_ADD_MODAL_CLOSE
      );
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle STORAGE_FILENAMES_FETCH_SUCCESS', () => {
      expect(
        reducer(undefined, actions.fetchStorageFilenamesSuccess({ data }))
      ).toMatchSnapshot();
    });

    it('handle STORAGE_FILENAME_ADD_MODAL_OPEN', () => {
      expect(
        reducer(undefined, actions.openAddFilenameModal())
      ).toMatchSnapshot();
    });

    it('handle STORAGE_FILENAME_ADD', () => {
      expect(
        reducer(undefined, actions.addStorageFilename(values))
      ).toMatchSnapshot();
    });

    it('handle STORAGE_FILENAME_ADD_MODAL_CLOSE', () => {
      expect(
        reducer(undefined, actions.closeAddFilenameModal())
      ).toMatchSnapshot();
    });

    it('handle STORAGE_FILENAME_ADD_SUCCESS', () => {
      expect(
        reducer(undefined, { type: AT.STORAGE_FILENAME_ADD_SUCCESS })
      ).toMatchSnapshot();
    });

    it('handle STORAGE_FILENAME_ADD_FAILED', () => {
      expect(
        reducer(undefined, { type: AT.STORAGE_FILENAME_ADD_FAILED })
      ).toMatchSnapshot();
    });
  });
});
