export const columnDefs = [
  {
    headerName: 'Event',
    field: 'uno_id',
    cellRenderer: 'agGroupCellRenderer',
    headerComponentFramework: 'customHeader',
    valueGetter: params =>
      params.data.type === 'uno_log'
        ? 'Activision Account(Uno)'
        : 'Linked Account (Umbrella)',
  },
  {
    headerName: 'Action',
    field: 'action',
  },
  {
    headerName: 'Username',
    field: 'user_name',
  },
  {
    headerName: 'IP address',
    field: 'ip_address',
  },
  {
    headerName: 'Provider',
    field: 'provider',
  },
  {
    headerName: 'Acc ID | Sec Acc ID',
    field: 'account_id',
    cellRenderer: 'uuidRenderer',
    valueGetter: params => {
      if (
        params.data.account_id &&
        params.data.secondary_account_id &&
        params.data.account_id !== '0' &&
        params.data.secondary_account_id !== '0'
      )
        return `${params.data.account_id} | ${params.data.secondary_account_id}`;
      if (params.data.account_id && params.data.account_id !== '0')
        return params.data.account_id;
      if (
        params.data.secondary_account_id &&
        params.data.secondary_account_id !== '0'
      )
        return params.data.secondary_account_id;
      return null;
    },
  },
  {
    headerName: 'Umbrella ID',
    field: 'umbrella_id',
    // TODO: Disabling it for now. Will have to fix the URL before
    // cellRenderer: 'uuidRenderer',
  },
  {
    headerName: 'Uno ID',
    field: 'uno_id',
    cellRenderer: 'uuidRenderer',
  },
  {
    headerName: 'Date Time',
    field: 'dt',
    minWidth: 270,
    valueGetter: params => (params.data ? params.data.time_stamp : ''),
    sort: 'desc',
  },
  {
    headerName: 'Client ID',
    field: 'client',
  },
  {
    headerName: 'Title ID',
    field: 'title_id',
  },
];
