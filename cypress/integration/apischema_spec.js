describe('API Schema', () => {
  it('Expect login to be successful', () => {
    cy.visit(`${Cypress.env('authUrl')}`, { timeout: 30000 });

    cy.get('#username')
      .type(`${Cypress.env('testUsername')}`)
      .should('have.value', `${Cypress.env('testUsername')}`);

    cy.get('#password')
      .type(`${Cypress.env('testPassword')}`)
      .should('have.value', `${Cypress.env('testPassword')}`);

    cy.contains('LOGIN').click();
    cy.url().should('include', 'dash');
  });

  it('Expect schema page to load', () => {
    cy.visit(`${Cypress.env('dzBackendUrl')}schema/`, { timeout: 30000 });
    cy.url().should('include', 'schema');
  });

  it('Expect healthcheck endpoint to exist', () => {
    cy.contains('healthcheck').click();
  });
});
