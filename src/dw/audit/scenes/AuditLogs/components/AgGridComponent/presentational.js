import React from 'react';
import PropTypes from 'prop-types';

import { AsyncAGGrid } from 'dw/core/components/AGGrid';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';
import { AG_GRID_CONSTANTS } from './constants';

import styles from './presentational.module.css';

const jsonRenderer = params => (
  <pre className={styles.json}>
    <code>{JSON.stringify(params.value, null, 4)}</code>
  </pre>
);
const components = {
  jsonRenderer,
};
const AggridPresentational = props => {
  const agGridColumns = [
    ...AG_GRID_CONSTANTS,
    {
      headerName: 'Timestamp',
      field: 'unixtime',
      minWidth: 200,
      flex: 1,
      valueGetter: params => {
        const { unixtime, unixtimeMillis } = params.data;
        let date = props.formatDateTime(unixtime);
        if (date === 'Invalid date') {
          // Try microseconds (correct according to schema)
          date = props.formatDateTime(Math.floor(unixtime / 1000000));
          if (date === 'Invalid date') {
            // Something wrong so we will use ES date instead
            return props.formatDateTime(Math.floor(unixtimeMillis / 1000));
          }
          return date;
        }
        return date;
      },
    },
  ];
  return (
    <div className={styles.table} data-cy="audit-logs-table">
      <AsyncAGGrid
        key={props.refreshKey}
        columnDefs={agGridColumns}
        gridOptions={{
          defaultColDef: { autoHeight: false },
          rowHeight: 100,
          suppressContextMenu: true,
          components,
          processCellForClipboard: params => {
            if (params.column.colDef.cellRenderer === 'jsonRenderer') {
              return JSON.stringify(params.value);
            }
            return params.value;
          },
        }}
        {...props}
      />
    </div>
  );
};

AggridPresentational.propTypes = {
  formatDateTime: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  refreshKey: PropTypes.string.isRequired,
};

export default AggridPresentational;
