import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

const ACCOUNTS_URL = makeNavigationUrl({
  url: 'accounts',
});
const accountsSelectedUrl = userID =>
  `/online-configuration/${Cypress.env('titleId')}/${Cypress.env(
    'titleEnv'
  )}/accounts/${userID}`;

login();

describe('Accounts', () => {
  describe('Account Details', () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        url: makeTitleUrl({
          resource: 'accounts',
          queryParams: '**',
        }),
      }).as('getAccounts');

      cy.route({
        url: makeTitleUrl({
          resource: 'accounts',
          queryParams: '*/**',
        }),
      }).as('getAccountDetails');
      cy.route({
        url: makeTitleUrl({
          resource: 'accounts',
          queryParams: '*/keys/**',
        }),
      }).as('getUserKeys');
      cy.route({
        url: makeTitleUrl({
          resource: 'accounts',
          queryParams: '*/teams/**',
        }),
      }).as('getUserTeams');
      cy.route({
        url: makeTitleUrl({
          resource: 'accounts',
          queryParams: '*/friends/**',
        }),
      }).as('getUserFriends');
      cy.visit(ACCOUNTS_URL);

      cy.wait('@getAccounts');

      cy.get('.items-list .list-item').first().as('firstItem');
    });

    it('Expect account details tabs to fetch the relevant data', () => {
      cy.get('@firstItem')
        .get('#userId')
        .invoke('text')
        .then(text => {
          cy.visit(accountsSelectedUrl(text));
          cy.wait('@getAccountDetails');

          cy.get('.details__container.account .ant-tabs-tab').as('tabs');
          cy.get('@tabs').should('have.length', 4);
          cy.get('@tabs').first().should('have.class', 'ant-tabs-tab-active');

          cy.get('@tabs').each($el => {
            cy.wrap($el).click().should('have.class', 'ant-tabs-tab-active');
          });

          // check all the tabs receive the active class when are clicked
          cy.get('@tabs').eq(0).click();

          // check user detail tab
          cy.get('.user-details h4').should($headers => {
            expect($headers).to.have.length(3);
            expect($headers.eq(0)).to.contain('Reputation');
            expect($headers.eq(1)).to.contain('private Profile');
            expect($headers.eq(2)).to.contain('public Profile');
          });

          cy.get('.user-details .ag-root-wrapper').as('tables');
          cy.get('@tables').should('have.length', 2);
          cy.get('@tables').each($el => {
            cy.wrap($el).within(() => {
              cy.get('.ag-header-row .ag-header-cell').should($columns => {
                expect($columns).to.have.length(2);
                expect($columns.eq(0)).to.contain('Key');
                expect($columns.eq(1)).to.contain('Value');
              });
            });
          });

          cy.get('.details__container.account .ant-tabs-tab')
            .contains('User Keys')
            .click();
          cy.wait('@getUserKeys');
          cy.get('.user-keys h4').should($headers => {
            expect($headers).to.have.length(2);
            expect($headers.eq(0)).to.contain('Dedicated Keys');
            expect($headers.eq(1)).to.contain('Non-dedicated Keys');
          });

          cy.get('.user-keys .common__table-hydrated').as('tables');
          cy.get('@tables').should('have.length', 2);
          cy.get('@tables').each($el => {
            cy.wrap($el).within(() => {
              cy.get('th').should($columns => {
                expect($columns).to.have.length(2);
                expect($columns.eq(0)).to.contain('Index');
                expect($columns.eq(1)).to.contain('Value');
              });
            });
          });

          // MODAL ADD NEW KEY
          cy.get('.user-keys .add-user-key').as('addButton');
          cy.get('@addButton').should('have.length', 1);
          cy.get('@addButton').click();

          cy.get('.account-details__tabs__user-keys__add-key-form').as(
            'addKeyForm'
          );
          cy.get('@addKeyForm').should('have.length', 1);
        });
    });
  });
});
