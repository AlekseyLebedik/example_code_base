import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';
import { anticheatStatisticsSelector } from '../selectors';

jest.mock('@demonware/devzone-core/helpers/errors');

const data = [
  {
    unexpected: '20',
    percentCorrect: '2',
    challengeId: '1',
    unanswered: '14',
    punishments: '18',
    failures: '25',
    correct: '1',
  },
];
const nextPageToken = 'CAE';

describe('Security - Anticheat - AnticheatStatistics - StatisticsByChallenge', () => {
  describe('Action Creators', () => {
    it('ANTICHEAT_STATISTICS_FETCH', () => {
      const action = actions.fetchAnticheatStatistics({}, false);

      expect(action).toHaveProperty('type', AT.ANTICHEAT_STATISTICS_FETCH);
      expect(action).toHaveProperty('append', false);
    });

    it('ANTICHEAT_STATISTICS_FETCH_SUCCESS', () => {
      const payload = { data, nextPageToken };
      const action = actions.fetchAnticheatStatisticsSuccess(payload, true);

      expect(action).toHaveProperty(
        'type',
        AT.ANTICHEAT_STATISTICS_FETCH_SUCCESS
      );
      expect(action).toHaveProperty('payload', payload);
      expect(action).toHaveProperty('append', true);
    });

    it('fetchAnticheatStatisticsFailed', () => {
      const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
      const action = actions.fetchAnticheatStatisticsFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle ANTICHEAT_STATISTICS_FETCH_SUCCESS: empty results', () => {
      expect(
        reducer(
          undefined,
          actions.fetchAnticheatStatisticsSuccess({ data: [] })
        )
      ).toMatchSnapshot();
    });

    it('handle ANTICHEAT_STATISTICS_FETCH_SUCCESS: anticheatStatistics and nextPagetoken assignation', () => {
      expect(
        reducer(
          undefined,
          actions.fetchAnticheatStatisticsSuccess({ data, nextPageToken })
        )
      ).toMatchSnapshot();
    });

    it('Test append = false', () => {
      expect(
        reducer(
          { anticheatStatistics: [1, 2] },
          actions.fetchAnticheatStatisticsSuccess(
            { data: [3, 4], nextPageToken },
            false
          )
        )
      ).toMatchSnapshot();
    });

    it('Test append = true', () => {
      expect(
        reducer(
          { anticheatStatistics: [1, 2] },
          actions.fetchAnticheatStatisticsSuccess(
            { data: [3, 4], nextPageToken },
            true
          )
        )
      ).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    it('validate anticheatStatisticsSelector', () => {
      const state = {
        Scenes: {
          Security: {
            Anticheat: {
              AnticheatStatistics: {
                ByChallenge: { anticheatStatistics: data },
              },
            },
          },
        },
      };
      const expected = [
        {
          unexpected: '20',
          percentCorrect: '2',
          challengeId: '1',
          unanswered: '14',
          punishments: '18',
          failures: '25',
          correct: '1',
        },
      ];

      expect(anticheatStatisticsSelector(state)).toEqual(expected);
    });
  });
});
