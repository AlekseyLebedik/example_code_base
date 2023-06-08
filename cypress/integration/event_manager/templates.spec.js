// import { emLogin } from '../../helpers/event_manager';

const templateTitle = 'E2E template test';

// emLogin();

describe('Templates', () => {
  describe('Templates Sidebar', () => {
    describe('Testing list items to display', () => {
      it('Expects the template sidebar to have no list items', () => {
        cy.navigateToTemplates({
          response: 'fixture:event_manager/templates/emptyTemplatesData',
        });
        cy.get('.items-list').should('not.exist');
      });
      it('Expects the template sidebar to have list items', () => {
        cy.navigateToTemplates({
          response: 'fixture:event_manager/templates/templatesData',
        });
        cy.get('.empty-list').should('not.exist');
      });
    });
    describe('Testing template creation', () => {
      const FORM_VALUES = {
        title: templateTitle,
        description: 'E2E test description',
      };
      beforeEach(() => {
        cy.navigateToTemplates();
        cy.server();
        cy.route({
          method: 'POST',
          url: 'api/v2/playpants/templates/*',
        }).as('createTemplate');
        cy.get('[data-cy=open-template-dialog-button]').click({ force: true });
        cy.get('[data-cy=template-name-field]').type(FORM_VALUES.title);
        cy.get('[data-cy=template-description-field]').type(
          FORM_VALUES.description
        );
      });
      it('Expects to successfully create an unrestricted template with no duration', () => {
        cy.get(
          '[data-cy=template_sidebar__submit-create-template-form]'
        ).click();
        cy.wait('@createTemplate').then(xhr => {
          expect(xhr.status).to.equal(201);
          cy.location('pathname').should(
            'eq',
            `/event-manager/${Cypress.env('projectId')}/templates/${
              xhr.responseBody.source_event
            }`
          );
        });
      });
    });
    describe('Testing template search', () => {
      it('Expects the sidebar to filter template list items', () => {
        cy.navigateToTemplates();
        cy.get('.common__search input').type(`${templateTitle}{enter}`);
        cy.get('.items-list > div').should('have.length', 1);
      });
      it('Expects the sidebar to be empty on unmatch filter response', () => {
        cy.navigateToTemplates({
          response: 'fixture:event_manager/templates/emptyTemplatesData',
        });
        cy.get('.common__search input').type('123{enter}');
        cy.get('.items-list').should('not.exist');
        cy.get('.empty-list').should('have.length', 1);
      });
    });
    describe('Testing template deletion', () => {
      it('Successfully deletes template', () => {
        cy.navigateToTemplates();
        cy.get('.common__search input').type(`${templateTitle}{enter}`);
        cy.get('.items-list > div').click();
        cy.get('.items-list').find('span').contains('delete_forever').click();
        cy.get('.MuiDialogActions-root')
          .find('span')
          .contains('Delete')
          .click();
      });
    });
  });
});
