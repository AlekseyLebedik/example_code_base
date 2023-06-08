import { reducer } from '../reducer';
import * as AT from '../actionTypes';

jest.mock('dw/online-configuration/store');

describe('ActiveStoreTabs', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});

    describe('default action', () => {
      it('returns default state', () => {
        const state = reducer(undefined, {});
        expect(state).toMatchSnapshot();
      });
    });

    describe('ACTIVE_STORE_TABS_CHANGE', () => {
      it('changes the selected tab key', () => {
        const action = {
          type: AT.ACTIVE_STORE_TABS_CHANGE,
          key: 2,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
