export const makeNavigationUrl = ({
  url = 'dashboard',
  titleId = Cypress.env('titleId'),
  envType = Cypress.env('titleEnv'),
}) => `/online-configuration/${titleId}/${envType}/${url}`;

export const makeNavigationUrlOthers = ({
  url = 'dashboard',
  titleId = Cypress.env('otherTitleId'),
  envType = Cypress.env('otherTitleEnv'),
}) => `/online-configuration/${titleId}/${envType}/${url}`;

export const makeResourceUrl = ({ resource = '*', queryParams = '*' }) =>
  `/api/v2/${resource}/${queryParams}`;

export const makeTitleUrl = ({
  resource = '*',
  titleId = Cypress.env('titleId'),
  envType = Cypress.env('titleEnv'),
  queryParams = '*',
}) => `/api/v2/titles/${titleId}/envs/${envType}/${resource}/${queryParams}`;

export const makeTitleUrlOthers = ({
  resource = '*',
  titleId = Cypress.env('otherTitleId'),
  envType = Cypress.env('otherTitleEnv'),
  queryParams = '*',
}) => `/api/v2/titles/${titleId}/envs/${envType}/${resource}/${queryParams}`;
