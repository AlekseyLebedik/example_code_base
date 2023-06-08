import React from 'react';
import PropTypes from 'prop-types';
import Empty from 'dw/core/components/Empty';
import PlayerTabsContainer from 'dw/online-configuration/components/PlayerTabsContainer';

import { useIsClanInventory } from './hooks';
import Inventory, { ClanInventory } from './Inventory';
import Audit from './Audit';
import Manage from './Manage';
import { tabs } from './constants';
import styles from './presentational.module.css';

export const tabComponentMap = {
  [tabs.inventory]: Inventory,
  [tabs.audit]: Audit,
  [tabs.manage]: Manage,
  'clan-inventory': ClanInventory,
};
const TABS = [
  { name: tabs.inventory, label: 'Inventory' },
  { name: tabs.audit, label: 'Audit' },
  { name: tabs.manage, label: 'Manage' },
];
const CLAN_TABS = [{ name: 'clan-inventory', label: 'Inventory' }];

const EmptyComponent = ({ isClan }) =>
  isClan ? (
    <Empty>Please enter Clan ID</Empty>
  ) : (
    <Empty>Please enter Player ID or Gamertag</Empty>
  );

EmptyComponent.propTypes = {
  isClan: PropTypes.bool,
};

EmptyComponent.defaultProps = {
  isClan: false,
};

const PlayerAssetsStateless = ({
  onSelectUser,
  onSelectTab,
  selectedTab,
  ...props
}) => {
  const isClan = useIsClanInventory();
  const Component = isClan
    ? tabComponentMap[`clan-${selectedTab}`]
    : tabComponentMap[selectedTab];
  return (
    <div className={styles.container}>
      <PlayerTabsContainer
        playerId={props.userId}
        onPlayerChange={onSelectUser}
        onTabChange={onSelectTab}
        tab={selectedTab}
        tabs={isClan ? CLAN_TABS : TABS}
      />

      {props.userId ? (
        <div className={styles.content}>
          {Component && <Component {...props} />}
        </div>
      ) : (
        <EmptyComponent isClan={isClan} />
      )}
    </div>
  );
};

PlayerAssetsStateless.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSelectUser: PropTypes.func,
  onSelectTab: PropTypes.func,
  selectedTab: PropTypes.string,
};

PlayerAssetsStateless.defaultProps = {
  userId: null,
  selectedTab: tabs.inventory,
  onSelectUser: () => {},
  onSelectTab: () => {},
};

export default PlayerAssetsStateless;
