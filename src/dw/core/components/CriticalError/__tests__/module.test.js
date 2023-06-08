import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';

import reducer from '../reducer';
import { middleware } from '../middleware';
import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('CriticalError', () => {
  let showErrorAction = null;
  let hideErrorAction = null;

  beforeEach(() => {
    showErrorAction = actions.show({ message: 'Error message' }, jest.fn());
    hideErrorAction = actions.hide();
  });

  describe('Action Creators', () => {
    it('CRITICAL_ERROR_SHOW', () => {
      expect(showErrorAction).toHaveProperty('type', AT.CRITICAL_ERROR_SHOW);
    });

    it('CRITICAL_ERROR_HIDE', () => {
      expect(hideErrorAction).toHaveProperty('type', AT.CRITICAL_ERROR_HIDE);
    });
  });

  describe('Reducer', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handles CRITICAL_ERROR_SHOW', () => {
      expect(reducer(undefined, showErrorAction)).toMatchSnapshot();
    });

    it('handles CRITICAL_ERROR_HIDE', () => {
      expect(reducer(undefined, hideErrorAction)).toMatchSnapshot();

      const state = reducer(undefined, showErrorAction);
      expect(reducer(state, hideErrorAction)).toMatchSnapshot();
    });
  });

  describe('Middleware', () => {
    it('stops the global progress bar on every CRITICAL_ERROR_SHOW', () => {
      const storeMock = {
        getState: jest.fn(),
        dispatch: jest.fn(),
      };
      const next = jest.fn();

      middleware(storeMock)(next)(showErrorAction);

      expect(storeMock.dispatch).toHaveBeenCalledWith(
        GlobalProgressActions.done()
      );
      expect(next).toHaveBeenCalledWith(showErrorAction);
    });
  });
});
