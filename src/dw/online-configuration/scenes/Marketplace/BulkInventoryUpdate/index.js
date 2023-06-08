import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Portal from '@material-ui/core/Portal';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import Loading from 'dw/core/components/Loading';
import { hasData } from 'dw/core/helpers/object';
import { bulkInventoryUpdate as bulkInventoryUpdateApi } from 'dw/online-configuration/services/marketplace';

import { Items, Products, Currencies } from './components/Store';
import TabsContainer from './components/TabsContainer';
import PlayersSelector from './components/PlayersSelector';
import StatusTable from './components/StatusTable';
import Actions from './components/Actions';
import {
  MAIN_TABS,
  MAIN_TABS_NAMES,
  STORE_TABS,
  STORE_TABS_NAMES,
} from './constants';
import styles from './index.module.css';

const storeComponentsMap = {
  [STORE_TABS_NAMES.items]: Items,
  [STORE_TABS_NAMES.products]: Products,
  [STORE_TABS_NAMES.currencies]: Currencies,
};

const storeComponentsProps = {
  [STORE_TABS_NAMES.currencies]: { selectable: true },
};

const BulkInventoryUpdate = ({ match, history, location }) => {
  const [actionsContainer, setActionsContainer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [playersError, setPlayersError] = useState();
  const { tab, inventory_item: inventoryItem } = match.params;
  const [searchInput, onSearch] = useState('');
  const [selected, onSelectionChange] = useState([]);
  const [context, setContext] = useState();
  const dispatch = useDispatch();
  const showSuccess = useCallback(
    msg => {
      dispatch(GlobalSnackBarActions.show(msg, 'success'));
    },
    [dispatch]
  );
  const [storeGridConfig, setStoreGrid] = useState(null);

  const changeTab = useCallback(
    changes => {
      const params = {
        ...match.params,
        ...changes,
      };
      const url = `${generatePath(match.path, params)}${location.search}`;
      history.push(url);
      if (changes.inventory_item) {
        if (searchInput) onSearch('');
        if (selected.length > 0) onSelectionChange([]);
      }
    },
    [
      match,
      history,
      location,
      onSearch,
      onSelectionChange,
      searchInput,
      selected,
    ]
  );

  const onSubmit = useCallback(
    async value => {
      let idKey;
      let valueKey;
      switch (inventoryItem) {
        case STORE_TABS_NAMES.items:
          idKey = 'itemID';
          valueKey = 'quantity';
          break;
        case STORE_TABS_NAMES.products:
          idKey = 'productID';
          valueKey = 'quantity';
          break;
        case STORE_TABS_NAMES.currencies:
          idKey = 'currencyID';
          valueKey = 'amount';
          break;
        default:
      }
      const body = {
        players,
        [inventoryItem]: selected.map(item => ({
          [idKey]: item[idKey],
          [valueKey]: value,
        })),
      };
      await bulkInventoryUpdateApi(body, { context });
      showSuccess('Inventory update successfully scheduled.');
      onSelectionChange([]);
      if (storeGridConfig && storeGridConfig.api)
        storeGridConfig.api.deselectAll();
      changeTab({ tab: MAIN_TABS_NAMES.status });
    },
    [
      changeTab,
      context,
      inventoryItem,
      players,
      selected,
      showSuccess,
      storeGridConfig,
    ]
  );

  const currentTab = useMemo(() => MAIN_TABS.find(t => t.name === tab), [tab]);
  const currentStoreTab = useMemo(
    () => STORE_TABS.find(t => t.name === inventoryItem),
    [inventoryItem]
  );

  useEffect(() => {
    const changes = {};
    if (!tab) changes.tab = MAIN_TABS_NAMES.playersSelection;
    if (!inventoryItem) changes.inventory_item = STORE_TABS_NAMES.items;
    if (hasData(changes)) changeTab(changes);
  }, [tab, inventoryItem, changeTab]);

  const StoreComponent = useMemo(
    () => inventoryItem && storeComponentsMap[inventoryItem],
    [inventoryItem]
  );

  const storeComponentProps = useMemo(
    () => inventoryItem && storeComponentsProps[inventoryItem],
    [inventoryItem]
  );
  return tab && inventoryItem ? (
    <div className={styles.container}>
      {tab === MAIN_TABS_NAMES.playersSelection ? (
        <Portal container={actionsContainer}>
          <Actions
            selected={selected}
            players={players}
            playersError={playersError}
            tab={inventoryItem}
            onSubmit={onSubmit}
          />
        </Portal>
      ) : null}
      <div>
        <TabsContainer
          tabs={MAIN_TABS}
          value={currentTab?.name}
          onChange={(_, t) => changeTab({ tab: t })}
        />
        {tab === MAIN_TABS_NAMES.playersSelection ? (
          <PlayersSelector
            actionsContainerRef={setActionsContainer}
            setPlayers={setPlayers}
            setPlayersError={setPlayersError}
            setContext={setContext}
          />
        ) : null}
        {tab === MAIN_TABS_NAMES.status ? <StatusTable /> : null}
      </div>
      <div>
        <div className="flex flex-wrap items-end">
          <input
            placeholder="Search Inventory"
            value={searchInput}
            onChange={e => onSearch(e.target.value)}
            className={styles.searchField}
          />
          <TabsContainer
            tabs={STORE_TABS}
            value={currentStoreTab?.name}
            onChange={(_, t) => changeTab({ inventory_item: t })}
          />
        </div>
        <StoreComponent
          searchInput={searchInput}
          onSelectItems={onSelectionChange}
          onGridReady={setStoreGrid}
          externalActions
          {...storeComponentProps}
        />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

BulkInventoryUpdate.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default BulkInventoryUpdate;
