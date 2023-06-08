import * as Actions from '../actions';
import { reducer, SCRIPTS_INITIAL_STATE } from '../reducer';

describe('Lootgen reducer', () => {
  const InitialState = {
    Scripts: SCRIPTS_INITIAL_STATE,
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(InitialState);
  });

  it('should return uploading true on UPLOAD_SCRIPT_POST', () => {
    expect(reducer(undefined, Actions.uploadScript({}))).toHaveProperty(
      'Scripts.uploading',
      true
    );
  });

  it('should return state on UPLOAD_SCRIPT_POST_SUCCESS', () => {
    expect(
      reducer(undefined, Actions.uploadScriptSuccess({ data: [] }))
    ).toHaveProperty('Scripts.uploading', false);
    expect(
      reducer(undefined, Actions.uploadScriptSuccess({ data: [] }))
    ).toHaveProperty('Scripts.uploadModalVisible', false);
  });

  it('should return state on UPLOAD_SCRIPT_POST_FAILED', () => {
    expect(
      reducer(undefined, Actions.uploadScriptFailed({ data: [] }))
    ).toHaveProperty('Scripts.uploading', false);
    expect(
      reducer(undefined, Actions.uploadScriptFailed({ data: [] }))
    ).toHaveProperty('Scripts.uploadModalVisible', false);
  });

  it('should return uploadModalVisible false on UPLOAD_SCRIPT_CLOSE_MODAL', () => {
    expect(reducer(undefined, Actions.closeUploadModal)).toHaveProperty(
      'Scripts.uploadModalVisible',
      false
    );
  });

  it('should return uploadModalVisible true on UPLOAD_SCRIPT_OPEN_MODAL', () => {
    expect(reducer(undefined, Actions.openUploadModal())).toHaveProperty(
      'Scripts.uploadModalVisible',
      true
    );
  });
});
