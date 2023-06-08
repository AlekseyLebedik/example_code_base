import gql from 'graphql-tag';

export const CLAN_QUERY = gql`
  query ClanInfo($titleId: ID!, $env: Env!, $clanId: ID!) {
    clans(titleId: $titleId, env: $env, clanId: $clanId) {
      id
      tag
      name
      createdTimestamp
      memberCount
      owner {
        userID
        accountType
        username
      }
      privacyLevel
      proposalCount
      bans {
        player {
          userID
          accountType
          username
        }
        banEndTimestamp
        banTimestamp
      }
      members {
        player {
          userID
          accountType
          username
        }
        role
        memberSince
        lastUpdated
      }
      proposals {
        type
        message
        createdTimestamp
        cooldownTimstamp
        targetPlayer {
          userID
          accountType
          username
        }
        proposingPlayer {
          userID
          accountType
          username
        }
      }
      tags {
        key
        value
        searchType
      }
    }
  }
`;

export const CLAN_MEMBERS_QUERY = gql`
  query ClanMembersInfo($titleId: ID!, $env: Env!, $members: [UnoID]!) {
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
      }
    }
  }
`;
