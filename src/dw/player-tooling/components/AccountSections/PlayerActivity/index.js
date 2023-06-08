import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';

import { hasData } from 'dw/core/helpers/object';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { featureSwitches as fs } from '@demonware/devzone-core/access/FeatureSwitchesCheck';

import Empty from 'dw/core/components/Empty';
import Loading from 'dw/core/components/Loading';
import ErrorMessageDisplay from '../../GraphQLStateRenderer/components/ErrorMessageDisplay';
import RecentAuthentication from '../../RecentAuthentication';

import styles from './index.module.css';

const StatusDot = ({ online }) => (
  <span className={styles.statusDotContainer}>
    <Icon className={online ? styles.statusOnline : styles.statusOffline} />
    {online ? 'Online' : 'Offline'}
  </span>
);

StatusDot.propTypes = { online: PropTypes.bool.isRequired };

const PresenceDetail = ({ heading, detail }) => (
  <div>
    <strong>{heading}:</strong>
    <span className={styles.presenceDetail}>{detail}</span>
  </div>
);

PresenceDetail.propTypes = {
  heading: PropTypes.string.isRequired,
  detail: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

// TODO: Maybe we can calculate this on the backend and just return a flag like isPresent?
const PLAYER_PRESENCE_QUERY = gql`
  query PlayerActivity($unoID: ID!, $accountsServiceConfigId: ID!) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      presence {
        titles {
          presence {
            online
          }
        }
      }
    }
  }
`;
const PLAYER_LOGINS_QUERY = gql`
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

const PlayerActivity = ({ hasPIIPermission, variables }) => {
  const {
    loading: presenceLoading,
    error: presenceError,
    data: presenceData,
  } = useQuery(PLAYER_PRESENCE_QUERY, {
    variables: { ...variables, hasPIIPermission },
  });
  // LOGINS_QUERY is separate because it's very slow to load
  const {
    loading: loginsLoading,
    error: loginsError,
    data: loginsData,
  } = useQuery(PLAYER_LOGINS_QUERY, {
    variables: { ...variables, hasPIIPermission },
  });

  if (loginsLoading && presenceLoading) {
    return <Loading classes={{ loadingContainer: styles.loading }} />;
  }
  return (
    <div className="flex flex-col">
      <Presence
        data={presenceData?.player?.presence}
        error={presenceError?.graphQLErrors}
        loading={presenceLoading}
      />
      <Logins
        hasPIIPermission={hasPIIPermission}
        data={loginsData?.player?.logins}
        error={loginsError?.graphQLErrors}
        loading={loginsLoading}
      />
    </div>
  );
};

PlayerActivity.propTypes = {
  hasPIIPermission: PropTypes.bool.isRequired,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
  }).isRequired,
};

const getLastLogin = (formatDateTime, logins = []) =>
  logins[0] ? formatDateTime(logins[0].timestamp) : 'N/A';

const getLastIP = (logins = []) =>
  logins[0] ? logins[0].client?.ips?.toString() : 'N/A';

const getLastCountryCode = (logins = []) =>
  logins[0] ? logins[0].client?.geo?.countryIsoCode : 'N/A';

const getLastPlatform = (logins = []) =>
  logins[0] ? logins[0].firstParty?.platform?.toUpperCase() : 'N/A';

export const Logins = ({ hasPIIPermission, error, data, loading }) => {
  const formatDateTime = useSelector(formatDateTimeSelector);
  const showTitleDetails = useSelector(state =>
    hasFeaturesEnabledFuncSelector(state)([fs.SHOW_PLAYER_TITLE_DETAILS], false)
  );

  const playerHasLogins = !!data?.length;
  return (
    <div>
      {error && error.map(({ message }) => message).join(' ')}
      {!error && loading && (
        <Loading classes={{ loadingContainer: styles.loading }} />
      )}
      {(!error || !error.length) && !loading && playerHasLogins && (
        <>
          <div className={styles.presenceFlexContainer}>
            <PresenceDetail
              heading="Last Authentication Attempt"
              detail={getLastLogin(formatDateTime, data)}
            />
          </div>
          <div className={styles.presenceFlexContainer}>
            <PresenceDetail heading="Platform" detail={getLastPlatform(data)} />
            {hasPIIPermission && (
              <>
                <PresenceDetail
                  heading="Country"
                  detail={getLastCountryCode(data)}
                />
                <PresenceDetail heading="IP" detail={getLastIP(data)} />
              </>
            )}
          </div>
        </>
      )}
      {showTitleDetails && playerHasLogins && (
        <>
          <Divider className={styles.divider} />
          <RecentAuthentication
            data={data}
            hasPIIPermission={hasPIIPermission}
          />
        </>
      )}
      {playerHasLogins === false && !loading && !error && (
        <Empty>No activity data found</Empty>
      )}
    </div>
  );
};

Logins.propTypes = {
  hasPIIPermission: PropTypes.bool.isRequired,
  error: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};
Logins.defaultProps = {
  error: [],
  data: [],
};

export const checkPlayerPresence = (presence = []) =>
  presence.some(p => p.titles?.some(t => t.presence?.online));

export const Presence = ({ error, data, loading }) => {
  const hasError = hasData(error);
  if (hasError) return <ErrorMessageDisplay error={error} />;
  if (!hasError && loading)
    return <Loading classes={{ loadingContainer: styles.loading }} />;
  if (!hasError && !loading && data.length)
    return (
      <div className={styles.presenceFlexContainer}>
        <PresenceDetail
          heading="Player Presence"
          detail={<StatusDot online={checkPlayerPresence(data)} />}
        />
      </div>
    );
  return null;
};

Presence.propTypes = {
  error: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};
Presence.defaultProps = {
  error: [],
  data: [],
};

export default PlayerActivity;
