export const checkViewSelectValue = value => {
  cy.get('[data-cy="calendarToolbarViewSelect"]')
    .find('div[role="button"]')
    .should('contain', value);
};
