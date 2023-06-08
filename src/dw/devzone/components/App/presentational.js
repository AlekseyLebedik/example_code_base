import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';

import { makeStyles } from '@material-ui/core/styles';

import { Switch, Redirect, Route } from 'react-router-dom';
import WaitFor from 'dw/core/components/WaitFor';
import Profile from '@demonware/devzone-core/components/Profile';
import { NavigationBar } from '@demonware/devzone-core';

import 'antd/dist/antd.css';

import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';
import SwitchesReplica from 'dw/core/replicas/switches';
import ContentTypeReplica from 'dw/core/replicas/contentType';

import Error404 from 'dw/core/components/Error404';
import HijackPanel from '../HijackPanel';
import ReplicasProvider from '../ReplicasProvider';

import AppFailedInitialization from './components/AppFailedInitialization';
import AppInLimitedMode from './components/AppInLimitedMode';

import './presentational.css';

const switchesSelector = state => state.switches;
const profileSelector = state => get(state, 'user.profile.id');

function AppRoutes({ routes }) {
  const enabledRoutes = routes.filter(r => !r.disabled || r.loading);

  return (
    <Switch>
      {/* Default route */}
      <Redirect exact from="/" to="/online-configuration" />

      {/* Unit routes */}
      {enabledRoutes.map(({ path, component }) => (
        <Route key={path} path={path} component={component} />
      ))}

      {/* Catch all */}
      <Route component={Error404} />
    </Switch>
  );
}

AppRoutes.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    ...theme.typography.body2,
    ...theme.globalTypography,
  },
}));

function StatelessApp({ criticalFetchFailed, limitedMode, routes }) {
  window.onbeforeunload = null;
  const classes = useStyles();
  return (
    <ReplicasProvider>
      <UserReplica.ConnectedReplica />
      <PermissionsReplica.ConnectedReplica />
      <SwitchesReplica.ConnectedReplica />
      <ContentTypeReplica.ConnectedReplica />
      <WaitFor selectors={[switchesSelector, profileSelector]} showLoading>
        <div className={classes.root}>
          <HijackPanel />
          {limitedMode && <AppInLimitedMode />}

          {(criticalFetchFailed && <AppFailedInitialization />) || (
            <>
              <NavigationBar ProfileComponent={Profile} showSubnav />
              <AppRoutes routes={routes} />
            </>
          )}
        </div>
      </WaitFor>
    </ReplicasProvider>
  );
}

StatelessApp.propTypes = {
  criticalFetchFailed: PropTypes.bool.isRequired,
  limitedMode: PropTypes.bool.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object),
};

StatelessApp.defaultProps = {
  routes: [],
};

export default StatelessApp;
