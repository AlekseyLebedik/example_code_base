import moment from 'moment-timezone';
import range from 'lodash/range';

import { login } from '../helpers';

login();

const createNewAuditLog = () => ({
  username: 'testuser',
  userType: 'dwsproxy',
  timestamp: 1557420373,
  category: 'Devzone.Admin.TestAction.SubAction',
  auditContext: 'context_test',
  auditTitleId: 1111,
  auditEnv: 'dev',
  entityID: '1009',
  entityName: 'user_b',
  sourceName: 'auditlog',
  context: 'important_context',
  titleID: '1111',
  env: 'dev',
  timestampMillis: 1557420373808,
  extra: {
    example_specific_property: 46,
  },
});

const auditLogData = {
  data: range(100).map(() => createNewAuditLog()),
  nextPageToken: 'CAE',
};

const emtpyData = { data: [], nextPageToken: null };

describe('Audit Logs', () => {
  // We can't test Audit Logs without a superuser which isn't safe in test automation
  // So we just early return here
  if (Cypress.env('testEnvironment') === 'prod') {
    return;
  }
  const username = 'zuser';
  const url = 'audit-logs';
  const route = '/api/v2/auditlog/**';
  const searchRoute = '/api/v2/auditlog/?username=*';

  describe('Search form', () => {
    beforeEach(() => {
      cy.server();
      if (Cypress.env('testEnvironment') === 'dev') {
        cy.route(route, auditLogData).as('getAuditLogs');
      } else {
        cy.route(route).as('getAuditLogs');
      }
      cy.visit(url);
      cy.wait('@getAuditLogs');
    });

    it('Expect audit logs search form contains the following fields', () => {
      const from = moment();
      const to = moment().add(1, 'days');
      const titleID = '2346';
      const env = 'dev';
      const userType = 'dwsproxy';
      const entityID = '111';
      const entityName = 'user_a';
      const category = 'Objectstore.PublisherObject.Update';
      const context = '5727';
      const sourceName = 'storage_objectstore';
      const extra = 'entity_count:1';

      cy.contains('Period From').siblings().children('input').as('periodFrom');
      cy.updateDateTimePicker({
        selector: '@periodFrom',
        date: from,
      });

      cy.contains('Period To').siblings().children('input').as('periodTo');
      cy.updateDateTimePicker({
        selector: '@periodTo',
        date: to,
      });

      cy.get('input[name="username"]')
        .type(username)
        .should('have.value', username);
      cy.get('input[name="titleID"]')
        .type(titleID)
        .should('have.value', titleID);
      cy.get('input[name="env"]').type(env).should('have.value', env);
      cy.get('textarea[name="userType"]')
        .type(userType)
        .should('have.value', userType);
      cy.get('textarea[name="entityID"]')
        .type(entityID)
        .should('have.value', entityID);
      cy.get('textarea[name="entityName"]')
        .type(entityName)
        .should('have.value', entityName);
      cy.get('textarea[name="category"]')
        .type(category)
        .should('have.value', category);
      cy.get('textarea[name="context"]')
        .type(context)
        .should('have.value', context);
      cy.get('textarea[name="sourceName"]')
        .type(sourceName)
        .should('have.value', sourceName);
      cy.get('textarea[name="extra"]').type(extra).should('have.value', extra);
    });

    it('Expect audit logs to be filtered by username', () => {
      cy.get('input[name="username"]').type(username);
      cy.get('form').submit();

      cy.url().should('include', `username=${username}`);
    });
  });

  describe('Url params', () => {
    const titleID = '2346';
    const env = 'dev';

    beforeEach(() => {
      cy.server();
      if (Cypress.env('testEnvironment') === 'dev') {
        cy.route(route, auditLogData).as('getAuditLogs');
      } else {
        cy.route(route).as('getAuditLogs');
      }
      cy.visit(`${url}?username=${username}&env=${env}&titleID=${titleID}`);
      cy.wait('@getAuditLogs');
    });

    it('Expect form fields will be populated with values if url contains search parameters', () => {
      cy.get('input[name="username"]').should('have.value', username);
      cy.get('input[name="titleID"]').should('have.value', titleID);
      cy.get('input[name="env"]').should('have.value', env);
    });
  });

  describe('Search results', () => {
    beforeEach(() => {
      cy.server();
      if (Cypress.env('testEnvironment') === 'dev') {
        cy.route(route, emtpyData).as('getAuditLogs');
        cy.route(searchRoute, emtpyData).as('getAuditLogsSearch');
      } else {
        cy.route(route).as('getAuditLogs');
        cy.route(searchRoute).as('getAuditLogsSearch');
      }
      cy.visit(url);
      cy.wait('@getAuditLogs');
    });

    it('Expect no results to be displayed', () => {
      cy.get('[role="progressbar"]').should('have.length', 0);
      cy.get('input[name="username"]').type(username);
      cy.get('form').submit();

      cy.wait('@getAuditLogsSearch');
      cy.get('[data-cy="audit-logs-loading"]').should('not.be.visible');
      cy.get('[data-cy="audit-logs-table"]').within(() => {
        cy.contains('Total Rows')
          .parent('div')
          .find('strong')
          .last()
          .should(total => {
            expect(total).to.be.text('0');
          });
      });
    });

    it('Expect the following columns to be displayed', () => {
      cy.get('[role="progressbar"]').should('have.length', 0);
      cy.get('[data-cy="audit-logs-table"]').within(() => {
        cy.contains('Username').should('be.visible');
        cy.contains('User Type').should('be.visible');
        cy.contains('Category').should('be.visible');
        cy.contains('Audit Context').should('be.visible');
        cy.contains('Context').should('be.visible');
        cy.contains('Audit Title ID').should('be.visible');
        cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('50%');
        cy.contains('Entity Name', { timeout: 10000 }).should('be.visible');
        cy.contains('Title ID').should('be.visible');
        cy.contains('Audit Env').should('be.visible');
        cy.contains('Env').should('be.visible');
        cy.contains('Entity ID').should('be.visible');
        cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('right');
        cy.contains('Timestamp', { timeout: 10000 }).should('be.visible');
        cy.contains('Source Name').should('be.visible');
        cy.contains('Extra').should('be.visible');
      });
    });
  });
});
