import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { joinPath } from 'dw/core/helpers/path';
import UnitLayout from 'dw/core/components/UnitLayout';
import { NAVBAR_HEIGHT } from '@demonware/devzone-core/constants';

import NavigationBar from '../NavigationBar';
import Dashboard from '../../scenes/Dashboard';
import FranchiseStats from '../../scenes/FranchiseStats';
import ProjectStats from '../../scenes/ProjectStats';

import styles from './index.module.css';

const useStyles = () => ({
  unitLayout: {
    width: '100%',
    height: `calc(100vh - ${NAVBAR_HEIGHT}px) !important`,
  },
});

const NavBar = baseUrl => () =>
  (
    <Switch>
      <Route
        path={joinPath(baseUrl, ':franchiseId', 'projects', ':projectId')}
        component={NavigationBar}
      />
      <Route
        path={joinPath(baseUrl, ':franchiseId')}
        component={NavigationBar}
      />
      <Route component={NavigationBar} />
    </Switch>
  );

const AppStateless = props => {
  const baseUrl = props.match.path;
  return (
    <UnitLayout
      className={styles.unitLayout}
      NavbarComponent={NavBar(baseUrl)}
      classes={{ unitLayout: props.classes.unitLayout }}
    >
      <Switch>
        <Route
          exact
          path={joinPath(baseUrl, ':franchiseId')}
          component={Dashboard}
        />
        <Route
          exact
          path={joinPath(
            baseUrl,
            ':franchiseId',
            'stats',
            ':statName',
            ':start',
            ':end'
          )}
          component={FranchiseStats}
        />
        <Route
          exact
          path={joinPath(baseUrl, ':franchiseId', 'stats', ':statName')}
          component={FranchiseStats}
        />
        <Route
          exact
          path={joinPath(baseUrl, ':franchiseId', 'stats')}
          component={FranchiseStats}
        />
        <Route
          exact
          path={joinPath(
            baseUrl,
            ':franchiseId',
            'projects',
            ':projectId',
            ':platform'
          )}
          component={ProjectStats}
        />
        <Route
          exact
          path={joinPath(baseUrl, ':franchiseId', 'projects', ':projectId')}
          component={ProjectStats}
        />
        {props.defaultId ? (
          <Redirect to={joinPath(baseUrl, props.defaultId)} />
        ) : (
          <Route path={baseUrl} component={Dashboard} />
        )}
      </Switch>
    </UnitLayout>
  );
};

AppStateless.propTypes = {
  match: PropTypes.object.isRequired,
  defaultId: PropTypes.number,
};

AppStateless.defaultProps = {
  defaultId: null,
};

export default withStyles(useStyles)(AppStateless);
