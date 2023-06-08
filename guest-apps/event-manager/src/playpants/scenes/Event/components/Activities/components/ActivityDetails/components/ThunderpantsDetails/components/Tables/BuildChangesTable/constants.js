export const EDIT_BUILD_FORM_NAME = 'BuildParamsForm';

const COLUMNS = [
  {
    field: 'parameter',
    headerName: 'Parameter',
  },
  {
    field: 'currentValue',
    headerName: 'Current Value',
  },
  {
    field: 'newValue',
    headerName: 'New Value',
  },
  {
    field: 'server',
    headerName: 'Target',
  },
  {
    field: 'uid',
    headerName: 'UID',
  },
];

const autoSizeAll = params => {
  const allColumnIds = params.columnApi
    .getAllColumns()
    .map(column => column.colId);
  params.columnApi.autoSizeColumns(allColumnIds, false);
};

export const GRID_OPTIONS = {
  columnDefs: COLUMNS,
  defaultColDef: { resizable: true },
  onGridReady: params => {
    GRID_OPTIONS.api = params.api;
    GRID_OPTIONS.node = params.node;
    autoSizeAll(params);
  },
  onGridSizeChanged: params => autoSizeAll(params),
  suppressCellFocus: true,
};
