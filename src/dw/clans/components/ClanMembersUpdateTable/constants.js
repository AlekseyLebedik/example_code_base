const PLAYER_COLUMN = {
  headerName: 'Player',
  field: 'player',
  checkboxSelection: true,
  filter: 'agTextColumnFilter',
  cellRendererSelector: params =>
    params.node.rowPinned
      ? { component: 'pinnedRowPlayerRenderer' }
      : { component: 'playerCellRenderer' },
  minWidth: 300,
};

const PLAYER_DETAILS_COLUMNS = [
  {
    headerName: 'Role',
    field: 'role',
    cellRendererSelector: params =>
      params.node.rowPinned
        ? { component: 'pinnedRowRoleRenderer' }
        : undefined,
  },
  {
    headerName: 'Member Since',
    field: 'memberSince',
    valueFormatter: params => params.context.formatDateTime(params.value),
  },
  {
    headerName: 'Last Updated',
    field: 'lastUpdated',
    valueFormatter: params => params.context.formatDateTime(params.value),
    sortingOrder: ['asc', 'desc'],
    sort: 'desc',
  },
  {
    field: 'actions',
    width: 140,
    maxWidth: 140,
    cellRenderer: 'actionsRenderer',
    onCellClicked: null,
    pinned: 'right',
    cellStyle: { 'text-align': 'center' },
  },
];

export const MEMBERS_COLUMNS = [PLAYER_COLUMN, ...PLAYER_DETAILS_COLUMNS];

const CLAN_COLUMN = {
  headerName: 'Current Clan',
  valueGetter: params =>
    params.data.clan
      ? `${params.data.clan?.id} | ${params.data.clan?.name}`
      : null,
};

export const FAILED_MEMBERS_COLUMNS = [
  PLAYER_COLUMN,
  CLAN_COLUMN,
  ...PLAYER_DETAILS_COLUMNS,
];

export const PINNED_ROW_DEFAULT = {
  player: { userID: '', username: '', accountType: 'uno' },
  role: 'NORMAL',
};
