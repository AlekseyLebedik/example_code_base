import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('OnlineGames', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});
    const populatedState = {
      ...initialState,
      onlineGames: [{ userID: 100 }],
      contexts: ['', '1', '2'],
      selectedContext: ['2'],
      selectedOnlineGame: { userID: 100 },
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('ONLINE_GAMES_FETCH_SUCCESS', () => {
      const onlineGames = [{ userID: 1 }, { userID: 2 }, { userID: 3 }];

      it('returns state with new online games list when append is false', () => {
        const action = {
          type: AT.ONLINE_GAMES_FETCH_SUCCESS,
          onlineGames,
          contexts: [],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });

      it('returns state with combined online games list when append is true', () => {
        const action = {
          type: AT.ONLINE_GAMES_FETCH_SUCCESS,
          append: true,
          onlineGames,
          contexts: [],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });

      it('sets nextPageToken and elementsOrder with values from payload', () => {
        const action = {
          type: AT.ONLINE_GAMES_FETCH_SUCCESS,
          onlineGames,
          nextPageToken: 'ABC',
          elementsOrder: ['userID'],
          contexts: [],
        };
        const state = reducer(populatedState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('ONLINE_GAMES_LIST_ITEM_ONCLICK', () => {
      it('returns selected game', () => {
        const action = {
          type: AT.ONLINE_GAMES_LIST_ITEM_ONCLICK,
          onlineGame: { id: 1 },
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
