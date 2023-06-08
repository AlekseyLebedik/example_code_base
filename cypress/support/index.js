// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-plugin-retries';
// Polyfill for GraphQL - replaces fetch request with traditional XHR so cypress can track them
import '@rckeller/cypress-unfetch';
import './commands';
import './event-manager-commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Cookies.debug(true);
Cypress.Cookies.defaults({
  whitelist: [
    'session-devzone-backend-qa',
    'session-devzone-backend-qa-i1',
    'dw_session_id',
    'csrftoken',
    'e2e-testing-auth',
  ],
});

Cypress.on('uncaught:exception', () => false);

// use `Cypress` instead of `cy` so this persists across all tests
// Cypress.on('window:before:load', win => {
//   win.fetch = null;
// });
