import { makeResourceUrl } from './index';

export const createActivity = (type, callback = () => {}) =>
  describe('Create Activity', () => {
    it(type, () => {
      cy.createActivity(type);
      callback();
    });
  });

export const selectActivityTitle = ({
  id = undefined,
  callback = () => {},
} = {}) => {
  describe('Activity Title Env', () => {
    it('Check that no activity details show up', () => {
      cy.contains('Please select a title to continue').should('be.visible');
    });
    it('Select a title', () => {
      cy.selectActivityTitle(id);
      callback();
    });
  });
};

export const selectActivityContext = ({
  id = undefined,
  callback = () => {},
} = {}) => {
  describe('Activity Context', () => {
    it('Check that no activity details show up', () => {
      cy.contains('Please select a context to continue').should('be.visible');
    });
    it('Select a context', () => {
      cy.selectActivityContext(id);
      callback();
    });
  });
};

export const renameActivity = name => {
  describe('Rename Activity', () => {
    beforeEach(() => {
      cy.server();
      cy.route(makeResourceUrl({ resource: `events` })).as('refetchEvent');
      cy.route('PUT', makeResourceUrl({ resource: `events/*/activities` })).as(
        'updateActivity'
      );
    });
    it(name, () => {
      cy.fillTextField({
        selector: '[data-cy="activityNameField"]',
        value: name,
      });
      cy.wait(['@updateActivity', '@refetchEvent']);
    });
  });
};

export const deleteActivity = type => {
  describe('Rename and Delete Activity', () => {
    beforeEach(() => {
      cy.server();
      cy.route(
        'DELETE',
        makeResourceUrl({ resource: `events/*/activities` })
      ).as('deleteActivity');
    });
    it('Delete the activity from list item', () => {
      cy.selectOptionField({
        fieldSelector: '#activitytype',
        optionSelector: `[data-value="${type}"]`,
      });
      cy.get('[title="Delete Activity"]').each($el => {
        cy.wrap($el).click();
        cy.clickButton({ selector: 'span', buttonTitle: 'Delete' });
        cy.wait('@deleteActivity');
      });
    });
  });
};

export const makeThunderpantsResourceUrl = ({
  queryParams = '**',
  resource = '*',
  projectId = Cypress.env('projectId'),
}) =>
  `/api/v2/thunderpants/project/${projectId}/deployer/*/view/${resource}/${queryParams}`;
