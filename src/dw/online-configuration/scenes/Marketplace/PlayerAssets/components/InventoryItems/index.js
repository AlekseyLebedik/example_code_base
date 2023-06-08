import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import flatMap from 'lodash/flatMap';

import AGGrid from 'dw/core/components/AGGrid';
import Loading from 'dw/core/components/Loading';

import styles from './index.module.css';
import './index.css';

const invalidTableDefinitions = [
  {
    field: 'itemID',
    headerName: 'ID',
  },
  {
    field: 'quantity',
    headerName: 'Quantity',
  },
  {
    valueGetter: params =>
      (params.context.formatDateTime &&
        params.context.formatDateTime(params.data?.lastUpdate)) ||
      '',
    headerName: 'Last Updated',
  },
  {
    field: 'sourceType',
    headerName: 'Source Type',
  },
];
const getTableDefinition = (items, columnsDefs) => ({
  rowData: items,
  columnDefs: [
    {
      field: 'nameType',
      headerName: 'Type',
      filter: true,
      rowGroup: true,
    },
    {
      field: 'rarity',
      filter: true,
    },
    {
      field: 'itemTags',
      headerName: 'Tags',
      valueFormatter: params => params.value && params.value.join(','),
    },
    {
      field: 'itemID',
      headerName: 'ID',
      minWidth: 120,
    },
    ...columnsDefs,
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
    headerName: 'Name',
    lockPosition: true,
    field: 'itemName',
    resizable: true,
    sortable: true,
    width: 450,
    minWidth: 450,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
    headerCheckboxSelection: true,
    sort: 'asc',
  },
});

class InventoryItemsStateless extends Component {
  componentDidUpdate(prevProps) {
    const { searchInput } = this.props;
    if (prevProps.searchInput !== searchInput) {
      // eslint-disable-next-line
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
    const {
      items,
      columnsDefs,
      darkMode,
      onSelectItems,
      actionsRender,
      isLoading,
      checked,
      invalidItems,
      formatDate,
      searchInput,
    } = this.props;

    const tableDefinition = getTableDefinition(items, columnsDefs);
    const ActionsComponent = actionsRender;
    return (
      <div className={classNames(styles.container, 'flex flex-col')}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <ActionsComponent />
            <div
              className={
                (classNames(styles.stretchContainer, {
                  [styles.containerSeparator]: !darkMode,
                }),
                'flex-grow h-full')
              }
            >
              <div
                className={classNames(styles.gridContainer, styles.table, {
                  [styles.tableDark]: darkMode,
                })}
              >
                <AGGrid
                  columnDefs={
                    checked
                      ? invalidTableDefinitions
                      : tableDefinition.columnDefs
                  }
                  context={{ formatDateTime: formatDate }}
                  gridOptions={{
                    autoGroupColumnDef: tableDefinition.autoGroupColumnDef,
                    defaultColDef: tableDefinition.defaultColDef,
                    rowHeight: 40,
                  }}
                  onGridReady={this.onGridReady}
                  rowData={checked ? invalidItems : tableDefinition.rowData}
                  onSelectionChanged={e => {
                    let selectedRows = e.api.getSelectedRows();
                    if (
                      searchInput &&
                      this.gridApi &&
                      this.gridApi?.getModel()?.rootNode?.childrenAfterFilter
                        .length > 0
                    ) {
                      selectedRows = flatMap(
                        this.gridApi
                          ?.getModel()
                          ?.rootNode?.childrenAfterFilter.map(node =>
                            node.group ? node.childrenAfterFilter : node
                          )
                      )
                        .filter(node => node.selected)
                        .map(node => node.data);
                    }
                    onSelectItems(selectedRows);
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

InventoryItemsStateless.propTypes = {
  actionsRender: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  checked: PropTypes.bool,
  columnsDefs: PropTypes.arrayOf(PropTypes.object),
  darkMode: PropTypes.bool,
  formatDate: PropTypes.func,
  invalidItems: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  onGridReady: PropTypes.func,
  onSelectItems: PropTypes.func.isRequired,
  searchInput: PropTypes.string,
};

InventoryItemsStateless.defaultProps = {
  checked: false,
  isLoading: false,
  items: [],
  invalidItems: [],
  darkMode: false,
  columnsDefs: [
    {
      field: 'quantity',
      headerName: 'Units',
      width: 150,
      sortable: true,
    },
  ],
  actionsRender: () => {},
  searchInput: '',
  onGridReady: undefined,
  formatDate() {},
};

export default InventoryItemsStateless;
