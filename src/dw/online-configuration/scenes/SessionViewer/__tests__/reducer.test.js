import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('SessionViewer', () => {
  describe('Reducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      lobbies: [{ id: 1 }, { id: 2 }],
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('SESSION_VIEWER_LOBBIES_FETCH', () => {
      it('returns initial state', () => {
        const action = {
          type: AT.SESSION_VIEWER_LOBBIES_FETCH,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('SESSION_VIEWER_LOBBIES_FETCH_SUCCESS', () => {
      const newEntries = [{ id: 1 }, { id: 300 }, { id: 400 }];

      it('append new entries and ignore existing ones', () => {
        const action = {
          type: AT.SESSION_VIEWER_LOBBIES_FETCH_SUCCESS,
          payload: newEntries,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
