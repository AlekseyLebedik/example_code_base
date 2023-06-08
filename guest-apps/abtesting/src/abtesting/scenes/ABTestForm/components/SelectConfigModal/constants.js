export const FORM_NAME = 'abtesting__select-modal';

export const COLUMNS = [
  {
    headerName: 'Name',
    field: 'name',
    checkboxSelection: true,
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Created',
    field: 'created',
  },
  {
    headerName: 'Updated',
    field: 'updated',
    sortable: true,
  },
  {
    headerName: 'Service',
    field: 'serviceID',
    filter: true,
  },
];
