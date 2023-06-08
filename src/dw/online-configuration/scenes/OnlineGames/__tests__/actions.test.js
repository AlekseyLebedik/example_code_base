import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('dw/core/components/CriticalError');

describe('OnlineGames', () => {
  describe('Actions', () => {
    const dispatch = jest.fn();
    beforeEach(() => {
      CriticalErrorActions.show.mockReset();
      dispatch.mockReset();
    });

    describe('fetchOnlineGames', () => {
      it('returns ONLINE_GAMES_FETCH action with append set to false by default', () => {
        expect(actions.fetchOnlineGames('psn', {})).toEqual({
          type: AT.ONLINE_GAMES_FETCH,
          context: 'psn',
          params: {},
          append: false,
        });
      });
      it('returns ONLINE_GAMES_FETCH action', () => {
        expect(actions.fetchOnlineGames('psn', {}, true)).toEqual({
          type: AT.ONLINE_GAMES_FETCH,
          context: 'psn',
          params: {},
          append: true,
        });
      });
    });

    describe('fetchOnlineGamesSuccess', () => {
      it('returns ONLINE_GAMES_FETCH_SCCESS action', () => {
        expect(actions.fetchOnlineGamesSuccess({}, false, 'steam')).toEqual({
          type: AT.ONLINE_GAMES_FETCH_SUCCESS,
          append: false,
          context: 'steam',
          contexts: [],
          elementsOrder: undefined,
          nextPageToken: undefined,
          onlineGames: undefined,
          q: undefined,
          searchAvailable: true,
        });
      });
    });

    describe('fetchOnlineGamesFailed', () => {
      it('dispatches GlobalProgress done and Critical Error handler', () => {
        const err = Error('Test Error');
        CriticalErrorActions.show.mockReturnValue({ TYPE: 'MOCKED_ACTION' });

        actions.fetchOnlineGamesFailed(err, {}, {}, true)(dispatch);
        expect(dispatch).toHaveBeenCalledWith(GlobalProgressActions.done());
        expect(dispatch).toHaveBeenCalledWith({ TYPE: 'MOCKED_ACTION' });
      });
    });

    describe('fetchOnlineGamesListItemClick', () => {
      it('returns ONLINE_GAMES_LIST_ITEM_ONCLICK action', () => {
        const action = actions.onlineGamesListItemClick({});
        expect(action).toEqual({
          type: AT.ONLINE_GAMES_LIST_ITEM_ONCLICK,
          onlineGame: {},
        });
      });
    });
  });
});
