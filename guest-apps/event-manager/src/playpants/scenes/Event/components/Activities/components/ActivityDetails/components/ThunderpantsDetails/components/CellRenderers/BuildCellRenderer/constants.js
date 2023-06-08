import get from 'lodash/get';
import startCase from 'lodash/startCase';
import BuildOptionsCellRenderer from '../BuildOptionsCellRenderer';

export const EDIT_BUILD_FORM_NAME = 'BuildParamsForm';

const DEPLOYMENT_SCHEMA = [
  {
    name: 'Target Name',
    field: 'target_name',
  },
  {
    name: 'Status',
    field: 'status',
  },
];

export const COLUMNS = (cellRendererParams, userParamsSchema) => {
  const staticColumns = DEPLOYMENT_SCHEMA.map(({ field, name }) => ({
    headerName: name,
    field,
    valueGetter: params => get(params.data, field),
  }));
  const dynamicColumns = userParamsSchema.map(({ name }) => ({
    headerName: startCase(name),
    field: name,
    valueGetter: params => get(params.data.user_params, name),
  }));
  const buildOptionsColumn = {
    cellRenderer: 'buildOptionsCellRenderer',
    cellRendererParams,
    field: 'options',
    headerName: 'Options',
    width: 150,
  };
  return [buildOptionsColumn, ...staticColumns, ...dynamicColumns];
};

const autoSizeAll = params => {
  const allColumnIds = params.columnApi
    .getAllColumns()
    .map(column => column.colId);
  params.columnApi.autoSizeColumns(allColumnIds, false);
};

export const GRID_OPTIONS = {
  defaultColDef: { resizable: true },
  components: {
    buildOptionsCellRenderer: BuildOptionsCellRenderer,
  },
  getRowId: ({ data }) => data.uid,
  onGridReady: params => autoSizeAll(params),
  onGridSizeChanged: params => autoSizeAll(params),
  suppressCellFocus: true,
  suppressRowSelection: true,
};
