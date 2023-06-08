import reducer from '../reducer';
import * as AT from '../actionTypes';

describe('TitleEnvStats', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});
    const modifiedState = {
      ...initialState,
      leaderboardRanges: [{ id: 'id' }],
    };

    describe('LEADERBOARD_RANGES_FETCH_SUCCESS', () => {
      it('fetchs leader board ranges', () => {
        const action = {
          type: AT.LEADERBOARD_RANGES_FETCH_SUCCESS,
          leaderboardRanges: [
            {
              id: 'newId',
            },
          ],
        };
        const state = reducer(modifiedState, action);
        expect(state).toEqual({
          ...initialState,
          leaderboardRanges: [{ id: 'newId' }],
        });
        expect(state).toMatchSnapshot();
      });
    });

    describe('LEADERBOARD_RANGE_DELETE_SUCCESS', () => {
      it('delete a leader board range', () => {
        const action = {
          type: AT.LEADERBOARD_RANGE_DELETE_SUCCESS,
          rangeIds: ['id'],
        };
        const state = reducer(modifiedState, action);
        expect(state).toEqual({
          ...initialState,
          leaderboardRanges: [],
        });
        expect(state).toMatchSnapshot();
      });
    });
  });
});
