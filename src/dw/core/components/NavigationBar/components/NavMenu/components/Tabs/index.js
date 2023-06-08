import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

const Tabs = props => (
  <div className={styles.TabsRoot}>
    <div className={styles.TabsFlexContainer}>{props.children}</div>
  </div>
);

Tabs.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Tabs;
