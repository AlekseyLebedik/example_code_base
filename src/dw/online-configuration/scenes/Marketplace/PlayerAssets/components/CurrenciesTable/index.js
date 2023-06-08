import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';

import AGGrid from 'dw/core/components/AGGrid';
import Loading from 'dw/core/components/Loading';

import styles from './index.module.css';
import './index.css';

const CurrenciesTable = ({
  selectable,
  data,
  extraColumns,
  inventoryContext,
  isLoading,
  isEditing,
  onGridReady,
  onSelectItems,
  formatDate,
  ...props
}) => {
  const columns = [
    {
      headerName: 'Currency ID',
      field: 'currencyID',
      headerCheckboxSelection: selectable,
      checkboxSelection: selectable,
    },
    {
      headerName: 'Code',
      field: 'currencyCode',
    },
    {
      headerName: 'Amount',
      field: 'signedBalance',
      minWidth: 200,
      cellRenderer: isEditing ? 'inputRenderer' : null,
    },
    ...extraColumns,
    {
      field: 'lastUpdate',
      headerName: 'Last Updated',
      valueFormatter: params =>
        (params.context.formatDateTime &&
          params.value &&
          params.context.formatDateTime(params.value)) ||
        '',
      filter: true,
    },
  ];
  return (
    <div
      className={classNames(
        styles.stretchContainer,
        styles.table,
        {
          [styles.containerSeparator]: inventoryContext === 'player',
        },
        'flex-grow'
      )}
    >
      {' '}
      {isLoading ? (
        <Loading />
      ) : (
        <AGGrid
          onGridReady={onGridReady}
          columnDefs={columns}
          context={{ formatDateTime: formatDate }}
          gridOptions={{
            defaultColDef: {
              menuTabs: ['filterMenuTab', 'columnsMenuTab'],
            },
            rowSelection: selectable ? 'multiple' : 'none',
            rowHeight: 40,
            suppressContextMenu: true,
            ...props,
          }}
          rowData={data}
          onSelectionChanged={e => {
            onSelectItems(uniqBy(e.api.getSelectedRows(), 'currencyID'));
          }}
        />
      )}
    </div>
  );
};

CurrenciesTable.propTypes = {
  isLoading: PropTypes.bool,
  selectable: PropTypes.bool,
  extraColumns: PropTypes.array,
  data: PropTypes.array,
  inventoryContext: PropTypes.string,
  isEditing: PropTypes.bool,
  onSelectItems: PropTypes.func,
  onGridReady: PropTypes.func,
  formatDate: PropTypes.func,
};

CurrenciesTable.defaultProps = {
  isLoading: false,
  selectable: false,
  extraColumns: [],
  data: [],
  inventoryContext: 'store',
  isEditing: false,
  onGridReady: undefined,
  onSelectItems() {},
  formatDate() {},
};

export default CurrenciesTable;
