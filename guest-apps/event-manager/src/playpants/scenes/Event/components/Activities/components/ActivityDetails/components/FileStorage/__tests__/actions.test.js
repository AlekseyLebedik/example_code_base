import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('File Storage actions', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  beforeEach(() => {
    nonCriticalHTTPError.mockReset();
    nonCriticalHTTPError.mockReturnValue({
      type: MOCKED_NON_CRITICAL_ERROR,
    });
  });

  // file upload tests
  const id = 20;
  const xProgressID = 1548547200;
  const progress = { received: 776, size: 776 };
  const callback = jest.fn();
  const file = 'Test file will just be a string';
  const name = 'test.txt';
  const fileDetails = {
    title: '',
    filename: 'test.txt',
    remoteFilename: 'anotherTest.txt',
    context: 1,
    comment: 'This is a test comment.',
    size: '150 MB',
    progress: 0,
    download: false,
    'X-Progress-ID': 1548547200,
  };
  const selectedActivity = {
    id: 10,
    type: 'pubstorage',
    title_envs: [3],
    activity: {
      files: [1],
    },
  };
  const activity = {
    ...selectedActivity,
    activity: {
      files: [...selectedActivity.activity.files, 2],
    },
  };
  const files = {
    1: {
      title: '',
      filename: 'first.txt',
      remoteFilename: 'first.txt',
      context: 1,
      comment: 'This is a test comment.',
      size: '150 MB',
      progress: 0,
      download: false,
      'X-Progress-ID': 1548546000,
    },
    2: {
      title: '',
      filename: 'test.txt',
      remoteFilename: 'anotherTest.txt',
      context: 1,
      comment: 'This is a test comment.',
      size: '150 MB',
      progress: 0,
      download: false,
      'X-Progress-ID': 1548547200,
    },
  };

  describe('uploadFileAction', () => {
    it('uploading a new file', () => {
      expect(
        actions.uploadFileAction(selectedActivity, fileDetails, file, callback)
      ).toMatchObject({
        type: AT.UPLOAD_FILE,
        selectedActivity,
        fileDetails,
        file,
        callback,
      });
    });
  });

  describe('uploadFileSuccess', () => {
    it('successfully upload a file', () => {
      expect(
        actions.uploadFileSuccess(activity, { 2: fileDetails })
      ).toMatchObject({
        type: AT.UPLOAD_FILE_SUCCESS,
        activity,
        file: { 2: fileDetails },
      });
    });
  });

  describe('uploadProgressFetch', () => {
    it('get current upload progress of a file', () => {
      expect(actions.uploadProgressFetch(id, callback)).toMatchObject({
        type: AT.UPLOAD_PROGRESS_FETCH,
        id,
        callback,
      });
    });
  });

  describe('uploadProgressFetchSuccess', () => {
    it('successful getting of progress', () => {
      expect(
        actions.uploadProgressFetchSuccess(progress, xProgressID)
      ).toMatchObject({
        type: AT.UPLOAD_PROGRESS_FETCH_SUCCESS,
        progress,
        id: xProgressID,
      });
    });
  });

  describe('downloadFile', () => {
    it('dowload the selected file to local machine', () => {
      expect(actions.downloadFile(id, name, callback)).toMatchObject({
        type: AT.DOWNLOAD_FILE,
        id,
        name,
        callback,
      });
    });
  });

  describe('removeFile', () => {
    it('remove file from frontend and make api call to remove from backend', () => {
      expect(actions.removeFile(id, callback)).toMatchObject({
        type: AT.REMOVE_FILE,
        id,
        callback,
      });
    });
  });

  describe('removeFileSuccess', () => {
    it('successfully remove a file', () => {
      expect(actions.removeFileSuccess(id)).toMatchObject({
        type: AT.REMOVE_FILE_SUCCESS,
        id,
      });
    });
  });

  describe('updateFile', () => {
    it('update a single file attribute', () => {
      expect(actions.updateFile(file, id)).toMatchObject({
        type: AT.UPDATE_FILE,
        file,
        id,
      });
    });
  });

  describe('fileDetailsFetch', () => {
    it('load a files details from its ID', () => {
      expect(actions.fileDetailsFetch(selectedActivity)).toMatchObject({
        type: AT.FILE_DETAILS_FETCH,
        selectedActivity,
      });
    });
  });

  describe('fileDetailsFetchSuccess', () => {
    it('successfully load a files details', () => {
      expect(actions.fileDetailsFetchSuccess(files)).toMatchObject({
        type: AT.FILE_DETAILS_FETCH_SUCCESS,
        files,
      });
    });
  });
});
