import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';
import Dialog from 'dw/core/components/Dialog';
import styles from './index.module.css';

const dialogStyles = {
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vw',
    maxWidth: '80vw',
  },
};

function nameComparator(valueA, valueB) {
  if (valueA && valueB) {
    return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
  }
  return null;
}

const SelectConfigModalPresentational = props => {
  const {
    visible,
    onCancel,
    onAddRowSelection,
    onFilterTextboxChange,
    onSelectionChanged,
    onGridReady,
    formatDateTime,
    classes,
  } = props;

  const COLUMNS = [
    {
      headerName: 'Name',
      field: 'name',
      checkboxSelection: true,
      sortable: true,
      comparator: nameComparator,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Created',
      field: 'created',
      sortable: true,
      valueFormatter: params => formatDateTime(params.value),
    },
    {
      headerName: 'Updated',
      field: 'updated',
      valueFormatter: params => formatDateTime(params.value),
      sortable: true,
      sort: 'desc',
      sortingOrder: ['asc', 'desc'],
    },
    {
      headerName: 'Service',
      field: 'serviceID',
      sortable: true,
      filter: true,
    },
  ];

  const footerButtons = [
    <Button key="cancel" label="Cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="update" color="primary" onClick={onAddRowSelection}>
      Add
    </Button>,
  ];

  return (
    <div className={styles.modalContainer}>
      <Dialog
        title="Select Config (Pre-sorted by Last Update)"
        actions={footerButtons}
        classes={{ paper: classes.dialogPaper }}
        contentStyle={{ overflowY: 'hidden' }}
        modal
        open={visible}
        onRequestClose={onCancel}
      >
        <TextField
          placeholder="Search Configs"
          className={styles.searchInput}
          onChange={e => onFilterTextboxChange(e.target.value)}
        />
        <div className={styles.table}>
          <AgGridReact
            columnDefs={COLUMNS}
            rowGroupPanelShow="always"
            suppressContextMenu
            groupDisplayType="groupRows"
            defaultColDef={{
              enableRowGroup: true,
            }}
            rowSelection="multiple"
            animateRows
            onGridReady={params => onGridReady(params)}
            statusBar={{
              statusPanels: [
                {
                  statusPanel: 'agTotalRowCountComponent',
                  align: 'left',
                },
              ],
            }}
            onSelectionChanged={onSelectionChanged}
            rowData={props.selectedConfigs}
            suppressDragLeaveHidesColumns
          />
        </div>
      </Dialog>
    </div>
  );
};

SelectConfigModalPresentational.propTypes = {
  visible: PropTypes.bool.isRequired,
  selectedConfigs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCancel: PropTypes.func.isRequired,
  onAddRowSelection: PropTypes.func.isRequired,
  onFilterTextboxChange: PropTypes.func.isRequired,
  onSelectionChanged: PropTypes.func,
  onGridReady: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

SelectConfigModalPresentational.defaultProps = {
  onSelectionChanged: () => {},
  classes: {},
};

export default withStyles(dialogStyles)(SelectConfigModalPresentational);
