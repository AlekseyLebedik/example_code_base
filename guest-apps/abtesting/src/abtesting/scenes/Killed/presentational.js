import React from 'react';
import PropTypes from 'prop-types';

import AgGridComponent from '../../components/AgGridComponent';

import styles from './presentational.module.css';

const Killed = ({ killedTests, formatDateTime }) => (
  <div className={styles.killedContainer}>
    <AgGridComponent rowData={killedTests} formatDate={formatDateTime} />
  </div>
);

Killed.propTypes = {
  killedTests: PropTypes.array.isRequired,
  formatDateTime: PropTypes.func.isRequired,
};

export default Killed;
