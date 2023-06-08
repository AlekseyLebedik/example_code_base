import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

login();

describe('Devzone Studio', () => {
  beforeEach(() => {
    cy.server();

    cy.route({
      method: 'GET',
      url: `/api/v2/envs/${Cypress.env('titleEnvId')}/`,
    }).as('getEnv');

    cy.route({
      method: 'GET',
      url: `/api/v2/titles/${Cypress.env('titleId')}/envs/${Cypress.env(
        'titleEnv'
      )}/`,
    }).as('getEnvData');

    cy.route({
      method: 'GET',
      url: makeTitleUrl({
        resource: 'stats',
        queryParams: '**',
      }),
    }).as('getStats');

    cy.route({
      method: 'GET',
      url: makeTitleUrl({
        resource: 'mmp',
        queryParams: '**',
      }),
    }).as('getMmp');

    cy.route({
      url: makeTitleUrl({
        resource: 'marketplace',
        queryParams: '**',
      }),
    }).as('getMarketplace');

    cy.route({
      url: makeTitleUrl({
        resource: 'achievements-engine',
        queryParams: '**',
      }),
    }).as('getAe');

    cy.route({
      url: makeTitleUrl({
        resource: 'storages',
        queryParams: '**',
      }),
    }).as('getStorages');

    cy.route({
      url: makeTitleUrl({
        resource: 'cluster',
        queryParams: '**',
      }),
    }).as('getCluster');
  });

  it('Expect title data to be fetched on opening page', () => {
    cy.visit(makeNavigationUrl({}));

    if (Cypress.env('testEnvironment') !== 'dev') {
      cy.wait(['@getEnv', '@getEnvData', '@getStorages']).then(xhrs => {
        xhrs.forEach($xhr => expect($xhr.status).to.equal(200));
      });
    }
    cy.wait(['@getMmp', '@getMarketplace', '@getAe', '@getCluster']).then(
      xhrs => {
        xhrs.forEach($xhr => expect($xhr.status).to.equal(200));
      }
    );
    cy.title().should('contain', 'Devzone');
  });
});
