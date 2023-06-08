import { formatTitleSummaryData, getTimePlayedHrsMin } from '../utils';

describe('TitleSummary utils', () => {
  describe('getTimePlayedHrsMinSeconds', () => {
    it('returns number of seconds in "H hour(s) M minute(s)" format', () => {
      expect(getTimePlayedHrsMin(3674)).toEqual('1 hour 1 minute');
      expect(getTimePlayedHrsMin(7354)).toEqual('2 hours 2 minutes');
      expect(getTimePlayedHrsMin(857432859)).toEqual('238175 hours 47 minutes');
    });

    it('returns the appropriate value when time is 0 or less than a minute', () => {
      expect(getTimePlayedHrsMin(0)).toEqual('0 hours 0 minutes');
      expect(getTimePlayedHrsMin(59)).toEqual('0 hours 0 minutes');
    });

    it('returns the appropriate value when time is at least a minute and less than an hour', () => {
      expect(getTimePlayedHrsMin(60)).toEqual('0 hours 1 minute');
      expect(getTimePlayedHrsMin(3599)).toEqual('0 hours 59 minutes');
    });

    it('returns "-" when "-" is passed', () => {
      expect(getTimePlayedHrsMin('-')).toEqual('-');
    });
  });

  describe('formatTitleSummaryData', () => {
    const inputData = {
      battlepass: [
        {
          latestOwned: false,
          owned: true,
          rank: 5,
        },
        {
          latestOwned: true,
          owned: true,
          rank: 6,
        },
      ],
      codStats: [
        {
          profile: {
            lifetime: {
              all: '{"properties": {"kdratio": 0.40217391304347827, "scorePerGame": 5645, "scorePerMinute": 92.18835057158411, "timePlayedTotal": 3674}}',
            },
            platform: 'psn',
            prestige: 5,
          },
        },
      ],
      gameData: [
        {
          env: {
            title: {
              platform: 'xb1',
            },
          },
          logins: [
            {
              gameMode: 5,
              lastLogin: '2020-06-10 09:22:33',
            },
            {
              gameMode: 6,
              lastLogin: '2020-06-14 11:30:01',
            },
            {
              gameMode: 5,
              lastLogin: '2020-06-10 11:29:01',
            },
          ],
        },
        {
          env: {
            title: {
              platform: 'ps4',
            },
          },
          logins: [
            {
              gameMode: 1,
              lastLogin: '2020-06-11 09:22:33',
            },
            {
              gameMode: 4,
              lastLogin: '2020-06-13 11:30:01',
            },
            {
              gameMode: 1,
              lastLogin: '2020-06-12 11:29:01',
            },
          ],
        },
      ],
    };
    const expectedSummaryData = {
      kdratio: 0.40217391304347827,
      platform: 'psn',
      prestige: 5,
      rank: 6,
      scorePerGame: 5645,
      scorePerMinute: 92.18835057158411,
      timePlayedTotal: 3674,
      logins: [
        {
          gameMode: 6,
          lastLogin: 1592134201,
          platform: 'xb1',
        },
        {
          gameMode: 4,
          lastLogin: 1592047801,
          platform: 'ps4',
        },
        {
          gameMode: 1,
          lastLogin: 1591961341,
          platform: 'ps4',
        },
        {
          gameMode: 5,
          lastLogin: 1591788541,
          platform: 'xb1',
        },
      ],
    };

    const emptyInput = {
      battlepass: [],
      codStats: [],
      gameData: [],
    };
    const expectedEmptyInputResults = {
      kdratio: undefined,
      logins: [],
      prestige: undefined,
      rank: undefined,
      scorePerGame: undefined,
      scorePerMinute: undefined,
      timePlayedTotal: undefined,
    };

    it('returns GraphQL query results in expected format', () => {
      expect(formatTitleSummaryData(inputData)).toEqual(expectedSummaryData);
    });

    it('returns empty results correctly', () => {
      expect(formatTitleSummaryData(emptyInput)).toEqual(
        expectedEmptyInputResults
      );
    });
  });
});
