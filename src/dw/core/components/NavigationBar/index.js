import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import NavbarLayout from 'dw/core/components/NavbarLayout';

import NavMenu from './components/NavMenu';

import styles from './index.module.css';

const mapStateProps = state => ({
  featureSwitches: state.switches,
});
const isMainRouteFn = (path, routes) =>
  Object.values(routes)
    .filter(r => r.mainRoute)
    .some(
      r =>
        (path && path.indexOf(r.path) !== -1) ||
        (path && path.indexOf(r.navPath) !== -1)
    );

const getCurrentRoute = (path, routes) =>
  Object.values(routes).find(route => matchPath(path, route));

export const NavigationBar = ({
  location,
  routes,
  searchable,
  featureSwitches,
  RightNavComponent,
  classes,
}) => {
  const isMainRoute = isMainRouteFn(location.pathname, routes);
  const currentRoute = getCurrentRoute(location.pathname, routes);
  return (
    <NavbarLayout
      className={
        (classes && classes.navigationBarContainer) ||
        styles.navigationBarContainer
      }
    >
      <NavMenu
        isMainRoute={isMainRoute}
        routes={routes}
        featureSwitches={featureSwitches}
      />
      {RightNavComponent && (
        <RightNavComponent
          isMainRoute={isMainRoute}
          searchable={
            currentRoute === undefined || currentRoute.searchable === undefined
              ? searchable
              : currentRoute.searchable
          }
        />
      )}
    </NavbarLayout>
  );
};

NavigationBar.propTypes = {
  routes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  searchable: PropTypes.bool,
  featureSwitches: PropTypes.object,
  RightNavComponent: PropTypes.elementType,
  classes: PropTypes.object,
};

NavigationBar.defaultProps = {
  searchable: false,
  featureSwitches: undefined,
  RightNavComponent: undefined,
  classes: {},
};

export default compose(withRouter, connect(mapStateProps))(NavigationBar);
