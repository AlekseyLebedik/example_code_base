import { YesNoFromBool } from 'dw/core/helpers/api-data-parser';

export const COLUMNS = [
  {
    headerName: 'UserID',
    field: 'userID',
    lockPosition: true,
    filter: 'agTextColumnFilter',
    menuTabs: ['filterMenuTab'],
  },
  {
    headerName: 'Username',
    field: 'username',
    cellRenderer: 'userLink',
    lockPosition: true,
    filter: 'agTextColumnFilter',
    menuTabs: ['filterMenuTab'],
  },
  {
    headerName: 'ConnectionID',
    field: 'connectionID',
    lockPosition: true,
    filter: 'agTextColumnFilter',
    menuTabs: ['filterMenuTab'],
  },
  {
    headerName: 'ConsoleID',
    field: 'consoleID',
    lockPosition: true,
    filter: 'agTextColumnFilter',
    menuTabs: ['filterMenuTab'],
  },
  {
    headerName: 'InternalAddr',
    field: 'internalAddr',
    lockPosition: true,
    filter: true,
    menuTabs: ['filterMenuTab'],
  },
  {
    headerName: 'ExternalAddr',
    field: 'externalAddr',
    lockPosition: true,
    filter: true,
    menuTabs: ['filterMenuTab'],
  },
  {
    headerName: 'Success',
    field: 'success',
    filter: true,
    lockPosition: true,
    menuTabs: ['filterMenuTab'],
    valueFormatter: params =>
      // If group row (params.value === undefined),
      // return undefined for value when in Success column
      // so Yes/No only shows for grouping and not also in
      // Success column
      params.value !== undefined
        ? YesNoFromBool(parseInt(params.value, 10))
        : undefined,
  },
];
