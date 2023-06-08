// eslint-disable-next-line import/no-extraneous-dependencies
import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

if (Cypress.env('testEnvironment') === 'prod') {
  login();
  describe('Matchmaking', () => {
    describe('Player Activity', () => {
      const searchString = '%';
      beforeEach(() => {
        cy.server();
        cy.route(
          makeTitleUrl({
            resource: 'object-store/users/*/objects',
          })
        ).as('getUserDetails');
        cy.route(
          makeTitleUrl({
            resource: 'accounts',
            queryParams: `?q=${searchString}*`,
          })
        ).as('getUsersPartialSearch');
        cy.route(
          makeTitleUrl({
            resource: 'dispatcher-trace-telemetry',
            queryParams: `*start=*end=*player_id=*event_type=*`,
          })
        ).as('getMmpTrace');
        cy.route(
          makeTitleUrl({
            resource: 'dispatcher-telemetry',
            queryParams: `*start=*end=*player_id=*event_type=PLAYER_SEARCH_STARTED*`,
          })
        ).as('getSearchStart');
      });

      it('Expect mmp trace data to be fetched on search', () => {
        cy.visit(makeNavigationUrl({ url: 'mmp-trace' }));
        // Search for user
        cy.get('[data-cy=userAutocomplete]').type(searchString);
        cy.wait('@getUsersPartialSearch');
        cy.get('[data-cy="autocompleteOption"]').first().click();
        // Submit and wait for data to arrive correctly
        cy.get('button').contains('Search').click();
        cy.wait(['@getMmpTrace', '@getSearchStart']).then(xhrs => {
          xhrs.forEach($xhr => expect($xhr.status).to.equal(200));
        });
      });
    });

    describe('Session Viewer', () => {
      beforeEach(() => {
        cy.server();
        cy.route({
          method: 'GET',
          url: `api/v2/titles/${Cypress.env('titleId')}/envs/${Cypress.env(
            'titleEnv'
          )}/playlists/`,
        }).as('getPlaylists');
      });

      it('Expect session viewer data to be fetched on opening page', () => {
        cy.visit(makeNavigationUrl({ url: 'session-viewer' }));
        cy.url().should('include', 'session-viewer');
        cy.wait('@getPlaylists').its('status').should('eq', 200);
      });
    });

    describe('Tournament Session Viewer', () => {
      beforeEach(() => {
        cy.server();
        cy.route({
          method: 'GET',
          url: `${Cypress.env('backendUrl')}/api/v2/titles/${Cypress.env(
            'titleId'
          )}/envs/${Cypress.env('titleEnv')}/tournaments/`,
        }).as('getTournaments');
      });

      it('Expect tournament session viewer data to be fetched on opening page', () => {
        cy.visit(makeNavigationUrl({ url: 'tournament-engine' }));
        cy.url().should('include', 'tournament-engine');
        cy.wait('@getTournaments').its('status').should('eq', 200);
      });
    });

    describe('Rulesets Docs', () => {
      beforeEach(() => {
        cy.server();
        // Use fixture on qa as the service works only in Prod
        if (['qa', 'dev'].includes(Cypress.env('testEnvironment'))) {
          cy.fixture('rsDocsData.json').as('rsDocs');
          cy.route(
            'GET',
            `${Cypress.env('backendUrl')}/api/v2/titles/${Cypress.env(
              'titleId'
            )}/envs/dev/matchmaking/rulesets/`,
            '@rsDocs'
          ).as('getRsDocs');
        } else {
          cy.route({
            method: 'GET',
            url: `${Cypress.env('backendUrl')}/api/v2/titles/${Cypress.env(
              'titleId'
            )}/envs/${Cypress.env('titleEnv')}/matchmaking/rulesets/`,
          }).as('getRsDocs');
        }
      });

      it('Expect rulesets docs data to be fetched on opening page', () => {
        cy.visit(makeNavigationUrl({ url: 'matchmaking/rsdocs' }));
        cy.url().should('include', 'matchmaking/rsdocs');
        cy.wait('@getRsDocs').its('status').should('eq', 200);
      });
    });

    describe('Lobby Viewer', () => {
      const lobbyId = '1234';

      beforeEach(() => {
        cy.server();
        cy.route({
          method: 'GET',
          url: makeTitleUrl({
            resource: 'dispatcher-telemetry',
            queryParam: `*lobby_id=${lobbyId}*`,
          }),
        }).as('getLobbyTelemetry');

        cy.route({
          method: 'GET',
          url: makeTitleUrl({
            resource: 'dispatcher-trace-telemetry',
            queryParam: `*lobby_id=${lobbyId}*`,
          }),
        }).as('getLobbyTraceTelemetry');

        cy.route({
          method: 'GET',
          url: makeTitleUrl({
            resource: 'optimizer-telemetry',
            queryParam: `*lobby_id=${lobbyId}*`,
          }),
        }).as('getLobbyOptimizerTelemetry');

        cy.route({
          method: 'GET',
          url: makeTitleUrl({
            resource: 'client-telemetry',
            queryParam: `*lobby_id=${lobbyId}*`,
          }),
        }).as('getLobbyClientTelemetry');
      });

      it('Expect lobby viewer data to be fetched on search', () => {
        cy.visit(makeNavigationUrl({ url: 'lobby-viewer' }));
        // Search for lobby ID
        cy.get('#lobbyId').type(lobbyId).type('{enter}');
        // Check api calls
        cy.url().should('include', `lobby-viewer/${lobbyId}`);
        cy.wait([
          '@getLobbyTelemetry',
          '@getLobbyTraceTelemetry',
          '@getLobbyOptimizerTelemetry',
          '@getLobbyClientTelemetry',
        ]).then(xhrs => {
          xhrs.forEach($xhr => expect($xhr.status).to.equal(200));
        });
      });
    });
  });
}
