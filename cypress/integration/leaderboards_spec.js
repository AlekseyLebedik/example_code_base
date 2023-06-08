import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

login();

describe('Leaderboards', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: makeTitleUrl({
        resource: 'leaderboards',
        queryParams: '**',
      }),
    }).as('getLeaderboards');

    cy.route({
      method: 'GET',
      url: makeTitleUrl({
        resource: 'leaderboards/*/entities',
        queryParams: '**',
      }),
    }).as('getLeaderboardDetails');

    cy.visit(makeNavigationUrl({ url: 'leaderboards' }));
    cy.wait('@getLeaderboards');
  });

  it('Expect leaderboards data to be fetched on opening page', () => {
    cy.url().should('include', 'leaderboards');
    cy.get('.items-list').should('be.visible');
  });

  it('Expect leaderboard details to be fetched on clicking list item', () => {
    cy.get('.list-item').eq(0).click();
    cy.wait('@getLeaderboardDetails');
    cy.get('.common__search').should('be.visible');
  });
});
