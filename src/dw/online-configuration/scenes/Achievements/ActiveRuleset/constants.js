export const COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'id_',
    headerName: 'Achievement ID',
  },
  {
    field: 'description',
    headerName: 'Description',
  },
  {
    field: 'kind',
    headerName: 'Kind',
    suppressSizeToFit: true,
    width: 100,
  },
  {
    field: 'subscribedEvents',
    headerName: 'Subscribed Events',
  },
  {
    field: 'requiresActivation',
    headerName: 'Requires Activation',
  },
  {
    field: 'requiresClaim',
    headerName: 'Requires Claim',
  },
  {
    field: 'activationFee',
    headerName: 'Activation Fee',
  },
  {
    field: 'priority',
    headerName: 'Priority',
  },
  {
    field: 'multiProgressTarget',
    headerName: 'Multi-progress Target',
    valueGetter: params =>
      JSON.stringify(params.data?.multiProgressTarget, null, ' '),
  },
];
