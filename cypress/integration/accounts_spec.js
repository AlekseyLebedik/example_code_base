import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

const ACCOUNTS_URL = makeNavigationUrl({
  url: 'accounts',
});
const accountsSelectedUrl = userID =>
  makeNavigationUrl({ url: `accounts/${userID}` });

const accountsSearchUrl = searchString =>
  makeNavigationUrl({ url: `accounts/?q=${searchString}` });

const accountsSelectedAndSearchUrl = (userId1, userId2) =>
  makeNavigationUrl({ url: `accounts/${userId1}/?q=${userId2}` });

const accountsTimeout = 30000;

login();
describe('Accounts', () => {
  beforeEach(() => {
    cy.server();
    if (
      Cypress.env('testEnvironment') === 'qa' ||
      Cypress.env('testEnvironment') === 'prod'
    ) {
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'accounts**',
          queryParams: '',
        }),
      }).as('getAccounts');
    } else {
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'accounts',
        }),
      }).as('getAccounts');
    }
  });
  describe('Accounts', () => {
    it('Expect the Accounts section to load successfully', () => {
      cy.visit(ACCOUNTS_URL);
      cy.get('.section-title').contains('shown');
      cy.wait('@getAccounts', { timeout: accountsTimeout });
    });
  });

  describe('Details', () => {
    beforeEach(() => {
      cy.visit(ACCOUNTS_URL);
      cy.wait('@getAccounts', { timeout: accountsTimeout });
      cy.get('.detail__container').should('be.visible');
    });

    it('Expect accounts to have empty detail when nothing is selected', () => {
      cy.get('.detail__container').should(
        'contain',
        'Select an Account to see more details'
      );
    });

    it('Expect to contain a list populated with data', () => {
      cy.get('.items-list .list-item').as('accounts');
      cy.get('@accounts').should('have.length.above', 10);
      cy.get('.common__search input').should('be.visible');
      cy.get('.export-component').should('be.visible');
      if (cy.get('@accounts').its('length') > 100) {
        cy.get('.NextPageButton').should('be.visible');
      }
    });
  });

  describe('User details', () => {
    beforeEach(() => {
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'accounts',
          queryParams: '?q=*',
        }),
      }).as('searchAccounts');

      cy.visit(ACCOUNTS_URL);
      cy.wait('@getAccounts');
      cy.get('.items-list .list-item').first().as('firstItem');
      cy.get('.items-list .list-item').last().as('lastItem');
    });

    it('Expect search field in list to filter accounts', () => {
      cy.get('.detail__container').as('detailsContainer');

      cy.get('@firstItem').within($item => {
        cy.get('.user-name').then(() => {
          cy.wrap($item).click().should('have.class', 'selected');
        });
      });
      cy.get('.common__searchable-list').as('list');
      cy.get('.common__search input').as('searchInput');

      cy.get('@lastItem').within($item => {
        cy.wrap($item).should('not.be.visible');
        cy.get('#userId').then($userId => {
          const userId = $userId.text();

          cy.get('@searchInput').type(userId).type('{enter}');

          cy.get('@list')
            .find('.list-item.account')
            .should('have.length', 1)
            .and('contain', userId);

          cy.url().should('contain', userId);
          cy.wait('@searchAccounts');
        });
      });
      cy.get('@firstItem').click();
      cy.get('@firstItem')
        .get('#userId')
        .then($userId => {
          cy.url().should('contain', accountsSelectedUrl($userId.text()));
        });

      cy.get('@firstItem')
        .get('#userId')
        .then($userId => {
          const userId = $userId.text();
          cy.visit(accountsSearchUrl(userId));
          cy.wait('@searchAccounts');
          cy.get('.common__search input').should('have.value', userId);
        });

      cy.get('@firstItem')
        .get('#userId')
        .then($userId1 => {
          cy.get('@lastItem')
            .get('#userId')
            .then($userId2 => {
              const text1 = $userId1.text();
              const text2 = $userId2.text();
              cy.visit(accountsSelectedAndSearchUrl(text1, text2));
              cy.wait('@searchAccounts');
              cy.get('.common__search input').should('have.value', text2);
            });
        });
    });
  });
});
