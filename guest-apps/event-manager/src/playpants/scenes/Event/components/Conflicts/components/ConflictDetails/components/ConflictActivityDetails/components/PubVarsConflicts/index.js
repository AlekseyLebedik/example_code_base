import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { getPubVarsConflicts } from 'playpants/scenes/Event/components/Conflicts/helpers';

import {
  CONFLICTS_COLUMN_DEFS,
  PUBVARS_CONFLICTS_COLUMNS,
  PUBVARS_NO_CONFLICTS_MSG,
} from '../../constants';

class PubVarsConflicts extends Component {
  static propTypes = {
    activity: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    details: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  onGridReady = ({ api }) => {
    this.gridApi = api;
    this.gridApi.sizeColumnsToFit();
  };

  render() {
    const { activity, classes, details } = this.props;
    const { variable_sets: variableSets } = JSON.parse(activity.activity);
    const rowData = getPubVarsConflicts(variableSets, details);

    return (
      <div className="ag-theme-material">
        <AgGridReact
          {...CONFLICTS_COLUMN_DEFS(
            classes,
            PUBVARS_CONFLICTS_COLUMNS,
            PUBVARS_NO_CONFLICTS_MSG
          )}
          onGridReady={this.onGridReady}
          rowData={rowData}
        />
      </div>
    );
  }
}

export default PubVarsConflicts;
