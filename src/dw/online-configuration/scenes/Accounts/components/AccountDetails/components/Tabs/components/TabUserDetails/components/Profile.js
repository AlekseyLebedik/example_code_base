import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import Typography from '@material-ui/core/Typography';

import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';

import { COLUMNS as ORIG_COLUMNS } from '../constants';
import styles from '../presentational.module.css';

class Profile extends Component {
  state = {
    hasSelection: false,
  };

  onDelete = () => {
    const selectedRows = this.gridApi.getSelectedRows();
    this.props.onDelete(
      this.props.profileType,
      selectedRows.map(row => row.key)
    );
    this.gridApi.deselectAll();
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  };

  onSelectionChanged = event => {
    this.setState({
      hasSelection: Boolean(event.api.getSelectedNodes().length),
    });
  };

  render() {
    const { profileType, data, canResetProfile } = this.props;
    const { hasSelection } = this.state;

    const COLUMNS = ORIG_COLUMNS.map(c =>
      c.field === 'userKey'
        ? {
            ...c,
            headerCheckboxSelection: canResetProfile,
            checkboxSelection: canResetProfile,
          }
        : c
    );

    return (
      <div className={styles.profileContainer}>
        <Typography variant="subtitle1">{`${profileType} Profile`}</Typography>
        <div className={styles.table}>
          <AgGridReact
            rowData={data}
            columnDefs={COLUMNS}
            onGridReady={this.onGridReady}
            rowSelection="multiple"
            onSelectionChanged={this.onSelectionChanged}
            suppressRowClickSelection
          />
          {canResetProfile && (
            <ConfirmActionComponent
              className={styles.deleteBtn}
              tooltip={`Reset selected keys in ${profileType} profile`}
              confirm={{
                title: 'Confirm Reset',
                confirmMsg: `
                  Are you sure you want to reset selected keys in ${profileType} profile?
              `,
                mainButtonLabel: 'Reset',
                destructive: true,
              }}
              component="IconButton"
              onClick={this.onDelete}
              disabled={!hasSelection}
            >
              clear
            </ConfirmActionComponent>
          )}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profileType: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  canResetProfile: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Profile;
