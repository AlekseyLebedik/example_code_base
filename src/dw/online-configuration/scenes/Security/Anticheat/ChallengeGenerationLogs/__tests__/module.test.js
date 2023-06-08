import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';
import { challengeGenerationLogsSelector } from '../selectors';

jest.mock('dw/core/components/CriticalError');

const log = {
  eventId: '1',
  generatorId: null,
  timestamp: 1531216910,
  challengeId: null,
  eventData:
    '{"trid": 5647460288037035863, "function_id": 1, "description": "listFilesByOwners", "args": ["id", "name", "order"]}',
  event: 'ws_add_function',
};
const data = [log];
const nextPageToken = 'CAE';
const filteringEnabled = true;
const payload = { data, nextPageToken, filteringEnabled };
const q = 'blah';
const order = 'eventID,ASC';

describe('Security - Anticheat - ChallengeGenerationLogs', () => {
  describe('Action Creators', () => {
    it('CHALLENGE_GENERATION_LOGS_FETCH', () => {
      const action = actions.fetchChallengeGenerationLogs({}, false);
      expect(action).toHaveProperty('type', AT.CHALLENGE_GENERATION_LOGS_FETCH);
      expect(action).toHaveProperty('params', {});
      expect(action).toHaveProperty('append', false);
    });

    it('CHALLENGE_GENERATION_LOGS_FETCH_SUCCESS', () => {
      const action = actions.fetchChallengeGenerationLogsSuccess(payload, true);

      expect(action).toHaveProperty(
        'type',
        AT.CHALLENGE_GENERATION_LOGS_FETCH_SUCCESS
      );
      expect(action).toHaveProperty('challengeGenerationLogs', data);
      expect(action).toHaveProperty('nextPageToken', nextPageToken);
      expect(action).toHaveProperty('filteringEnabled', filteringEnabled);
      expect(action).toHaveProperty('append', true);
    });

    it('fetchChallengeGenerationLogsFailed', () => {
      const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      const action = actions.fetchChallengeGenerationLogsFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_CRITICAL_ERROR });
    });

    it('CHALLENGE_GENERATION_LOGS_CHANGE_SEARCH_QUERY', () => {
      const action = actions.onSearchParamsChange(q);

      expect(action).toHaveProperty(
        'type',
        AT.CHALLENGE_GENERATION_LOGS_CHANGE_SEARCH_QUERY
      );
      expect(action).toHaveProperty('q', q);
    });

    it('CHALLENGE_GENERATION_LOGS_CHANGE_ORDER', () => {
      const action = actions.onOrderChange(order);

      expect(action).toHaveProperty(
        'type',
        AT.CHALLENGE_GENERATION_LOGS_CHANGE_ORDER
      );
      expect(action).toHaveProperty('order', order);
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle CHALLENGE_GENERATION_LOGS_FETCH_SUCCESS: empty results', () => {
      expect(
        reducer(
          undefined,
          actions.fetchChallengeGenerationLogsSuccess({ data: [] })
        )
      ).toMatchSnapshot();
    });

    it('handle CHALLENGE_GENERATION_LOGS_FETCH_SUCCESS: challengeGenerationLogs, filteringEnabled and nextPagetoken assignation', () => {
      expect(
        reducer(undefined, actions.fetchChallengeGenerationLogsSuccess(payload))
      ).toMatchSnapshot();
    });

    it('Test append = false', () => {
      expect(
        reducer(
          { challengeGenerationLogs: [1, 2] },
          actions.fetchChallengeGenerationLogsSuccess(
            { data: [3, 4], filteringEnabled, nextPageToken },
            false
          )
        )
      ).toMatchSnapshot();
    });

    it('Test append = true', () => {
      expect(
        reducer(
          { challengeGenerationLogs: [1, 2] },
          actions.fetchChallengeGenerationLogsSuccess(
            { data: [3, 4], filteringEnabled, nextPageToken },
            true
          )
        )
      ).toMatchSnapshot();
    });

    it('handle CHALLENGE_GENERATION_LOGS_CHANGE_SEARCH_QUERY', () => {
      expect(
        reducer(undefined, actions.onSearchParamsChange(q))
      ).toMatchSnapshot();
    });

    it('handle CHALLENGE_GENERATION_LOGS_CHANGE_ORDER', () => {
      expect(
        reducer(undefined, actions.onOrderChange(order))
      ).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    it('validate challengeGenerationLogsSelector', () => {
      const state = {
        user: { profile: { timezone: 'America/Vancouver' } },
        Scenes: {
          Security: {
            Anticheat: {
              ChallengeGenerationLogs: { challengeGenerationLogs: data },
            },
          },
        },
      };
      const expected = [
        {
          ...log,
          timestamp: 'Jul 10, 2018 03:01 am PDT',
        },
      ];

      expect(challengeGenerationLogsSelector(state)).toEqual(expected);
    });
  });
});
