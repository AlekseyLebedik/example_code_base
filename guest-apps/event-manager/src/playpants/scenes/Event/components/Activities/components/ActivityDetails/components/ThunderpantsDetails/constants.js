import { formatDateTime } from 'playpants/helpers/dateTime';
import get from 'lodash/get';
import BuildCellRenderer from './components/CellRenderers/BuildCellRenderer';
import BadgeCellRenderer from './components/CellRenderers/BadgeCellRenderer';
import { sumBadgeWeights } from './helpers';

const badgeComparator = (valueA, valueB) =>
  sumBadgeWeights(valueA) - sumBadgeWeights(valueB);

export const COLUMNS = (buildSchema, classes) => {
  const columns = buildSchema.map(({ field, name, type = null }) => ({
    headerName: name,
    filter: 'agTextColumnFilter',
    valueGetter: params =>
      type === 'timestamp'
        ? formatDateTime(get(params.data, field))
        : get(params.data, field),
  }));
  columns.unshift({
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      innerRendererFramework: BadgeCellRenderer,
      classes,
    },
    field: 'badges',
    headerName: 'Info',
    comparator: badgeComparator,
  });
  return columns;
};

const autoSizeAll = params => {
  const allColumnIds = params.columnApi
    .getAllColumns()
    .map(column => column.colId);
  params.columnApi.autoSizeColumns(allColumnIds);
};

export const GRID_OPTIONS = {
  cacheQuickFilter: true,
  defaultColDef: { resizable: true, sortable: true },
  detailCellRenderer: 'detailCellRenderer',
  components: {
    detailCellRenderer: BuildCellRenderer,
  },
  getRowId: ({ data }) => data.uid,
  masterDetail: true,
  onComponentStateChanged: params => {
    autoSizeAll(params);
  },
  onGridReady: params => {
    GRID_OPTIONS.params = params;
    GRID_OPTIONS.api = params.api;
    params.api.sizeColumnsToFit();
  },
  onGridSizeChanged: params => {
    autoSizeAll(params);
  },
  overlayLoadingTemplate:
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
  pagination: true,
  suppressCellFocus: true,
  suppressColumnVirtualisation: true,
};

export const onFilterTextBoxChanged = value =>
  GRID_OPTIONS.api.setQuickFilter(value);

export const TPANTS_STATUS_TYPES = ['live', 'deploy', 'undeploy', 'modify'];
