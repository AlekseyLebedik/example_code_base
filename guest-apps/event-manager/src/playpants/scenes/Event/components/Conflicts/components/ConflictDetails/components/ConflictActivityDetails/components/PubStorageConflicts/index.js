import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { filesSelector } from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/FileStorage/selectors';

import {
  CONFLICTS_COLUMN_DEFS,
  PUBSTORAGE_CONFLICTS_COLUMNS,
  PUBSTORAGE_NO_CONFLICTS_MSG,
} from '../../constants';

export class PubStorageConflicts extends Component {
  static propTypes = {
    activity: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    details: PropTypes.arrayOf(PropTypes.string).isRequired,
    fileInfo: PropTypes.object,
  };

  static defaultProps = {
    fileInfo: {},
  };

  onGridReady = ({ api }) => {
    this.gridApi = api;
    this.gridApi.sizeColumnsToFit();
  };

  render() {
    const {
      activity: { activity },
      classes,
      details,
      fileInfo,
    } = this.props;
    const { files } = JSON.parse(activity);
    const rowData = files
      .map(fileId => fileInfo[String(fileId)])
      .filter(fileDetail =>
        details.find(fname => fileDetail && fname === fileDetail.filename)
      );

    return (
      <div className="ag-theme-material">
        <AgGridReact
          {...CONFLICTS_COLUMN_DEFS(
            classes,
            PUBSTORAGE_CONFLICTS_COLUMNS,
            PUBSTORAGE_NO_CONFLICTS_MSG
          )}
          onGridReady={this.onGridReady}
          rowData={rowData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fileInfo: filesSelector(state),
});

export default connect(mapStateToProps)(PubStorageConflicts);
