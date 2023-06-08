import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import Empty from 'dw/core/components/Empty';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import orderBy from 'lodash/orderBy';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import UnoAccountSelector from 'dw/player-tooling/components/UnoAccountSelector';
import ErrorMessageDisplay from 'dw/player-tooling/components/GraphQLStateRenderer/components/ErrorMessageDisplay';
import { usePrevious } from 'dw/core/hooks';
import SearchField from 'dw/core/components/AGGrid/components/SearchField';

import Details from '../../scenes/AccountAuditLog/components/Details';
import { useServiceConfigs } from '../../../player-tooling/components/UnoAccountSelector/components/ServiceConfigSelector';
import { LINKED_ACCOUNTS_QUERY } from '../../scenes/AccountAuditLog/queries';
import {
  PROVIDERS,
  KEY_PROVIDERS,
} from '../../scenes/AccountAuditLog/providers';

import styles from './index.module.css';

const queryClient = new QueryClient();

const AccountAuditLogContainer = () => {
  const { id: accountsServiceConfigId, error: serviceConfigError } =
    useServiceConfigs();
  const [unoID, setUnoID] = useState(null);
  const [accountID, setAccountID] = useState('');
  const [url] = useState('/player/accounts/');
  const [unoUserData, setUnoUserData] = useState({});
  const [gridApi, setGridApi] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [showSearchBox, onShowSearchBox] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [queryComplete, setQueryComplete] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('uno');

  const params = useParams();
  const { error: linkedAccountsError, data: linkedAccountsData } = useQuery(
    LINKED_ACCOUNTS_QUERY,
    {
      errorPolicy: 'all',
      skip: !accountsServiceConfigId || !unoID,
      variables: { accountsServiceConfigId, query: unoID, unoID },
    }
  );
  const formatDateTime = useSelector(formatDateTimeSelector);

  const onPlayerChange = useCallback(
    id => {
      if (id) {
        history.push({
          pathname: `/audit/account-audit-logs/${id || ''}`,
          search: location.search,
        });
      }
    },
    [history, location]
  );

  useEffect(() => {
    if (params.id !== unoID) setUnoID(params.id);
  }, [params.id]);

  useEffect(() => {
    if (linkedAccountsError) {
      setUnoUserData({});
      setAccountID('');
    }
    if (linkedAccountsData?.player?.linkedAccounts) {
      linkedAccountsData?.player?.linkedAccounts?.map(accounts => {
        if (accounts.accountType === 'uno') {
          setUnoUserData(accounts);
        }
        if (selectedProvider === accounts.accountType) {
          setAccountID(accounts.accountID);
        }
        return null;
      });
    }
  }, [linkedAccountsError, linkedAccountsData]);

  const onSelectAccount = useCallback(
    id => {
      if (id && id !== unoUserData.accountID) {
        setUnoUserData({});
        onPlayerChange(id);
        setRowData([]);
        setUnoID(id);
        setQueryComplete(false);
        onShowSearchBox(false);
      }
    },
    [unoUserData.accountID, accountsServiceConfigId, history]
  );
  const ProviderComponent = useCallback(
    () => (
      <Select
        labelId="provider"
        placeholder="Provider"
        onChange={e => setSelectedProvider(e?.target?.value)}
        value={selectedProvider}
        className={styles.dropDownProviderSelect}
      >
        {orderBy(
          PROVIDERS,
          [p => KEY_PROVIDERS.get(p.label), 'label'],
          ['asc']
        ).map(provider => (
          <MenuItem
            value={provider.value}
            key={provider.value}
            data-cy="providerOption"
          >
            {provider.label}
          </MenuItem>
        ))}
      </Select>
    ),
    [PROVIDERS, KEY_PROVIDERS, selectedProvider]
  );

  const prevServiceConfigId = usePrevious(accountsServiceConfigId);
  const prevSelectedProvider = usePrevious(selectedProvider);

  const handleOnGridReady = useCallback(gridParams => {
    setGridApi(gridParams.api);
    onShowSearchBox(true);
  }, []);

  useEffect(() => {
    if (
      prevServiceConfigId &&
      accountsServiceConfigId !== prevServiceConfigId
    ) {
      setUnoUserData({});
      onPlayerChange('');
      setAccountID('');
      setRowData([]);
      setQueryComplete(false);
    }
    if (prevSelectedProvider && selectedProvider !== prevSelectedProvider) {
      setUnoUserData({});
      onPlayerChange('');
      setUnoID(null);
      setAccountID('');
      setRowData([]);
      setQueryComplete(false);
    }
  }, [
    prevServiceConfigId,
    accountsServiceConfigId,
    selectedProvider,
    prevSelectedProvider,
  ]);

  // The above useEffect ensures that unoID is cleared when accountsServiceConfigId or selectedProvider changes
  // This aviods the case when looking for a player with wrong uno instance
  if (
    (prevServiceConfigId !== accountsServiceConfigId ||
      selectedProvider !== prevSelectedProvider) &&
    unoID
  )
    return null;

  const unoSelectProps = {
    accountsServiceConfigId,
    onSelectAccount,
    unoUserData,
    label:
      selectedProvider === 'uno'
        ? 'Activision (Uno) ID or Gamertag'
        : 'Account ID or Gamertag',
  };
  const emptyText =
    selectedProvider === 'uno'
      ? 'Enter Activision (Uno) ID or Gamertag'
      : 'Enter Account ID or Gamertag';

  return accountsServiceConfigId ? (
    <QueryClientProvider client={queryClient}>
      {linkedAccountsError ? (
        <div className={styles.errorContainer}>
          <ErrorMessageDisplay error={linkedAccountsError} />
        </div>
      ) : (
        <div className={styles.flexContainer}>
          <div className={styles.searchContainer}>
            <div className={styles.selector}>
              <UnoAccountSelector {...unoSelectProps} />
            </div>
            <ProviderComponent />
            <Tooltip title="Auditlog retains data for the last 90 days only">
              <Typography variant="subtitle2" className={styles.dataRetention}>
                (last 90 days)
              </Typography>
            </Tooltip>
            {showSearchBox && (
              <SearchField
                gridApi={gridApi}
                className={styles.searchBox}
                placeholder="Search Audit Log Events"
                autoFocus
              />
            )}
          </div>
          <div className={styles.agGridContainer}>
            {accountID && unoID ? (
              <Details
                accountID={accountID}
                provider={selectedProvider}
                context={{
                  formatDateTime,
                  url,
                  accountsServiceConfigId,
                }}
                handleOnGridReady={handleOnGridReady}
                rowData={rowData}
                setRowData={setRowData}
                queryComplete={queryComplete}
                setQueryComplete={setQueryComplete}
              />
            ) : (
              <Empty emptyText={emptyText} />
            )}
          </div>
        </div>
      )}
    </QueryClientProvider>
  ) : (
    <div className={styles.errorContainer}>
      {serviceConfigError && <ErrorMessageDisplay error={serviceConfigError} />}
    </div>
  );
};

export default AccountAuditLogContainer;
