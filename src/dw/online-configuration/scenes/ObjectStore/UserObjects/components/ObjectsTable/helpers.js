import { formatFileSize } from 'dw/core/helpers/formatters';
import { comparatorFilter } from 'dw/core/helpers/aggrid';
import {
  categoryRenderer,
  downloadRenderer,
  extraRenderer,
} from '../../../cellRenderers';

const components = {
  downloadRenderer,
  categoryRenderer,
  extraRenderer,
};

const valueAfterGroup = (field, valA, valB, nodeA, nodeB) => {
  const valueA =
    valA ||
    (nodeA?.childrenAfterGroup ? nodeA?.childrenAfterGroup[0].data[field] : 0);
  const valueB =
    valB ||
    (nodeB?.childrenAfterGroup ? nodeB?.childrenAfterGroup[0].data[field] : 0);
  return {
    valueA,
    valueB,
  };
};

const childrenAfterGroupComparator = field => (valA, valB, nodeA, nodeB) => {
  const { valueA, valueB } = valueAfterGroup(field, valA, valB, nodeA, nodeB);

  return valueA - valueB;
};

const getColumnDefinitions = (formatDateTime, isMaster) =>
  [
    isMaster && {
      headerName: 'Name',
      width: 500,
      cellRenderer: 'agGroupCellRenderer',
      field: 'name',
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    isMaster && {
      headerName: 'Created',
      field: 'created',
      valueFormatter: params =>
        !params.value ? '' : formatDateTime(params.value).toString(),
      cellStyle: {
        'white-space': 'normal',
        'word-wrap': 'break-word',
      },
      width: 250,
      sortable: true,
      sort: 'desc',
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['contains'],
        textMatcher: (filter, value, filterText) =>
          comparatorFilter(
            filter,
            formatDateTime(value).toString(),
            filterText
          ),
      },
      comparator: childrenAfterGroupComparator('created'),
      getQuickFilterText: params => formatDateTime(params.value).toString(),
    },
    {
      headerName: 'Modified',
      field: 'modified',
      valueFormatter: params =>
        !params.value ? '' : formatDateTime(params.value).toString(),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['contains'],
        textMatcher: (filter, value, filterText) =>
          comparatorFilter(
            filter,
            formatDateTime(value).toString(),
            filterText
          ),
      },
      comparator: childrenAfterGroupComparator('modified'),
      cellStyle: {
        'white-space': 'normal',
        'word-wrap': 'break-word',
      },
      sortable: true,
      width: isMaster ? 250 : 350,
      getQuickFilterText: params => formatDateTime(params.value).toString(),
    },
    isMaster && {
      headerName: 'Expires On',
      field: 'expiresOn',
      width: 150,
      valueFormatter: params =>
        !params.value ? '' : formatDateTime(params.value).toString(),
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['contains'],
        textMatcher: (filter, value, filterText) =>
          comparatorFilter(
            filter,
            formatDateTime(value).toString(),
            filterText
          ),
      },
      cellStyle: {
        'white-space': 'normal',
        'word-wrap': 'break-word',
      },
    },
    {
      headerName: 'Tags',
      field: 'tags',
      width: 450,
      sortable: true,
      sort: 'desc',
      filter: 'agTextColumnFilter',
      filterParams: {
        filterOptions: ['contains'],
      },
      valueGetter: params =>
        !params.data?.tags
          ? ''
          : params.data.tags
              .map(
                ({ key, value, values }) =>
                  `${key}:${(values && values.join(', ')) || value}`
              )
              .join(', '),
    },
    {
      headerName: 'Checksum',
      field: 'checksum',
      width: 450,
      cellStyle: {
        'white-space': 'normal',
        'word-wrap': 'break-word',
      },
    },
    isMaster && {
      headerName: 'Category',
      field: 'category',
      width: 250,
      filter: true,
      cellStyle: {
        'white-space': 'normal',
        'word-wrap': 'break-word',
      },

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
      width: 200,
      sortable: true,
      cellStyle: {
        'white-space': 'normal',
        'word-wrap': 'break-word',
      },
      valueFormatter: params =>
        !params.value ? '' : formatFileSize(params.value),
      comparator: childrenAfterGroupComparator('contentLength'),
    },
    {
      headerName: 'ACL',
      field: 'acl',
      width: 150,
      cellStyle: {
        'white-space': 'normal',
        'word-wrap': 'break-word',
      },
    },
    {
      headerName: 'extraData',
      field: 'extraData',
      cellRenderer: 'extraRenderer',
      width: 300,
      cellStyle: {
        'white-space': 'normal',
        'word-wrap': 'break-word',
      },
      valueFormatter: params => params.value || 'N/A',
    },
    {
      headerName: 'Actions',
      field: 'ddl',
      width: isMaster ? 200 : 180,
      minWidth: 200,
      cellRenderer: 'downloadRenderer',
      pinned: 'right',
    },
  ]
    .filter(item => item)
    .map(item => ({
      ...item,
      cellStyle: isMaster ? {} : { 'background-color': '#eeebeb' },
    }));

const getMasterDetailsConf = (formatDateTime, context) => ({
  masterDetail: true,
  detailCellRendererParams: {
    detailGridOptions: {
      columnDefs: getColumnDefinitions(formatDateTime),
      components,
      context,
      onFirstDataRendered: params => params.api.sizeColumnsToFit(),
      localeText: {
        noRowsToShow: 'There are no Backups yet for this User Object.',
      },
    },
    getDetailRowData(params) {
      params.successCallback(
        params.data.backups.map(item => ({
          ...item,
          origCreated: params.data.created,
        }))
      );
    },
  },
});

export const getGridDefinitions = (formatDateTime, context) => ({
  ...getMasterDetailsConf(formatDateTime, context),
  components,
  columnDefs: getColumnDefinitions(formatDateTime, true),
  isRowMaster: dataItem => (dataItem ? dataItem.backups : false),
});
