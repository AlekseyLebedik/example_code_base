import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'dw/core/components/Tabs';
import styles from './index.module.css';

const StyledTab = props => (
  <Tab
    className={styles.tab}
    classes={{
      root: styles.tabLabelContainer,
      selected: styles.tabSelected,
      wrapper: styles.tabWrapper,
      ...props.classes,
    }}
    {...props}
  />
);

StyledTab.propTypes = {
  classes: PropTypes.object,
};

StyledTab.defaultProps = {
  classes: {},
};

export default StyledTab;
