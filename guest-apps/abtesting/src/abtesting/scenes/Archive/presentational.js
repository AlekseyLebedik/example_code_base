import React from 'react';
import PropTypes from 'prop-types';

// import TestsList from 'abtesting/components/TestsList';
import AgGridComponent from '../../components/AgGridComponent';

import styles from './presentational.module.css';

const Archive = ({ archivedTests, formatDateTime }) => (
  <div className={styles.archivedContainer}>
    <AgGridComponent rowData={archivedTests} formatDate={formatDateTime} />
  </div>
);

Archive.propTypes = {
  archivedTests: PropTypes.array.isRequired,
  formatDateTime: PropTypes.func.isRequired,
};

export default Archive;
