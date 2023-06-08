import capitalize from 'lodash/capitalize';

export const BOOL = 'bool';
export const CHAR = 'char';
export const FLOAT = 'float32';
export const INT = 'int64';

export const TYPE_OPTIONS = [
  { value: CHAR, label: 'String' },
  { value: BOOL, label: 'Boolean' },
  { value: INT, label: 'Number' },
  { value: FLOAT, label: 'Decimal' },
];

const TYPE_LABELS_MAP = TYPE_OPTIONS.reduce(
  (acc, { value, label }) => ({ ...acc, [value]: label }),
  {}
);

export const COLUMN_DEFS = [
  {
    field: 'key',
    sort: 'asc',
    checkboxSelection: true,
    headerCheckboxSelection: true,
    headerCheckboxSelectionFilteredOnly: true,
    cellRenderer: 'keyCellRenderer',
    minWidth: 350,
  },
  {
    field: 'type',
    width: 100,
    valueFormatter({ value }) {
      const plural = value.startsWith('list_');
      const formatted = value
        .split('_')
        .map(v => TYPE_LABELS_MAP[v] || v)
        .map(capitalize)
        .join(' of ');
      return plural ? `${formatted}s` : formatted;
    },
    minWidth: 150,
  },
  {
    field: 'validation',
    getQuickFilterText() {
      return null;
    },
    minWidth: 250,
  },
  {
    field: 'category',
  },
  {
    field: 'description',
    flex: 1,
  },
  {
    field: 'createdBy.username',
    displayName: 'Created By',
  },
  {
    field: 'owner.username',
    displayName: 'Owner',
  },
  {
    field: 'isArchived',
    displayName: 'Archived',
    valueFormatter({ value }) {
      return value ? 'Yes' : 'No';
    },
  },
  {
    field: 'createdAt',
    valueFormatter({ value, context: { formatDateTime } }) {
      return formatDateTime(value);
    },
    getQuickFilterText({ value, context: { formatDateTime } }) {
      return `${formatDateTime(value)} ${formatDateTime(
        value,
        'YYYY-MM-DD HH:mm:ss'
      )}`;
    },
    minWidth: 220,
  },
];
