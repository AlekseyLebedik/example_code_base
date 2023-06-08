// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-file-upload';
import { createEntity, updateEntity } from '../helpers';
import {
  makeNavigationUrl,
  makeResourceUrl,
  makeTitleUrlEventManager,
} from '../helpers/event_manager';

Cypress.Commands.add(
  'selectMuiSelectOption',
  ({
    selector,
    selectorChild = '.MuiSelect-select',
    optionSelector,
    optionId,
  }) => {
    cy.get(`[data-cy="${selector}"]`).as('select');
    cy.get('@select').within(() => {
      cy.get(selectorChild).click();
    });
    if (optionId) {
      cy.get(`li[data-value=${optionId}]`).click();
    } else {
      cy.get(`[data-cy="${optionSelector}"]`).first().click();
    }
  }
);

Cypress.Commands.add('selectActivityTitle', optionId => {
  cy.server();
  cy.route('PUT', makeResourceUrl({ resource: `events/*/activities` })).as(
    'updateActivity'
  );
  cy.selectMuiSelectOption({
    selector: 'titleEnvSelector',
    optionSelector: 'titleEnvSelectorOption',
    optionId,
  });
  cy.wait('@updateActivity');
});

Cypress.Commands.add('selectActivityContext', optionId => {
  cy.server();
  cy.route(makeResourceUrl({ resource: `events` })).as('refetchEvent');
  cy.route('PUT', makeResourceUrl({ resource: `events/*/activities` })).as(
    'updateActivity'
  );
  cy.selectMuiSelectOption({
    selector: 'activityContextSelector',
    optionSelector: 'activityContextOption',
    optionId,
  });
  cy.wait(['@updateActivity', '@refetchEvent']);
});

Cypress.Commands.add(
  'dragTo',
  { prevSubject: 'element' },
  (subject, targetEl) => {
    cy.wrap(subject).trigger('dragstart');
    cy.get(targetEl).trigger('drop');
  }
);

Cypress.Commands.add('selectCassetteOption', ({ selector, value }) => {
  cy.get(selector)
    .first()
    .children()
    .get(`.em-MuiChip-label:contains(${value})`)
    .click();
});

Cypress.Commands.add('openExpansionPanel', ({ selector }) => {
  cy.get(selector).find('span').contains('expand_more').click();
});

Cypress.Commands.add('createActivity', activityType => {
  cy.get('[data-cy="activitiesSidebarTitle"]').within(() => {
    cy.clickButton({ selector: 'span', buttonTitle: 'playlist_add' });
  });
  cy.selectCassetteOption({
    selector: '#mui-component-select-activityType',
    value: activityType,
  });

  cy.server();
  cy.route('POST', makeResourceUrl({ resource: `events/*/activities` })).as(
    'createActivity'
  );
  cy.clickButton({ selector: 'span', buttonTitle: 'Submit' });
  cy.wait('@createActivity').then(({ response }) => {
    const activityId = response.body.id;
    cy.url().should('include', `activities/${activityId}`);
  });
});

Cypress.Commands.add(
  'createEvent',
  ({
    endAt = null,
    envType = 'Development',
    // TODO: Handle informational event creation if eventType !== 'event-manager'
    // eventType = 'event-manager',
    manualTags = ['COD mobile', 'T9'],
    note = 'Test note',
    platforms = ['CROSSPLAY', 'SWITCH'],
    publishAt = Cypress.moment().add(1, 'hour'),
    title = 'Test Event',
    submit = true,
    dayFromCalendar = false,
  } = {}) => {
    if (dayFromCalendar) {
      cy.get('.rbc-date-cell')
        .find('a')
        .contains(dayFromCalendar)
        .parent()
        .click();
    } else {
      cy.get('[data-cy="createEventButton"]').then($button => {
        $button.trigger('mouseover').click();
      });
    }
    cy.fillTextField({
      selector: '[data-cy="createEventNameField"]',
      value: title,
    });
    cy.selectCassetteOption({
      selector: '#mui-component-select-eventEnvType',
      value: envType,
    });
    if (!dayFromCalendar) {
      cy.contains('Start Date').siblings().children('input').as('publishDate');
      cy.updateDateTimePicker({
        selector: '@publishDate',
        date: publishAt,
        confirmBtn: 'Confirm',
      });
    }
    if (endAt) {
      cy.contains('End Date (Optional)')
        .siblings()
        .children('input')
        .as('endDate');
      cy.updateDateTimePicker({
        selector: '@endDate',
        date: endAt,
        confirmBtn: 'Confirm',
      });
    }
    cy.fillTextField({
      selector: '[data-cy="createEventNotesField"]',
      value: note,
    });
    platforms.forEach(platform => {
      cy.selectCassetteOption({
        selector: '#mui-component-select-eventPlatforms',
        value: platform,
      });
    });
    manualTags.forEach(tag => {
      cy.fillTextField({
        selector: '[data-cy="eventTagsField"]',
        value: tag,
      });
    });
    if (submit) {
      cy.router({
        route: {
          method: 'POST',
          url: makeResourceUrl({ resource: 'events' }),
        },
        requestName: 'createEvent',
        actions: () => cy.clickButton({ selector: '.submitModal__button' }),
      });
    } else {
      cy.clickButton({ selector: '.cancelModal__button' });
    }
  }
);

