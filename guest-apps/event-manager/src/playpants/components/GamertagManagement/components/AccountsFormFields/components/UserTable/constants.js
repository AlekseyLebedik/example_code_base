export const ROW_HEIGHT = 46;
export const LINE_HEIGHT = 20;

export const COLUMNS = allAccountsActive => [
  {
    checkboxSelection: true,
    field: '',
    headerCheckboxSelection: true,
    headerName: '',
    suppressMenu: true,
    suppressSizeToFit: true,
    width: 50,
  },
  {
    cellRenderer: 'switchColumnFormatter',
    field: 'active',
    headerComponent: 'activeColumnHeader',
    headerComponentParams: { allAccountsActive },
    headerName: '',
    suppressMenu: true,
    suppressSizeToFit: true,
    width: 80,
  },
  { field: 'account_id', headerName: 'UNO ID', minWidth: 100, maxWidth: 210 },
  { field: 'username', headerName: 'Username', minWidth: 100, maxWidth: 150 },
  {
    field: 'linked_accounts',
    headerName: 'Linked Accounts',
    minWidth: 250,
    suppressMenu: true,
    flex: 1,
    cellRenderer: 'linkedAccountsFormatter',
  },
  {
    cellRenderer: 'deleteColumnFormatter',
    headerName: '',
    suppressMenu: true,
    suppressSizeToFit: true,
    width: 80,
  },
];
