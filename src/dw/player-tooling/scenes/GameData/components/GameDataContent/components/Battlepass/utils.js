import gql from 'graphql-tag';

export const NO_DATA_BATTLEPASS_MSG = 'No battlepass data found';

export const formatBattlepassData = data => {
  const titles = new Map();
  // eslint-disable-next-line no-unused-expressions
  data
    ?.filter(item => item.latestOwned && item.owned)
    .forEach(({ titleId, seasonNo, rank }) => {
      const title = titles.get(titleId) || {};
      titles.set(titleId, {
        ...title,
        titleId,
        seasonNo,
        rank,
      });
    });
  return titles;
};

export const BATTLEPASS_QUERY = gql`
  query Battlepass($unoID: ID!, $accountsServiceConfigId: ID!) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      battlepass {
        titleId
        context
        name
        seasonNo
        seasonId
        premiumId
        premiumIdSony
        baseId
        sentinelId
        owned
        latestOwned
        rank
        xp
      }
    }
  }
`;
