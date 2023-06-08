import mockState from 'playpants/testUtils/mockState';
import { INITIAL_STATE } from '@demonware/devzone-core/helpers/reducers';
import reducer from '../reducer';
import * as AT from '../actionTypes';

const { activity } = mockState.Scenes.Event;

describe('File Storage Reducer', () => {
  const defaultState = {
    files: {},
    uploadProgress: {},
    contexts: INITIAL_STATE,
  };

  it('returns default state', () => {
    const state = reducer(defaultState, {});
    expect(state).toMatchSnapshot();
  });

  describe('UPLOAD_FILE_SUCCESS', () => {
    it('a file was updated', () => {
      const updatedActivity = {
        activity: '{"type":"pubstorage","files":[1]}',
        id: 11,
        title_envs: [3],
        type: 'pubstorage',
      };
      const file = {
        1: { fileName: 'hi.txt' },
      };
      const action = {
        type: AT.UPLOAD_FILES_SUCCESS,
        activity: updatedActivity,
        file,
      };
      const state = reducer(activity, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('FILE_DETAILS_FETCH_SUCCESS', () => {
    it('files for an activity are loaded', () => {
      const file = {
        1: { fileName: 'hi.txt' },
      };
      const action = {
        type: AT.FILE_DETAILS_FETCH_SUCCESS,
        files: {
          ...file,
        },
      };
      const state = reducer(activity, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('UPLOAD_PROGRESS_FETCH_SUCCESS', () => {
    it('files for an activity are loaded', () => {
      const progress = {
        received: 776,
        size: 776,
      };
      const action = {
        type: AT.UPLOAD_PROGRESS_FETCH_SUCCESS,
        progress,
        id: 155235232,
      };
      const state = reducer(activity, action);
      expect(state).toMatchSnapshot();
    });
  });
});
