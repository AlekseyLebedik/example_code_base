import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import RecentAuthentication from 'dw/player-tooling/components/RecentAuthentication';

const PLAYER_ACTIVITY_QUERY = gql`
  query PlayerActivity(
    $unoID: ID!
    $accountsServiceConfigId: ID!
    $hasPIIPermission: Boolean!
  ) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      logins {
        tid
        timestamp
        title {
          name
        }
        client @include(if: $hasPIIPermission) {
          ips
          geo {
            countryIsoCode
          }
        }
        firstParty {
          platform
        }
      }
    }
  }
`;

const Logins = ({ hasPIIPermission, variables }) => {
  return (
    <GraphQLStateRenderer
      DetailsRenderer={useCallback(
        ({ data }) => (
          <RecentAuthentication
            data={data}
            hasPIIPermission={hasPIIPermission}
          />
        ),
        [hasPIIPermission]
      )}
      noDataMsg="No login activity found"
      path="player.logins"
      query={PLAYER_ACTIVITY_QUERY}
      variables={{ ...variables, hasPIIPermission }}
    />
  );
};

Logins.propTypes = {
  hasPIIPermission: PropTypes.bool.isRequired,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
  }).isRequired,
};

export default Logins;
