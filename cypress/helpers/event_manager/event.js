import { getUserName } from './index';

export const navigateToEvent = ({
  projectId = Cypress.env('projectId'),
  eventId = null,
} = {}) =>
  describe('Load Event', () => {
    if (eventId) {
      it(`Navigate to Event ID ${eventId}`, () => {
        cy.navigateToEvent({ projectId, eventId });
      });
    } else {
      it(`Navigate to Calendar`, () => {
        cy.navigateToCalendar(projectId);
      });
      it(`Create Event then Navigate`, () => {
        cy.createEvent();
      });
    }
  });

export const fetchThenNavigateToEvent = ({
  projectId = Cypress.env('projectId'),
} = {}) =>
  describe('Fetch and Load Event', () => {
    it('Fetch and check for events then navigate or create new test event', () => {
      cy.fetchEvents().then(({ response }) => {
        const events =
          response.body.results.filter(
            e =>
              e.project.toString() === projectId &&
              e.title === 'Cypress Test' &&
              e.status === 'open' &&
              !e.is_manually_locked &&
              !e.is_deleted
          ) || [];
        const eventId = events.length && events[0].id;
        if (eventId) {
          cy.navigateToEvent({ projectId, eventId });
        } else {
          cy.createEvent({
            manualTags: [],
            platforms: ['PS4'],
            title: 'Cypress Test',
          });
        }
      });
    });
  });

export const checkPlatforms = value => {
  cy.get('[data-cy="eventDetailsPlatforms"]')
    .find('input')
    .should('have.value', value);
};

export const checkTagExists = (tag, visible = '') => {
  cy.get('[data-cy="tagsContainer"]')
    .find('span')
    .contains(tag)
    .should(`${visible}exist`);
};

export const checkTagsLength = total =>
  cy.get('[data-cy="tagsContainer"]').children().should('lengthOf', total);

export const verifyDiscussionMessages = () => {
  it('Verify discussion messages', () => {
    cy.get('[data-cy="discussionUserAndDate"]').should('lengthOf', 2);
    cy.get('[data-cy="discussionMessage"]').should('lengthOf', 2);

    cy.get('[data-cy="discussionUserAndDate"]')
      .contains(getUserName())
      .first()
      .should('be.visible');
    cy.get('[data-cy="discussionMessage"]')
      .contains('Testing discussion here!')
      .should('be.visible');
  });
};
