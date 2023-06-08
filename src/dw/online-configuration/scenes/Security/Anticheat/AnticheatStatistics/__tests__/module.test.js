import * as actions from '../actions';
import * as AT from '../actionTypes';
import * as selectors from '../selectors';

const userId = '1234567890';
const challengeId = 1;
const date = new Date('2018-07-12T01:01:01.000Z');

describe('Security - Anticheat - AnticheatStatistics', () => {
  describe('Action Creators', () => {
    it('ANTICHEAT_STATISTICS_CHANGE_USER_ID', () => {
      const action = actions.changeUserId(userId);

      expect(action).toHaveProperty(
        'type',
        AT.ANTICHEAT_STATISTICS_CHANGE_USER_ID
      );
      expect(action).toHaveProperty('userID', userId);
    });

    it('ANTICHEAT_STATISTICS_CHANGE_CHALLENGE_ID', () => {
      const action = actions.changeChallengeId(challengeId);

      expect(action).toHaveProperty(
        'type',
        AT.ANTICHEAT_STATISTICS_CHANGE_CHALLENGE_ID
      );
      expect(action).toHaveProperty('challengeId', challengeId);
    });

    it('ANTICHEAT_STATISTICS_CHANGE_DATE', () => {
      const action = actions.changeDate(date);

      expect(action).toHaveProperty(
        'type',
        AT.ANTICHEAT_STATISTICS_CHANGE_DATE
      );
      expect(action).toHaveProperty('date', date);
    });
  });

  describe('Reducer', () => {
    let _reducer = null;
    const fixedDate = new Date('2018-02-28T00:00:00.000Z');

    beforeAll(() => {
      import('../reducer').then(anticheatStatisticsReducer => {
        _reducer = anticheatStatisticsReducer.default;
      });
      global.Date = class extends global.Date {
        constructor() {
          super();
          return fixedDate;
        }
      };
    });

    it('return the initial state', () => {
      expect(_reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle ANTICHEAT_STATISTICS_CHANGE_USER_ID', () => {
      expect(
        _reducer(undefined, actions.changeUserId(userId))
      ).toMatchSnapshot();
    });

    it('handle ANTICHEAT_STATISTICS_CHANGE_CHALLENGE_ID', () => {
      expect(
        _reducer(undefined, actions.changeChallengeId(challengeId))
      ).toMatchSnapshot();
    });

    it('handle ANTICHEAT_STATISTICS_CHANGE_DATE', () => {
      expect(_reducer(undefined, actions.changeDate(date))).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    it('validate userIdSelector', () => {
      const state = {
        Scenes: {
          Security: {
            Anticheat: { AnticheatStatistics: { Filters: { userID: userId } } },
          },
        },
      };
      expect(selectors.userIdSelector(state)).toBe(userId);
    });

    it('validate challengeIdSelector', () => {
      const state = {
        Scenes: {
          Security: {
            Anticheat: { AnticheatStatistics: { Filters: { challengeId } } },
          },
        },
      };
      expect(selectors.challengeIdSelector(state)).toBe(challengeId);
    });

    it('validate dateSelector', () => {
      const state = {
        Scenes: {
          Security: {
            Anticheat: { AnticheatStatistics: { Filters: { date } } },
          },
        },
      };
      expect(selectors.dateSelector(state)).toBe(date);
    });
  });
});
