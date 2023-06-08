import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('Graphs', () => {
  const statName = 'users-online';
  const source = '/stats/';
  describe('Actions', () => {
    describe('clearChart', () => {
      it('returns STAT_CLEAR_CHART action', () => {
        expect(actions.clearChart(statName)).toMatchObject({
          type: AT.STAT_CLEAR_CHART,
          statName,
        });
      });
    });

    describe('fetchStatsData', () => {
      it('returns STAT_DATA_FETCH action', () => {
        expect(actions.fetchStatsData(statName, source)).toMatchObject({
          type: AT.STAT_DATA_FETCH,
          statName,
          source,
        });
      });
    });

    describe('fetchStatsDataSuccess', () => {
      it('returns STAT_DATA_FETCH_SUCCESS action if start and end passed', () => {
        expect(
          actions.fetchStatsDataSuccess(
            { series: [{ data: [1, 2, 3], name: 'series 1' }] },
            statName,
            {
              start: 1,
              end: 10,
            }
          )
        ).toMatchObject({
          data: [{ data: [1, 2, 3], name: 'series 1' }],
          end: 10,
          series: ['series 1'],
          start: 1,
          statName: 'users-online',
          type: AT.STAT_DATA_FETCH_SUCCESS,
        });
      });
      it('returns STAT_DATA_INITIAL_FETCH_SUCCESS action if start and end not passed', () => {
        expect(
          actions.fetchStatsDataSuccess(
            { series: [{ data: [5, 6, 7], name: 'series 1' }] },
            statName,
            {}
          )
        ).toMatchObject({
          data: [{ data: [5, 6, 7], name: 'series 1' }],
          end: undefined,
          navigatorData: [5, 6, 7],
          series: ['series 1'],
          start: undefined,
          statName: 'users-online',
          type: AT.STAT_DATA_INITIAL_FETCH_SUCCESS,
        });
      });
    });
  });
});
