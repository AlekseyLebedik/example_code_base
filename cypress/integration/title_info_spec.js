import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

login();

describe('Title Info', () => {
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

  it('Expect Title Info tab to redirect to title info page', () => {
    cy.get('.ag-root').should('be.visible');
    cy.get('.ag-row-level-0').should($headers => {
      expect($headers).to.contain('Services');
      expect($headers).to.contain('Statistics');
    });
  });
});
