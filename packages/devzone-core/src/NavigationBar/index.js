import React from 'react';
import PropTypes from 'prop-types';

import Portal from '@material-ui/core/Portal';
import * as helpers from './helpers';
import { NavbarChildrenContext } from './context';

import NavigationBar from './container';

const NavbarChildContainer = ({ children }) => (
  <NavbarChildrenContext.Consumer>
    {({ navbarChildrenContainer }) => (
      <Portal container={navbarChildrenContainer}>{children}</Portal>
    )}
  </NavbarChildrenContext.Consumer>
);
NavbarChildContainer.propTypes = {
  children: PropTypes.node,
};
NavbarChildContainer.defaultProps = {
  children: null,
};

export default NavigationBar;
export { helpers, NavbarChildContainer };
