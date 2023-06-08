import React from 'react';
import { NoSetWhenNull, YesNoFromBool } from 'dw/core/helpers/api-data-parser';

export const GRANTED_ITEMS_COLUMNS = [
  {
    title: 'ID',
    dataIndex: 'itemID',
    key: 'itemID',
    type: 'number',
  },
  {
    title: 'Name',
    key: 'itemName',
    dataIndex: 'itemName',
    width: 180,
    type: 'string',
  },
  {
    title: 'Quantity',
    dataIndex: 'itemQuantity',
    key: 'itemQuantity',
    type: 'number',
  },
  {
    title: (
      <span>
        Rental
        <br />
        Duration
      </span>
    ),
    dataIndex: 'rentalDuration',
    key: 'rentalDuration',
    type: 'string',
    render: (text, record) => NoSetWhenNull(record.rentalDuration),
  },
  {
    title: (
      <span>
        Override
        <br />
        Rental
        <br />
        Duration
      </span>
    ),
    key: 'overrideRentalDuration',
    type: 'string',
    render: (text, record) => YesNoFromBool(record.overrideRentalDuration),
  },
];

export const ENTITLEMENTS_COLUMNS = [
  {
    title: 'ID',
    dataIndex: 'entitlementID',
    key: 'entitlementID',
    type: 'number',
  },
  {
    title: 'Level',
    dataIndex: 'entitlementLevel',
    key: 'entitlementLevel',
    type: 'number',
  },
];

export const GRANTED_MONEY_COLUMNS = [
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    type: 'number',
  },
  {
    title: 'CurrencyID',
    dataIndex: 'currencyID',
    key: 'currencyID',
    type: 'number',
  },
];

export const COLUMNS = [
  {
    headerName: 'Product ID',
    field: 'productID',
    minWidth: 50,
  },
  {
    headerName: 'Name',
    field: 'productName',
    minWidth: 200,
  },
  {
    headerName: 'Granted Money',
    valueGetter: params => ({
      label:
        params.data?.grantedMoney?.length > 0 &&
        `${params.data.productName} (ID: ${params.data.grantedMoney[0].currencyID}) x ${params.data.grantedMoney[0].amount}`,
      elements: params.data?.grantedMoney,
      columns: GRANTED_MONEY_COLUMNS,
    }),
    cellRenderer: 'tooltipRenderer',
    getQuickFilterText: params => params.value.label,
    minWidth: 100,
  },
  {
    headerName: 'Description',
    valueGetter: params => NoSetWhenNull(params.data?.description),
    minWidth: 200,
  },
  {
    headerName: 'Required Entitlements',
    valueGetter: params => ({
      label:
        params.data?.requiredEntitlements?.length > 0 &&
        `${params.data.productName} (ID: ${params.data.requiredEntitlements[0].entitlementID}) lv ${params.data.requiredEntitlements[0].entitlementLevel}`,
      elements: params.data?.requiredEntitlements,
      columns: ENTITLEMENTS_COLUMNS,
    }),
    cellRenderer: 'tooltipRenderer',
    getQuickFilterText: params => params.value.label,
    minWidth: 100,
  },
  {
    headerName: 'Granted Items',
    valueGetter: params => ({
      label:
        params.data?.grantedItems?.length > 0 &&
        `${params.data.productName} (ID: ${params.data.grantedItems[0].itemID}) x ${params.data.grantedItems[0].itemQuantity}`,
      elements: params.data?.grantedItems,
      columns: GRANTED_ITEMS_COLUMNS,
    }),
    cellRenderer: 'tooltipRenderer',
    getQuickFilterText: params => params.value.label,
    minWidth: 250,
  },
  {
    headerName: 'Granted Entitlements',
    valueGetter: params => ({
      label:
        params.data?.grantedEntitlements?.length > 0 &&
        `${params.data.productName} (ID: ${params.data.grantedEntitlements[0].entitlementID}) lv ${params.data.grantedEntitlements[0].entitlementLevel}`,
      elements: params.data?.grantedEntitlements,
      columns: ENTITLEMENTS_COLUMNS,
    }),
    cellRenderer: 'tooltipRenderer',
    getQuickFilterText: params => params.value.label,
    minWidth: 100,
  },
  {
    headerName: 'Data',
    valueGetter: params => NoSetWhenNull(params.data?.productData),
    minWidth: 100,
  },
];
