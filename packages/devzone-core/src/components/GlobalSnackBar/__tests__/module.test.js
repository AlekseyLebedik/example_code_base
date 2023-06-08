import reducer from '../reducer';
import * as AT from '../actionTypes';
import * as actions from '../actions';
import Notification from '../../Notifications';

jest.mock('../../Notifications');
Notification.mockImplementation((_, message) => message);

jest.mock('../../Notifications');
Notification.mockImplementation((_, message) => message);

jest.mock('../../Notifications');
Notification.mockImplementation((_, message) => message);

const testMessage = {
  message: 'Test message',
  type: 'info',
};

const errorMessage = {
  message: 'Error message',
  type: 'error',
};

const successMessage = {
  message: 'Success message',
  type: 'success',
};

const showMessageAction = actions.show('Test message', 'info');
const hideMessageAction = actions.hide(testMessage);

describe('GlobalSnackBar', () => {
  describe('Action Creators', () => {
    it('GLOBAL_SNACK_BAR_SHOW', () => {
      expect(showMessageAction).toMatchObject({
        type: AT.GLOBAL_SNACK_BAR_SHOW,
        message: testMessage,
      });
    });

    it('GLOBAL_SNACK_BAR_HIDE', () => {
      expect(hideMessageAction).toMatchObject({
        type: AT.GLOBAL_SNACK_BAR_HIDE,
        message: testMessage,
      });
    });
  });

  describe('Reducer', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, {})).toMatchObject({ messages: [] });
    });

    it('handles GLOBAL_SNACK_BAR_SHOW', () => {
      expect(reducer(undefined, showMessageAction)).toMatchObject({
        messages: [testMessage],
      });
    });

    it('handles GLOBAL_SNACK_BAR_HIDE', () => {
      const state = reducer(undefined, showMessageAction);
      expect(state).toMatchObject({
        messages: [testMessage],
      });
      expect(reducer(state, hideMessageAction)).toMatchObject({ messages: [] });
    });

    it('handles messages with different types', () => {
      let state = reducer(
        undefined,
        actions.show(errorMessage.message, errorMessage.type)
      );
      state = reducer(
        state,
        actions.show(successMessage.message, successMessage.type)
      );
      expect(state).toMatchObject({
        messages: [errorMessage, successMessage],
      });
    });

    it('shows only last message of the same type', () => {
      const otherErrorMessage = {
        message: 'New Error',
        type: 'error',
      };
      let state = reducer(
        undefined,
        actions.show(errorMessage.message, errorMessage.type)
      );
      state = reducer(
        state,
        actions.show(successMessage.message, successMessage.type)
      );
      state = reducer(
        state,
        actions.show(otherErrorMessage.message, otherErrorMessage.type)
      );
      expect(state).toMatchObject({
        messages: [successMessage, otherErrorMessage],
      });
    });
  });
});
