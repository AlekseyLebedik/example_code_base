import reducer from '../reducer';
import { actionTypes as AT, TYPE_SUFFIXES } from '../constants';
import * as actions from '../actions';
import middleware from '../middleware';

describe('GlobalProgress', () => {
  describe('Action Creators', () => {
    it('GLOBAL_PROGRESS_START', () => {
      expect(actions.start()).toHaveProperty('type', AT.START);
    });

    it('GLOBAL_PROGRESS_DONE', () => {
      expect(actions.done()).toHaveProperty('type', AT.DONE);
    });

    it('GLOBAL_PROGRESS_RESET', () => {
      expect(actions.reset()).toHaveProperty('type', AT.RESET);
    });
  });

  describe('Reducer', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handles GLOBAL_PROGRESS_START', () => {
      expect(reducer(undefined, actions.start())).toMatchSnapshot();
    });

    it('handles multiple GLOBAL_PROGRESS_START', () => {
      const state = reducer(undefined, actions.start());
      expect(reducer(state, actions.start())).toMatchSnapshot();
    });

    it('handles GLOBAL_PROGRESS_DONE', () => {
      expect(reducer(undefined, actions.done())).toMatchSnapshot();

      const state = reducer(undefined, actions.start());
      expect(reducer(state, actions.done())).toMatchSnapshot();
    });

    it('handles GLOBAL_PROGRESS_RESET', () => {
      expect(reducer(undefined, actions.reset())).toMatchSnapshot();

      let state = reducer(undefined, {});
      for (let i = 0; i < 3; i += 1) {
        state = reducer(state, actions.start());
      }
      expect(reducer(state, actions.reset())).toMatchSnapshot();
    });
  });

  describe('Middleware', () => {
    let storeMock = null;
    let next = null;

    beforeEach(() => {
      storeMock = {
        getState: jest.fn(),
        dispatch: jest.fn(),
      };
      next = jest.fn();
    });

    it('dispatch GLOBAL_PROGRESS_START when a request is pending', () => {
      const action = { type: `EXAMPLE_${TYPE_SUFFIXES[0]}` };
      middleware(storeMock)(next)(action);

      expect(storeMock.dispatch).toHaveBeenCalledWith(actions.start());
      expect(next).toHaveBeenCalledWith(action);
    });

    it('dispatch GLOBAL_PROGRESS_DONE a request is fulfilled', () => {
      const action = { type: `EXAMPLE_${TYPE_SUFFIXES[1]}` };
      middleware(storeMock)(next)(action);

      expect(storeMock.dispatch).toHaveBeenCalledWith(actions.done());
      expect(next).toHaveBeenCalledWith(action);
    });

    it('dispatch GLOBAL_PROGRESS_DONE a request is rejected', () => {
      const action = { type: `EXAMPLE_${TYPE_SUFFIXES[2]}` };
      middleware(storeMock)(next)(action);

      expect(storeMock.dispatch).toHaveBeenCalledWith(actions.done());
      expect(next).toHaveBeenCalledWith(action);
    });

    it('does nothing if the action type does not match one of the type suffixes', () => {
      const action = { type: 'EXAMPLE_ACTION' };
      middleware(storeMock)(next)(action);

      expect(storeMock.dispatch).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(action);
    });
  });
});
