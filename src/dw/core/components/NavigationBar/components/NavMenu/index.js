import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';

import AdapterLink from 'dw/core/components/AdapterLink';
import AdapterNavLink from 'dw/core/components/AdapterNavLink';
import NavMenuTabs from './components/Tabs';

import styles from './index.module.css';

const NavMenu = ({ isMainRoute, routes, featureSwitches }) => {
  const renderMainEntries = entry => (
    <MenuItem
      to={entry.navPath || entry.path}
      key={entry.name}
      className={`mdl-layout__tab nav-${entry.name}`}
      activeClassName="is-active"
      component={AdapterNavLink}
    >
      {entry.title}
    </MenuItem>
  );

  const getMainNavs = () => {
    const entries = Object.values(routes).map(entry => {
      const isAvailable = featureSwitches[entry.featureCheck];
      return {
        ...entry,
        isAvailable,
      };
    });
    const mainEntries = entries.filter(
      r =>
        (r.mainRoute === true && r.isAvailable === true) ||
        (r.mainRoute === true && r.isAvailable === undefined)
    );
    return mainEntries.map(renderMainEntries);
  };

  const getMainNavMenu = () => (
    <div className="mdl-layout__tab-bar nav-menu">
      <NavMenuTabs>{getMainNavs()}</NavMenuTabs>
    </div>
  );

  const getBackToDefaultNav = () => (
    <div className={styles.backToDefault}>
      <AdapterLink to={Object.values(routes).find(r => r.default)}>
        <Icon>arrow_back</Icon> back
      </AdapterLink>
    </div>
  );

  return isMainRoute ? getMainNavMenu() : getBackToDefaultNav();
};

NavMenu.propTypes = {
  isMainRoute: PropTypes.bool.isRequired,
  routes: PropTypes.object,
};

NavMenu.defaultProps = {
  routes: {},
};

export default withRouter(NavMenu);
