const dateTimeFormatter = params => params.context.formatDateTime(params.value);

export const columnDefs = [
  {
    headerName: 'Achievement Name',
    field: 'name',
    lockPosition: true,
    minWidth: 270,
    cellRenderer: 'agGroupCellRenderer',
    checkboxSelection: params => params.context.hasDeletePermission,
    cellRendererParams: {
      innerRenderer: 'achievementsNameRenderer',
    },
  },
  {
    headerName: 'Status',
    field: 'status',
    minWidth: 120,
    filter: true,
    valueFormatter(params) {
      return params.value || 'N/A';
    },
  },
  {
    headerName: 'Progress',
    field: 'progress',
    minWidth: 120,
    valueGetter: params =>
      `${params.data?.progress || 0} / ${params.data?.progressTarget || 0}`,
  },
  {
    headerName: 'Type',
    field: 'noPlayerData',
    filter: true,
    valueGetter: params => (params.data?.noPlayerData ? 'Ruleset' : 'Player'),
    minWidth: 150,
  },
  {
    headerName: 'Activation Timestamp',
    field: 'activationTimestamp',
    minWidth: 220,
    valueFormatter: dateTimeFormatter,
  },
  {
    headerName: 'Expiration Timestamp',
    field: 'expirationTimestamp',
    minWidth: 220,
    valueFormatter: dateTimeFormatter,
  },
  {
    headerName: 'Kind',
    field: 'kind',
    filter: true,
    minWidth: 120,
  },
  {
    headerName: 'Times',
    field: 'completionCount',
    minWidth: 120,
  },
  {
    headerName: 'Achievement ID',
    field: 'id_',
    filter: true,
  },
  {
    headerName: 'Multi-Progress',
    field: 'multiProgress',
    minWidth: 200,
    cellRenderer: 'multiProgressRenderer',
    cellStyle: {
      lineHeight: '1.2em',
      overflowY: 'scroll',
    },
  },
];
