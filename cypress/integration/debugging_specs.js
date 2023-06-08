/* eslint-disable cypress/no-unnecessary-waiting */
import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

login();

describe('Debugging', () => {
  describe('Call search', () => {
    describe('Expect call search data to be fetched on opening page', () => {
      const transactionId = '1234';
      beforeEach(() => {
        cy.server();

        cy.route({
          method: 'GET',
          url: makeTitleUrl({
            resource: 'mmp/calls',
            queryParams: `?q=*`,
          }),
        }).as('getCallSearchEmpty');

        cy.route({
          method: 'GET',
          url: makeTitleUrl({
            resource: 'mmp/calls',
            queryParams: `?q=${transactionId}*`,
          }),
        }).as('getCallSearchInput');
      });

      it('Expect search input to filter calls', () => {
        cy.visit(makeNavigationUrl({ url: 'debugging/call-search' }));
        cy.url().should('include', 'debugging/call-search');

        cy.wait('@getCallSearchEmpty');

        cy.get('.common__search input')
          .type(transactionId)
          .type('{enter}')
          .trigger('input');
        cy.wait('@getCallSearchInput').its('status').should('eq', 200);
      });
    });
  });

  describe('Server logs', () => {
    const SERVER_LOGS_TIMEOUT = 35000;
    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'logs',
        }),
      }).as('getServerLogs');
    });

    it('Expect server logs to be fetched on opening page', () => {
      cy.visit(makeNavigationUrl({ url: 'debugging/server-logs' }));

      cy.url().should('include', 'debugging/server-logs');

      cy.wait('@getServerLogs', { timeout: SERVER_LOGS_TIMEOUT })
        .its('status')
        .should('eq', 200);
    });

    it('Expect transaction logs to be fetched on clicking adjacent message button', () => {
      cy.visit(makeNavigationUrl({ url: 'debugging/server-logs' }));
      cy.wait('@getServerLogs', { timeout: SERVER_LOGS_TIMEOUT });
      cy.get('.ag-overlay-loading-center').should('not.exist');
      cy.wait(1500); // Needed for grid to finish setting layout
      cy.get('.ag-center-cols-viewport').scrollTo('100%');
      cy.wait(1000); // Needed for the button to fire request when clicked
      cy.get('[data-cy="adjacentMessageButton"]')
        .find('.MuiIcon-root', { timeout: 6000 })
        .should('be.visible');
      cy.getAttached('[data-cy="adjacentMessageButton"]')
        .first()
        .click({ force: true });
      cy.wait('@getServerLogs', { timeout: SERVER_LOGS_TIMEOUT });
    });
  });
});
