import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';

import AGGrid from 'dw/core/components/AGGrid';
import Loading from 'dw/core/components/Loading';
import styles from './index.module.css';

const getTableDefinition = items => ({
  rowData: items,
  columnDefs: [
    {
      field: 'productName',
      rowGroup: true,
      sort: 'desc',
      hide: true,
    },
    {
      field: 'itemName',
      width: 200,
    },
    {
      field: 'type',
      width: 100,
    },
    {
      field: 'itemTags',
      headerName: 'Tags',
      valueFormatter: params => params.value && params.value.join(','),
    },
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 120,
    },
    {
      field: 'value',
      width: 120,
    },
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
  ],
  defaultColDef: {
    menuTabs: ['filterMenuTab', 'columnsMenuTab'],
  },
  defaultColGroupDef: {
    resizable: true,
    menuTabs: ['filterMenuTab', 'columnsMenuTab'],
  },
  autoGroupColumnDef: {
    sortable: true,
    headerName: 'Name',
    field: 'productName',
    lockPosition: true,
    resizable: true,
    width: 400,
    minWidth: 400,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox(params) {
        return params.node.group === true;
      },
    },
    headerCheckboxSelection: true,
  },
});

class ProductsListStateless extends Component {
  componentDidUpdate(prevProps) {
    const { searchInput } = this.props;
    if (prevProps.searchInput !== searchInput) {
      this.gridApi?.setQuickFilter(searchInput);
    }
  }

  componentWillUnmount() {
    if (this.gridApi) {
      this.gridApi.deselectAll();
    }
  }

  onGridReady = params => {
    this.gridApi = params.api;
    if (this.props.onGridReady) this.props.onGridReady(params);
  };

  render() {
    const { items, isLoading, onSelectItems, actionsRender, formatDate } =
      this.props;

    const tableDefinition = getTableDefinition(items);
    const ActionsComponent = actionsRender;
    return (
      <div className={classNames(styles.container, 'flex flex-col')}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ActionsComponent />
            <div
              className={classNames(
                styles.gridContainer,
                styles.table,
                styles.tableDark,
                'flex-grow'
              )}
            >
              <AGGrid
                columnDefs={tableDefinition.columnDefs}
                context={{ formatDateTime: formatDate }}
                gridOptions={{
                  autoGroupColumnDef: tableDefinition.autoGroupColumnDef,
                  defaultColDef: tableDefinition.defaultColDef,
                  rowHeight: 40,
                  suppressRowClickSelection: true,
                }}
                onGridReady={this.onGridReady}
                rowData={tableDefinition.rowData}
                onSelectionChanged={e => {
                  onSelectItems(uniqBy(e.api.getSelectedRows(), 'productID'));
                }}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

ProductsListStateless.propTypes = {
  isLoading: PropTypes.bool,
  onSelectItems: PropTypes.func.isRequired,
  items: PropTypes.array,
  actionsRender: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onGridReady: PropTypes.func,
  formatDate: PropTypes.func,
  searchInput: PropTypes.string,
};

ProductsListStateless.defaultProps = {
  items: [],
  isLoading: false,
  actionsRender: () => {},
  onGridReady: undefined,
  formatDate() {},
  searchInput: null,
};

export default ProductsListStateless;
