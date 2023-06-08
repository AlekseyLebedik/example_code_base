const COLUMNS = [
  {
    field: 'key',
    autoHeight: true,
  },
  {
    field: 'value',
    cellStyle: { 'white-space': 'normal', 'word-break': 'break-all' },
    autoHeight: true,
  },
];

export const GRID_OPTIONS = {
  columnDefs: COLUMNS,
  defaultColDef: { resizable: true },
  onColumnResized: params => {
    params.api.resetRowHeights();
  },
  onGridReady: params => {
    params.api.resetRowHeights();
    params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: params => {
    params.api.sizeColumnsToFit();
  },
  suppressCellFocus: true,
  suppressRowSelection: true,
};
