import gql from 'graphql-tag';

export const SERVICE_CONFIG_QUERY = gql`
  query ServiceConfigInfo {
    serviceConfigs(serviceType: "ACCOUNTSMANAGEMENT") {
      id
      name
    }
  }
`;

export const PLAYERS_QUERY = gql`
  query UnoSelectInfo(
    $accountsServiceConfigId: ID!
    $query: String!
    $includeFirstParty: Boolean!
  ) {
    linkedAccounts(
      accountsServiceConfigId: $accountsServiceConfigId
      query: $query
      includeFirstParty: $includeFirstParty
    ) {
      unoAccounts {
        accountID
        username
      }
      nextPageToken
    }
  }
`;
