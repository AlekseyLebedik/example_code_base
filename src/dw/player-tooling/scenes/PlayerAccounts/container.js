import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { PLAYER_QUERY } from 'dw/player-tooling/scenes/GameData/utils';

import ErrorMessageDisplay from '../../components/GraphQLStateRenderer/components/ErrorMessageDisplay';

import StatelessPlayerAccounts from './presentational';

import styles from './presentational.module.css';
import { usePrevious } from '../../../core/hooks';
import { useServiceConfigs } from '../../components/UnoAccountSelector/components/ServiceConfigSelector';

const PlayerAccounts = () => {
  const { id: accountsServiceConfigId, error: serviceConfigError } =
    useServiceConfigs();
  const [unoID, setUnoID] = useState('');
  const [unoUserData, setUnoUserData] = useState({});
  const [playerAccounts, setPlayerAccounts] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  const {
    error: playerError,
    data: playerData,
    loading: playerDataLoading,
  } = useQuery(PLAYER_QUERY, {
    errorPolicy: 'all',
    skip: !accountsServiceConfigId || !unoID,
    variables: { accountsServiceConfigId, query: unoID, unoID },
  });

  const onPlayerChange = useCallback(
    id => {
      history.push({
        pathname: `/player/accounts/${id || ''}`,
        search: location.search,
      });
    },
    [history, location]
  );

  useEffect(() => {
    if (params.id !== unoID) setUnoID(params.id);
  }, [params.id, unoID]);

  useEffect(() => {
    if (playerError) {
      setUnoUserData({});
      setPlayerAccounts([]);
    }
    if (playerData?.linkedAccounts) {
      setUnoUserData(playerData.linkedAccounts?.unoAccounts[0] || {});
      setPlayerAccounts(
        playerData.linkedAccounts?.accounts[0]?.linkedAccounts || []
      );
    }
  }, [playerData, playerError]);

  const onSelectAccount = useCallback(
    id => {
      if (id && id !== unoUserData.accountID) {
        setUnoUserData({});
        onPlayerChange(id);
      }
    },
    [unoUserData.accountID, accountsServiceConfigId, history]
  );

  const prevServiceConfigId = usePrevious(accountsServiceConfigId);

  useEffect(() => {
    if (
      accountsServiceConfigId !== prevServiceConfigId &&
      prevServiceConfigId
    ) {
      setUnoUserData({});
      onPlayerChange('');
    }
  }, [prevServiceConfigId, accountsServiceConfigId]);

  if (prevServiceConfigId !== accountsServiceConfigId && unoID) return null;

  if (accountsServiceConfigId)
    return (
      <StatelessPlayerAccounts
        accountsServiceConfigId={accountsServiceConfigId}
        onSelectAccount={onSelectAccount}
        playerBans={playerData?.player?.bans}
        playerAccounts={playerAccounts}
        playerDataLoading={playerDataLoading}
        unoID={unoID}
        unoUserData={unoUserData}
        playerError={playerError}
      />
    );
  return serviceConfigError ? (
    <div className={styles.accountsErrorContainer}>
      {serviceConfigError && <ErrorMessageDisplay error={serviceConfigError} />}
    </div>
  ) : null;
};

export default PlayerAccounts;
