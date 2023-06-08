import reducer from '../reducer';
import * as AT from '../actionTypes';

describe('Graph', () => {
  describe('Reducer', () => {
    const statName = 'users-online';
    const min = 1;
    const max = 5;

    let initialState;
    let modifiedState;

    beforeEach(() => {
      initialState = reducer(undefined, {});
      modifiedState = {
        ...initialState,
        graphs: { ...initialState.graphs },
      };
      modifiedState.graphs[statName] = {
        loading: false,
        data: [1, 2],
        navigatorData: [1, 4],
        min,
        max,
      };
    });

    describe('default action', () => {
      it('returns default state', () => {
        const state = reducer(undefined, {});
        expect(state).toMatchSnapshot();
      });
    });

    it('action STAT_CLEAR_CHART clears graph data', () => {
      const action = {
        type: AT.STAT_CLEAR_CHART,
        statName,
      };
      const state = reducer(modifiedState, action);
      expect(state).toMatchSnapshot();
    });

    it('action STAT_DATA_FETCH clears graph data and sets loading to true if start and end not set (initial load)', () => {
      const action = {
        type: AT.STAT_DATA_FETCH,
        statName,
      };
      const state = reducer(modifiedState, action);
      expect(state).toMatchSnapshot();
    });

    it('action STAT_DATA_FETCH does not modify state if start and end set', () => {
      const action = {
        type: AT.STAT_DATA_FETCH,
        statName,
        start: min,
        end: max,
      };
      const state = reducer(modifiedState, action);
      expect(state).toMatchSnapshot();
    });

    it('action STAT_DATA_INITIAL_FETCH_SUCCESS sets navigatorData', () => {
      const action = {
        type: AT.STAT_DATA_INITIAL_FETCH_SUCCESS,
        statName,
        data: [100, 200],
      };
      const state = reducer(modifiedState, action);
      expect(state).toMatchSnapshot();
    });

    it('action STAT_DATA_FETCH_SUCCESS sets statData', () => {
      const action = {
        type: AT.STAT_DATA_FETCH_SUCCESS,
        statName,
        data: [1000, 2000],
        start: 200,
        end: 500,
      };
      const state = reducer(modifiedState, action);
      expect(state).toMatchSnapshot();
    });
  });
});
