import { reducer } from '../reducer';
import { LEADERBOARD_DATA_FETCH_SUCCESS } from '../actionTypes';

describe('LeaderboardsDetails', () => {
  describe('Reducer', () => {
    describe('default action', () => {
      it('returns initial state', () => {
        const state = reducer(undefined, {});
        expect(state).toEqual({
          entities: [],
          nextPageToken: undefined,
        });
      });
    });

    describe('LEADERBOARD_DATA_FETCH_SUCCESS', () => {
      let initialState = null;
      beforeEach(() => {
        initialState = {
          ...reducer(undefined, {}),
          entities: ['entity-1', 'entity-2'],
        };
      });

      it('retuns the state with the new entities when `append` is false', () => {
        const action = {
          type: LEADERBOARD_DATA_FETCH_SUCCESS,
          append: false,
          entities: ['entity-3', 'entity-4'],
        };
        const state = reducer(initialState, action);
        expect(state).toMatchObject({
          entities: ['entity-3', 'entity-4'],
        });
      });

      it('retuns the state with all the entities when `append` is true', () => {
        const action = {
          type: LEADERBOARD_DATA_FETCH_SUCCESS,
          append: true,
          entities: ['entity-3', 'entity-4'],
        };
        const state = reducer(initialState, action);
        expect(state).toMatchObject({
          entities: ['entity-1', 'entity-2', 'entity-3', 'entity-4'],
        });
      });
    });
  });
});
