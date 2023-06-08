import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';
import { filterTestUsersLogs } from '../../../helpers';

jest.mock('@demonware/devzone-core/helpers/errors');

const nextPageToken = 'CAE';
const userID = '1433537325841258812';
const data = [
  {
    userID,
    username: 'AnonymousHostUser',
    updateTime: 1531210756,
    success: 1,
    connectionID: '521629087527720243',
    consoleID: 'xboxone',
    internalAddr: '1.126.246.222',
    externalAddr: '49.246.46.6',
  },
];
const dataForFilter = [
  {
    username: 'dw_thcnagios',
  },
  {
    username: 'bdTestClientUser',
  },
  {
    username: 'bdSystemTestUser',
  },
  {
    username: 'dm_dz',
  },
  {
    username: 'HostUser',
  },
  {
    username: 'AnonymousHostUser',
  },
];

describe('Security - Anticheat - Whitelist - Connectionlogs- ByUser', () => {
  describe('Action Creators', () => {
    it('CONNECTION_LOGS_FETCH', () => {
      const action = actions.fetchConnectionLogs({}, false);

      expect(action).toHaveProperty('type', AT.CONNECTION_LOGS_FETCH);
      expect(action).toHaveProperty('append', false);
    });

    it('CONNECTION_LOGS_FETCH_SUCCESS', () => {
      const action = actions.fetchConnectionLogsSuccess(
        { data, nextPageToken },
        true
      );

      expect(action).toHaveProperty('type', AT.CONNECTION_LOGS_FETCH_SUCCESS);
      expect(action).toHaveProperty('payload', { data, nextPageToken });
      expect(action).toHaveProperty('append', true);
    });

    it('fetchConnectionLogsFailed', () => {
      const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
      const action = actions.fetchConnectionLogsFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
    });

    it('CONNECTION_LOGS_CHANGE_USER_ID', () => {
      const action = actions.changeUserID(userID);

      expect(action).toHaveProperty('type', AT.CONNECTION_LOGS_CHANGE_USER_ID);
      expect(action).toHaveProperty('userID', userID);
    });

    it('CONNECTION_LOGS_CHANGE_ASCENDING', () => {
      const action = actions.changeAscending(true);

      expect(action).toHaveProperty(
        'type',
        AT.CONNECTION_LOGS_CHANGE_ASCENDING
      );
      expect(action).toHaveProperty('ascending', true);
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle CONNECTION_LOGS_FETCH_SUCCESS: empty results', () => {
      expect(
        reducer(undefined, actions.fetchConnectionLogsSuccess({ data: [] }))
      ).toMatchSnapshot();
    });

    it('handle CONNECTION_LOGS_FETCH_SUCCESS: connectionLogs and nextPagetoken assignation', () => {
      expect(
        reducer(
          undefined,
          actions.fetchConnectionLogsSuccess({ data, nextPageToken })
        )
      ).toMatchSnapshot();
    });

    it('Test append = false', () => {
      expect(
        reducer(
          { connectionLogs: [1, 2] },
          actions.fetchConnectionLogsSuccess(
            { data: [3, 4], nextPageToken },
            false
          )
        )
      ).toMatchSnapshot();
    });

    it('Test append = true', () => {
      expect(
        reducer(
          { connectionLogs: [1, 2] },
          actions.fetchConnectionLogsSuccess(
            { data: [3, 4], nextPageToken },
            true
          )
        )
      ).toMatchSnapshot();
    });

    it('handle CONNECTION_LOGS_CHANGE_USER_ID', () => {
      expect(
        reducer(undefined, actions.changeUserID(userID))
      ).toMatchSnapshot();
    });

    it('handle CONNECTION_LOGS_CHANGE_ASCENDING', () => {
      expect(
        reducer(undefined, actions.changeAscending(true))
      ).toMatchSnapshot();
    });
  });

  describe('Filter for test users', () => {
    it('return users if not to include the test users', () => {
      const result = filterTestUsersLogs(dataForFilter, false);

      expect(result).toEqual([
        { username: 'dm_dz' },
        { username: 'HostUser' },
        { username: 'AnonymousHostUser' },
      ]);
    });

    it('return users if to include the test users', () => {
      const result = filterTestUsersLogs(dataForFilter, true);

      expect(result).toEqual(dataForFilter);
    });

    it('return users if empty data', () => {
      const result = filterTestUsersLogs([], false);

      expect(result).toEqual([]);
    });
  });
});
