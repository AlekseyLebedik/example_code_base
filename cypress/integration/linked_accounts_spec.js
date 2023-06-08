import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

login();

describe('Linked Accounts', () => {
  const searchString = '%';
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: makeTitleUrl({
        resource: 'linked-accounts',
        queryParams: '*provider=uno*',
      }),
    }).as('getLinkedAccountsUNO');

    cy.route({
      method: 'GET',
      url: makeTitleUrl({
        resource: 'linked-accounts',
        queryParams: `*q=${searchString}*provider=uno*`,
      }),
    }).as('getSearch');

    cy.route({
      method: 'GET',
      url: makeTitleUrl({
        resource: 'linked-accounts',
        queryParams: `*q=${searchString}*provider=psn*`,
      }),
    }).as('getSearchPsn');
    cy.visit(makeNavigationUrl({ url: 'linked-accounts' }));
    // Default provider is UNO
    cy.wait('@getLinkedAccountsUNO').its('status').should('eq', 200);
  });

  it('Expect linked accounts to be filtered on search', () => {
    cy.get('.common__search input').type(searchString).type('{enter}');
    cy.wait('@getSearch').its('status').should('eq', 200);
  });
  it('Expect linked accounts to be fetched with a different provider on changing provider input', () => {
    // Change provider
    cy.get('[data-cy="providerSelector"]').click();
    cy.get('li[role="option"][data-value="psn"]').click();
    cy.get('.common__search input').type(searchString).type('{enter}');
    cy.wait('@getSearchPsn').its('status').should('eq', 200);
  });
});
