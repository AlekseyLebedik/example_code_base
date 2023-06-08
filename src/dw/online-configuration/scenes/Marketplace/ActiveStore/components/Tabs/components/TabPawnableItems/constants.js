import { YesNoFromBool } from 'dw/core/helpers/api-data-parser';

export const COLUMNS = [
  {
    headerName: 'Item ID',
    field: 'itemID',
  },
  {
    headerName: 'Product ID',
    field: 'productID',
  },
  {
    headerName: 'Choice Type',
    field: 'choiceType',
  },
  {
    headerName: 'Ignore Required Entitlements',
    valueGetter: params =>
      YesNoFromBool(params.data?.ignoreRequiredEntitlements),
  },
];
