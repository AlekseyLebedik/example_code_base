import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { show as GlobalSnackBarShow } from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');
jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/CriticalError');

describe('Leaderboards', () => {
  describe('Actions', () => {
    const dispatch = jest.fn();
    beforeEach(() => {
      dispatch.mockReset();
    });

    describe('fetchLeaderboards', () => {
      it('dispatches an action of type LEADERBOARDS_FETCH', () => {
        actions.fetchLeaderboards({})(dispatch);
        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: AT.LEADERBOARDS_FETCH,
            append: false,
          })
        );
      });
    });

    describe('fetchLeaderboardsSuccess', () => {
      it('dispatches an action of type LEADERBOARDS_FETCH_SUCCESS', () => {
        actions.fetchLeaderboardsSuccess(
          {
            data: ['obj1', 'obj2'],
          },
          true
        )(dispatch);
        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: AT.LEADERBOARDS_FETCH_SUCCESS,
          })
        );
      });

      it('returns the action with mapped data from the payload', () => {
        actions.fetchLeaderboardsSuccess(
          {
            data: ['obj1', 'obj2'],
            nextPageToken: 'token',
            q: 'something',
          },
          true
        )(dispatch);
        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            leaderboards: ['obj1', 'obj2'],
            append: true,
            nextPageToken: 'token',
            q: 'something',
            searchAvailable: true,
            type: AT.LEADERBOARDS_FETCH_SUCCESS,
          })
        );
      });
    });

    describe('fetchLeaderboardsFailed', () => {
      beforeEach(() => {});

      it('dispatches critical error action', () => {
        actions.fetchLeaderboardsFailed(Error())(dispatch);
        expect(CriticalErrorActions.show).toHaveBeenCalled();
      });
    });

    describe('leaderboardsListItemClick', () => {
      it('returns an action of type LEADERBOARDS_LIST_ITEM_ONCLICK', () => {
        const action = actions.leaderboardsListItemClick({ id: 1 });
        expect(action).toMatchObject({
          type: AT.LEADERBOARDS_LIST_ITEM_ONCLICK,
          leaderboard: { id: 1 },
        });
      });
    });

    describe('resetLeaderboardSuccess', () => {
      beforeEach(() => {
        GlobalSnackBarShow.mockReset();
      });

      it('dispatches snackbar action and fetchLeaderboardsStatus', () => {
        /**
         * @todo Test the fetchLeaderboardsStatus call
         */

        actions.resetLeaderboardsSuccess([1])(dispatch);
        expect(GlobalSnackBarShow).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledTimes(2);
      });
    });

    describe('resetLeaderboardsFailed', () => {
      beforeEach(() => {
        nonCriticalHTTPError.mockReset();
      });

      it('dispatches the error to the global handler', () => {
        const err = Error('Test error');
        actions.resetLeaderboardsFailed(err)(() => {});
        expect(nonCriticalHTTPError).toHaveBeenCalledWith(err);
      });
    });

    describe('fetchLeaderboardStatus', () => {
      it('dispatches an action of type LEADERBOARDS_FETCH_STATUS', () => {
        actions.fetchLeaderboardsStatus([1, 2])(dispatch);
        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: AT.LEADERBOARDS_FETCH_STATUS,
            leaderboardIds: [1, 2],
          })
        );
      });
    });

    describe('fetchLeaderboardsStatusSuccess', () => {
      it('dispatches a LEADERBOARDS_FETCH_STATUS_SUCCESS action with the given payload', () => {
        actions.fetchLeaderboardsStatusSuccess('status-1')(dispatch);
        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: AT.LEADERBOARDS_FETCH_STATUS_SUCCESS,
            status: 'status-1',
          })
        );
      });
    });

    describe('fetchLeaderboardsStatusFailed', () => {
      beforeEach(() => {
        nonCriticalHTTPError.mockReset();
      });

      it('dispatches the error to the global handler', () => {
        const err = Error('Test error');
        actions.fetchLeaderboardsStatusFailed(err)(dispatch);
        expect(nonCriticalHTTPError).toHaveBeenCalledWith(err);
      });
    });
  });
});
