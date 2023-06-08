import moment from 'moment-timezone';

import { login } from '../helpers';

login();
describe('AB Testing Cohort Tests', () => {
  const DATE_TIME_WITHOUT_TIMEZONE = 'MMM DD, YYYY HH:mm';
  const catchStart = moment();
  const catchEnd = moment().add(1, 'days');

  it('Expect enrollment dates to be copied to treatment dates', () => {
    cy.visit('/abtesting/create');
    cy.contains('Enrollment Period From').parent('div').find('input').click();
    cy.get('[data-cy="calendar-picker"]')
      .find('input')
      .first()
      .clear()
      .type(catchStart.format(DATE_TIME_WITHOUT_TIMEZONE))
      .type('{enter}');
    cy.get('[data-cy="calendar-picker"]').contains('Add').click();
    cy.contains('Enrollment Period To').parent('div').find('input').click();
    cy.get('[data-cy="calendar-picker"]')
      .find('input')
      .first()
      .clear()
      .type(catchEnd.format(DATE_TIME_WITHOUT_TIMEZONE))
      .type('{enter}');
    cy.get('[data-cy="calendar-picker"]').contains('Add').click();

    cy.get('[data-cy="treatmentFrom"]').click();
    cy.get('[data-cy="treatmentTo"]').click();

    cy.contains('Enrollment Period From')
      .parent('div')
      .find('input')
      .invoke('val')
      .then(val => {
        cy.get('[data-cy="cohorts[0]"]')
          .contains('From')
          .parent('div')
          .find('input')
          .should('have.value', val);
      });

    cy.contains('Enrollment Period To')
      .parent('div')
      .find('input')
      .invoke('val')
      .then(val => {
        cy.get('[data-cy="cohorts[0]"]')
          .contains('To')
          .parent('div')
          .find('input')
          .should('have.value', val);
      });
  });
});
