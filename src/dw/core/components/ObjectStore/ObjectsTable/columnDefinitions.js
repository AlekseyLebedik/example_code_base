import { formatFileSize } from 'dw/core/helpers/formatters';
import { comparatorFilter } from 'dw/core/helpers/aggrid';

const valueAfterGroup = (field, valA, valB, nodeA, nodeB) => {
  const valueA = valA || nodeA?.childrenAfterGroup[0].data[field];
  const valueB = valB || nodeB?.childrenAfterGroup[0].data[field];
  return {
    valueA,
    valueB,
  };
};

const childrenAfterGroupComparator = field => (valA, valB, nodeA, nodeB) => {
  const { valueA, valueB } = valueAfterGroup(field, valA, valB, nodeA, nodeB);

  return valueA - valueB;
};

export default (formatDateTime, isGroupSpecific) => [
  {
    headerName: 'Name',
    showRowGroup: true,
    minWidth: 400,
    cellRenderer: 'agGroupCellRenderer',
    field: 'name',
    cellRendererParams: {
      suppressCount: true,
      checkbox: true,
      suppressDoubleClickExpand: true,
      suppressEnterExpand: true,
    },
  },
  {
    headerName: 'Name',
    field: 'name',
    hide: true,
    ...(isGroupSpecific
      ? {}
      : {
          rowGroup: true,
        }),
    checkboxSelection: params => Boolean(params.data),
  },
  ...(isGroupSpecific
    ? []
    : [
        {
          headerName: 'Group',
          field: 'groupName',
          minWidth: 150,
          cellRenderer: 'groupsRenderer',
          metadata: {
            baseLink: 'object-store/groups',
          },
          valueGetter: params => {
            if (params.data) {
              if (params.data.groupName) {
                return params.data.groupName;
              }
              return params.data.groupID;
            }
            return null;
          },
          filter: true,
        },
      ]),
  {
    headerName: 'Checksum',
    field: 'checksum',
    minWidth: 300,
  },
  {
    headerName: 'Category',
    field: 'category',
    minWidth: 120,
    valueFormatter: params => {
      if (params.value === null) {
        return 'N/A';
      }
      if (params.value) {
        return params.value;
      }
      return '';
    },
  },
  {
    headerName: 'Content Length',
    field: 'contentLength',
    width: 150,
    minWidth: 150,
    valueFormatter: params =>
      !params.value ? '' : formatFileSize(params.value),
    comparator: childrenAfterGroupComparator('contentLength'),
  },
  {
    headerName: 'ACL',
    field: 'acl',
    width: 100,
  },
  {
    headerName: 'extraData',
    field: 'extraData',
    width: 120,
    minWidth: 120,
    valueFormatter: params => params.value || 'N/A',
  },
  {
    headerName: 'Download',
    field: 'Download',
    width: 140,
    minWidth: 140,
    cellRenderer: 'downloadRenderer',
    pinned: 'right',
  },
  {
    headerName: 'Created',
    field: 'created',
    valueFormatter: params =>
      !params.value ? '' : formatDateTime(params.value).toString(),
    width: 200,
    minWidth: 200,
    filterParams: {
      filterOptions: ['contains'],
      textMatcher: (filter, value, filterText) =>
        comparatorFilter(filter, formatDateTime(value).toString(), filterText),
    },
    comparator: childrenAfterGroupComparator('created'),
    getQuickFilterText: params => formatDateTime(params.value).toString(),
  },
  {
    headerName: 'Modified',
    field: 'modified',
    valueFormatter: params =>
      !params.value ? '' : formatDateTime(params.value).toString(),
    filterParams: {
      filterOptions: ['contains'],
      textMatcher: (filter, value, filterText) =>
        comparatorFilter(filter, formatDateTime(value).toString(), filterText),
    },
    comparator: childrenAfterGroupComparator('modified'),
    width: 200,
    minWidth: 200,
    getQuickFilterText: params => formatDateTime(params.value).toString(),
  },
  {
    headerName: 'Expires On',
    field: 'expiresOn',
    width: 130,
    minWidth: 130,
    valueFormatter: params =>
      !params.value ? '' : formatDateTime(params.value).toString(),
    filterParams: {
      filterOptions: ['contains'],
      textMatcher: (filter, value, filterText) =>
        comparatorFilter(filter, formatDateTime(value).toString(), filterText),
    },
  },
];
