import styles from './index.module.css';

const valueCellClass = ({ value }) =>
  value === '__UNSET__' ? styles.cellUnset : '';

export const MASTER_COLUMN_DEFS = [
  {
    field: 'scopeURI',
    headerName: 'Scope',
    sort: 'asc',
    cellRenderer: 'agGroupCellRenderer',
    valueFormatter({ value, data }) {
      return data.scopeDisplayName || value;
    },
  },
  {
    field: 'population',
    valueFormatter({ value, data }) {
      return data.displayValue || value;
    },
  },
];

const valueFormatter = ({ value }) =>
  value === '__UNSET__' ? 'Not Set' : String(value);

export const DETAIL_COLUMN_DEFS = [
  { field: 'key', minWidth: 250, maxWidth: 600, flex: 1 },
  {
    field: 'platform',
    valueFormatter({ value }) {
      return value === '*' ? 'Default' : value;
    },
    maxWidth: 150,
  },
  { field: 'source', valueFormatter, cellClass: valueCellClass },
  { field: 'target', valueFormatter, cellClass: valueCellClass },
];
