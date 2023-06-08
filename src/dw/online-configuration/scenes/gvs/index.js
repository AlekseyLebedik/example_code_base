import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useParams,
  useHistory,
  generatePath,
} from 'react-router-dom';
import {
  MuiThemeProvider,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';

import { usePrevious, useSnackbar } from 'dw/core/hooks';
import Loading from 'dw/core/components/BackdropLoading';
import Empty from 'dw/core/components/Empty';

import Configuration from './scenes/Configuration';
import Drafts from './scenes/Drafts';
import VariableDefinition from './scenes/VariableDefinition';
import Compare from './scenes/Compare';
import Groups from './scenes/Groups';
import Breadcrumbs from './components/Breadcrumbs';
import {
  BreadcrumbsContext,
  ConfigurationFiltersContext,
  CurrentDraftContext,
  RefetchQueries,
} from './context';
import { useDefinitions, useEnvScopeUri, useScopes } from './graphql/hooks';
import Provider from './graphql/provider';
import { urlPattern, gvsUrlPattern, SCENES } from './constants';

const getMuiTheme = scene =>
  createMuiTheme({
    palette: {
      primary: { main: scene === SCENES.GROUPS ? '#4ac0f1' : '#00a36c' },
    },
  });

const useStyles = makeStyles(theme => ({
  container: ({ scene }) => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    overflow: 'hidden',
    marginLeft: scene === SCENES.GROUPS ? 0 : theme.spacing(2),
    marginRight: scene === SCENES.GROUPS ? 0 : theme.spacing(2),
    '& .common__expander': {
      top: `${theme.spacing(4)}px !important`,
      zIndex: theme.zIndex.drawer,
    },
  }),
}));

export const GVSBase = () => {
  return (
    <Switch>
      <Route
        path={`${urlPattern}/gvs/configuration/:scopeURI/:population?`}
        component={Configuration}
      />
      <Route
        path={`${urlPattern}/gvs/:scene(${SCENES.DRAFTS})/:scopeURI/:draftId?`}
        component={Drafts}
      />
      <Route
        path={`${urlPattern}/gvs/:scene(${SCENES.EVENTS})/:scopeURI/:eventId?`}
        component={Drafts}
      />
      <Route
        path={`${urlPattern}/gvs/${SCENES.VARIABLE_DEFINITIONS}/:scopeURI`}
        component={VariableDefinition}
      />
      <Route
        path={`${urlPattern}/gvs/${SCENES.COMPARE}/:scopeURI`}
        component={Compare}
      />
      <Route
        path={`${urlPattern}/gvs/${SCENES.GROUPS}/:scopeURI`}
        component={Groups}
      />
    </Switch>
  );
};

export const GVS = () => {
  const [refetchQueries, setRefetchQueries] = useState([]);
  const [currentDraft, setCurrentDraft] = useState();
  const [configurationFilters, setConfigurationFilters] = useState([]);
  const refetchQueriesValue = useMemo(
    () => [refetchQueries, setRefetchQueries],
    [refetchQueries]
  );
  const currentDraftValue = useMemo(
    () => [currentDraft, setCurrentDraft],
    [currentDraft]
  );
  const configurationFiltersValue = useMemo(
    () => [
      configurationFilters,
      filters => setConfigurationFilters(filters || {}),
    ],
    [configurationFilters]
  );
  const [breadcrumbRef, setBreadcrumbRef] = useState();
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = useCallback(
    value =>
      setEditMode(currentValue =>
        value === undefined ? !currentValue : value
      ),
    [setEditMode]
  );
  const { scopeURI, ...params } = useParams();
  const classes = useStyles(params);
  const snackbar = useSnackbar();
  const [cachedScopeURI, setCachedScopeURI] = useState(scopeURI);
  const history = useHistory();
  const { loading, error, buildScopes } = useScopes();
  const { envScopeUri } = useEnvScopeUri();
  const prevEnvScopeURI = usePrevious(envScopeUri);
  useEffect(() => {
    if (error) snackbar.error('Something went wrong. See logs for details');
  }, [error]);
  const availableScopes = useMemo(
    () =>
      envScopeUri && buildScopes
        ? [envScopeUri, ...buildScopes.map(scope => scope.scopeURI)]
        : null,
    [envScopeUri, buildScopes]
  );
  useEffect(() => {
    if (scopeURI && scopeURI !== cachedScopeURI) setCachedScopeURI(scopeURI);
    let redirectUri;
    if (scopeURI) {
      if (availableScopes && !availableScopes.includes(scopeURI)) {
        [redirectUri] = availableScopes;
        // eslint-disable-next-line
        console.warn(
          `The ScopeURI ${scopeURI} can't be found. Fall back to the Title ScopeURI ${redirectUri}`
        );
      }
    } else if (cachedScopeURI) redirectUri = cachedScopeURI;
    else if (envScopeUri) redirectUri = envScopeUri;
    if (redirectUri) {
      history.push(
        generatePath(gvsUrlPattern, { ...params, scopeURI: redirectUri })
      );
    }
  }, [scopeURI, cachedScopeURI, envScopeUri, history, params, availableScopes]);
  const scopeOverride = useMemo(() => {
    if (SCENES.VARIABLE_DEFINITIONS === params.scene) {
      const [franchise, game] = envScopeUri ? envScopeUri.split(':') : [];
      return `${franchise}:${game}`;
    }
    if (SCENES.DRAFTS === params.scene) {
      return envScopeUri;
    }
    return undefined;
  }, [params.scene, envScopeUri]);
  useEffect(() => {
    toggleEditMode(false);
  }, [params.scene]);
  useDefinitions();
  if (error) {
    // eslint-disable-next-line
    console.log(error);
    return <Empty>Something went wrong. See logs for details.</Empty>;
  }
  if (loading) return <Loading open />;
  if (prevEnvScopeURI && prevEnvScopeURI !== envScopeUri) return null;
  if (!envScopeUri)
    return (
      <Empty>
        Game Variables Service is not properly configured for this title
        environment
      </Empty>
    );
  if (!scopeURI) return null; // useEffect will set it and redirect

  return (
    <MuiThemeProvider theme={getMuiTheme(params.scene)}>
      <ConfigurationFiltersContext.Provider value={configurationFiltersValue}>
        <CurrentDraftContext.Provider value={currentDraftValue}>
          <RefetchQueries.Provider value={refetchQueriesValue}>
            <BreadcrumbsContext.Provider
              value={{
                actionsContainer: breadcrumbRef,
                editMode: { enabled: editMode, toggle: toggleEditMode },
              }}
            >
              <div className={classes.container}>
                <Breadcrumbs
                  ref={setBreadcrumbRef}
                  scopeOverride={scopeOverride}
                  hideGameBuild={Boolean(scopeOverride)}
                  variant={params.scene === SCENES.COMPARE ? 'compact' : 'full'}
                />
                <GVSBase />
              </div>
            </BreadcrumbsContext.Provider>
          </RefetchQueries.Provider>
        </CurrentDraftContext.Provider>
      </ConfigurationFiltersContext.Provider>
    </MuiThemeProvider>
  );
};

export default () => {
  const { titleId, env } = useParams();
  const baseUrl = useMemo(
    () => `/online-configuration/${titleId}/${env}`,
    [titleId, env]
  );
  return (
    <Provider>
      <Switch>
        <Route path={gvsUrlPattern} component={GVS} />
        <Redirect to={`${baseUrl}/gvs/configuration`} />
      </Switch>
    </Provider>
  );
};
