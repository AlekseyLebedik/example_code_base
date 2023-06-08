import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('FeedbackWrapper actions:', () => {
  it(`Action test: ${AT.START_LOADING}`, () => {
    const expected = {
      type: AT.START_LOADING,
    };
    const received = actions.startLoading();
    expect(received).toMatchObject(expected);
    expect(received).toMatchSnapshot();
  });

  it(`Action test: ${AT.STOP_LOADING}`, () => {
    const expected = {
      type: AT.STOP_LOADING,
    };
    const received = actions.stopLoading();
    expect(received).toMatchObject(expected);
    expect(received).toMatchSnapshot();
  });

  it(`Action test: ${AT.TRY_SAVING}`, () => {
    const expected = {
      type: AT.TRY_SAVING,
    };
    const received = actions.trySaving();
    expect(received).toMatchObject(expected);
    expect(received).toMatchSnapshot();
  });

  it(`Action test: ${AT.SAVE_SUCCESS}`, () => {
    const expected = {
      type: AT.SAVE_SUCCESS,
    };
    const received = actions.saveSuccess();
    expect(received).toMatchObject(expected);
    expect(received).toMatchSnapshot();
  });

  it(`Action test: ${AT.SAVE_FAILED}`, () => {
    const error = 'This is a an error';
    const expected = {
      type: AT.SAVE_FAILED,
      error,
    };
    const received = actions.saveFailed(error);
    expect(received).toMatchObject(expected);
    expect(received).toMatchSnapshot();
  });

  it(`Action test: ${AT.RESET_FEEDBACK}`, () => {
    const expected = {
      type: AT.RESET_FEEDBACK,
    };
    const received = actions.resetFeedback();
    expect(received).toMatchObject(expected);
    expect(received).toMatchSnapshot();
  });
});
