import React from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { getThunderpantsConflicts } from './helpers';

import {
  CONFLICTS_COLUMN_DEFS,
  THUNDERPANTS_CONFLICTS_COLUMNS,
  THUNDERPANTS_NO_CONFLICTS_MSG,
} from '../../constants';

const ThunderpantsConflicts = ({ activity, classes, details }) => {
  const onGridReady = ({ api }) => {
    const gridApi = api;
    gridApi.sizeColumnsToFit();
  };

  const rowData = getThunderpantsConflicts(
    JSON.parse(activity.activity),
    details
  );

  return (
    <div className="ag-theme-material">
      <AgGridReact
        {...CONFLICTS_COLUMN_DEFS(
          classes,
          THUNDERPANTS_CONFLICTS_COLUMNS,
          THUNDERPANTS_NO_CONFLICTS_MSG
        )}
        onGridReady={onGridReady}
        rowData={rowData}
      />
    </div>
  );
};

ThunderpantsConflicts.propTypes = {
  activity: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  details: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ThunderpantsConflicts;
