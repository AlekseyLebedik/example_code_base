import { reducer } from '../reducer';
import {
  LEADERBOARDS_FETCH_SUCCESS,
  LEADERBOARDS_LIST_ITEM_ONCLICK,
  LEADERBOARDS_FETCH_STATUS_SUCCESS,
} from '../actionTypes';
import {
  LEADERBOARD_RESET_SUCCESS,
  LEADERBOARD_DELETE_ENTITIES_SUCCESS,
  LEADERBOARD_DATA_FETCH_SUCCESS,
} from '../components/LeaderboardDetails/actionTypes';

describe('Leaderboards', () => {
  describe('Reducer', () => {
    let initialState = null;
    beforeEach(() => {
      initialState = {
        ...reducer(undefined, {}),
        leaderboards: ['item-1', 'item-2'],
      };
    });

    describe('default', () => {
      it('returns the initial state', () => {
        const state = reducer(undefined, {});
        expect(state).toMatchObject({
          leaderboards: [],
          nextPageToken: undefined,
          selectedLeaderboard: undefined,
          elementsOrder: [],
          q: undefined,
          leaderboardDetails: undefined,
        });
      });
    });

    describe('LEADERBOARDS_FETCH_SUCCESS', () => {
      it('retuns the state with only the new leaderboards when `append` is false', () => {
        const action = {
          type: LEADERBOARDS_FETCH_SUCCESS,
          append: false,
          leaderboards: ['item-3', 'item-4'],
        };
        const state = reducer(initialState, action);
        expect(state).toMatchObject({
          leaderboards: ['item-3', 'item-4'],
        });
      });

      it('retuns the state with all the leaderboards when `append` is true', () => {
        const action = {
          type: LEADERBOARDS_FETCH_SUCCESS,
          append: true,
          leaderboards: ['item-3', 'item-4'],
        };
        const state = reducer(initialState, action);
        expect(state).toMatchObject({
          leaderboards: ['item-1', 'item-2', 'item-3', 'item-4'],
        });
      });
    });

    describe('LEADERBOARDS_LIST_ITEM_ONCLICK', () => {
      it('returns the state with selectedLeaderboard object', () => {
        const action = {
          type: LEADERBOARDS_LIST_ITEM_ONCLICK,
          leaderboard: 'item-2',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchObject({
          leaderboards: ['item-1', 'item-2'],
          selectedLeaderboard: 'item-2',
        });
      });
    });

    describe('LEADERBOARDS_FETCH_STATUS_SUCCESS', () => {
      beforeEach(() => {
        initialState = {
          ...initialState,
          leaderboards: [
            {
              id: 1,
              resetStatus: 'N/A',
            },
            {
              id: 2,
              resetStatus: { msg: 'Foo' },
            },
          ],
        };
      });

      it('returns the original state if there is no changes for the current leaderboards', () => {
        const action = {
          type: LEADERBOARDS_FETCH_STATUS_SUCCESS,
          status: {
            3: { msg: 'New message', label: 'success' },
          },
        };

        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
      });

      it('changes the status objects for the affected leaderboards', () => {
        const action = {
          type: LEADERBOARDS_FETCH_STATUS_SUCCESS,
          status: {
            2: { msg: 'New message', label: 'success' },
            3: { msg: 'New message', label: 'success' },
          },
        };

        const state = reducer(initialState, action);
        expect(state.leaderboards[1].resetStatus).toHaveProperty(
          'msg',
          'New message'
        );
      });
    });

    describe('LEADERBOARD_DATA_FETCH_SUCCESS', () => {
      it('returns the state replacing the leaderboardDetails with a new one', () => {
        const action = {
          type: LEADERBOARD_DATA_FETCH_SUCCESS,
          entities: [{ entityID: 1 }, { entityID: 2 }, { entityID: 3 }],
        };

        initialState = {
          ...initialState,
          leaderboardDetails: {
            id: 1,
          },
        };

        const state = reducer(initialState, action);
        expect(state).toMatchObject({
          leaderboards: ['item-1', 'item-2'],
          leaderboardDetails: {
            id: 1,
            entities: [{ entityID: 1 }, { entityID: 2 }, { entityID: 3 }],
          },
        });
      });
    });

    describe('LEADERBOARDS_DELETE_ENTITIES_SUCCESS', () => {
      it('returns the state filtering out the deleted entities from the current leaderboard', () => {
        const action = {
          type: LEADERBOARD_DELETE_ENTITIES_SUCCESS,
          entityIds: [1, 3],
        };

        initialState = {
          ...initialState,
          leaderboardDetails: {
            id: 1,
            entities: [{ entityID: 1 }],
          },
        };

        const state = reducer(initialState, action);

        expect(state).toHaveProperty(
          'leaderboardDetails.entities.0',
          expect.objectContaining({ entityID: 1 })
        );
        expect(state.leaderboardDetails.entities).toHaveLength(1);
      });
    });

    describe('LEADERBOARD_RESET_SUCCESS', () => {
      it('returns the state with no leadetboardDetails', () => {
        const action = {
          type: LEADERBOARD_RESET_SUCCESS,
        };
        const state = reducer(initialState, action);
        expect(state.leaderboardDetails).toBeUndefined();
      });
    });
  });
});
