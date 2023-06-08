import classNames from 'classnames';

export const columnDefs = [
  {
    field: 'transaction_id',
    rowGroup: true,
    hide: true,
    minWidth: 150,
  },
  {
    field: 'player_id',
    headerName: 'Player ID',
    minWidth: 240,
    cellRenderer: 'agGroupCellRenderer',
    cellStyle() {
      return { paddingLeft: '18px' };
    },
  },
  {
    field: 'player_name',
    headerName: 'Player Name',
    minWidth: 200,
  },
  {
    field: 'created_by',
    headerName: 'Created By',
    minWidth: 200,
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    minWidth: 200,
    valueFormatter(params) {
      return params.context.formatDateTime(params.value);
    },
  },
  {
    field: 'state',
    width: 120,
    pinned: 'right',
    cellClass(params) {
      const { classes } = params.context;
      return classNames(classes.default, {
        [classes.success]: params.value === 'SUCCESS',
        [classes.error]: params.value === 'FAILURE',
      });
    },
    valueFormatter(params) {
      return params.value === 'PENDING' ? `${params.value} ...` : params.value;
    },
  },
];
