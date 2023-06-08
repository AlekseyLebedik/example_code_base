import { login } from '../helpers';
import { makeNavigationUrl } from '../helpers/online_configuration';

login();

describe('Online Games', () => {
  describe('Data fetching', () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        url: `/api/v2/titles/${Cypress.env('titleId')}/envs/dev/games/**`,
      }).as('getOnlineGames');
    });

    it('Expect online games data to be fetched when opening page', () => {
      cy.visit(makeNavigationUrl({ url: 'online-games' }));
      cy.url().should('include', 'online-games');
      cy.wait('@getOnlineGames').its('status').should('eq', 200);
    });
  });
});
