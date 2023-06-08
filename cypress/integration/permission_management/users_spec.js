import { login } from '../../helpers';
import {
  userName,
  groupName,
  companyName,
  makeUrl,
  makeRouteUrl,
  visitPage,
  testUserObjectPermission,
  searchContentType,
} from '../../helpers/permission_management';

login();

describe('Navigation and redirection', () => {
  before(() => {
    cy.visit(makeUrl('users'));
  });

  it('Navigation displays three options', () => {
    cy.getAttached('a').contains('Users');
    cy.getAttached('a').contains('Groups');
    cy.getAttached('a').contains('Companies');
  });

  it('Clicking navigation item redirects correctly', () => {
    cy.server();
    cy.route(makeRouteUrl('users/**')).as('getUsers');
    cy.route(makeRouteUrl('company-groups/**')).as('getGroups');
    cy.route(makeRouteUrl('companies/**')).as('getCompanies');

    cy.get('a[href*="groups"]').contains('Groups').click();
    cy.url().should('include', makeUrl('groups'));
    cy.wait('@getGroups').its('status').should('eq', 200);

    cy.get('a[href*="companies"]').contains('Companies').click();
    cy.url().should('include', makeUrl('companies'));
    cy.wait('@getCompanies').its('status').should('eq', 200);

    cy.get('a[href*="users"]').contains('Users').click();
    cy.url().should('include', makeUrl('users'));
    cy.wait('@getUsers').its('status').should('eq', 200);
  });
});

describe('Permission Management', () => {
  // We can't give a test user permission to delete user object permissions in prod
  if (Cypress.env('testEnvironment') === 'prod') {
    return;
  }
  // We can't run parallel builds changing permissions on the same user
  if (Cypress.env('testEnvironment') === 'dev') {
    return;
  }

  describe('Users - Companies/Groups', () => {
    before(() => {
      visitPage({ searchName: userName });
      cy.deleteMemberships();
    });

    beforeEach(() => {
      visitPage({ searchName: userName });
    });

    it('Details page is empty', () => {
      cy.visit(makeUrl('users'));
      cy.getAttached('.detail__container').should(
        'contain',
        'Select an item to get more details'
      );
    });

    it('Details page', () => {
      cy.get('.detail__container').should($detail => {
        expect($detail).to.contain('Companies / Groups');
        expect($detail).to.contain('advanced');
        expect($detail).to.contain('Associated Companies');
        expect($detail).to.contain('Permission Groups');
      });
    });

    it('Company can be associated with the user', () => {
      cy.route('PUT', makeRouteUrl('users/*/memberships/**')).as(
        'putMemberships'
      );
      cy.get('#mui-component-select-companies').click();
      cy.get('li')
        .contains(companyName)
        .then(company => {
          const companyID = parseInt(company.attr('data-value'), 10);
          company.click();
          cy.contains('Save').click({ force: true });
          cy.wait('@putMemberships');
          cy.get('@putMemberships').should(({ status, requestBody }) => {
            expect(status).to.eq(204);
            expect(requestBody).to.eql({
              companies: [{ id: companyID }],
            });
          });
        });
    });

    it('Group can be associated with the user', () => {
      cy.route(makeRouteUrl('users/*/company-groups/**')).as(
        'getCompanyGroups'
      );
      cy.route(makeRouteUrl('company-groups/**')).as(
        'getSelectedCompanyGroups'
      );
      cy.route('PUT', makeRouteUrl('users/*/company-groups/**')).as(
        'putCompanyGroups'
      );

      cy.wait('@getSelectedCompanyGroups');
      cy.get('#mui-component-select-groups').click();
      cy.get('li')
        .contains(groupName)
        .then(group => {
          const groupID = parseInt(group.attr('data-value'), 10);
          group.click();
          cy.contains('Save').click({ force: true });
          cy.wait('@putCompanyGroups');
          cy.wait('@getCompanyGroups');
          cy.get('@putCompanyGroups').should(({ status, requestBody }) => {
            expect(status).to.eq(204);
            expect(requestBody).to.eql({
              groups: [{ id: groupID }],
            });
          });
        });
    });
  });

  const postSearchAction = () => {
    cy.get('.detail__container').contains('advanced').click();
  };

  describe('Users - Advanced', () => {
    before(() => {
      visitPage({ searchName: userName });
      cy.deleteUserObjectPermissions();
    });

    it('Details page', () => {
      visitPage({
        searchName: userName,
        postSearchAction,
      });
      cy.get('.detail__container').should($detail => {
        expect($detail).to.contain('company');
        expect($detail).to.contain('project');
        expect($detail).to.contain('titleenv');
      });
    });

    it('Buttons are disabled', () => {
      visitPage({
        searchName: userName,
        postSearchAction,
      });
      cy.get('.detail__container').within(() => {
        cy.get('[data-cy="reset-form-button"]').should('be.disabled');
        cy.get('[data-cy="save-form-button"]').should('be.disabled');
      });
    });

    it('Add Change accounts permission to Company object', () => {
      visitPage({
        searchName: userName,
        waitForPermissions: true,
        postSearchAction,
      });
      testUserObjectPermission('Company', 'Change accounts');
    });

    it('Add Cohort Overrides permission to Project object', () => {
      visitPage({
        searchName: userName,
        waitForPermissions: true,
        postSearchAction,
      });
      testUserObjectPermission('Project', 'Add Cohort Overrides');
    });

    it('Add Activate rulesets permission to Titleenv object', () => {
      visitPage({
        searchName: userName,
        waitForPermissions: true,
        postSearchAction,
      });
      testUserObjectPermission('Titleenv', 'Activate rulesets');
    });
  });
});

describe('Permission Feature Flags', () => {
  describe('Users - Feature Flags', () => {
    before(() => {
      cy.server();
    });

    const postSearchAction = () => {
      cy.get('.detail__container').contains('feature flags').click();
    };

    it('Feature Flags page', () => {
      searchContentType(userName, 'users');
      postSearchAction();
      cy.get('.detail__container').should($detail => {
        expect($detail).to.contain('Name');
        expect($detail).to.contain('Active');
        expect($detail).to.contain('Note');
        expect($detail).to.contain('Type');
      });
    });
  });
});

describe('Permission Helper', () => {
  describe('Users - Permission Helper', () => {
    before(() => {
      cy.server();
    });

    const postSearchAction = () => {
      cy.get('.detail__container').contains('permission helper').click();
    };

    it('Permission Helper page', () => {
      postSearchAction();
      cy.get('.detail__container').should($detail => {
        expect($detail).to.contain('Type');
        expect($detail).to.contain('Sub-Type');
        expect($detail).to.contain('Permissions');
        expect($detail).to.contain('Find');
      });
    });
  });
});
