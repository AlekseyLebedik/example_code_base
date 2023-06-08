import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('RequestErrorDialog', () => {
  describe('openRequestErrorDialog', () => {
    it('open request error dialog', () => {
      expect(actions.openRequestErrorDialog()).toMatchObject({
        type: AT.OPEN_REQUEST_ERROR_DIALOG,
      });
    });
  });

  describe('closeRequestErrorDialog', () => {
    it('close request error dialog', () => {
      expect(actions.closeRequestErrorDialog()).toMatchObject({
        type: AT.CLOSE_REQUEST_ERROR_DIALOG,
      });
    });
  });
});
