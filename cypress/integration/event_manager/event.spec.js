import {
  checkPlatforms,
  checkTagExists,
  checkTagsLength,
  // emLogin,
  makeResourceUrl,
  navigateToEvent,
  nowDate,
  verifyDiscussionMessages,
} from '../../helpers/event_manager';

// emLogin();
navigateToEvent();

describe('Event Page', () => {
  describe('Event Page Details', () => {
    it('Change Event Title', () => {
      cy.changeTextField({
        selector: '[data-cy="eventDetailsName"]',
        value: 'Cypress Test',
      });
    });

    it('Check for Environment and is disabled', () => {
      cy.get('[data-cy="eventDetailsEnv"]')
        .children()
        .children('input')
        .as('env');
      cy.get('@env').should('be.visible');
      cy.get('@env').should('be.disabled');
    });

    it('Verify crossplay platform, delete, then add one', () => {
      checkPlatforms('CROSSPLAY,SWITCH');
      cy.server();
      cy.route('PATCH', makeResourceUrl({ resource: 'events' })).as(
        'updateEvent'
      );
      cy.get('[data-cy="eventDetailsPlatforms"]').click();
      cy.get('[data-value="PC"]').click();
      cy.wait('@updateEvent');
      cy.get('[data-value="CROSSPLAY"]').click().type('{esc}');
      checkPlatforms('SWITCH,PC');
    });

    it('Verify correct creation date', () => {
      cy.get('label')
        .contains('Created At')
        .siblings()
        .children('input')
        .as('creationDate');
      cy.get('@creationDate').should('be.disabled');
      cy.get('@creationDate')
        .invoke('val')
        .then(text => expect(text.trim()).match(nowDate()));
    });

    it('Change "from" date and add "to" date', () => {
      cy.get('label')
        .contains('From')
        .siblings()
        .children('input')
        .as('fromDate');

      cy.get('label').contains('To').siblings().children('input').as('toDate');

      cy.get('@fromDate').click();
      cy.get('[title="Go Forward a Month"]').click();
      cy.get('[data-cy="calendar-picker"]').contains(/^10$/).click();
      cy.contains('Add').click();

      cy.get('@toDate').click();
      cy.get('[title="Go Forward a Month"]').click();
      cy.get('[data-cy="calendar-picker"]').contains(/^20$/).click();
      cy.contains('Add').click();
    });

    it('check that status if open', () => {
      cy.contains('Status').siblings().contains('Open').should('be.visible');
    });

    it('add notes', () => {
      cy.openExpansionPanel({ selector: '[data-cy="notesExpansionPanel"]' });
      cy.fillTextField({
        selector: '[data-cy="notesField"]',
        value:
          '{selectall}{backspace}Adding double xp points for the whole weekend!',
      });
    });

    it('verify tags that should or should not exist, add some and delete some', () => {
      cy.openExpansionPanel({ selector: '[data-cy="tagsExpansionPanel"]' });
      // check if certain auto tags exist and others do not
      checkTagsLength(15);
      checkTagExists('development');
      checkTagExists('open');
      checkTagExists('cypress');
      checkTagExists('test');
      checkTagExists('pc');
      checkTagExists('switch');
      checkTagExists('adding');
      checkTagExists('double');
      checkTagExists('xp');
      checkTagExists('points');
      checkTagExists('weekend');
      checkTagExists('crossplay', 'not.');
      checkTagExists('pending', 'not.');
      checkTagExists('event', 'not.');
      checkTagExists(/^this$/, 'not.');
      checkTagExists(/^is$/, 'not.');
      checkTagExists('hello', 'not.');

      // enter a bunch of new tags. check if they exist, and check certain ones are not allowed
      cy.get('[data-cy="eventTagsField"]')
        .children()
        .children('input')
        .as('eventTagsField');
      cy.get('@eventTagsField').type('testTag{enter}');
      checkTagsLength(16);
      checkTagExists('testTag');
      cy.get('@eventTagsField').type('a{enter}');
      checkTagsLength(16);
      cy.get('@eventTagsField').type('{backspace}is{enter}');
      checkTagsLength(17);
      checkTagExists('is');
      cy.get('@eventTagsField').type(' {enter}');
      checkTagsLength(17);
      cy.get('@eventTagsField').type('#new{enter}');
      checkTagsLength(18);
      checkTagExists('#new');
      cy.get('@eventTagsField').type('      cat{enter}');
      checkTagsLength(19);
      checkTagExists('cat');

      // remove some tags
      cy.get('[data-cy="tagsContainer"]')
        .find('span')
        .contains('is')
        .next()
        .click();
      checkTagsLength(18);
      checkTagExists('is', 'not.');
      cy.get('[data-cy="tagsContainer"]')
        .find('span')
        .contains('cat')
        .next()
        .click();
      checkTagsLength(17);
      checkTagExists('cat', 'not.');
    });
  });

  describe('Event Page Discussion', () => {
    it('switch to Discussion tab', () => {
      cy.get('[data-cy="discussionTab"]').click();
    });

    it('write a new message', () => {
      cy.fillTextField({
        selector: '[data-cy="discussionInput"]',
        value: 'Testing discussion here!',
      });
      cy.get('[data-cy="discussionInput"]')
        .find('input')
        .type('Testing message button!');
      cy.get('[data-cy="sendMessageButton"]').click();
    });

    verifyDiscussionMessages();
  });

  // logout();
  // emLogin(Cypress.env('testUsername'), Cypress.env('testPassword'));
  // navigateToEvent();
  // TODO: make test to check that Locked By text appears correctly when necessary

  //   describe('Event Page Badges', () => {
  //     it('check badges for newest discussion message + verify message', () => {
  //       // check discussion tab badge
  //       cy.get('[data-cy="discussionTabBadge"]')
  //         .children()
  //         .contains('2')
  //         .should('be.visible');
  //       cy.get('[data-cy="discussionTabBadge"]')
  //         .children()
  //         .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 7, -7)');

  //       // switch to discussion tab
  //       cy.get('[data-cy="discussionTab"]').click();

  //       // check badges for both messages
  //       cy.get('[data-cy="discussionUserAndDate')
  //         .first()
  //         .siblings()
  //         .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 3, -3)');
  //       cy.get('[data-cy="discussionUserAndDate')
  //         .last()
  //         .siblings()
  //         .should('have.css', 'transform', 'matrix(1, 0, 0, 1, 3, -3)');

  //       // go back to details, and check discussion tab badge disappeared
  //       cy.get('[data-cy="detailsTab"]').click();
  //       cy.get('[data-cy="discussionTabBadge"]')
  //         .children()
  //         .contains('0')
  //         .should('be.visible');
  //       cy.get('[data-cy="discussionTabBadge"]')
  //         .children()
  //         .should('have.css', 'transform', 'matrix(0, 0, 0, 0, 0, 0)');

  //       // go back to discussion tab, check that message badges are gone
  //       cy.get('[data-cy="discussionTab"]').click();
  //       cy.get('[data-cy="discussionUserAndDate')
  //         .first()
  //         .siblings()
  //         .should('have.css', 'transform', 'matrix(0, 0, 0, 0, 0, 0)');
  //       cy.get('[data-cy="discussionUserAndDate')
  //         .last()
  //         .siblings()
  //         .should('have.css', 'transform', 'matrix(0, 0, 0, 0, 0, 0)');

  //       // verify correct messages appear
  //       verifyDiscussionMessages();
  //     });

  //     it('verify badge for request approval', () => {
  //       // TODO: upon requesting approval in Event Actions - verify the correct badges appear .. here
  //     });
  //   });

  describe('Event Page Actions', () => {
    it('switch to Details tab', () => {
      cy.get('[data-cy="detailsTab"]').click();
    });
    // it('Save as Template', () => {});

    // it('Request Approval', () => {});

    // it('Publish Now', () => {});

    // it('Duplicate/Promote Event', () => {});

    it('Delete Event', () => {
      cy.deleteEvent();
    });
  });
});
