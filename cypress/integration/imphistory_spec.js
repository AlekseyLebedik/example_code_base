import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

login();

describe('IMP History', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: makeTitleUrl({
        resource: 'imps',
      }),
    }).as('getImps');

    cy.route({
      method: 'GET',
      url: makeTitleUrl({
        resource: 'leaderboards/1/entities',
      }),
    }).as('getLeaderboardDetails');
  });

  it('Expect IMP data to be fetched on opening page', () => {
    cy.visit(makeNavigationUrl({ url: 'imp' }));
    cy.url().should('include', 'imp');
  });
});
