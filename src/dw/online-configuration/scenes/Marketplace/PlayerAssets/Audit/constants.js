export const AUDIT_LOGS_PREFIX = 'online-configuration:MARKETPLACE:AUDIT_LOGS';

const dateTimeFormatter = params => params.context.formatDateTime(params.value);

export const columnDefs = [
  {
    headerName: 'UUID',
    field: 'uuid',
    cellRenderer: 'uuidRenderer',
    minWidth: 150,
  },
  {
    headerName: 'Event Type',
    field: 'event_type',
    minWidth: 270,
    cellRenderer: 'agGroupCellRenderer',
  },
  {
    headerName: 'Timestamp',
    field: 'timestamp',
    minWidth: 220,
    valueFormatter: dateTimeFormatter,
    sort: 'desc',
  },
  {
    headerName: 'Platform',
    field: 'platform',
    minWidth: 120,
    cellRenderer: 'platformRenderer',
  },
  {
    headerName: 'Account Type',
    field: 'account_type',
    minWidth: 120,
  },
  {
    headerName: 'Client ID',
    field: 'client_id',
    minWidth: 120,
  },
  {
    headerName: 'Client Transaction ID',
    field: 'client_transaction_id',
    minWidth: 300,
  },
  {
    headerName: 'First Party User ID',
    field: 'first_party_user_id',
    minWidth: 200,
    cellRenderer: 'linkedAccountsLinkRenderer',
  },
  {
    headerName: 'First Party Account Type',
    field: 'first_party_account_type',
    minWidth: 200,
  },
];

export const defaultColDef = {
  cellStyle: {
    height: '48px',
  },
};
