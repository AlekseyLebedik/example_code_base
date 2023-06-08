import {
  checkViewSelectValue,
  // emLogin,
  hasAtLeastOneClass,
  makeResourceUrl,
} from '../../helpers/event_manager';

// emLogin();

describe('Events Schedule', () => {
  describe('Calendar View', () => {
    it('Navigate to calendar', () => cy.navigateToCalendar());

    describe('Calendar Details', () => {
      it('Should have month view defaulted and handle option selection', () => {
        // check view dropdown values agains buttons
        cy.get('[data-cy="calendarToolbarContainer"]').within(() => {
          checkViewSelectValue('Month');
          cy.clickButton({ selector: 'span', buttonTitle: 'Month' });
          checkViewSelectValue('Month');
          cy.clickButton({ selector: 'span', buttonTitle: 'Week' });
          checkViewSelectValue('Week');
          cy.clickButton({ selector: 'span', buttonTitle: 'Day' });
          checkViewSelectValue('Day');
        });
        // re-select month from dropdown
        cy.get('[data-cy="calendarToolbarViewSelect"]').click();
        cy.clickButton({ selector: 'li', buttonTitle: 'Month' });
        checkViewSelectValue('Month');
      });

      it('Clicking a number date on Month view takes you to day view', () => {
        cy.clickButton({ selector: 'a', buttonTitle: '10' });
        cy.get('[data-cy="customDateRangeInput"]')
          .find('input')
          .should('have.value', 1);
      });

      it('Test custom days input', () => {
        cy.get('[data-cy="customDateRangeInput"]')
          .find('input')
          .type('{backspace}3');
        cy.get('.rbc-time-content')
          .find('.rbc-time-column')
          .should('have.length', 4);
        cy.get('[data-cy="customDateRangeInput"]').find('input').type('1');
        checkViewSelectValue('Month');
      });
    });

    describe('Calendar Sidebar', () => {
      describe('Mini Calendar', () => {
        it('Click a new date and verify correct class', () => {
          cy.get('[data-cy="eventsCalendarSidebarContainer"]').within(() => {
            cy.contains('div', '15').as('miniCalDate');
            cy.get('@miniCalDate').click();
            cy.get('@miniCalDate').should(
              'satisfy',
              hasAtLeastOneClass(['Day-currentDate', 'Day-selectedDate'])
            );
          });
        });

        it('Forward/backward options', () => {
          cy.get('[title="Go Forward a Month"]').click();
          const thisMonth = Cypress.moment().format('MMMM');
          const nextMonth = Cypress.moment().add(1, 'M').format('MMMM');
          cy.get('div[class*=Toolbar_select]')
            .first()
            .should('contain', nextMonth);
          cy.get('[title="Go Back a Month"]').click();
          cy.get('div[class*=Toolbar_select]')
            .first()
            .should('contain', thisMonth);
        });
      });

      describe.skip('Calendar Filters', () => {
        it('tags', () => {});
        it('filters', () => {});
      });
    });

    describe('Events', () => {
      const envType = 'Development';
      const manualTags = ['COD'];
      const platforms = ['CROSSPLAY', 'PS4'];
      const title = 'Schedule Test Event';
      const tommorrow = new RegExp(
        `^${Cypress.moment().add(1, 'day').format('D')}$`
      );
      it('Check create event button and cancel', () => {
        cy.createEvent({
          title: 'Cancel',
          note: 'NA',
          manualTags: [],
          submit: false,
        });
      });

      it('Check out-of-range date and then create event from valid date cell', () => {
        cy.clickButton({
          selector: 'span',
          buttonTitle: 'keyboard_arrow_left',
        });
        cy.get('[class*="makeStyles-dayMonthOutOfRange"]').first().click();
        cy.clickButton({
          selector: 'span',
          buttonTitle: 'TODAY',
        });
        cy.get('[data-cy="dialogComponent"]').should('not.be.visible');
        cy.createEvent({
          envType,
          manualTags,
          platforms,
          title,
          dayFromCalendar: tommorrow,
        });
        cy.navigateToCalendar();
      });

      it('Verify event shows up in correct location', () => {
        cy.clickButton({ selector: 'a', buttonTitle: tommorrow });
        cy.get('.rbc-event-content').contains('p', title).should('exist');
      });

      it('Validate event summary details', () => {
        cy.get('.rbc-event-content').contains('p', title).click();
        cy.get('.MuiDialogContent-root').within(() => {
          cy.get('h1').should('contain', title);
          cy.get('span[class*=StatusDot_statusDotContainer]').should(
            'contain',
            'Open'
          );
        });
        cy.contains('Environment').siblings().should('contain', envType);
        cy.get('[data-cy="eventSummaryPlatforms"]')
          .find('.em-MuiChip-label')
          .should('contain', platforms[0])
          .and('contain', platforms[1]);
        cy.get('[data-cy="eventSummaryTags"]')
          .find('.em-MuiChip-label')
          .should('contain', manualTags[0])
          .and('contain', envType.toLowerCase())
          .and('contain', 'schedule')
          .and('contain', 'open');
        cy.clickButton({ selector: 'span', buttonTitle: 'Close' });
      });

      it('create click/drag events in week and day view', () => {
        cy.get('.rbc-addons-dnd-resizable').first().as('source');
        cy.get('.rbc-time-slot').first().as('target');
        cy.get('@source').dragTo('@target');
      });

      it('Delete Event', () => {
        cy.get('.rbc-event-content').contains('p', title).click();
        cy.clickButton({
          selector: '.MuiDialogActions-root',
          buttonTitle: 'Open',
        });
        cy.deleteEvent();
      });
    });
  });

  describe('List View', () => {
    it('Navigate to List', () => {
      cy.router({
        route: makeResourceUrl({ resource: 'events' }),
        requestName: 'loadListView',
        actions: () => {
          cy.get('[data-cy="eventsCalendarSidebarContainer"]').within(() => {
            cy.clickButton({ selector: 'span', buttonTitle: 'view_list' });
          });
        },
      });
    });

    it('Test column sort', () => {
      cy.contains('Title').click();
      cy.contains('Event Group').click();
      cy.contains('Status').click();
      cy.contains('Start Date').click();
      cy.contains('End Date').click();
    });

    it('Open and close event', () => {
      cy.get('[row-index="1"]').find('div[col-id=eventGroupName]').click();
      cy.get('.MuiDialog-paper').should('be.visible');
      cy.clickButton({
        selector: '.MuiDialogActions-root',
        buttonTitle: 'Close',
      });
    });
  });

  describe('Timeline View', () => {
    it('Navigate to Timeline', () => {
      cy.router({
        route: makeResourceUrl({ resource: 'events' }),
        requestName: 'loadTimelineView',
        actions: () => {
          cy.get('[data-cy="eventsCalendarSidebarContainer"]').within(() => {
            cy.clickButton({ selector: 'span', buttonTitle: 'clear_all' });
          });
        },
      });
    });

    it('Check filter group', () => {
      cy.get('div[class*=Timeline_eventGroup]').should(
        'contain',
        'Event Manager'
      );
      cy.selectOptionField({
        fieldSelector: '[data-cy="timelineGroupFilter"]',
        optionSelector: '[data-value="env_type"]',
      });
      cy.get('[data-cy="timelineGroupFilter"]')
        .find('div')
        .should('contain', 'Environment');
      cy.get('div[class*=Timeline_eventGroup]')
        .should('contain', 'Development')
        .and('contain', 'Certification')
        .and('contain', 'Live');
    });
  });
});
