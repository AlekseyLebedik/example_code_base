import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import merge from 'lodash/merge';

import { handleScrollToTop } from 'dw/player-tooling/components/ScrollTop';
import ErrorMessageDisplay from '../../components/GraphQLStateRenderer/components/ErrorMessageDisplay';

import { OPTIONS_DEFAULTS } from './constants';
import {
  PLAYER_QUERY,
  SERVICE_CONFIG_QUERY,
  parseQueryString,
  serviceConfigsSorted,
  setPlayerURL,
  validateServiceConfigID,
} from './utils';

import StatelessGameData from './presentational';

import styles from './index.module.css';

const GameData = () => {
  const [unoID, setUnoID] = useState('');
  const [unoUserData, setUnoUserData] = useState({});
  const [playerAccounts, setPlayerAccounts] = useState([]);
  const [groupBy, setGroupBy] = useState('services');
  const [highlightedOption, setHighlightedOption] = useState('accounts');
  const [selectedOptions, setSelectedOptions] = useState(OPTIONS_DEFAULTS);
  const [expandAllSections, setExpandAllSections] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const { error: serviceConfigsError, data: serviceConfigsData } =
    useQuery(SERVICE_CONFIG_QUERY);
  const serviceConfigs = useMemo(
    () => serviceConfigsSorted(serviceConfigsData),
    [serviceConfigsData]
  );
  const [accountsServiceConfigId, onSelectServiceConfigId] = useState(null);
  const {
    error: playerError,
    data: playerData,
    loading: playerDataLoading,
  } = useQuery(PLAYER_QUERY, {
    skip: !accountsServiceConfigId || !unoID,
    variables: { accountsServiceConfigId, query: unoID, unoID },
  });

  useEffect(() => {
    if (params.id !== unoID) setUnoID(params.id);
  }, [params.id, unoID]);

  useEffect(() => {
    const { serviceConfigID, ...urlOptions } = parseQueryString(
      location.search
    );
    const serviceConfigURLID = validateServiceConfigID(
      serviceConfigID,
      serviceConfigs
    );
    const serviceConfigFirstID = serviceConfigs[0]?.id;
    const id = serviceConfigURLID || serviceConfigFirstID;
    if (id) {
      const options = merge(OPTIONS_DEFAULTS, urlOptions);
      setSelectedOptions(options);
      onSelectServiceConfigId(id);
    }
  }, [
    accountsServiceConfigId,
    history,
    location.search,
    params.id,
    serviceConfigs,
  ]);

  useEffect(() => {
    if (playerData?.linkedAccounts) {
      setUnoUserData(playerData.linkedAccounts?.unoAccounts[0] || {});
      setPlayerAccounts(
        playerData.linkedAccounts?.accounts[0]?.linkedAccounts || []
      );
    }
  }, [playerData]);

  const onSelectAccount = useCallback(
    id => {
      if (id && id !== unoUserData.accountID) {
        setUnoUserData({});
        setPlayerURL({
          history,
          serviceConfigID: accountsServiceConfigId,
          options: selectedOptions,
          unoID: id,
        });
      }
    },
    [
      unoUserData.accountID,
      setUnoUserData,
      history,
      accountsServiceConfigId,
      selectedOptions,
    ]
  );

  const onSetServiceConfig = useCallback(
    ({ target: { value } }) => {
      setUnoUserData({});
      setPlayerURL({
        history,
        serviceConfigID: value,
        options: selectedOptions,
      });
    },
    [setUnoUserData, history, selectedOptions]
  );

  const handleSetGroupBy = useCallback(
    value => {
      setGroupBy(value);
      setTimeout(() => handleScrollToTop(), 500);
    },
    [setGroupBy]
  );

  const onToggleSections = useCallback(() => {
    setExpandAllSections(prev => !prev);
  }, [setExpandAllSections]);

  const onSetSelectedOptions = options => {
    setSelectedOptions(options);
    setPlayerURL({
      history,
      options,
      serviceConfigID: accountsServiceConfigId,
      unoID,
    });
  };

  return accountsServiceConfigId ? (
    <StatelessGameData
      accountsServiceConfigId={accountsServiceConfigId}
      expandAllSections={expandAllSections}
      groupBy={groupBy}
      highlightedOption={highlightedOption}
      onSelectAccount={onSelectAccount}
      onSetServiceConfig={onSetServiceConfig}
      onToggleSections={onToggleSections}
      playerAccounts={playerAccounts}
      playerDataLoading={playerDataLoading}
      playerBans={playerData?.player?.bans}
      selectedOptions={selectedOptions}
      serviceConfigs={serviceConfigs}
      setGroupBy={handleSetGroupBy}
      setHighlightedOption={setHighlightedOption}
      setSelectedOptions={onSetSelectedOptions}
      unoID={unoID}
      unoUserData={unoUserData}
    />
  ) : (
    <div className={styles.accountsErrorContainer}>
      {serviceConfigsError && (
        <ErrorMessageDisplay error={serviceConfigsError} />
      )}
      {playerError && <ErrorMessageDisplay error={playerError} />}
    </div>
  );
};

export default GameData;
