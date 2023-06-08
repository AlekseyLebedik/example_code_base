import gql from 'graphql-tag';
import flatMap from 'lodash/flatMap';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';

import { dateToUTCTimestamp } from 'dw/core/helpers/date-time';

/**
 * Convert GraphQL data for easy to utilize format for
 * TitleSummary DetailRenderer component
 * @param {*} data
 * @returns
 */
export const formatTitleSummaryData = data => {
  // eslint-disable-next-line no-unused-expressions
  const codStats = data.codStats?.find(codStat => !isEmpty(codStat?.profile));
  const lifeTimeStats = !isEmpty(codStats?.profile?.lifetime?.all)
    ? JSON.parse(codStats.profile.lifetime.all)?.properties
    : null;

  return {
    ...lifeTimeStats,
    logins: uniqBy(
      orderBy(
        flatMap(
          data.gameData?.map(gd => [
            ...gd?.logins?.map(login => ({
              gameMode: login?.gameMode,
              lastLogin: dateToUTCTimestamp(login?.lastLogin),
              platform: gd?.env?.title?.platform,
            })),
          ])
        ),
        ['lastLogin'],
        ['desc']
      ),
      login => [login?.gameMode, login?.platform].join(' ')
    ),
    platform: codStats?.profile?.platform,
    prestige: codStats?.profile?.prestige,
    rank: data.battlepass?.find(bp => bp?.latestOwned && bp?.owned)?.rank,
  };
};

/**
 * Takes number of seconds and returns time played in
 * "H hour(s) M minute(s)" format, returns '-' if '-' passed
 * @param {*} timePlayed
 * @returns
 */
export const getTimePlayedHrsMin = timePlayed => {
  if (timePlayed === '-') return timePlayed;
  const hours = Math.floor(Number(timePlayed) / 3600);
  const minutes = Math.floor((Number(timePlayed) % 3600) / 60);
  return `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${
    minutes !== 1 ? 's' : ''
  }`;
};

export const NO_DATA_TITLE_SUMMARY_MSG = 'No title summary found';

export const TITLE_SUMMARY_QUERY = gql`
  query PlayerTitleSummary(
    $unoID: ID!
    $accountsServiceConfigId: ID!
    $titleId: Int
  ) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      battlepass {
        latestOwned
        owned
        rank
      }
      gameData {
        env {
          title {
            platform
          }
        }
        logins {
          gameMode
          lastLogin
        }
      }
      codStats(titleId: $titleId) {
        profile {
          lifetime {
            all
          }
          platform
          prestige
        }
      }
    }
  }
`;

/**
 * If value exists, display and rount to specified # of digits,
 * ensuring value is a number, otherwise display '-'
 * @param {*} value
 * @param {*} digits
 * @returns
 */
export const displayNumberToFixedOrDefault = (value, digits) =>
  value === '-' ? value : Number(value).toFixed(digits);