Cypress.Commands.add('deleteEvent', () => {
  cy.get('[data-cy="eventActionsPanel"]').within(() => {
    cy.clickButton({ selector: 'span', buttonTitle: 'more_vert' });
  });
  cy.get('.MuiMenu-list').within(() => {
    cy.clickButton({ selector: 'span', buttonTitle: 'delete_forever' });
  });
  cy.server();
  cy.route('DELETE', makeResourceUrl({ resource: 'events' })).as('deleteEvent');
  cy.clickButton({ selector: 'span', buttonTitle: 'Delete' });
  cy.wait('@deleteEvent');
  cy.location('pathname').should(
    'eq',
    makeNavigationUrl({ resource: 'events' })
  );
});

Cypress.Commands.add(
  'navigateToCalendar',
  (projectId = Cypress.env('projectId')) => {
    cy.router({
      route: makeResourceUrl({ resource: 'events' }),
      requestName: 'loadCalendar',
      actions: () => cy.visit(`/event-manager/${projectId}/events/`),
    });
  }
);

Cypress.Commands.add(
  'navigateToEvent',
  ({ projectId = Cypress.env('projectId'), eventId = 1 }) => {
    cy.router({
      route: makeResourceUrl({ resource: `events/${eventId}` }),
      requestName: 'loadEvent',
      actions: () => cy.visit(`/event-manager/${projectId}/events/${eventId}`),
    });
  }
);

Cypress.Commands.add(
  'navigateToTemplates',
  ({ projectId = Cypress.env('projectId'), response } = {}) => {
    cy.router({
      route: {
        method: 'GET',
        url: `api/v2/playpants/templates/**`,
        ...(response && { response }),
      },
      requestName: 'loadTemplates',
      actions: () => cy.visit(`/event-manager/${projectId}/templates`),
    });
  }
);

Cypress.Commands.add(
  'fetchEvents',
  ({
    projectId = Cypress.env('projectId'),
    eventType = 'event-manager',
  } = {}) => {
    const route = makeResourceUrl({
      resource: `events`,
      queryParams: `**event_type=${eventType}**`,
    });
    cy.server();
    cy.route(route).as('fetchEvents');
    cy.visit(`/event-manager/${projectId}/events/`);
    cy.wait('@fetchEvents');
    cy.get('@fetchEvents').should(({ status, response }) => {
      expect(status).to.eq(200);
      return response;
    });
  }
);

Cypress.Commands.add(
  'manualCreateEvent',
  (
    title = 'Test Event',
    platform = 'CROSSPLAY',
    createdAt = Cypress.moment().unix(),
    publishAt = Cypress.moment().unix(),
    endAt = null,
    project = Cypress.env('projectId')
  ) => {
    const url = makeResourceUrl({ resource: 'events', includeHost: true });
    const body = {
      activities: [],
      authorizations: [],
      auto_tags: '[]',
      components: [],
      created_at: createdAt,
      end_at: endAt,
      env_type: 'Development',
      event_type: 'event-manager',
      is_restricted: false,
      manual_tags: '[]',
      note: '',
      platforms: `["${platform}"]`,
      project,
      projects: [project],
      publish_at: publishAt,
      repeat_event_settings: null,
      story: null,
      title,
    };
    createEntity(url, body);
  }
);

Cypress.Commands.add(
  'updateEvent',
  ({
    activities = [],
    authorizations = [],
    autoTags = '[]',
    components = [],
    createdAt = Cypress.moment().unix(),
    endAt = null,
    envType = 'Development',
    eventId = 1,
    eventType = 'event-manager',
    isRestricted = false,
    manualTags = '[]',
    note = '',
    platforms = '["CROSSPLAY"]',
    project = Cypress.env('projectId'),
    publishAt = Cypress.moment().unix(),
    repeatEventSettings = null,
    story = null,
    title = 'Test Event',
  }) => {
    const url = makeTitleUrlEventManager({
      resource: `events/${eventId}`,
      includeHost: true,
    });
    const body = {
      activities,
      authorizations,
      auto_tags: autoTags,
      components,
      created_at: createdAt,
      end_at: endAt,
      env_type: envType,
      event_type: eventType,
      is_restricted: isRestricted,
      manual_tags: manualTags,
      note,
      platforms,
      project,
      projects: [project],
      publish_at: publishAt,
      repeat_event_settings: repeatEventSettings,
      story,
      title,
    };
    updateEntity(url, body);
  }
);
