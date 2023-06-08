import cn from 'classnames';
import styles from './index.module.css';

export const COLUMN_DEFS = [
  {
    field: 'createdAt',
    headerName: 'Date',
    sort: 'desc',
    valueFormatter({ value, context: { formatDateTime } }) {
      return formatDateTime(value);
    },
    minWidth: 280,
    cellRenderer: 'agGroupCellRenderer',
    cellClass({ data }) {
      if (data?.isNew === undefined) return '';
      return cn(styles.new, data.isNew ? styles.newVisible : styles.newHidden);
    },
  },
  {
    field: 'createdBy',
    headerName: 'Editor',
    valueGetter: ({ data }) => data.createdBy.username,
    width: 200,
  },
  {
    field: 'comment',
    headerName: 'Comment',
    flex: 1,
    minWidth: 250,
  },
  {
    field: 'delete',
    pinned: 'right',
    cellRenderer: 'deleteCellRenderer',
    suppressSizeToFit: true,
    width: 100,
  },
];

const cellClass = ({ value, data, colDef: { field } }) => {
  if (value === '__UNSET__') return styles.before;
  if (data?.name === 'before') {
    return field === 'name' ? styles.beforeName : styles.before;
  }
  return '';
};

const valueFormatter = ({ value }) =>
  value === '__UNSET__' ? 'Not Set' : value;

export const getDetailColumnDefs = () => [
  {
    headerName: 'Scope',
    minWidth: 180,
    showRowGroup: 'scopeName',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: { suppressCount: true },
  },
  {
    headerName: 'Population',
    showRowGroup: 'population',
    minWidth: 150,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: { suppressCount: true },
  },
  {
    field: 'name',
    minWidth: 280,
  },
  {
    field: 'platform',
  },
  {
    field: 'source',
    minWidth: 150,
    valueFormatter,
    cellClass,
  },
  {
    field: 'target',
    minWidth: 150,
    valueFormatter,
    cellClass,
  },
  { field: 'scopeURI', sort: true, hide: true },
  {
    field: 'scopeName',
    hide: true,
    rowGroup: true,
    valueGetter: ({ data }) =>
      data ? data.scopeDisplayName || data.scopeName : null,
  },
  {
    field: 'population',
    hide: true,
    rowGroup: true,
    valueGetter: ({ data }) => {
      if (!data) return undefined;
      return data.displayValue || data.population;
    },
  },
];

export const ROW_HEIGHT = 42;
export const MAX_DETAIL_LINE_LENGTH = 60;
export const DETAIL_CELL_LINE_LENGTH = 22;
export const DETAIL_CELL_LINE_HEIGHT = 18;
