import styles from './index.module.css';

export const MAX_FILE_SIZE = 5000000; // max size in bytes

const COLUMNS = [
  {
    field: 'key',
    hide: true,
    sort: 'asc',
  },
  {
    field: 'group',
    rowGroup: true,
    hide: true,
  },
  {
    headerName: 'Input',
    field: 'input',
    cellRenderer: params => params.value || '',
    cellClass: styles.inputColumn,
  },
];

export const GRID_OPTIONS = {
  columnDefs: COLUMNS,
  getRowClass: params => params.node.level === 1 && styles.groupChildRow,
  suppressRowHoverHighlight: true,
  rowHeight: 70,
  suppressContextMenu: true,
  suppressDragLeaveHidesColumns: true,
  overlayNoRowsTemplate:
    '<span class="ag-overlay-loading-center">Please select a schema to load rows</span>',
  suppressRowClickSelection: true,
  suppressCellFocus: true,
  tabToNextCell: () => {},
  navigateToNextCell: () => {},
  deltaRowDataMode: true,
  getRowId: ({ data }) => data.key,
  animateRows: true,
  groupDefaultExpanded: -1,
  autoGroupColumnDef: {
    headerName: 'Variable',
    field: 'key',
    cellRendererParams: {
      suppressCount: true,
    },
  },
  defaultColDef: {
    sortable: true,
    filter: true,
  },
  onGridReady: params => {
    GRID_OPTIONS.gridApi = params.api;
    GRID_OPTIONS.gridApi.sizeColumnsToFit();
  },
  defaultGroupOrderComparator: (nodeA, nodeB) => {
    if (nodeA.key < nodeB.key) {
      return -1;
    }
    if (nodeA.key > nodeB.key) {
      return 1;
    }
    return 0;
  },
  domLayout: 'autoHeight',
};
