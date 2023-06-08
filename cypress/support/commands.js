// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import {
  createBEUrl,
  createEntity,
  removeEntity,
  updateEntity,
} from '../helpers';
import {
  ABConfigData,
  ABTestData,
  ABTests,
  makeTitleUrlAbTesting,
} from '../helpers/abtesting';

const ACCESS_TOKEN_SESSION_KEY = 'devzone-auth-access-token';

Cypress.Commands.add('login', (username, password) => {
  if (Cypress.env('testEnvironment') === 'dev') {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('backendUrl')}/api/v3/auth/`,
      body: {
        client: Cypress.env('client'),
        clientSecret: Cypress.env('clientSecret'),
      },
    }).then(resp => {
      cy.window().then(win => {
        const state = btoa(Cypress.env('clientSecret'));
        win.sessionStorage.setItem('e2e-testing-auth', true);
        win.sessionStorage.setItem('devzone-auth-state', state);
        const accessToken = {
          accessToken: `Bearer ${resp.body.accessToken}`,
          expiresAt: resp.body.expiry * 1000, // convert to milliseconds based epoch (JS default)
          state,
        };
        win.sessionStorage.setItem(
          ACCESS_TOKEN_SESSION_KEY,
          JSON.stringify(accessToken)
        );
      });
    });
  } else {
    if (Cypress.env('authUrl')) {
      cy.visit(Cypress.env('authUrl'));
    } else {
      throw new Error(
        'Environment variable "authUrl" must be specified in ./cypress/config/<env-name>.json file.'
      );
    }
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#submit_button').click();
  }
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="profileButton"]').click();
  cy.get('[data-cy="logout"]').click();
});

Cypress.Commands.add('getToken', () =>
  cy
    .window()
    .then(win =>
      JSON.parse(
        win.sessionStorage.getItem('devzone-auth-access-token')
      ).accessToken.substring(7)
    )
);

Cypress.Commands.add('router', ({ route, requestName, actions }) => {
  cy.server();
  cy.route(route).as(requestName);
  actions();
  cy.wait(`@${requestName}`);
});

Cypress.Commands.add('forceVisit', url => {
  cy.get('body').then(body$ => {
    const appWindow = body$[0].ownerDocument.defaultView;
    const appIframe = appWindow.parent.document.querySelector('iframe');

    // We return a promise here because we don't want to
    // continue from this command until the new page is
    // loaded.
    return new Promise(resolve => {
      appIframe.onload = () => resolve();
      appWindow.location = url;
    });
  });
});

Cypress.Commands.add('createABTest', body =>
  createEntity(
    `${Cypress.env('backendUrl')}${makeTitleUrlAbTesting({
      resource: 'abtesting/tests',
      queryParams: '',
    })}`,
    body
  )
);

Cypress.Commands.add('createConfig', body =>
  createEntity(
    `${Cypress.env('backendUrl')}${makeTitleUrlAbTesting({
      resource: 'abtesting/configs',
      queryParams: '',
    })}`,
    body
  )
);

Cypress.Commands.add(
  'removeConfig',
  configID =>
    configID &&
    removeEntity(
      `${Cypress.env('backendUrl')}${makeTitleUrlAbTesting({
        resource: `abtesting/configs/${configID}`,
        queryParams: '',
      })}`
    )
);

Cypress.Commands.add(
  'removeABTest',
  testID =>
    testID &&
    removeEntity(
      `${Cypress.env('backendUrl')}${makeTitleUrlAbTesting({
        resource: `abtesting/tests/${testID}`,
        queryParams: '',
      })}`
    )
);

Cypress.Commands.add('seedABTests', () => {
  cy.server();
  const url = makeTitleUrlAbTesting({
    resource: 'abtesting/tests',
    queryParams: '*',
  });
  cy.route('GET', url, ABTests).as('fetchABTestingTests');
});

Cypress.Commands.add('seedABTest', testID => {
  cy.server();
  const url = makeTitleUrlAbTesting({
    resource: `abtesting/tests/${testID}`,
    queryParams: '*',
  });
  cy.route('GET', url, ABTestData('12708888182788125695', 'configuration')).as(
    'fetchABTestingTest'
  );
});

Cypress.Commands.add('seedConfigs', () => {
  cy.server();
  const url = makeTitleUrlAbTesting({
    resource: 'abtesting/configs',
    queryParams: '',
  });
  cy.route(
    'GET',
    Cypress.env('client') ? `${url}*client=${Cypress.env('client')}*` : url,
    ABConfigData
  ).as('fetchABTestingConfigs');
});

// Common actions in forms
Cypress.Commands.add('uploadFile', ({ fileName, subjectType = 'input' }) => {
  cy.fixture(fileName).then(fileContent => {
    if (subjectType === 'input')
      // Click Dropzone library's input field
      cy.contains('Choose file').siblings().children('input').as('fileInput');
    else cy.get('[data-cy="fileUploadDropzone"]').as('fileInput');

    cy.get('@fileInput').upload(
      { fileContent, fileName, mimeType: 'application/json' },
      { subjectType }
    );
  });
});

Cypress.Commands.add('openModal', buttonName => {
  cy.get(`[data-cy*=${buttonName}]`).click();
});

Cypress.Commands.add('changeField', ({ fieldName, value }) => {
  cy.get(`[name="${fieldName}"]`).clear();
  cy.get(`[name="${fieldName}"]`).type(value);
});

Cypress.Commands.add('fillTextField', ({ selector, value }) => {
  cy.get(selector).type(value).type('{enter}');
});

Cypress.Commands.add('changeTextField', ({ selector, value }) => {
  cy.get(selector).find('textarea').first().clear();
  cy.fillTextField({ selector, value });
});

Cypress.Commands.add(
  'updateDateTimePicker',
  ({ selector, date, confirmBtn = 'Add' }) => {
    cy.get(selector).click();
    cy.get('[data-cy="calendar-picker"]')
      .find('input')
      .first()
      .clear()
      .type(date.format('MMM DD, YYYY HH:mm'))
      .type('{enter}');
    cy.get('[data-cy="calendar-picker"]').contains(`${confirmBtn}`).click();
  }
);

Cypress.Commands.add(
  'selectOptionField',
  ({ fieldSelector, optionSelector }) => {
    cy.get(fieldSelector).click();
    cy.get(optionSelector).click();
  }
);

Cypress.Commands.add('clickButton', ({ selector, buttonTitle = null }) => {
  if (buttonTitle !== null) {
    cy.get(selector).contains(buttonTitle).click();
    return;
  }
  cy.get(selector).click();
});

Cypress.Commands.add(
  'addNewOnAutocomplete',
  ({ newValue, fieldSelector = '[data-cy=autocomplete]' }) =>
    cy
      .get(fieldSelector)
      .parent()
      .children()
      .children()
      .children('input')
      .type(`${newValue}{enter}`)
);

Cypress.Commands.add(
  'findRow',
  ({
    contains,
    rowSelector = '.ag-row',
    timeout = Cypress.config('defaultCommandTimeout'),
  }) => cy.get(rowSelector, { timeout }).contains(contains, { timeout })
);

Cypress.Commands.add(
  'deleteAllFiles',
  ({
    checkboxSelector,
    deleteSelector = '[data-cy=deleteButton]:not([disabled])',
    confirmSelector = '[data-cy=confirmButton]',
  }) => {
    cy.get(checkboxSelector).then($checkboxes => {
      $checkboxes.click();
      cy.get(deleteSelector).click();
      cy.get(confirmSelector).click();
    });
  }
);

Cypress.Commands.overwrite('visit', (originalVisit, url, options) => {
  const opts = {
    ...options,
    onBeforeLoad: win => {
      // Apollo uses fetch to get data.
      if (!url.includes('player-view')) {
        win.fetch = null;
      }
    },
  };
  return originalVisit(url, opts);
});

Cypress.Commands.add('getIDFromURL', () =>
  cy.url().then(url => {
    const matches = url.match(/\d+$/);
    if (matches) {
      return matches[0];
    }
    return null;
  })
);

Cypress.Commands.add('deleteMemberships', () => {
  cy.getIDFromURL().then(userID =>
    updateEntity(createBEUrl(`/api/v2/users/${userID}/memberships/`), {
      companies: [],
    })
  );
});

Cypress.Commands.add('deleteUserObjectPermissions', () => {
  cy.getIDFromURL().then(userID =>
    updateEntity(createBEUrl(`/api/v2/users/${userID}/object-permissions/`), [])
  );
});

Cypress.Commands.add('deleteGroupObjectPermissions', () => {
  cy.getIDFromURL().then(userID =>
    updateEntity(
      createBEUrl(`/api/v2/company-groups/${userID}/object-permissions/`),
      []
    )
  );
});

Cypress.Commands.add('deleteCompanyObjectPermissions', () => {
  cy.getIDFromURL().then(userID =>
    updateEntity(
      createBEUrl(`/api/v2/companies/${userID}/object-permissions/`),
      []
    )
  );
});

/**
 * getAttached(selector)
 * getAttached(selectorFn)
 *
 * Waits until the selector finds an attached element, then yields it (wrapped).
 * selectorFn, if provided, is passed $(document). Don't use cy methods inside selectorFn.
 */
Cypress.Commands.add('getAttached', selector => {
  const getElement =
    typeof selector === 'function' ? selector : $d => $d.find(selector);
  let $el = null;
  return cy
    .document()
    .should($d => {
      $el = getElement(Cypress.$($d));
      // eslint-disable-next-line no-unused-expressions
      expect(Cypress.dom.isDetached($el)).to.be.false;
    })
    .then(() => cy.wrap($el));
});

/* ———————
  GRAPH QL
  ———————— */

Cypress.Commands.add('waitForGraph', operationName => {
  const GRAPH_URL = 'graphql/**';
  cy.route('POST', GRAPH_URL).as('graphqlRequest');
  // This will capture every request
  // eslint-disable-next-line consistent-return
  cy.wait('@graphqlRequest').then(({ request }) => {
    // If the captured request doesn't match the operation name of your query
    // it will wait again for the next one until it gets matched.
    if (request.body.operationName !== operationName) {
      return cy.waitForGraph(operationName);
    }
  });
});
