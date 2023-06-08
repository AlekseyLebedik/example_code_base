import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import queryString from 'query-string';
import { generatePath, withRouter } from 'react-router-dom';
import { Tabs } from 'dw/core/components/Tabs';
import debounce from 'lodash/debounce';

import {
  EDIT_MARKETPLACE_PLAYER_BALANCES,
  EDIT_MARKETPLACE_PLAYER_INVENTORY,
} from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { useCurrentEnvPermission } from 'dw/core/hooks';
import contextAwareService from 'dw/online-configuration/components/ContextSelector';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import CloneLoading from 'dw/core/components/BackdropLoading';
import PlayerItems from '../PlayerInventory';
import PlayerBalances from '../PlayerBalances';
import StoreItems from '../StoreItems';
import StoreProducts from '../StoreProducts';
import StoreBalances from '../StoreBalances';

import InputChecker from '../components/InputChecker';
import StyledTab from '../components/StyledTab';

import PlayerInventoryComponents from './components/InventoryComponents';
import ResetPlayerInventoryButton from './components/ResetPlayerInventoryButton';
import ClonePlayerInventoryButton from './components/ClonePlayerInventoryButton';
import RestorePlayerInventoryButton from './components/RestorePlayerInventoryButton';
import RefreshPlayerInventory from './components/RefreshPlayerInventory';
import { isClanSelector } from '../selectors';
import { subtabs } from '../constants';
import styles from './index.module.css';

export const subtabPlayerComponentMap = {
  [subtabs.items]: PlayerItems,
  [subtabs.products]: PlayerItems,
  [subtabs.currency]: PlayerBalances,
};

export const subtabStoreComponentMap = {
  [subtabs.items]: StoreItems,
  [subtabs.products]: StoreProducts,
  [subtabs.currency]: StoreBalances,
};

const Inventory = ({
  history,
  isClan,
  location,
  match,
  selectedSubtab,
  userId,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [cloneLoading, setCloneLoading] = useState(false);
  const [backupCreated, setCreatingBackup] = useState(false);
  const hasEditBalancesPermission = useCurrentEnvPermission(
    EDIT_MARKETPLACE_PLAYER_BALANCES
  );
  const hasEditInventoryPermission = useCurrentEnvPermission(
    EDIT_MARKETPLACE_PLAYER_INVENTORY
  );

  const updateQueryParams = debounce(value => {
    if (location) {
      const query = queryString.parse(location.search);
      if (query.q !== value) {
        query.q = value;
        history.replace({ ...location, search: queryString.stringify(query) });
      }
    }
  }, 50);

  useEffect(() => {
    const query = location?.search;
    const { q } = queryString.parse(query);
    if (q && q !== searchInput) {
      setSearchInput(q);
    }
  }, []);

  const onFilterTextBoxChanged = value => {
    setSearchInput(value);
    updateQueryParams(value);
  };

  const onSelectTab = (_, value) => {
    if (match.params.userId && match.params.subtab !== value) {
      const path = generatePath(match.path, {
        ...match.params,
        subtab: value,
        q: null,
      });
      history.push(path);
      setSearchInput('');
    }
  };

  return (
    <div className={styles.inventoryContainer}>
      <CloneLoading open={cloneLoading} />
      <div className={classNames(styles.filtersContainer)}>
        <input
          value={searchInput}
          className={styles.inventoryFilter}
          placeholder="Search Inventory"
          onChange={e => onFilterTextBoxChanged(e.target.value)}
          data-cy="search-inventory"
        />
        <div className={styles.refreshContainer}>
          {userId && <RefreshPlayerInventory userId={userId} />}
        </div>
        <Tabs
          className={styles.tabsContainer}
          value={selectedSubtab}
          onChange={onSelectTab}
          indicatorColor="default"
          classes={{
            indicatorColorDefault: '#e8e8e8',
            indicatorRootDefault: styles.indicator,
          }}
        >
          <StyledTab
            key={subtabs.items}
            value={subtabs.items}
            label="Items"
            classes={{
              root: styles.label,
            }}
            data-cy="item-tab-button"
          />
          <StyledTab
            key={subtabs.products}
            value={subtabs.products}
            label="Products"
            classes={{
              root: styles.label,
            }}
            data-cy="products-tab-button"
          />
          <StyledTab
            key={subtabs.currency}
            value={subtabs.currency}
            label="Currency"
            classes={{
              root: styles.label,
            }}
            data-cy="currency-tab-button"
          />
        </Tabs>
        {userId && !isClan && (
          <ResetPlayerInventoryButton
            playerId={userId}
            setCreatingBackup={setCreatingBackup}
            backupCreated={backupCreated}
          />
        )}
        {userId && !isClan && (
          <ClonePlayerInventoryButton
            playerId={userId}
            setCloneLoading={setCloneLoading}
          />
        )}
        {userId && !isClan && (
          <RestorePlayerInventoryButton
            playerId={userId}
            setCreatingBackup={setCreatingBackup}
            backupCreated={backupCreated}
          />
        )}
      </div>
      <div className={styles.inventoryContent}>
        {userId ? (
          <PlayerInventoryComponents
            PlayerComponent={subtabPlayerComponentMap[selectedSubtab]}
            StoreComponent={subtabStoreComponentMap[selectedSubtab]}
            userId={userId}
            hasEditPermission={
              ([subtabs.items, subtabs.products].includes(selectedSubtab) &&
                hasEditInventoryPermission) ||
              (selectedSubtab === subtabs.currency &&
                hasEditBalancesPermission) ||
              false
            }
            searchInput={searchInput}
            selectedComponent={selectedSubtab}
          />
        ) : (
          <InputChecker />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  isClan: isClanSelector(state, props),
});

Inventory.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  selectedSubtab: PropTypes.string,
  userId: PropTypes.string,
  isClan: PropTypes.bool.isRequired,
};

Inventory.defaultProps = {
  match: {},
  history: {},
  location: undefined,
  selectedSubtab: subtabs.items,
  userId: undefined,
};

export const InventoryComponent = withRouter(
  connect(mapStateToProps)(Inventory)
);
export default contextAwareService(
  Services.Marketplace,
  ServiceEndpoints.Marketplace.getPlayerItems,
  [],
  { serviceDependsOnUser: true, platformOnly: true }
)(InventoryComponent);

export const ClanInventory = contextAwareService(
  Services.Marketplace,
  ServiceEndpoints.Marketplace.getClanItems,
  [],
  false
)(InventoryComponent);
