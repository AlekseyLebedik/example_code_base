import { login } from '../helpers';

import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

login();
describe('Localized Strings', () => {
  describe('View and upload Strings sets', () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'localized-strings/contexts',
        }),
      }).as('getContext');
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'localized-strings/string-set-names/*',
        }),
      }).as('getStringSetNames');
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'localized-strings/string-sets/*/*',
        }),
      }).as('getStringSets');
      cy.route({
        method: 'POST',
        url: makeTitleUrl({
          resource: 'localized-strings/string-sets/*/*',
        }),
      }).as('postStringSets');
      cy.visit(
        makeNavigationUrl({
          url: 'localized-strings/view',
        })
      );
    });

    it('Expect context, string set names and string sets to be fetched on opening page', () => {
      cy.url().should('include', 'localized-strings/view');
      cy.wait('@getContext').its('status').should('eq', 200);
      cy.wait('@getStringSetNames').its('status').should('eq', 200);
      cy.wait('@getStringSets').its('status').should('eq', 200);
    });

    it('Expect context selector to be visible', () => {
      cy.url().should('include', 'localized-strings/view');
      cy.wait('@getStringSets').its('status').should('eq', 200);
      cy.get('[data-cy="context-select-dropdown"]').click();
    });

    it('Expect string set version to be fetched on string set version change', () => {
      cy.url().should('include', 'localized-strings/view');
      cy.get('[data-cy="string-set-version-1"]').click();
      cy.wait('@getStringSets').its('status').should('eq', 200);
    });

    it('Expect string set upload form be visible and validation to work', () => {
      cy.url().should('include', 'localized-strings/view');
      cy.wait('@getStringSets').its('status').should('eq', 200);
      cy.get('[data-cy="upload-string-set-button"]').click();
      cy.get('[data-cy="add-string-set-form-dialog"]').as('uploadForm');
      cy.get('@uploadForm').find('.react-monaco-editor-container').as('editor');
      cy.get('@editor').should('be.visible');

      // Validation
      cy.get('[data-cy="upload-string-set-buttton"]').click();
      cy.get('[data-cy="valuesError"]').contains('Required');

      const error = 'Make sure the input is a valid JSON';
      cy.get('@editor').click().focused().type('INVALID');
      cy.get('[data-cy="upload-string-set-buttton"]').click();
      cy.get('[data-cy="valuesError"]').contains(error);

      cy.get('@editor')
        .click()
        .focused()
        .clear()
        .type('{{}"E2Etest":"test"{}}');
      cy.get('[data-cy="upload-string-set-buttton"]').click();
      cy.get('[data-cy="json-form-error"]').should('be.visible');
      cy.wait('@postStringSets').its('status').should('eq', 400);
    });
  });
});
