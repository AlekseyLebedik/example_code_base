import * as AT from '../actionTypes';
import * as actions from '../actions';

describe('ServerLogs', () => {
  describe('Action Creators', () => {
    it('SERVER_LOGS_FETCH', () => {
      const dispatch = jest.fn();
      actions.fetchServerLogs()(dispatch);
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({ type: AT.SERVER_LOGS_FETCH })
      );
    });
  });
});
