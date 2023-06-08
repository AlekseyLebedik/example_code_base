export const AG_GRID_CONSTANTS = [
  {
    headerName: 'Username',
    field: 'username',
    minWidth: 150,
  },
  {
    headerName: 'User Type',
    field: 'userType',
    minWidth: 150,
  },
  {
    headerName: 'Category',
    field: 'category',
    minWidth: 300,
    flex: 2,
  },
  {
    headerName: 'Audit Context',
    field: 'auditContext',
  },
  {
    headerName: 'Context',
    field: 'context',
  },
  {
    headerName: 'Audit Title ID',
    field: 'auditTitleID',
  },
  {
    headerName: 'Title ID',
    field: 'titleID',
  },
  {
    headerName: 'Audit Env',
    field: 'auditEnv',
  },

  {
    headerName: 'Env',
    field: 'env',
  },
  {
    headerName: 'Entity ID',
    field: 'entityID',
  },
  {
    headerName: 'Entity Name',
    field: 'entityName',
  },
  {
    headerName: 'Source Name',
    field: 'sourceName',
  },
  {
    headerName: 'Extra',
    field: 'extra',
    minWidth: 500,
    flex: 4,
    cellRenderer: 'jsonRenderer',
    valueFormatter: params => JSON.stringify(params.value),
    cellStyle: {
      overflowY: 'auto',
      padding: '5px 0',
      margin: '0',
    },
  },
];
