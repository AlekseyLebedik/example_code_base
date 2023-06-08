import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { useIsClanInventory } from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/hooks';
import { useIsClanAchievements } from 'dw/online-configuration/scenes/Achievements/PlayerAchievements/hooks';
import PlayerSelector from '../PlayerSelector';
import ClanSelector from '../ClanSelector';

import styles from './index.module.css';

const PlayerTabsContainer = ({ tabs, tab, onTabChange, ...props }) => {
  const isClanInventory = useIsClanInventory();
  const isClanAchievements = useIsClanAchievements();
  return (
    <div className={styles.headerContainer}>
      {isClanInventory || isClanAchievements ? (
        <ClanSelector {...props} />
      ) : (
        <PlayerSelector {...props} />
      )}
      <Tabs
        classes={{
          root: styles.tabs,
          indicator: styles.tabsIndicator,
        }}
        value={tabs.findIndex(t => t.name === tab)}
        indicatorColor="primary"
        textColor="primary"
        onChange={(event, value) => onTabChange(tabs[value].name)}
      >
        {tabs.map(t => (
          <Tab
            key={t.name}
            label={t.label}
            classes={{
              root: styles.tab,
              textColorPrimary: styles.tabsTextColorPrimary,
              selected: styles.selectedTab,
            }}
          />
        ))}
      </Tabs>
    </div>
  );
};

PlayerTabsContainer.propTypes = {
  playerId: PropTypes.string,
  tab: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onPlayerChange: PropTypes.func.isRequired,
  onTabChange: PropTypes.func.isRequired,
};

PlayerTabsContainer.defaultProps = {
  playerId: undefined,
};

export default PlayerTabsContainer;
