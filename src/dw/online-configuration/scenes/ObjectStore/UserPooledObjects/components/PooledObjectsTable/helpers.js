import React from 'react';

import KeyValueChip from 'dw/core/components/KeyValueChip';

import { formatFileSize } from 'dw/core/helpers/formatters';
import { comparatorFilter } from 'dw/core/helpers/aggrid';
import {
  categoryRenderer,
  extraRenderer,
  pooledTagCountRenderer,
  pooledOwnerCountRenderer,
} from '../../../cellRenderers';

const getKeyName = (key, validTags) => {
  const foundValidTag =
    validTags.length > 0 && validTags.find(t => t.key === key);
  return foundValidTag ? foundValidTag.humanReadable : key;
};

const pooledTagCountGetter = params => {
  if (params.data) {
    const {
      data: { tags },
    } = params;

    const tagsLen = tags && tags.length;

    return tagsLen || 0;
  }
  return 0;
};

const pooledOwnerCountGetter = params => {
  if (params.data) {
    const {
      data: { owners },
    } = params;

    const ownersLen = owners && owners.length;

    return ownersLen || 0;
  }
  return 0;
};

export const TagCellRenderer = params => {
  const { validTag } = params;
  const chips = params?.value?.map(p => (
    <KeyValueChip
      key={`${p.key}_${p.value}`}
      chipKey={getKeyName(p.key, validTag)}
      chipValue={p.value}
      color="primary"
      size="small"
    />
  ));
  return chips?.length > 0 ? <span>{chips}</span> : <span>No tags</span>;
};

const ContentOwnersRenderer = params => {
  const selectUser = event => {
    const { textContent } = event.target;
    const user = textContent.substring(textContent.indexOf('-') + 1);
    params.context.onSelect(user);
  };

  const owners = params.value
    .map(owner => (
      <a key={params.valueFormatted} onClick={selectUser}>
        {owner}
      </a>
    ))
    .reduce((prev, curr) => (prev.length ? [...prev, ', ', curr] : [curr]), []);
  return owners.length > 0 ? <span>{owners}</span> : <span />;
};

const components = {
  categoryRenderer,
  contentOwnersRenderer: ContentOwnersRenderer,
  tagCellRenderer: TagCellRenderer,
  extraRenderer,
  pooledTagCountRenderer,
  pooledOwnerCountRenderer,
  pooledTagCountGetter,
  pooledOwnerCountGetter,
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

const getColumnDefinitions = (formatDateTime, validTags) => [
  {
    headerName: 'Name',
    cellRenderer: 'agGroupCellRenderer',
    field: 'name',
    checkboxSelection: true,
    headerCheckboxSelection: true,
  },
  {
    headerName: 'Created',
    cellRenderer: 'agGroupCellRenderer',
    field: 'created',
    valueFormatter: params =>
      !params.value ? '' : formatDateTime(params.value).toString(),
    sortable: true,
    sort: 'desc',
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      textMatcher: (filter, value, filterText) =>
        comparatorFilter(filter, formatDateTime(value).toString(), filterText),
    },
    comparator: childrenAfterGroupComparator('created'),
    getQuickFilterText: params => formatDateTime(params.value).toString(),
  },
  {
    headerName: 'Content URL',
    field: 'contentURL',
    cellRenderer: params => <a href={params.value}>{params.value}</a>,
  },
  {
    headerName: 'Owners List',
    cellRenderer: 'contentOwnersRenderer',
    field: 'owners',
  },
  {
    headerName: 'Tags List',
    cellRenderer: 'tagCellRenderer',
    cellRendererParams: { validTag: validTags },
    field: 'tags',
    minWidth: 350,
  },
  {
    headerName: 'Content Length',
    cellRenderer: 'agGroupCellRenderer',
    field: 'contentLength',
    sortable: true,
    valueFormatter: params =>
      !params.value ? '' : formatFileSize(params.value),
    comparator: childrenAfterGroupComparator('contentLength'),
  },
  {
    headerName: 'Description',
    cellRenderer: 'agGroupCellRenderer',
    field: 'description',
  },
  {
    headerName: 'Tags',
    cellRenderer: 'agGroupCellRenderer',
    valueGetter: pooledTagCountGetter,
    minWidth: 30,
  },
  {
    headerName: 'Owners',
    cellRenderer: 'agGroupCellRenderer',
    valueGetter: pooledOwnerCountGetter,
    minWidth: 30,
  },
  {
    headerName: 'Modified',
    cellRenderer: 'agGroupCellRenderer',
    field: 'modified',
    valueFormatter: params =>
      !params.value ? '' : formatDateTime(params.value).toString(),
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      textMatcher: (filter, value, filterText) =>
        comparatorFilter(filter, formatDateTime(value).toString(), filterText),
    },
    comparator: childrenAfterGroupComparator('modified'),
    sortable: true,
    getQuickFilterText: params => formatDateTime(params.value).toString(),
  },
  {
    headerName: 'Expires On',
    cellRenderer: 'agGroupCellRenderer',
    field: 'expiresOn',
    valueFormatter: params =>
      !params.value ? '' : formatDateTime(params.value).toString(),
    filter: 'agTextColumnFilter',
    filterParams: {
      filterOptions: ['contains'],
      textMatcher: (filter, value, filterText) =>
        comparatorFilter(filter, formatDateTime(value).toString(), filterText),
    },
  },
  {
    headerName: 'Checksum',
    cellRenderer: 'agGroupCellRenderer',
    field: 'checksum',
  },
  {
    headerName: 'Category',
    cellRenderer: 'agGroupCellRenderer',
    field: 'category',
    filter: true,
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
    headerName: 'ACL',
    cellRenderer: 'agGroupCellRenderer',
    field: 'acl',
  },
  {
    headerName: 'extraData',
    field: 'extraData',
    cellRenderer: 'extraRenderer',
    minWidth: 700,
    cellStyle: {
      height: '100%',
      paddingTop: '20px',
    },
    valueFormatter: params => params.value || 'N/A',
  },
];

export const getGridDefinitions = (formatDateTime, validTags) => ({
  columnDefs: getColumnDefinitions(formatDateTime, validTags),
  defaultColDef: {
    flex: 1,
    resizable: true,
    minWidth: 200,
  },
  components,
  suppressScrollOnNewData: true,
});
