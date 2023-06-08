import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import UnitLayout from 'dw/core/components/UnitLayout';
import CriticalError from 'dw/core/components/CriticalError';
import { ROUTES } from '../../routes';

// eslint-disable-next-line import/no-named-as-default
import { defaultRouteSelector } from './selectors';
import styles from './index.module.css';

const useStyles = theme => ({
  unitLayout: {
    width: '100%',
    height: `calc(100vh - ${get(
      theme,
      'navigationBar.height',
      0
    )}px) !important`,
    paddingTop: '0px !important',
  },
});

const App = props => {
  const routesValues = Object.values(ROUTES);
  const routes = routesValues.map(r => (
    <Route
      exact
      key={r.name}
      path={r.routePath || r.path}
      component={r.component}
    />
  ));
  const defaultRoute = defaultRouteSelector(routesValues);
  return (
    <div>
      <UnitLayout
        className={styles.unitLayout}
        classes={{ unitLayout: props.classes.unitLayout }}
      >
        <CriticalError>
          <Switch>
            {routes}
            <Redirect
              from="/abtesting/design"
              to="/abtesting/expy/test-catalog"
            />
            <Redirect
              from="/abtesting/expy"
              to="/abtesting/expy/test-catalog"
            />
            <Redirect
              to={(defaultRoute && defaultRoute.path) || '/abtesting/schedule'}
            />
          </Switch>
        </CriticalError>
      </UnitLayout>
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object,
};

App.defaultProps = {
  classes: {},
};

export default withStyles(useStyles)(App);
