import React from 'react';
import PropTypes from 'prop-types';

import CurrenciesTable from '../components/CurrenciesTable';
import ActionBar from '../components/ActionBar';
import styles from './presentational.module.css';

const StoreBalancesStateless = ({
  storeBalances,
  storeLabel,
  isLoading,
  formatDate,
  ...props
}) => (
  <div className={styles.container}>
    <ActionBar label={storeLabel} inventoryContext="store" />

    <div className={styles.gridContainer}>
      <CurrenciesTable
        isLoading={isLoading}
        data={storeBalances}
        inventoryContext="store"
        formatDate={formatDate}
        {...props}
      />
    </div>
  </div>
);

StoreBalancesStateless.propTypes = {
  storeBalances: PropTypes.array,
  storeLabel: PropTypes.string,
  isLoading: PropTypes.bool,
  formatDate: PropTypes.func,
};

StoreBalancesStateless.defaultProps = {
  storeBalances: [],
  storeLabel: '',
  isLoading: false,
  formatDate() {},
};

export default StoreBalancesStateless;
