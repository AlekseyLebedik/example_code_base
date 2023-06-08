import gql from 'graphql-tag';

export const serviceConfigsSorted = data =>
  data?.serviceConfigs
    ? data.serviceConfigs.slice().sort((a, b) => {
        if (a.name.toUpperCase().includes('PROD')) {
          if (
            !a.name.toUpperCase().includes('SHA') ||
            !b.name.toUpperCase().includes('PROD')
          )
            return -1;
        }
        if (b.name.toUpperCase().includes('PROD')) return 1;
        return 0;
      })
    : [];

export const parseQueryString = query => {
  const urlParams = new URLSearchParams(query);
  const options = {};
  urlParams.forEach((value, key) => {
    options[key] =
      key === 'serviceConfigID' ? value : value.split(',').filter(v => v);
  });
  return options;
};

export const generateFilterPath = ({ serviceConfigID, options }) => {
  const params = new URLSearchParams({ serviceConfigID, ...options });
  return params.toString();
};

export const setPlayerURL = ({ history, serviceConfigID, options, unoID }) => {
  history.push({
    pathname: `/player/game-data/${unoID || ''}`,
    search: generateFilterPath({ serviceConfigID, options }),
  });
};

export const validateServiceConfigID = (serviceConfigID, serviceConfigs) =>
  /^\d+$/.test(serviceConfigID) &&
  serviceConfigs.some(s => s.id === serviceConfigID)
    ? serviceConfigID
    : null;

export const SERVICE_CONFIG_QUERY = gql`
  query ServiceConfigInfo {
    serviceConfigs(serviceType: "ACCOUNTSMANAGEMENT") {
      id
      name
    }
  }
`;

export const PLAYER_QUERY = gql`
  query PlayerInfo(
    $accountsServiceConfigId: ID!
    $query: String!
    $unoID: ID!
  ) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      bans {
        titleName
      }
    }
    linkedAccounts(
      accountsServiceConfigId: $accountsServiceConfigId
      query: $query
    ) {
      accounts {
        umbrellaID
        linkedAccounts {
          accountID
        }
      }
      unoAccounts {
        accountID
        username
        created
        updated
      }
    }
  }
`;
