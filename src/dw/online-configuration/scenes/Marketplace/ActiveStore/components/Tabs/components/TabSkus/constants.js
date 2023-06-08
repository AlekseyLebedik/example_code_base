import { YesNoFromBool, NoSetWhenNull } from 'dw/core/helpers/api-data-parser';

export const COLUMNS = [
  {
    headerName: 'ID',
    field: 'skuID',
    minWidth: 100,
  },
  {
    headerName: 'Coupon',
    valueGetter: params => YesNoFromBool(params.data?.couponEnabled),
    minWidth: 120,
  },
  {
    headerName: 'Ignore Req. Entitlements',
    valueGetter: params =>
      NoSetWhenNull(params.data?.ignoreRequiredEntitlements),
    minWidth: 150,
  },
  {
    headerName: 'Promo Text',
    valueGetter: params => NoSetWhenNull(params.data?.promotionalText),
    minWidth: 130,
  },
  {
    headerName: 'Currency ID',
    field: 'currencyID',
    minWidth: 150,
  },
  {
    headerName: 'Price',
    field: 'price',
    minWidth: 100,
  },
  {
    headerName: 'skuType',
    field: 'skuType',
    minWidth: 120,
  },
  {
    headerName: 'Expires',
    valueGetter: params => NoSetWhenNull(params.data?.expiryDate),
    minWidth: 110,
  },
  {
    headerName: 'Rental Duration',
    valueGetter: params => NoSetWhenNull(params.data?.rentalDuration),
    minWidth: 100,
  },
  {
    headerName: 'Data',
    valueGetter: params => NoSetWhenNull(params.data?.skuData),
    minWidth: 100,
  },
  {
    headerName: 'Max Quatity',
    valueGetter: params => NoSetWhenNull(params.data?.maxQuantity),
    minWidth: 100,
  },
  {
    headerName: 'Product ID',
    field: 'productID',
    minWidth: 110,
  },
  {
    headerName: 'Usage Duration',
    valueGetter: params => NoSetWhenNull(params.data?.usageDuration),
    minWidth: 150,
  },
  {
    headerName: 'Sale Start',
    valueGetter: params => NoSetWhenNull(params.data?.saleStart),
    minWidth: 150,
  },
];
