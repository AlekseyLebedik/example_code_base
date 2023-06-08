export const COLUMNS = [
  {
    headerName: 'Currency ID',
    field: 'currencyID',
  },
  {
    headerName: 'Code',
    field: 'currencyCode',
  },
  {
    headerName: 'Payment Provider Code',
    valueGetter: params =>
      !params.data || params.data.paymentProviderCode === null
        ? 'Not set'
        : params.data.paymentProviderCode,
  },
];
