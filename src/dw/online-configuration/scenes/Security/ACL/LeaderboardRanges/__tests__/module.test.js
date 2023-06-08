import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';

jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/ModalHandlers');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

const clientType = '1';
const minId = 1;
const maxId = 2;
const id = 'Y2xpZW50X3R5cGU9MTttYXhfaWQ9MjttaW5faWQ9MQ==';
const rangeIds = [id];
const data = [
  {
    minId,
    maxId,
    clientType,
    id,
  },
  {
    minId: 2,
    maxId: 3,
    clientType,
    id: 'Y2xpZW50X3R5cGU9MTttYXhfaWQ9MzttaW5faWQ9Mg==',
  },
];
const values = {
  clientType,
  minId,
  maxId,
};
const err = 'error';

describe('Security - ACL - LeaderboardRanges', () => {
  describe('Action Creators', () => {
    const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
    const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
    const MOCKED_GLOBAL_SNACK_BAR = 'MOCKED_GLOBAL_SNACK_BAR_SHOW';
    const MOCKED_MODAL_HANDLERS_CLOSE = 'MOCKED_MODAL_HANDLERS_CLOSE';
    const MOCKED_MODAL_HANDLERS_SUBMIT = 'MOCKED_MODAL_HANDLERS_SUBMIT';
    const MOCKED_MODAL_HANDLERS_STOP_SUBMITTING =
      'MOCKED_MODAL_HANDLERS_STOP_SUBMITTING';

    beforeAll(() => {
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      GlobalSnackBarActions.show.mockReturnValue({
        type: MOCKED_GLOBAL_SNACK_BAR,
      });
      ModalHandlers.close.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_CLOSE,
      });
      ModalHandlers.submit.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_SUBMIT,
      });
      ModalHandlers.stopSubmitting.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_STOP_SUBMITTING,
      });
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('LEADERBOARD_RANGES_FETCH', () => {
      expect(actions.fetchLeaderboardRanges()).toHaveProperty(
        'type',
        AT.LEADERBOARD_RANGES_FETCH
      );
    });

    it('LEADERBOARD_RANGES_FETCH_SUCCESS', () => {
      const action = actions.fetchLeaderboardRangesSuccess({ data });

      expect(action).toHaveProperty(
        'type',
        AT.LEADERBOARD_RANGES_FETCH_SUCCESS
      );
      expect(action).toHaveProperty('leaderboardRanges', data);
    });

    it('fetchLeaderboardRangesFailed', () => {
      const action = actions.fetchLeaderboardRangesFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_CRITICAL_ERROR });
    });

    it('LEADERBOARD_RANGE_ADD', () => {
      const action = actions.addLeaderboardRange(values);

      expect(action).toAsyncDispatch({
        type: AT.LEADERBOARD_RANGE_ADD,
        values,
      });
      expect(action).toAsyncDispatch({ type: MOCKED_MODAL_HANDLERS_SUBMIT });
    });

    it('addLeaderboardRangeSuccess', () => {
      const action = actions.addLeaderboardRangeSuccess();

      expect(action).toAsyncDispatch({ type: MOCKED_MODAL_HANDLERS_CLOSE });
      expect(action).toAsyncDispatch({ type: MOCKED_GLOBAL_SNACK_BAR });
      expect(action).toAsyncDispatch({ type: AT.LEADERBOARD_RANGES_FETCH });
    });

    it('addLeaderboardRangeFailed', () => {
      const action = actions.addLeaderboardRangeFailed(err);

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
      expect(action).toAsyncDispatch({ type: AT.LEADERBOARD_RANGE_ADD_FAILED });
      expect(action).toAsyncDispatch({
        type: MOCKED_MODAL_HANDLERS_STOP_SUBMITTING,
      });
    });

    it('LEADERBOARD_RANGE_DELETE', () => {
      const action = actions.deleteLeaderboardRange(rangeIds);

      expect(action).toAsyncDispatch({
        type: AT.LEADERBOARD_RANGE_DELETE,
        rangeIds,
      });
      expect(action).toAsyncDispatch({ type: MOCKED_GLOBAL_SNACK_BAR });
    });

    it('deleteLeaderboardRangeSuccess', () => {
      const action = actions.deleteLeaderboardRangeSuccess(rangeIds);

      expect(action).toAsyncDispatch({
        type: AT.LEADERBOARD_RANGE_DELETE_SUCCESS,
        rangeIds,
      });
    });

    it('deleteLeaderboardRangeFailed', () => {
      const action = actions.deleteLeaderboardRangeFailed(err);

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle LEADERBOARD_RANGES_FETCH_SUCCESS', () => {
      expect(
        reducer(undefined, actions.fetchLeaderboardRangesSuccess({ data }))
      ).toMatchSnapshot();
    });

    it('handle LEADERBOARD_RANGE_DELETE_SUCCESS', () => {
      const state = reducer(
        undefined,
        actions.fetchLeaderboardRangesSuccess({ data })
      );
      expect(
        reducer(state, { type: AT.LEADERBOARD_RANGE_DELETE_SUCCESS, rangeIds })
      ).toMatchSnapshot();
    });
  });
});
