import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import FloatingButton from '../FloatingButton';

import styles from './index.module.css';

const InventoryComponents = props => {
  const { PlayerComponent, StoreComponent, searchInput, ...otherProps } = props;
  const [searchInputPlayer, setSearchInputPlayer] = useState(searchInput);
  const [searchInputStore, setSearchInputStore] = useState(searchInput);

  useEffect(() => {
    setSearchInputPlayer(searchInput);
    setSearchInputStore(searchInput);
  }, [searchInput]);

  const clearFilterPlayer = () => setSearchInputPlayer('');
  const clearFilterStore = () => setSearchInputStore('');

  return (
    <div className={styles.inventoryComponentsContainer}>
      <section className={styles.playerInventory}>
        {PlayerComponent && (
          <PlayerComponent {...otherProps} searchInput={searchInputPlayer} />
        )}
        <FloatingButton
          title="Clear Player filter"
          className={styles.playerClearFilter}
          onClick={clearFilterPlayer}
          hide={searchInputPlayer === ''}
        />
      </section>
      <section className={styles.storeInventory}>
        {StoreComponent && (
          <StoreComponent {...otherProps} searchInput={searchInputStore} />
        )}
        <FloatingButton
          title="Clear Store filter"
          className={styles.storerClearFilter}
          onClick={clearFilterStore}
          hide={searchInputStore === ''}
        />
      </section>
    </div>
  );
};

InventoryComponents.propTypes = {
  PlayerComponent: PropTypes.func,
  StoreComponent: PropTypes.func,
  searchInput: PropTypes.string,
};

InventoryComponents.defaultProps = {
  PlayerComponent: undefined,
  StoreComponent: undefined,
  searchInput: '',
};

export default InventoryComponents;
