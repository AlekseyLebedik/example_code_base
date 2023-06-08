import gql from 'graphql-tag';
import { createSelector } from 'reselect';
import { plainProjectsSelector } from 'dw/core/helpers/title-env-selectors';

export const ENV_SHORTTYPE_MAP = {
  dev: 'DEV',
  cert: 'CERT',
  live: 'PROD',
};

export const clanTitleEnvSelector = createSelector(
  plainProjectsSelector,
  (_, params) => params,
  (projects, { titleEnvs }) => {
    const envShortType = titleEnvs[0] && titleEnvs[0].shortType;
    const titleIds = titleEnvs.map(t => t.title.id);
    const titles = titleIds.length
      ? projects.filter(
          p =>
            p.environment.shortType === envShortType &&
            p.environment.options.clans_enabled &&
            titleIds.includes(p.title.id.toString())
        )
      : [];
    return {
      titleId: titles?.length ? titles[0].title.id : null,
      env: ENV_SHORTTYPE_MAP[envShortType],
    };
  }
);

export const formatClanData = titleId => data => {
  const map = new Map();
  map.set(titleId, data);
  return map;
};

export const CLAN_MEMBERSHIP_QUERY = gql`
  query ClanInfo($titleId: ID!, $env: Env!, $members: [UnoID]!) {
    clanMembers(titleId: $titleId, env: $env, members: $members) {
      role
      memberSince
      lastUpdated
      player {
        userID
        username
      }
      clan {
        id
        name
        members {
          player {
            userID
            username
          }
          role
          memberSince
        }
      }
    }
  }
`;
