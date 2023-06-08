import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import './index.css';
import styles from './index.module.css';

function NavbarLayout({ children, className }) {
  return (
    <div className={classNames(styles.navbarLayout, className)}>
      <div className={styles.navbarLayoutContainer}>{children}</div>
    </div>
  );
}

NavbarLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

NavbarLayout.defaultProps = {
  className: null,
};

export default withRouter(NavbarLayout);
