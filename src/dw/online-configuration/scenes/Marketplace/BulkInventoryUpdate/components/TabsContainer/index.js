import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'dw/core/components/Tabs';
import StyledTab from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/components/StyledTab';

import styles from './index.module.css';

const TabsContainer = ({ value, tabs, onChange }) => (
  <Tabs
    className={styles.tabsContainer}
    value={value}
    onChange={onChange}
    indicatorColor="default"
    classes={{
      indicatorColorDefault: '#e8e8e8',
      indicatorRootDefault: styles.indicator,
    }}
  >
    {tabs.map(tab => (
      <StyledTab
        key={tab.name}
        value={tab.name}
        label={tab.label}
        classes={{
          root: styles.label,
        }}
      />
    ))}
  </Tabs>
);

TabsContainer.propTypes = {
  value: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TabsContainer;
