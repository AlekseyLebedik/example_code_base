import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
  makeResourceUrl,
} from '../helpers/online_configuration';

if (
  Cypress.env('testEnvironment') === 'qa' ||
  Cypress.env('testEnvironment') === 'prod'
) {
  login();
  describe('Smoke Tests', () => {
    beforeEach(() => {
      cy.server();
    });

    it('Expects Accounts page to load', () => {
      cy.route(makeTitleUrl({ resource: 'accounts', queryParams: '**' })).as(
        'getAccounts'
      );
      cy.visit(makeNavigationUrl({ url: 'accounts' }));
      cy.wait('@getAccounts', { timeout: 10000 });
      cy.get('.section-title').should('contain', 'Accounts');
      cy.get('.items-list .list-item').should('have.length.above', 10);
      cy.get('.common__search input').should('be.visible');
      cy.get('.export-component').should('be.visible');
    });
    it('Expect Title Info page to load', () => {
      cy.route(
        makeResourceUrl({ resource: 'users/self/projects', queryParams: '**' })
      ).as('getProjects');
      cy.visit(makeNavigationUrl({}));
      cy.wait('@getProjects');
      cy.get('.ag-root', { timeout: 10000 }).should('be.visible');
    });
    it('Expects Linked Accounts page to load', () => {
      const searchString = '%';
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'linked-accounts',
          queryParams: `*q=${searchString}*provider=uno*`,
        }),
      }).as('getSearch');
      cy.visit(makeNavigationUrl({ url: 'linked-accounts' }));
      cy.get('.common__search input').type(searchString).type('{enter}');
      cy.wait('@getSearch');
      cy.get('[data-cy="list-item"]').should('have.length.above', 10);
    });
    it('Expect Leaderboards to load', () => {
      cy.route(
        makeTitleUrl({
          resource: 'leaderboards',
          queryParams: '**',
        })
      ).as('getLeaderboards');
      cy.visit(makeNavigationUrl({ url: 'leaderboards' }));
      cy.wait('@getLeaderboards');
      cy.get('.section-title').contains('Leaderboards');
    });
    it('Expect Publisher Objects to load', () => {
      cy.route(
        makeTitleUrl({
          resource: 'object-store/publisher/objects',
          queryParams: '**',
        })
      ).as('getPublisherObjects');
      cy.visit(makeNavigationUrl({ url: 'object-store/publisher' }));
      cy.wait('@getPublisherObjects');
      cy.get('.section-title').contains('Publisher Objects');
      cy.get('.ag-root-wrapper').should('be.visible');
      cy.get('.ag-header-cell-text').should('have.length.above', 1);
    });
    it('Expect Publisher Objects Groups to load', () => {
      cy.route(
        makeTitleUrl({
          resource: 'groups-service/groups',
          queryParams: '**',
        })
      ).as('getObjectGroups');
      cy.visit(makeNavigationUrl({ url: 'object-store/groups' }));
      cy.wait('@getObjectGroups');
      cy.get('.section-title').contains('Groups');
    });
    it('Expect Marketplace Active Store to load', () => {
      cy.route(
        makeTitleUrl({
          resource: 'marketplace/default-store',
          queryParams: '**',
        })
      ).as('getObjectGroups');
      cy.visit(makeNavigationUrl({ url: 'marketplace/active-store' }));
      cy.wait('@getObjectGroups');
      cy.get('.section-title').contains('Active Store');
      cy.get('.ant-tabs-tab').should('have.length.above', 1);
    });
    it('Expect Marketplace Stores to load', () => {
      cy.route(
        makeTitleUrl({
          resource: 'marketplace/stores',
          queryParams: '**',
        })
      ).as('getStores');
      cy.visit(makeNavigationUrl({ url: 'marketplace/stores' }));
      cy.wait('@getStores', { timeout: 10000 });
      cy.get('.section-title').contains('Stores');
    });

    it('Expects Active Rulesets to load', () => {
      cy.route(
        makeTitleUrl({
          resource: 'achievements-engine/achievements',
          queryParams: '**',
        })
      ).as('getAchievements');
      cy.visit(makeNavigationUrl({ url: 'achievements/active-ruleset' }));

      cy.wait('@getAchievements', { timeout: 20000 });
      cy.get('.section-title').contains('Active Ruleset');
      cy.get('.ag-root-wrapper-body').should('be.visible');
    });
    it('Expects Rulesets to load', () => {
      cy.visit(makeNavigationUrl({ url: 'achievements/rulesets' }));
      cy.get('.section-title').contains('Rulesets');
      cy.get('.details-empty__text').contains(
        'Select a Ruleset to see more details'
      );
    });
    it('Expects Achievements to load', () => {
      cy.visit(makeNavigationUrl({ url: 'achievements/player-achievements/' }));
      cy.get('[class^="Empty_container"]', { timeout: 10000 }).contains(
        'Select a Player to view their Achievements data'
      );
    });
    it('Expects Call Search to load', () => {
      cy.visit(makeNavigationUrl({ url: 'debugging/call-search' }));
      cy.get('.section-title').contains('Calls');
      cy.get('.details-empty__text').contains(
        'Select a Call to see more details'
      );
    });
    it('Expects IMP History to load', () => {
      cy.visit(makeNavigationUrl({ url: 'imp' }));
      cy.get('.section-title').contains('IMP History');
    });
    it('Expects AB-Testing to load', () => {
      cy.visit('/abtesting/schedule');
      cy.get('.ag-theme-material', { timeout: 20000 }).should('be.visible');
    });
  });
}
