import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import Tooltip from '@material-ui/core/Tooltip';
import Switch from '@material-ui/core/Switch';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import Empty from 'dw/core/components/Empty';

import { parseJSON } from 'playpants/helpers/json';
import { COLUMNS, LINE_HEIGHT, ROW_HEIGHT } from './constants';
import styles from './index.module.css';

export const ConfirmRemoveAccount = ({
  cancelOnBackdropClick,
  confirmMsg,
  deleteDestructive,
  disabled,
  onRemove,
  tooltip,
}) => (
  <ConfirmActionComponent
    cancelOnBackdropClick={cancelOnBackdropClick}
    confirm={{
      title: 'Confirm Remove',
      confirmMsg,
      mainButtonLabel: 'Remove',
      destructive: deleteDestructive,
    }}
    component="IconButton"
    onClick={onRemove}
    disabled={disabled}
    tooltip={tooltip || 'Remove'}
  >
    delete
  </ConfirmActionComponent>
);

ConfirmRemoveAccount.propTypes = {
  cancelOnBackdropClick: PropTypes.bool.isRequired,
  confirmMsg: PropTypes.string.isRequired,
  deleteDestructive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
};
ConfirmRemoveAccount.defaultProps = {
  disabled: false,
  tooltip: null,
};

const ToggleCell = ({ isHeader, onChange, value }) => (
  <Tooltip
    title={
      isHeader
        ? `Set all account's active status to ${!value}`
        : `Set account active status to ${!value}`
    }
  >
    <Switch
      {...(value && {
        classes: { track: styles.toggle, thumb: styles.toggle },
      })}
      checked={value}
      color="primary"
      onClick={() => onChange(!value)}
      value={value}
    />
  </Tooltip>
);

ToggleCell.propTypes = {
  isHeader: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
ToggleCell.defaultProps = { isHeader: false, value: false };

class UsersTable extends Component {
  static propTypes = {
    cancelOnBackdropClick: PropTypes.bool,
    deleteDestructive: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEdit: PropTypes.func.isRequired,
    onEditAll: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cancelOnBackdropClick: false,
    deleteDestructive: false,
  };

  state = { selectedRows: [] };

  componentDidMount() {
    window.addEventListener('resize', this.onResizeGrid);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResizeGrid);
  };

  onResizeGrid = () => this.gridApi && this.gridApi.sizeColumnsToFit();

  onDeleteSelected = () => {
    const { selectedRows } = this.state;
    this.setState({ selectedRows: [] }, () =>
      this.props.onRemove(selectedRows)
    );
  };

  onGridReady = ({ api, columnApi }) => {
    this.gridApi = api;
    this.columnApi = columnApi;
    this.onResizeGrid();
  };

  onSelectionChanged = ({ api }) => {
    const selectedRows = api.getSelectedRows();
    this.setState({ selectedRows });
  };

  toggleAccount = (active, data) => {
    this.props.onEdit(data.idx, active);
  };

  toggleAllAccounts = active => {
    this.props.onEditAll(active);
  };

  render() {
    const { cancelOnBackdropClick, deleteDestructive, items, onRemove } =
      this.props;
    const { selectedRows } = this.state;
    const allAccountsActive = items.some(a => a.active);

    return items.length > 0 ? (
      <div className={styles.usersTable}>
        <div className={styles.deleteSelectedBtn}>
          <ConfirmRemoveAccount
            cancelOnBackdropClick={cancelOnBackdropClick}
            confirmMsg={`Are you sure you want to remove ${
              selectedRows.length
            } ${
              selectedRows.length === 1 ? 'Account' : 'Accounts'
            } from the list?`}
            deleteDestructive={deleteDestructive}
            disabled={selectedRows.length === 0}
            onRemove={this.onDeleteSelected}
            tooltip={
              selectedRows.length > 0
                ? 'Remove Selected'
                : 'Select Accounts to Remove'
            }
          />
        </div>
        <TextField
          className={styles.searchTextfield}
          InputProps={{ classes: { root: styles.searchInput } }}
          fullWidth
          label="Search within the accounts in this group"
          onChange={e => this.gridApi.setQuickFilter(e.target.value)}
        />
        <AgGridReact
          colResizeDefault="shift"
          columnDefs={COLUMNS(allAccountsActive)}
          context={{ onRemove, deleteDestructive, cancelOnBackdropClick }}
          defaultColDef={{
            filter: 'agTextColumnFilter',
            sortable: true,
            resizable: true,
            menuTabs: ['filterMenuTab'],
            cellClass: () => styles.agCell,
          }}
          domLayout="autoHeight"
          components={{
            deleteColumnFormatter: ({ data }) => (
              <ConfirmRemoveAccount
                cancelOnBackdropClick={cancelOnBackdropClick}
                confirmMsg={`Are you sure you want to remove "${
                  data.name || data.username
                }" from the group?`}
                deleteDestructive={deleteDestructive}
                onRemove={() => onRemove([data])}
              />
            ),
            switchColumnFormatter: ({ value, data }) => (
              <ToggleCell
                value={value}
                onChange={e => this.toggleAccount(e, data)}
              />
            ),
            activeColumnHeader: ({ allAccountsActive: value }) => (
              <ToggleCell
                value={value}
                onChange={this.toggleAllAccounts}
                isHeader
              />
            ),
            linkedAccountsFormatter: ({ value }) => {
              let accountList = parseJSON(value) || [];
              accountList = accountList.filter(v => !v.startsWith('UNO'));
              return (
                <div className={styles.linkedAccountsContainer}>
                  {accountList
                    .map(line => (
                      <div className={styles.linkedAccountLine} key={line}>
                        {line}
                      </div>
                    ))
                    .reduce(
                      (prev, curr) =>
                        prev.length ? [...prev, ', ', curr] : [curr],
                      []
                    )}
                </div>
              );
            },
          }}
          onGridReady={this.onGridReady}
          rowHeight={ROW_HEIGHT}
          getRowHeight={params => {
            const lines = parseJSON(params.data.linked_accounts) || [];
            const len = lines.filter(
              v => !v.startsWith('UNO') && !v.startsWith('Umbrella')
            ).length;
            return ROW_HEIGHT + len * LINE_HEIGHT;
          }}
          onSelectionChanged={this.onSelectionChanged}
          rowData={items.map((item, idx) => ({ ...item, idx }))}
          rowSelection="multiple"
          suppressRowClickSelection
          suppressCellFocus
        />
      </div>
    ) : (
      <Empty emptyText="No Accounts" />
    );
  }
}

export default UsersTable;
