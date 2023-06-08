export const COLUMNS = [
  {
    headerName: 'Player ID',
    valueGetter: params => params.data?.metadata?.owner,
    cellRenderer: 'playerIdRenderer',
    checkboxSelection: true,
  },
  {
    headerName: 'Downloads Value',
    cellRenderer: 'editStatisticsRenderer',
    valueGetter: params => params.data?.statistics[0]?.value,
    width: 500,
  },
  {
    headerName: 'Other Stats Value',
    cellRenderer: 'otherStatisticsRenderer',
    field: 'statistics',
  },
  {
    headerName: 'Name',
    valueGetter: params => params.data?.metadata?.name,
    width: 900,
  },
  {
    headerName: 'Checksum',
    valueGetter: params => params.data?.metadata?.checksum,
    width: 350,
  },
  {
    headerName: 'Created',
    valueGetter: params =>
      params.context.formatDateTime(params.data?.metadata?.created),
    width: 450,
  },
  {
    headerName: 'Modified',
    valueGetter: params =>
      params.context.formatDateTime(params.data?.metadata?.modified),
    width: 450,
  },
  {
    headerName: 'Tags',
    cellRenderer: 'tagCellRenderer',
    valueGetter: params => params.data?.tags,
  },
  {
    headerName: 'Content Length',
    valueGetter: params => params.data?.metadata?.contentLength,
    width: 400,
  },

  {
    headerName: 'Extra Data',
    valueGetter: params => params.data?.metadata?.extraData,
    field: 'metadata.extraData',
    maxWidth: 250,
  },

  {
    headerName: 'Extra Data Size',
    valueGetter: params => params.data?.metadata?.extraDataSize,
    width: 250,
  },

  {
    headerName: 'Actions',
    field: 'action',
    width: 300,
    pinned: 'right',
    cellRenderer: 'downloadRenderer',
  },
];
