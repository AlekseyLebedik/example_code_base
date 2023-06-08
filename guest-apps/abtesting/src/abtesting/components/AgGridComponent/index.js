import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { AgGridReact } from 'ag-grid-react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { hasData } from 'dw/core/helpers/object';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';
import styles from './index.module.css';

import { COLUMNS } from './constants';
import { dispatchToProps } from '../ActionsPanel';

import {
  testNameRenderer,
  statusTableFieldRenderer,
  actionsRenderer,
} from './cellRenderers';

const components = {
  testNameRenderer,
  statusTableFieldRenderer,
  actionsRenderer,
};

const defaultColDef = {
  enableRowGroup: true,
  enablePivot: true,
  resizable: true,
  sortable: true,
  filter: true,
};

const getRowStyle = params => {
  if (params.data && params.data.environment === 'live') {
    return { backgroundColor: '#cfeae7' };
  }
  return null;
};

class AgGridComponent extends React.Component {
  state = {
    inputValue: '',
  };

  onGridReady = params => {
    this.gridApi = params.api;
    const searchFilter = queryString.parse(this.props.location.search);
    if (hasData(searchFilter)) {
      this.onFilterChange(searchFilter.q);
      this.setState({ inputValue: searchFilter.q });
    }
  };

  onFilterChange = value => {
    this.setState({ inputValue: value });
    this.gridApi.setQuickFilter(value);
    const url = this.props.location.pathname;
    if (value.length > 0) {
      window.history.replaceState(null, null, `${url}?q=${value}`);
    } else {
      window.history.replaceState(null, null, `${url}`);
    }
  };

  render() {
    return (
      <>
        <TextField
          onChange={e => this.onFilterChange(e.target.value)}
          value={this.state.inputValue}
          placeholder="Search within the rows below"
          style={{
            width: '100%',
            marginLeft: '20px',
            overflow: 'hidden',
          }}
          className={styles.partialSearch}
        />
        <div className={styles.table}>
          <AgGridReact
            reactNext
            columnDefs={COLUMNS}
            groupDefaultExpanded={-1}
            gridOptions={{
              context: {
                formatDate: this.props.formatDate,
                events: this.props.events,
              },
            }}
            suppressContextMenu
            getRowStyle={getRowStyle}
            onGridReady={this.onGridReady}
            groupDisplayType="groupRows"
            sideBar={{
              toolPanels: [
                {
                  id: 'columns',
                  labelDefault: 'Columns',
                  labelKey: 'columns',
                  iconKey: 'columns',
                  toolPanel: 'agColumnsToolPanel',
                },
              ],
              hiddenByDefault: false,
            }}
            rowGroupPanelShow="always"
            statusBar={{
              statusPanels: [
                {
                  statusPanel: 'agTotalRowCountComponent',
                  align: 'left',
                },
              ],
            }}
            defaultColDef={defaultColDef}
            rowData={this.props.rowData}
            enableCellTextSelection
            suppressDragLeaveHidesColumns
            components={components}
          />
        </div>
      </>
    );
  }
}

AgGridComponent.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.object),
  formatDate: PropTypes.func,
  events: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

AgGridComponent.defaultProps = {
  rowData: [],
  formatDate: null,
};

export default compose(
  withRouter,
  connect(null, dispatchToProps, null, { forwardRef: true })
)(AgGridComponent);
