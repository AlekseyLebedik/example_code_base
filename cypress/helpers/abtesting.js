import moment from 'moment-timezone';

export const makeUrl = url => (url ? `/abtesting/${url}` : '/abtesting');

export const makeTitleUrlAbTesting = ({
  resource = '*',
  titleId = Cypress.env('titleIdABTesting'),
  envType = Cypress.env('titleEnv'),
  queryParams = '*',
}) => `/api/v2/titles/${titleId}/envs/${envType}/${resource}/${queryParams}`;

export const ABTestData = (testID, status) => ({
  testID,
  status,
  context: 'game1',
  name: 'CY ABTest',
  catchStart: moment().unix().toString(),
  catchEnd: moment().add(1, 'days').unix().toString(),
  purpose: 'CY testing',
  creator: 'cy@test.com',
  comments: 'CY comments',
  organisation: 'DW',
  data_scientist: 'data_scientist@test.com',
  stakeholders: [],
  categories: ['testCategory'],
  cohorts: [],
  assignmentAlgorithm: 'sha256',
  assignmentSeed: '61208a3053774124b685ff7163746991',
  created: 1579084170,
  updated: 1579084170,
  first_parties: [],
});

export const ABConfigData = {
  data: [
    {
      configID: '5727683439329241410',
      name: 'CY Test Config',
      context: 'game1',
      serviceID: 'ae',
      modifiers: '{"second_campaign_value": 2}',
      created: 1580377073,
      updated: 1580377073,
    },
  ],
};

export const ABTests = {
  data: [
    { testID: '12708888182788125695', status: 'configuration' },
    { testID: '134706488182788175625', status: 'live' },
    { testID: '6458906488182788175645', status: 'live' },
    { testID: '164706499182788175621', status: 'analysis' },
    { testID: '456706499182348175621', status: 'archived' },
    { testID: '568706499182348175621', status: 'killed' },
  ].map(({ testID, status }) => ABTestData(testID, status)),
};
