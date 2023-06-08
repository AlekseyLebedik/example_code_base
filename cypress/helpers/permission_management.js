import get from 'lodash/get';
// These entities should exist in the tested environment.
export const userName = 'cy_user';
export const groupName = 'cy_group';
export const companyName = 'cy_company';

export const makeUrl = url => `/permission-management/${url}`;
export const makeRouteUrl = url => `/api/v2/${url}`;

export const searchContentType = (searchName, route) => {
  cy.route(makeRouteUrl(`${route}/?q=${searchName}**`)).as('search');
  cy.get('.common__search input', { timeout: 10000 }).as('searchInput');
  cy.get('@searchInput').type(searchName).type('{enter}');
  cy.wait('@search');
};

export const visitPage = (args = {}) => {
  const {
    searchName,
    page = 'users',
    route = 'users',
    waitForPermissions = false,
    postSearchAction = () => {},
  } = args;
  cy.server();

  if (
    Cypress.env('testEnvironment') === 'qa' ||
    Cypress.env('testEnvironment') === 'prod'
  ) {
    cy.route(makeRouteUrl('ctypes**')).as('getCtypes');
  } else if (page === 'users') {
    cy.route(makeRouteUrl('ctypes')).as('getCtypes');
  } else {
    cy.route(makeRouteUrl('ctypes/*')).as('getCtypes');
  }
  cy.route(makeRouteUrl('ctypes/*/permissions/**')).as('getPermissions');

  cy.visit(makeUrl(page));
  if (waitForPermissions) {
    cy.wait('@getCtypes').then(xhr => {
      const numCtypes = get(xhr, 'response.body.data.length', 0);
      searchContentType(searchName, route);
      postSearchAction();

      if (numCtypes !== 0 && waitForPermissions) {
        cy.wait('@getPermissions', { timeout: 16000 });
      }
    });
  } else {
    cy.wait('@getCtypes');
    searchContentType(searchName, route);
    postSearchAction();
  }
};

export const visitGroup = searchName => {
  const postSearchAction = () => {
    cy.contains(groupName).click();
  };
  visitPage({
    searchName,
    page: 'groups',
    route: 'company-groups',
    waitForPermissions: true,
    postSearchAction,
  });
};

export const visitCompany = searchName => {
  visitPage({
    searchName,
    page: 'companies',
    route: 'companies',
    waitForPermissions: true,
  });
};

const testObjectPermission = (objectName, permissionName) => {
  cy.getAttached('label')
    .contains(`${objectName}`.toLowerCase())
    .parent()
    .find('button')
    .contains('ADD PERMISSION')
    .click();

  // Wait is needed to populate autocomplete with data.
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(250);
  cy.getAttached('[id*="search"]')
    .type('{downarrow}{enter}')
    .then(chart => {
      chart.click();

      cy.get('[id*="permissions"]').first().click({ force: true });
      cy.get('label').contains(permissionName).click();
      cy.contains('add permissions').click({ force: true });
      cy.contains('Save').click({ force: true });
      cy.wait('@putPermissions').its('status').should('eq', 200);

      cy.get('[id*="permissions"]').should('contain', permissionName);

      cy.get('[data-cy=delete-permission]').click({ force: true });
      cy.contains('Save').click({ force: true });
      cy.wait('@putPermissions');
    });
};

export const testUserObjectPermission = (objectName, permissionName) => {
  cy.route('PUT', makeRouteUrl('users/*/object-permissions/**')).as(
    'putPermissions'
  );
  testObjectPermission(objectName, permissionName);
};

export const testGroupObjectPermission = (objectName, permissionName) => {
  cy.route('PUT', makeRouteUrl('company-groups/*/object-permissions/**')).as(
    'putPermissions'
  );
  testObjectPermission(objectName, permissionName);
};

export const testCompanyObjectPermission = (objectName, permissionName) => {
  cy.route('PUT', makeRouteUrl('companies/*/object-permissions/**')).as(
    'putPermissions'
  );
  testObjectPermission(objectName, permissionName);
};
