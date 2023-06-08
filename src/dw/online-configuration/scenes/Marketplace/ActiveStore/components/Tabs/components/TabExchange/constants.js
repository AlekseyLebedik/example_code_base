import { COLUMNS as PRODUCT_COLUMNS } from '../TabProducts/constants';

export const COLUMNS = [
  {
    headerName: 'First Party ID',
    field: 'fpsku_id',
    minWidth: 50,
  },
  {
    headerName: 'Store',
    field: 'store',
    minWidth: 100,
  },
  {
    headerName: 'Consumable',
    field: 'is_consumable',
    valueParser: params => !!params.value,
    minWidth: 50,
  },
  {
    headerName: 'License ID',
    field: 'data',
    valueGetter: params => params.data?.data.license_id,
    minWidth: 50,
  },
  {
    headerName: 'Entitlement ID',
    field: 'data',
    valueGetter: params => params.data?.data.entitlement_id,
    minWidth: 50,
  },
  {
    headerName: 'XB1 Product ID',
    field: 'data',
    valueGetter: params => params.data?.data.xb1_product_id,
    minWidth: 50,
  },
  {
    headerName: 'Product ID',
    field: 'product_id',
    minWidth: 50,
  },
  ...PRODUCT_COLUMNS.slice(1),
];
