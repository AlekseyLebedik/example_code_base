import gql from 'graphql-tag';

export const CREATE_CLAN = gql`
  mutation CreateClanMutation(
    $titleId: ID!
    $env: Env!
    $clanData: ClanCreationInput!
  ) {
    createClan(titleId: $titleId, env: $env, clanData: $clanData) {
      clan {
        id
        name
        tag
        owner {
          userID
          accountType
          username
        }
        privacyLevel
      }
    }
  }
`;

export const DISBAND_CLAN = gql`
  mutation DisbandClanMutation($titleId: ID!, $env: Env!, $clanId: ID!) {
    disbandClan(titleId: $titleId, env: $env, clanId: $clanId) {
      ok
    }
  }
`;

export const MUTATE_CLAN_DETAILS = gql`
  mutation UpdateClanDetails(
    $titleId: ID!
    $env: Env!
    $clanId: ID!
    $clanData: ClanUpdateInput!
  ) {
    updateClan(
      titleId: $titleId
      env: $env
      clanId: $clanId
      clanData: $clanData
    ) {
      clan {
        id
        name
        tag
        owner {
          userID
          accountType
          username
        }
        privacyLevel
      }
    }
  }
`;

export const ADD_CLAN_MEMBERS = gql`
  mutation AddClanMembers(
    $titleId: ID!
    $env: Env!
    $clanId: ID!
    $members: [ClanMemberInput]!
  ) {
    addClanMembers(
      titleId: $titleId
      env: $env
      clanId: $clanId
      members: $members
    ) {
      members {
        player {
          accountType
          userID
          username
        }
        role
        memberSince
        lastUpdated
      }
      errors {
        error
        message
        userID
      }
    }
  }
`;

export const REMOVE_CLAN_MEMBERS = gql`
  mutation RemoveClanMembers(
    $titleId: ID!
    $env: Env!
    $clanId: ID!
    $members: [ClanPlayerInput]!
    $newOwner: String
  ) {
    removeClanMembers(
      titleId: $titleId
      env: $env
      clanId: $clanId
      members: $members
      newOwner: $newOwner
    ) {
      ok
    }
  }
`;

export const BAN_CLAN_MEMBERS = gql`
  mutation BanClanMembers(
    $titleId: ID!
    $env: Env!
    $clanId: ID!
    $members: [ClanBanInput]!
  ) {
    banClanMembers(
      titleId: $titleId
      env: $env
      clanId: $clanId
      members: $members
    ) {
      bans {
        accountType
        userID
        banTimestamp
        banEndTimestamp
      }
    }
  }
`;

export const UNBAN_CLAN_MEMBERS = gql`
  mutation UnbanClanMembers(
    $titleId: ID!
    $env: Env!
    $clanId: ID!
    $members: [ClanPlayerInput]!
  ) {
    unbanClanMembers(
      titleId: $titleId
      env: $env
      clanId: $clanId
      members: $members
    ) {
      ok
    }
  }
`;
