import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';

import TextField from '@material-ui/core/TextField';

import { COLUMN_DEFINITIONS } from './constants';
import styles from './gridPresentational.module.css';

const StatelessPresentational = ({
  titleInfo,
  onGridReady,
  onFilterChange,
}) => (
  <div className={styles.container}>
    <div className={styles.partialSearchContainer}>
      <TextField
        onChange={e => onFilterChange(e.target.value)}
        label="Search Title Info ..."
        className={styles.partialSearch}
        InputProps={{ disableUnderline: true }}
      />
    </div>
    <div className={styles.agGridContainer}>
      <AgGridReact
        onGridReady={onGridReady}
        id="titleInfoGrid"
        columnDefs={COLUMN_DEFINITIONS}
        rowData={titleInfo}
        headerHeight={0}
        suppressCellFocus
        suppressRowTransform
        groupDisplayType="groupRows"
        groupDefaultExpanded={1}
        groupRowRendererParams={{ suppressCount: true }}
        suppressContextMenu
        getRowHeight={() => 35}
        enableCellTextSelection
      />
    </div>
  </div>
);

StatelessPresentational.propTypes = {
  titleInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGridReady: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default StatelessPresentational;
