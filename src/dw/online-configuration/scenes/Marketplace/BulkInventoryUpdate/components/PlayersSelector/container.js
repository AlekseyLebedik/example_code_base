import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import endsWith from 'lodash/endsWith';
import { makeStyles } from '@material-ui/core/styles';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { PROVIDERS_MAP } from 'dw/online-configuration/scenes/constants';
import { getLinkedAccounts } from 'dw/online-configuration/services/linked_accounts';
import UserInput from 'dw/core/components/UserAutoComplete';
import { positiveInt } from 'dw/core/components/FormFields/validation';
import {
  changeRemoteProps as changeContextProps,
  resetRemoteProps as resetContextProps,
} from 'dw/online-configuration/components/ContextSelector/actions';
import { currentContextSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import { LINKED_ACCOUNTS_LOOKUP_TIMEOUT } from 'dw/config';

import styles from './index.module.css';

const MIN_ACCOUNTS_NUM = 5;

const isInteger = str => /^[1-9]\d+$/.test(str);

const useStyles = makeStyles(theme => ({
  error: {
    '& div': { color: theme.palette.error.main },
    '& textarea': {
      borderColor: `${theme.palette.error.main} !important`,
    },
  },
}));

export const getLinkedAccountsApi =
  provider =>
  ({ timeout, ...params }) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      const LOOKUP_TIMEOUT =
        timeout === undefined ? LINKED_ACCOUNTS_LOOKUP_TIMEOUT : timeout;
      let skip = false;
      const skipTimeout = setTimeout(() => {
        skip = true;
        // eslint-disable-next-line
        console.warn(
          `Accounts lookup terminated due to the timeout: ${Math.ceil(
            LOOKUP_TIMEOUT / 1000.0
          )}s. Your search criterias are to wide or there are no first party accounts matching.`
        );
      }, LOOKUP_TIMEOUT);
      const unoAccounts = [];
      let { q } = params;
      if (!isInteger(q) && !endsWith(q, '%')) q = `${q}%`;
      const loadAccounts = async nextPage => {
        const result = await getLinkedAccounts({
          ...params,
          q,
          provider: 'uno',
          nextPage,
        });
        const {
          data: { data: umbrellaAccounts, next: nextPageToken },
        } = result;
        umbrellaAccounts.forEach(umbrellaAccount => {
          const providerAccount = umbrellaAccount.accounts.find(
            a => a.provider === provider
          );
          if (providerAccount) {
            const unoAccount = umbrellaAccount.accounts.find(
              a => a.provider === 'uno'
            );
            if (unoAccount) {
              unoAccounts.push({
                userID: unoAccount.accountID,
                userName: unoAccount.username,
              });
            }
          }
        });
        return nextPageToken;
      };
      try {
        let nextPage = await loadAccounts();
        while (nextPage && unoAccounts.length < MIN_ACCOUNTS_NUM && !skip) {
          // eslint-disable-next-line
          nextPage = await loadAccounts(nextPage);
        }
        if (skipTimeout) clearTimeout(skipTimeout);
        resolve({
          data: {
            data: unoAccounts,
            nextPageToken: unoAccounts.length > 0 ? nextPage : undefined,
          },
        });
      } catch (e) {
        reject(e);
      }
    });

const BulkInventoryUpdate = ({
  setContext,
  setPlayers,
  setPlayersError,
  actionsContainerRef,
}) => {
  const classes = useStyles();
  const [rawPlayers, setRawPlayers] = useState('');
  const [rawError, setRawError] = useState(null);
  const [players, playersChange] = useState([]);
  const currentContext = useSelector(state =>
    currentContextSelector(state, {
      serviceName: Services.Marketplace,
      endpoint: ServiceEndpoints.Marketplace.inventoryBulkUpdate,
    })
  );
  const getAccountsApi = useCallback(
    params => {
      const provider = PROVIDERS_MAP[currentContext?.platform];
      return getLinkedAccountsApi(provider)(params);
    },
    [currentContext]
  );
  useEffect(() => {
    setContext(currentContext?.value);
  }, [currentContext, setContext]);
  const { id, env } = useParams();
  const context = [id, env].join(':');
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  useEffect(() => {
    dispatch(
      changeContextProps({
        variant: 'default',
        fontSize: 'slim',
        externalRef: containerRef.current,
      })
    );
    return function handleResetContextProps() {
      dispatch(resetContextProps());
    };
  }, [dispatch]);
  useEffect(() => {
    const playersList = rawPlayers
      .split('\n')
      .map(p => p.trim())
      .filter(Boolean);
    if (playersList.length > 0 && playersList.some(positiveInt)) {
      setRawError('Player ID should be positive integer');
      setPlayers([]);
      setPlayersError(true);
    } else {
      setRawError(null);
      setPlayers([...playersList, ...players]);
      setPlayersError(null);
    }
  }, [rawPlayers, players, setPlayers, setPlayersError]);
  return (
    <>
      <div className="flex flex-wrap items-center">
        <div className={styles.contextSelectorContainer} ref={containerRef} />
        <div ref={actionsContainerRef} />
      </div>
      <div className={classNames({ [classes.error]: rawError }, styles.raw)}>
        add newline separated UNO ids
        <textarea
          onChange={e => setRawPlayers(e.target.value)}
          value={rawPlayers}
          rows="4"
        />
        {rawError && <div>{rawError}</div>}
      </div>
      <UserInput
        key={currentContext?.value}
        className={styles.users}
        placeholder="or search for a player"
        onChange={playersChange}
        context={context}
        getAccountsApi={getAccountsApi}
        isMulti
      />
    </>
  );
};

BulkInventoryUpdate.propTypes = {
  setContext: PropTypes.func.isRequired,
  setPlayers: PropTypes.func.isRequired,
  setPlayersError: PropTypes.func.isRequired,
  actionsContainerRef: PropTypes.func.isRequired,
};

export default BulkInventoryUpdate;
