import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';

import { hasData } from 'dw/core/helpers/object';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { COLUMN_DEFS, DEFAULT_COL_DEF } from './constants';
import styles from './index.module.css';

const useStyles = () => ({
  error: {
    color: '#d0021b',
    paddingBottom: '5px',
  },
});

const RemoveMissedCheckbox = ({ value, onChange, errors, classes }) => {
  let rowDataItems;
  let rowDataBalances;

  const hasErrors = hasData(errors);
  if (!hasErrors) {
    return null;
  }
  const itemsBalancesError =
    errors.hasOwnProperty('items') || errors.hasOwnProperty('balances');

  if (errors.hasOwnProperty('items')) {
    rowDataItems = errors.items
      ?.split(',')
      .map(item => ({ name: item, category: 'Items' }));
  }

  if (errors.hasOwnProperty('balances')) {
    rowDataBalances = errors.balances
      ?.split(',')
      .map(balance => ({ name: balance, category: 'Balances' }));
  }

  return (
    <>
      {errors.hasOwnProperty('items') && (
        <div className={classes.error} style={{ marginBottom: '20px' }}>
          <span key="balances-msg-start">
            The following items and balances are missing from target store
          </span>
          <div
            className={classNames(
              styles.agGridTagsContainer,
              'ag-theme-material'
            )}
            data-cy="missing-objects-table"
          >
            <AgGridReact
              columnDefs={COLUMN_DEFS}
              rowData={rowDataItems.concat(rowDataBalances)}
              groupDisplayType="groupRows"
              debounceVerticalScrollbar
              defaultColDef={DEFAULT_COL_DEF}
              enableCellTextSelection
              suppressDragLeaveHidesColumns
              domLayout="autoHeight"
            />
          </div>
        </div>
      )}
      {itemsBalancesError && (
        <FormControlLabel
          control={
            <Checkbox value={value} onChange={onChange} color="primary" />
          }
          label="Remove from clone?"
        />
      )}
      {!itemsBalancesError &&
        Object.entries(errors).map(([key, val]) => (
          <div className={classes.error}>
            {key}: {val}
          </div>
        ))}
    </>
  );
};

RemoveMissedCheckbox.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

RemoveMissedCheckbox.defaultProps = {
  errors: undefined,
};

export default withStyles(useStyles)(RemoveMissedCheckbox);
