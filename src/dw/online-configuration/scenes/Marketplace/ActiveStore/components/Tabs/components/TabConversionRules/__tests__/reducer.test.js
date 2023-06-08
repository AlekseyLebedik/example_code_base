import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('TabConvsersionRules', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});

    describe('default action', () => {
      it('returns default state', () => {
        const state = reducer(undefined, {});
        expect(state).toMatchSnapshot();
      });
    });

    describe('ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH_SUCCESS', () => {
      it('replaces the list of conversion rules', () => {
        const action = {
          type: AT.ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH_SUCCESS,
          conversionRules: [{ id: 1 }, { id: 2 }],
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
