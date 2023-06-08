import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { plainProjectsSelector } from 'dw/core/helpers/title-env-selectors';
import { setTitleFromUnsafeSource } from 'dw/core/components/TitleSelector/actions';

import {
  selectAccountsServiceConfigId,
  parseQueryString,
  setClansURL,
  validateClanId,
  validateEnv,
} from './utils';
import {
  CONTEXT_INITIAL_STATE,
  ENV_SHORTTYPE_MAP,
  ENVS,
  QUERY_CONTEXT_INITIAL_STATE,
} from './constants';

export const ClansContext = createContext(CONTEXT_INITIAL_STATE);

const clanTitleIdSelector = createSelector(
  plainProjectsSelector,
  (_, params) => params,
  (projects, { env }) => {
    const titles = env
      ? projects.filter(
          p =>
            p.environment.shortType === ENV_SHORTTYPE_MAP[env] &&
            p.environment.options.clans_enabled
        )
      : [];
    return titles?.length ? titles[0].title.id : null;
  }
);

export const ACCOUNTS_SERVICE_CONFIG_QUERY = gql`
  query AccountsServiceConfigInfo {
    serviceConfigs(serviceType: "ACCOUNTSMANAGEMENT") {
      id
      name
    }
  }
`;

const ClansProvider = ({ children }) => {
  const [queryContext, setQueryContext] = useState(QUERY_CONTEXT_INITIAL_STATE);
  const { clanId, env } = queryContext;
  const history = useHistory();
  const location = useLocation();
  const titleId = useSelector(state => clanTitleIdSelector(state, { env }));
  const dispatch = useDispatch();
  const setTitleEnv = useCallback(
    (...args) => dispatch(setTitleFromUnsafeSource(...args)),
    [dispatch]
  );

  useEffect(() => {
    if (titleId && env) setTitleEnv(titleId, ENV_SHORTTYPE_MAP[env]);
  }, [titleId, env]);

  const { data: serviceConfigsData } = useQuery(ACCOUNTS_SERVICE_CONFIG_QUERY);
  const accountsServiceConfigId = useMemo(
    () => selectAccountsServiceConfigId(serviceConfigsData, env),
    [env, serviceConfigsData]
  );

  const handleUpdateContext = useCallback(
    (key, id) => {
      setQueryContext(prevState => ({ ...prevState, [key]: id }));
      const params = { history, clanId, env };
      setClansURL({ ...params, [key]: id });
    },
    [clanId, history, env]
  );

  const onSetEnv = useCallback(
    id => {
      if (id && id !== queryContext.env) handleUpdateContext('env', id);
    },
    [handleUpdateContext]
  );

  const onSelectClanId = useCallback(
    id => {
      if (id && id !== queryContext.clanId) handleUpdateContext('clanId', id);
    },
    [handleUpdateContext]
  );

  const onExternalClanIdOverride = useCallback(
    id => handleUpdateContext('clanId', id),
    [handleUpdateContext]
  );

  useEffect(() => {
    const search = parseQueryString(location.search);
    const clanURLID = validateClanId(search.clanId);
    const selectedEnv = validateEnv(search.env) || ENVS.PROD;
    if (clanURLID && selectedEnv) {
      setQueryContext({ clanId: clanURLID, env: selectedEnv });
      setClansURL({ history, clanId: clanURLID, env: selectedEnv });
    } else if (selectedEnv) onSetEnv(selectedEnv);
    else if (clanURLID) onSelectClanId(clanURLID);
  }, [clanId, history, location.search]);

  const value = useMemo(
    () => ({
      ...queryContext,
      accountsServiceConfigId,
      envs: ENVS,
      onExternalClanIdOverride,
      onSelectClanId,
      onSetEnv,
      titleId,
    }),
    [
      accountsServiceConfigId,
      onExternalClanIdOverride,
      onSelectClanId,
      onSetEnv,
      queryContext.clanId,
      queryContext.env,
      titleId,
    ]
  );

  return (
    <ClansContext.Provider value={value}>{children}</ClansContext.Provider>
  );
};

ClansProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClansProvider;
