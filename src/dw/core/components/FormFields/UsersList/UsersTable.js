import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Empty from 'dw/core/components/Empty';

import { COLUMNS, DeleteColumnFormatter } from './constants';
import styles from './index.module.css';

class UsersTable extends Component {
  state = {
    selectedRows: [],
  };

  onDeleteSelected = () => {
    const { selectedRows } = this.state;
    this.setState({ selectedRows: [] }, () =>
      this.props.onRemove(selectedRows)
    );
  };

  onGridReady = ({ api }) => {
    this.gridApi = api;
    this.gridApi.sizeColumnsToFit();
  };

  onSelectionChanged = ({ api }) => {
    const selectedRows = api.getSelectedRows();
    this.setState({ selectedRows });
  };

  render() {
    const {
      items,
      onRemove,
      excludeColumns,
      deleteDestructive,
      cancelOnBackdropClick,
    } = this.props;
    const { selectedRows } = this.state;
    return items.length > 0 ? (
      <div className={styles.usersTable}>
        <div className={styles.deleteSelectedBtn}>
          <ConfirmActionComponent
            component="IconButton"
            tooltip={selectedRows.length > 0 ? 'Remove Selected' : ''}
            onClick={this.onDeleteSelected}
            confirm={{
              title: 'Confirm Remove',
              confirmMsg: `Are you sure you want to remove ${
                selectedRows.length
              } ${selectedRows.length === 1 ? 'User' : 'Users'} from a list?`,
              mainButtonLabel: 'Remove',
              destructive: deleteDestructive,
            }}
            disabled={selectedRows.length === 0}
          >
            delete
          </ConfirmActionComponent>
        </div>
        <TextField
          label="Search within the users in this group"
          onChange={e => this.gridApi.setQuickFilter(e.target.value)}
          InputProps={{ classes: { root: styles.searchInput } }}
          fullWidth
        />
        <AgGridReact
          rowData={items.map((item, idx) => ({ ...item, idx }))}
          columnDefs={COLUMNS.filter(c => !excludeColumns.includes(c.field))}
          context={{ onRemove, deleteDestructive, cancelOnBackdropClick }}
          domLayout="autoHeight"
          components={{
            deleteColumnFormatter: DeleteColumnFormatter,
          }}
          defaultColDef={{
            filter: 'agTextColumnFilter',
            sortable: true,
            resizable: false,
            menuTabs: ['filterMenuTab'],
          }}
          onGridReady={this.onGridReady}
          rowSelection="multiple"
          onSelectionChanged={this.onSelectionChanged}
          suppressRowClickSelection
        />
      </div>
    ) : (
      <Empty emptyText="No Users" />
    );
  }
}

UsersTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemove: PropTypes.func.isRequired,
  excludeColumns: PropTypes.arrayOf(PropTypes.string),
  deleteDestructive: PropTypes.bool,
  cancelOnBackdropClick: PropTypes.bool,
};

UsersTable.defaultProps = {
  excludeColumns: [],
  deleteDestructive: false,
  cancelOnBackdropClick: false,
};

export default UsersTable;
