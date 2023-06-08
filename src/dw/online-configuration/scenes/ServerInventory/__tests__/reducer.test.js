import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('ServerInventory', () => {
  describe('Reducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      lobbies: [{ id: 1 }, { id: 2 }],
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('SERVERS_ALLOC_FETCH', () => {
      it('returns initial state', () => {
        const action = {
          type: AT.SERVERS_ALLOC_FETCH,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('SERVERS_ALLOC_FETCH_SUCCESS', () => {
      const newEntries = [{ id: 1 }, { id: 300 }, { id: 400 }];

      it('append new entries and ignore existing ones', () => {
        const action = {
          type: AT.SERVERS_ALLOC_FETCH_SUCCESS,
          payload: newEntries,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
