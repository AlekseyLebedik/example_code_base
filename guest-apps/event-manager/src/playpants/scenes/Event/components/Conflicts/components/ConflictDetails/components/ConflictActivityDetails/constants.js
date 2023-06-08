export const CONFLICTS_COLUMN_DEFS = (classes, columns, noRowsMsg) => ({
  columnDefs: [
    ...columns.map(column => ({
      ...column,
      cellClass: params =>
        column.isConflictingColumn &&
        params.data &&
        params.data[column.field] !== undefined &&
        classes.conflictTableCell,
      filter: 'agTextColumnFilter',
    })),
  ],
  defaultColDef: {
    editable: false,
    filter: true,
    menuTabs: ['filterMenuTab'],
    resizable: true,
    sortable: true,
  },
  domLayout: 'autoHeight',
  onGridSizeChanged: params => params.api.sizeColumnsToFit(),
  overlayNoRowsTemplate: `<span>${noRowsMsg}</span>`,
});

export const PUBVARS_CONFLICTS_COLUMNS = [
  {
    isConflictingColumn: true,
    field: 'variable',
    name: 'Variable',
  },
  {
    isConflictingColumn: true,
    field: 'value',
    headerName: 'Value',
  },
  {
    field: 'context',
    headerName: 'Context',
  },
  {
    field: 'groupId',
    headerName: 'Group ID',
  },
  {
    field: 'namespace',
    headerName: 'Namespace',
  },
];

export const PUBVARS_NO_CONFLICTS_MSG =
  'There are no conflicting Publisher Variables for this activity pair';

export const PUBSTORAGE_CONFLICTS_COLUMNS = [
  {
    field: 'title',
    headerName: 'Title',
  },
  {
    isConflictingColumn: true,
    field: 'filename',
    headerName: 'Filename',
  },
  {
    field: 'remoteFilename',
    headerName: 'Remote Filename',
  },
  {
    field: 'context',
    headerName: 'Context',
  },
  {
    field: 'size',
    headerName: 'Size',
  },
  {
    field: 'comment',
    headerName: 'Comment',
  },
];

export const PUBSTORAGE_NO_CONFLICTS_MSG =
  'There are no conflicting filenames for this activity pair';

export const PUBOBJS_CONFLICTS_COLUMNS = [
  {
    isConflictingColumn: true,
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'acl',
    headerName: 'ACL',
  },
  {
    field: 'checksumType',
    headerName: 'Checksum Type',
  },
  {
    field: 'category',
    headerName: 'Category',
  },
  {
    field: 'contentLength',
    headerName: 'Content Length',
  },
];

export const PUBOBJS_NO_CONFLICTS_MSG =
  'There are no conflicting Publisher Object names for this activity pair';

export const THUNDERPANTS_CONFLICTS_COLUMNS = [
  {
    isConflictingColumn: true,
    field: 'uid',
    headerName: 'UID',
  },
  {
    field: 'view_name',
    headerName: 'View',
  },
  {
    field: 'target_name',
    headerName: 'Target',
  },
  {
    field: 'build_uid',
    headerName: 'Build UID',
  },
  {
    field: 'type',
    headerName: 'Type',
  },
];

export const THUNDERPANTS_NO_CONFLICTS_MSG =
  'There are no conflicting Thunderpants modifications or undeployments for this activity pair';
