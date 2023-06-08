import gql from 'graphql-tag';

export const LINKED_ACCOUNTS_QUERY = gql`
  query PlayerLinkedAccounts($unoID: ID!, $accountsServiceConfigId: ID!) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      linkedAccounts {
        accountID
        secondaryAccountID
        username
        created
        updated
        accountType
      }
    }
  }
`;
