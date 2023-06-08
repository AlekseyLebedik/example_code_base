import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import { reducer } from '../reducer';

jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/ModalHandlers');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

const userId = '4001055643606974379';
const userIds = [userId];
const data = [
  {
    userName: 'rb_utts',
    monitoringGroup: 'custom_2',
    userId,
  },
  {
    userName: 'RavenVFX608',
    monitoringGroup: 'custom_1',
    userId: '7501981909872457190',
  },
];
const values = {
  userId: {
    value: '4682146174830875114',
    label: 'RBurnett_Raven',
  },
  monitoringGroup: '7',
};
const err = 'error';

describe('Security - Anticheat - MonitoredUsers', () => {
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

    it('MONITORED_USERS_FETCH', () => {
      expect(actions.fetchMonitoredUsers()).toHaveProperty(
        'type',
        AT.MONITORED_USERS_FETCH
      );
    });

    it('MONITORED_USERS_FETCH_SUCCESS', () => {
      const action = actions.fetchMonitoredUsersSuccess({ data });

      expect(action).toHaveProperty('type', AT.MONITORED_USERS_FETCH_SUCCESS);
      expect(action).toHaveProperty('users', data);
    });

    it('fetchMonitoredUsersFailed', () => {
      const action = actions.fetchMonitoredUsersFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_CRITICAL_ERROR });
    });

    it('MONITORED_USERS_ADD', () => {
      const action = actions.addMonitoredUser(values);

      expect(action).toAsyncDispatch(
        { type: AT.MONITORED_USERS_ADD, values },
        { type: MOCKED_MODAL_HANDLERS_SUBMIT }
      );
    });

    it('addMonitoredUserSuccess', () => {
      const action = actions.addMonitoredUserSuccess();

      expect(action).toAsyncDispatch(
        { type: MOCKED_MODAL_HANDLERS_CLOSE },
        { type: MOCKED_GLOBAL_SNACK_BAR },
        { type: AT.MONITORED_USERS_FETCH }
      );
    });

    it('addMonitoredUserFailed', () => {
      const action = actions.addMonitoredUserFailed(err);

      expect(action).toAsyncDispatch(
        { type: MOCKED_NON_CRITICAL_ERROR },
        { type: AT.MONITORED_USERS_ADD_FAILED },
        { type: MOCKED_MODAL_HANDLERS_STOP_SUBMITTING }
      );
    });

    it('MONITORED_USERS_DELETE', () => {
      const action = actions.deleteMonitoredUsers(userIds);

      expect(action).toHaveProperty('type', AT.MONITORED_USERS_DELETE);
      expect(action).toHaveProperty('userIds', userIds);
    });

    it('MONITORED_USERS_DELETE_SUCCESS', () => {
      expect(actions.deleteMonitoredUsersSuccess(userIds)).toAsyncDispatch({
        type: AT.MONITORED_USERS_DELETE_SUCCESS,
        userIds,
      });
    });

    it('deleteMonitoredUsersFailed', () => {
      const action = actions.deleteMonitoredUsersFailed(err);

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle MONITORED_USERS_FETCH_SUCCESS', () => {
      expect(
        reducer(undefined, actions.fetchMonitoredUsersSuccess({ data }))
      ).toMatchSnapshot();
    });

    it('handle MONITORED_USERS_DELETE_SUCCESS', () => {
      const state = reducer(
        undefined,
        actions.fetchMonitoredUsersSuccess({ data })
      );
      expect(
        reducer(state, { type: AT.MONITORED_USERS_DELETE_SUCCESS, userIds })
      ).toMatchSnapshot();
    });
  });
});
