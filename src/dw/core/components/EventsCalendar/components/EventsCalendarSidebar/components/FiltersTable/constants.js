export const GRID_OPTIONS = {
  animateRows: true,
  autoGroupColumnDef: {
    cellRenderer: 'filtersTableCell',
    field: 'filterType',
    lockPosition: true,
    width: 275,
  },
  columnDefs: [{ field: 'filterPath', hide: true }],
  defaultColDef: {
    filter: true,
    sortable: true,
  },
  domLayout: 'autoHeight',
  getDataPath: data => data.filterPath,
  groupDefaultExpanded: 0,
  headerHeight: 0,
  rowHeight: 35,
  rowSelection: 'multiple',
  sideBar: false,
  suppressRowClickSelection: true,
  treeData: true,
};

export const GROUP_NAME_MAP = {
  abTesting: ' A/B Testing',
  cdl: 'Call of Duty League',
  criticalEvents: 'Critical Events',
  demonwareEvents: 'Demonware',
  eventManager: 'Event Manager',
  externalEvents: 'External',
  pmg: 'PMG COD Live Ops',
  generalComments: 'General Comments',
  informationalEvents: 'Informational',
};
