import { createBEUrl } from '../index';

export * from './event';
export * from './activities';
export * from './schedule';

export const emLogin = (
  username = Cypress.env('emUsername'),
  password = Cypress.env('emPassword')
) =>
  describe('Login page', () => {
    it('Login action', () => {
      if (Cypress.env('testEnvironment') !== 'qa') {
        cy.login(Cypress.env('testUsername'), Cypress.env('testPassword'));
      } else {
        cy.login(username, password);
      }
    });
  });

export const makeResourceUrl = ({
  queryParams = '**',
  resource = '*',
  includeHost = false,
}) => {
  const url = `/api/v2/playpants/${resource}/${queryParams}`;
  return includeHost ? createBEUrl(url) : url;
};

export const makeTitleResourceUrl = ({
  envType = Cypress.env('titleEnv'),
  queryParams = '**',
  resource = '*',
  titleId = Cypress.env('titleId'),
  includeHost = false,
}) => {
  const url = `/api/v2/titles/${titleId}/envs/${envType}/${resource}/${queryParams}`;
  return includeHost ? createBEUrl(url) : url;
};

export const preCheckAuth = callback => {
  cy.window()
    .then(win => win.sessionStorage.getItem('devzone-auth-access-token'))
    .then(token => {
      if (token) callback();
      else
        cy.navigateToCalendar().then(() => {
          preCheckAuth(callback);
        });
    });
};

export const makeNavigationUrl = ({
  projectId = Cypress.env('projectId'),
  resource = '*',
}) => `/event-manager/${projectId}/${resource}`;

export const nowDate = () => {
  const date = Cypress.moment().format('MMM D, YYYY').split(' ');
  return new RegExp(
    `${date[0]} \\d*${date[1]} ${date[2]}\\s\\d+[\\s\\S]\\d+\\s[\\s\\S]+`
  );
};

export const getUserName = () => {
  switch (Cypress.env('testEnvironment')) {
    case 'prod':
      return 'DZ Automated Testing';
    case 'dev':
      if (Cypress.env('backendUrl') === 'http://backend') return 'Initial User';
      return 'DZ Automated Testing';
    default:
      return 'Event Manager Project Admin';
  }
};

export const hasAtLeastOneClass = expectedClasses => $el => {
  const classList = Array.from($el[0].classList);
  return expectedClasses.some(expectedClass =>
    classList.find(s => s.includes(expectedClass))
  );
};
