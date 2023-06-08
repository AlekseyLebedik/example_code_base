import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { show as GlobalSnackBarShow } from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { setSelectedRowKeys } from 'dw/core/components/TableHydrated';

import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');
jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/TableHydrated');

describe('LeaderboardsDetails', () => {
  describe('Actions', () => {
    describe('fetchLeaderboardData', () => {
      it('creates an action of type LEADERBOARD_DATA_FETCH', () => {
        const action = actions.fetchLeaderboardData(1, {});
        expect(action).toHaveProperty('type', AT.LEADERBOARD_DATA_FETCH);
      });

      it('creates an action with `append` false by default', () => {
        const action = actions.fetchLeaderboardData(1, {});
        expect(action).toHaveProperty('append', false);
      });
    });

    describe('fetchLeaderboardDataSuccess', () => {
      it('returns an action of type LEADERBOARD_DATA_FETCH_SUCCESS with payload entities', () => {
        const action = actions.fetchLeaderboardDataSuccess({});
        expect(action).toHaveProperty(
          'type',
          AT.LEADERBOARD_DATA_FETCH_SUCCESS
        );
      });

      it('returns the action with entities from the payload and `append` from parameter', () => {
        const action = actions.fetchLeaderboardDataSuccess(
          {
            entities: ['obj1', 'obj2'],
          },
          true
        );
        expect(action).toMatchObject({
          entities: ['obj1', 'obj2'],
          append: true,
        });
      });
    });

    describe('fetchLeaderboardFailed', () => {
      beforeEach(() => {
        nonCriticalHTTPError.mockReset();
      });

      it('dispatches the error to the global handler', () => {
        const err = Error('Test error');
        actions.fetchLeaderboardFailed(err)(() => {});
        expect(nonCriticalHTTPError).toHaveBeenCalledTimes(1);
        expect(nonCriticalHTTPError).toHaveBeenCalledWith(err);
      });
    });

    describe('deleteLeaderboardEntities', () => {
      it('returns an action of type LEADERBOARD_DELETE_ENTITIES with the given leaderboardId and entity ids', () => {
        const action = actions.deleteLeaderboardEntities(1, [10, 20, 30]);
        expect(action).toMatchObject({
          type: AT.LEADERBOARD_DELETE_ENTITIES,
          leaderboardId: 1,
          entityIds: [10, 20, 30],
        });
      });
    });

    describe('deleteLeaderboardEntitiesSuccess', () => {
      beforeEach(() => {
        GlobalSnackBarShow.mockReset();
        setSelectedRowKeys.mockReset();
      });

      it('dispatches a LEADERBOARD_DELETE_ENTITIES_SUCCESS action, shows snackbar and unselects the row', () => {
        const dispatch = jest.fn();
        actions.deleteLeaderboardEntitiesSuccess([1])(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: AT.LEADERBOARD_DELETE_ENTITIES_SUCCESS,
            entityIds: [1],
          })
        );

        expect(GlobalSnackBarShow).toHaveBeenCalled();
        expect(setSelectedRowKeys).toHaveBeenCalled();
      });
    });

    describe('deleteLeaderboardEntitiesFailed', () => {
      beforeEach(() => {
        nonCriticalHTTPError.mockReset();
      });

      it('dispatches the error to the global handler', () => {
        const err = Error('Test error');
        actions.deleteLeaderboardEntitiesFailed(err)(() => {});
        expect(nonCriticalHTTPError).toHaveBeenCalledTimes(1);
        expect(nonCriticalHTTPError).toHaveBeenCalledWith(err);
      });
    });

    describe('resetLeaderboard', () => {
      it('returns an action of type LEADERBOARD_RESET', () => {
        const action = actions.resetLeaderboard(1);
        expect(action).toMatchObject({
          type: AT.LEADERBOARD_RESET,
          leaderboardId: 1,
        });
      });
    });

    describe('resetLeaderboardSuccess', () => {
      it('dispatches a LEADERBOARD_RESET_SUCCESS action and shows snackbar', () => {
        const dispatch = jest.fn();
        actions.resetLeaderboardSuccess(1)(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: AT.LEADERBOARD_RESET_SUCCESS,
          })
        );

        expect(GlobalSnackBarShow).toHaveBeenCalled();
      });
    });

    describe('resetLeaderboardFailed', () => {
      beforeEach(() => {
        nonCriticalHTTPError.mockReset();
      });

      it('dispatches the error to the global handler', () => {
        const err = Error('Test error');
        actions.resetLeaderboardFailed(err)(() => {});
        expect(nonCriticalHTTPError).toHaveBeenCalledTimes(1);
        expect(nonCriticalHTTPError).toHaveBeenCalledWith(err);
      });
    });
  });
});
