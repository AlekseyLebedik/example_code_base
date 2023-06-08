export const columnDefs = [
  {
    headerName: 'Status',
    field: 'status',
    cellRenderer: 'statusRenderer',
    filter: 'agTextColumnFilter',
    floatingFilterComponent: 'statusFilter',
    suppressMenu: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    headerName: 'Name',
    field: 'name',
    cellStyle: { fontWeight: 'bold' },
    filter: 'agTextColumnFilter',
    floatingFilterComponent: 'inputFilter',
    suppressMenu: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    headerName: 'Owner',
    field: 'owner',
    cellRenderer: params => params.value || 'None',
    filter: 'agTextColumnFilter',
    floatingFilterComponent: 'inputFilter',
    suppressMenu: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    headerName: 'Start Date',
    field: 'dateStart',
    cellRenderer: 'dateRenderer',
    filter: false,
    suppressMenu: true,
  },
  {
    headerName: 'End Date',
    field: 'dateEnd',
    cellRenderer: 'dateRenderer',
    filter: false,
    suppressMenu: true,
  },
  {
    headerName: 'Approvers',
    field: 'approvers',
    cellRenderer: 'approverRenderer',
    cellStyle: { display: 'flex', alignItems: 'center' },
    suppressMenu: true,
    filter: false,
    // filter: 'agTextColumnFilter',
    // floatingFilterComponent: 'inputFilter',
    // floatingFilterComponentParams: {
    //   suppressFilterButton: true,
    // },
  },
  {
    headerName: 'Title',
    field: 'title',
    cellRenderer: params => params.value || 'None',
    filter: 'agTextColumnFilter',
    floatingFilterComponent: 'titleFilter',
    suppressMenu: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
  {
    headerName: 'Categories',
    field: 'categories',
    cellRenderer: 'badgeRenderer',
    filter: 'agTextColumnFilter',
    floatingFilterComponent: 'categoriesFilter',
    suppressMenu: true,
    floatingFilterComponentParams: {
      suppressFilterButton: true,
    },
  },
];

export const defaultColDef = {
  sortable: true,
  filter: true,
  suppressMovable: true,
  suppressCellFlash: true,
  resizable: true,
  floatingFilter: true,
};
