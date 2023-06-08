import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import {
  CONFLICTS_COLUMN_DEFS,
  PUBOBJS_CONFLICTS_COLUMNS,
  PUBOBJS_NO_CONFLICTS_MSG,
} from '../../constants';

class PublisherObjectsConflicts extends Component {
  static propTypes = {
    activity: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    details: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  onGridReady = ({ api }) => {
    this.gridApi = api;
    this.gridApi.sizeColumnsToFit();
  };

  render() {
    const { activity, classes, details } = this.props;
    const { objects } = JSON.parse(activity.activity);
    const rowData = objects
      .map(obj => JSON.parse(obj))
      .filter(obj => details.find(detail => detail === obj.name));

    return (
      <div className="ag-theme-material">
        <AgGridReact
          {...CONFLICTS_COLUMN_DEFS(
            classes,
            PUBOBJS_CONFLICTS_COLUMNS,
            PUBOBJS_NO_CONFLICTS_MSG
          )}
          onGridReady={this.onGridReady}
          rowData={rowData}
        />
      </div>
    );
  }
}

export default PublisherObjectsConflicts;
