import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

login();

describe('Navigation Bar', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: makeTitleUrl({
        resource: 'mmp',
        queryParams: '**',
      }),
    }).as('getMmp');
    cy.visit(makeNavigationUrl({}));
    cy.wait('@getMmp');
  });

  it('Expect title selector to expand and close', () => {
    // is visible
    cy.get('.title-selector__container').should('be.visible');
    // expands on click
    cy.get('.title-selector__container').click();
    cy.get('.title-selector__container #titles-dropdown').should('be.visible');
    // closes on click when expanded
    cy.get('.title-selector__container').click();
    cy.get('.title-selector__container #titles-dropdown').should('not.exist');
  });

  it('Expect Mega Menu to contain the links', () => {
    cy.get('button[title*="Apps"]').click();
    cy.contains('Title Info').should('be.visible');
    cy.contains('Matchmaking').should('be.visible');
    cy.contains('Accounts').should('be.visible');
    cy.contains('Graphs').should('be.visible');
    cy.contains('Leaderboards').should('be.visible');
    cy.contains('ObjectStore').should('be.visible');
    cy.contains('Marketplace').should('be.visible');
    cy.contains('Achievements').should('be.visible');
    cy.contains('Debugging').should('be.visible');
    cy.contains('IMP History').should('be.visible');
    cy.contains('Security').should('be.visible');
  });

  it('Expect search to filter correctly', () => {
    cy.get('button[title*="Apps"]').click();
    cy.get('[data-cy="megamenu-search-input"] input').type('Obj');
    cy.get('[data-cy="megamenu-search-input"]').should(
      'have.class',
      'Mui-focused'
    );
    cy.get('span')
      .should('contain', 'ObjectStore')
      .and('not.contain', 'Achievements');
  });
});
