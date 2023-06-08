import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-enterprise';

import LoadingStatusBarComponent from './components/LoadingStatusBarComponent';
import WarningStatusBarComponent from './components/WarningStatusBarComponent';
import RowsCountStatusBarComponent from './components/RowsCountStatusBarComponent';
import FilteredStatusBarComponent from './components/FilteredStatusBarComponent';

import styles from './presentational.module.css';

const getGridOptions = (gridOptions = {}) => {
  const newOptions = {
    ...gridOptions,
  };
  if (!newOptions.components) {
    newOptions.components = {};
  }
  if (!newOptions.statusBar) {
    newOptions.statusBar = {};
  }
  if (!newOptions.statusBar.statusPanels) {
    newOptions.statusBar.statusPanels = [];
  }
  return newOptions;
};

const StatelessComponent = ({
  ActionButtonComponent,
  actionButtonComponentProps,
  className,
  columnDefs,
  dataCy,
  extraFields,
  gridOptions,
  header,
  inputValue,
  onFilterChange,
  searchPlaceHolder,
  useQuickFilter,
  searchProps,
}) => {
  const {
    components,
    statusBar: { statusPanels, ...statusBar },
    ...newGridOptions
  } = getGridOptions(gridOptions);
  return (
    <div className={styles.AsyncContainer}>
      <div className={styles.headerContainer}>
        {header && <div className={styles.header}>{header}</div>}
        {useQuickFilter && (
          <TextField
            {...searchProps}
            onChange={e => onFilterChange(e.target.value)}
            value={inputValue}
            placeholder={searchPlaceHolder}
            className={styles.filter}
            InputProps={
              inputValue
                ? {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => onFilterChange('')}>
                          <Icon>close</Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }
                : undefined
            }
            data-cy="tableFilter"
          />
        )}
        {ActionButtonComponent && (
          <ActionButtonComponent {...actionButtonComponentProps} />
        )}
      </div>
      <div className={classNames(styles.table, className)} data-cy={dataCy}>
        <AgGridReact
          columnDefs={
            extraFields.length > 0 ? columnDefs.concat(extraFields) : columnDefs
          }
          statusBar={{
            statusPanels: [
              {
                statusPanel: 'rowsCountStatusBarComponent',
                align: 'left',
                key: 'rowsCountStatusBarComponent',
              },
              {
                statusPanel: 'warningStatusBarComponent',
                align: 'left',
                key: 'warningStatusBarComponent',
              },
              {
                statusPanel: 'filteredStatusBarComponent',
                align: 'center',
              },
              {
                statusPanel: 'loadingStatusBarComponent',
                align: 'right',
                key: 'loadingStatusBarComponent',
              },
              ...statusPanels,
            ],
            ...statusBar,
          }}
          components={{
            warningStatusBarComponent: WarningStatusBarComponent,
            loadingStatusBarComponent: LoadingStatusBarComponent,
            rowsCountStatusBarComponent: RowsCountStatusBarComponent,
            filteredStatusBarComponent: FilteredStatusBarComponent,
            ...components,
          }}
          {...newGridOptions}
        />
      </div>
    </div>
  );
};

StatelessComponent.propTypes = {
  ActionButtonComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),
  actionButtonComponentProps: PropTypes.object,
  className: PropTypes.string,
  columnDefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataCy: PropTypes.string,
  extraFields: PropTypes.arrayOf(PropTypes.object),
  gridOptions: PropTypes.object,
  header: PropTypes.string,
  inputValue: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  searchPlaceHolder: PropTypes.string,
  useQuickFilter: PropTypes.bool,
  searchProps: PropTypes.object,
};
StatelessComponent.defaultProps = {
  ActionButtonComponent: undefined,
  actionButtonComponentProps: undefined,
  className: undefined,
  dataCy: undefined,
  extraFields: [],
  gridOptions: undefined,
  header: undefined,
  inputValue: '',
  searchPlaceHolder: 'Search within the rows below',
  useQuickFilter: true,
  searchProps: {},
};

export default StatelessComponent;
