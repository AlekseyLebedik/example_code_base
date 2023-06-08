export const getColumns = checkbox => [
  checkbox
    ? {
        headerName: 'Entity ID',
        field: 'entityID',
        checkboxSelection: true,
        headerCheckboxSelection: true,
        minWidth: 350,
      }
    : {
        headerName: 'Entity ID',
        field: 'entityID',
        minWidth: 350,
      },
  {
    headerName: 'Rating',
    field: 'rating',
    valueGetter: params => Number(params.data?.rating),
    minWidth: 350,
  },
  {
    headerName: 'Entity Name',
    field: 'entityName',
    minWidth: 350,
  },
  {
    headerName: 'Update Time',
    field: 'updateTime',
    minWidth: 350,
    valueGetter: params =>
      params.context.formatDateTime(params.data?.updateTime),
  },
];

export const PAGINATION = {
  pageSize: 5,
};

export const SEARCH_DEFAULT_FIELD = {
  key: 'entityID',
  label: 'Entity ID',
  type: 'number',
  desc: 'Provide a numeric value, i.e 15608215294772418754',
  multi: true,
};
