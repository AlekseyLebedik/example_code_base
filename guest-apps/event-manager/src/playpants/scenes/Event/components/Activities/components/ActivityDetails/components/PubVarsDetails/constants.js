export const GRID_OPTIONS = {
  defaultColDef: {
    editable: false,
    filter: true,
    menuTabs: ['filterMenuTab'],
    resizable: true,
    singleClickEdit: true,
    sortable: true,
  },
  onGridReady: params => {
    GRID_OPTIONS.gridApi = params.api;
    GRID_OPTIONS.gridApi.sizeColumnsToFit();
  },
  onGridSizeChanged: params => params.api.sizeColumnsToFit(),
  stopEditingWhenGridLosesFocus: true,
  suppressCellFocus: true,
  suppressNoRowsOverlay: true,
  suppressRowClickSelection: true,
  statusBar: {
    statusPanels: [
      {
        statusPanel: 'agTotalRowCountComponent',
        align: 'left',
      },
    ],
  },
};

export const variableTooltip = 'Namespace variable name';
export const liveValueTooltip =
  'Current live value, updated upon event publish';
export const oldValueTooltip = 'Live value prior to event start';
export const newValueTooltip =
  'Set value to change variable upon event publish';
