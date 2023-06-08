import InfoNotification from '@demonware/devzone-core/components/Notifications';

import { middleware } from '../middleware';
import * as AT from '../actionTypes';
import { onlineGamesListItemClick } from '../actions';

jest.mock('@demonware/devzone-core/components/Notifications');

describe('OnlineGames', () => {
  describe('Middleware', () => {
    const dispatch = jest.fn();
    const next = jest.fn();
    let store;
    let action;

    beforeEach(() => {
      InfoNotification.mockReset();
      dispatch.mockReset();
      next.mockReset();
      store = { dispatch };
      action = {};
    });

    it('dispatches an item click on ONLINE_GAMES_FETCH_SUCCESS with only one record', () => {
      action = {
        type: AT.ONLINE_GAMES_FETCH_SUCCESS,
        onlineGames: [{ id: 1 }],
      };
      middleware(store)(next)(action);
      expect(dispatch).toHaveBeenCalledWith(
        onlineGamesListItemClick({ id: 1 })
      );
    });

    it('does not dispatch an item click on ONLINE_GAMES_FETCH_SUCCESS with multiple records', () => {
      action = {
        type: AT.ONLINE_GAMES_FETCH_SUCCESS,
        onlineGames: [{ id: 1 }, { id: 2 }],
      };
      middleware(store)(next)(action);
      expect(dispatch).not.toHaveBeenCalledWith(
        onlineGamesListItemClick({ id: 1 })
      );
    });
  });
});
