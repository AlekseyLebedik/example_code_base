// eslint-disable-next-line import/no-extraneous-dependencies
import { login } from '../helpers';
import {
  makeNavigationUrlOthers,
  makeTitleUrlOthers,
  makeTitleUrl,
  makeNavigationUrl,
} from '../helpers/online_configuration';

login();

describe('Marketplace', () => {
  describe('Active Store', () => {
    beforeEach(() => {
      cy.server();
      if (['dev', 'qa'].includes(Cypress.env('testEnvironment'))) {
        cy.route({
          method: 'GET',
          url: makeTitleUrl({
            resource: 'marketplace/default-store',
          }),
        }).as('getDefaultStore');

        cy.route({
          method: 'GET',
          url: makeTitleUrl({
            resource: 'marketplace/default-store/currencies',
          }),
        }).as('getCurrencies');
        cy.visit(makeNavigationUrl({ url: 'marketplace/active-store' }));
      } else {
        cy.route({
          method: 'GET',
          url: makeTitleUrlOthers({
            resource: 'marketplace/default-store',
          }),
        }).as('getDefaultStore');

        cy.route({
          method: 'GET',
          url: makeTitleUrlOthers({
            resource: 'marketplace/default-store/currencies',
          }),
        }).as('getCurrencies');
        cy.visit(makeNavigationUrlOthers({ url: 'marketplace/active-store' }));
      }
    });

    it('Expect active store data to be fetched on opening page', () => {
      cy.url().should('include', 'marketplace/active-store');
      cy.wait('@getDefaultStore').its('status').should('eq', 200);
      cy.wait('@getCurrencies').its('status').should('eq', 200);
    });
  });

  describe('Store', () => {
    beforeEach(() => {
      cy.server();
      if (['dev', 'qa'].includes(Cypress.env('testEnvironment'))) {
        cy.route({
          method: 'GET',
          url: makeTitleUrl({
            resource: 'marketplace/stores',
          }),
        }).as('getStores');
        cy.visit(makeNavigationUrl({ url: 'marketplace/stores/' }));
      } else {
        cy.route({
          method: 'GET',
          url: makeTitleUrlOthers({
            resource: 'marketplace/stores',
          }),
        }).as('getStores');
        cy.visit(makeNavigationUrlOthers({ url: 'marketplace/stores/' }));
      }
    });

    it('Expect store data to be fetched on opening page', () => {
      cy.url().should('include', 'marketplace/stores');
      cy.wait('@getStores').its('status').should('eq', 200);

      cy.get('.common__searchable-list').should('be.visible');
      cy.get('.detail__container').should('be.visible');
      // If item is present
      cy.get('.list-item.store').should('be.visible');
    });
  });

  describe('Player Inventory', () => {
    const searchString = '%';
    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'accounts',
          queryParams: `*q=${searchString}*`,
        }),
      }).as('getUser');
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'marketplace/users/*/assets/inventory-items',
        }),
      }).as('getPlayerItems');
      cy.visit(
        makeNavigationUrl({
          url: 'marketplace/player-inventory/inventory/',
        })
      );
    });

    it('Expect player inventory data to be fetched on opening page', () => {
      cy.url().should('include', 'marketplace/player-inventory/inventory');
      cy.get('[data-cy="userAutocomplete"]').type(searchString);
      cy.get('[data-cy="autocompleteOption"]').first().click();
      cy.wait('@getPlayerItems').its('status').should('eq', 200);
    });

    it('Expect player inventory data to be refreshed', () => {
      cy.get('[data-cy="userAutocomplete"]').type(searchString);
      cy.get('[data-cy="autocompleteOption"]').first().click();
      cy.get('[data-cy="refresh-inventory"]').first().click();
      cy.wait('@getPlayerItems').its('status').should('eq', 200);

      cy.get('[data-cy="currency-tab-button"]').click();
      cy.get('.ag-center-cols-container .ag-row')
        .first()
        .find(`[col-id="currencyID"]`);
      cy.get('[data-cy="refresh-inventory"]').first().click();
      cy.wait('@getPlayerItems').its('status').should('eq', 200);
    });

    it('Expect player inventory details to be fetched correctly on navigating through tabs', () => {
      cy.get('[data-cy="userAutocomplete"]').type(searchString);
      cy.get('[data-cy="autocompleteOption"]').first().click();
      // Check that inventory tabs fetch data corretly
      cy.get('[data-cy="item-tab-button"]').click();
      cy.get('.ag-center-cols-container .ag-row')
        .first()
        .find(`[col-id="nameType"]`);

      cy.get('[data-cy="products-tab-button"]').click();
      cy.get('.ag-center-cols-container .ag-row')
        .first()
        .find(`[col-id="itemTags"]`);

      cy.get('[data-cy="currency-tab-button"]').click();
      cy.get('.ag-center-cols-container .ag-row')
        .first()
        .find(`[col-id="currencyID"]`);
    });
  });

  describe('Clone Inventory', () => {
    const searchString = '%';
    const CLONE_TITLE_ID = '5816';
    const cloneDialogTimeout = 8000;
    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'POST',
        url: makeTitleUrl({
          resource: 'marketplace/users/*/inventory/clone',
        }),
      }).as('clonePlayerInventory');
      cy.visit(
        makeNavigationUrl({
          url: 'marketplace/player-inventory/inventory/',
        })
      );
    });
    it('Expect clone inventory feature to work', () => {
      cy.get('[data-cy="userAutocomplete"]').type(searchString);
      cy.get('[data-cy="autocompleteOption"]').first().click();

      cy.get('[data-cy="clonePlayerInventoryDialog"]', {
        timeout: cloneDialogTimeout,
      }).click();
      cy.contains('Enter Player ID').type(searchString);
      cy.get('[data-cy="autocompleteOption"]').eq(2).click();

      cy.contains(`Selected target context`).should('be.visible');
      cy.get('[data-cy="clonePlayerInventoryButton"]').click();
      cy.wait('@clonePlayerInventory').its('status').should('eq', 200);
    });
    it('Expect missing table to appear', () => {
      cy.get('[data-cy="userAutocomplete"]').type(searchString);
      cy.get('[data-cy="autocompleteOption"]').first().click();

      cy.get('[data-cy="clonePlayerInventoryDialog"]', {
        timeout: cloneDialogTimeout,
      }).click();
      cy.get('[data-cy="titleEnvironmentSelector"]').click();

      cy.get('.ant-select-dropdown-menu')
        .find('.ant-select-dropdown-menu-item')
        .contains(`(${CLONE_TITLE_ID})`)
        .click();

      cy.contains('Enter Player ID').type(searchString);
      cy.get('[data-cy="autocompleteOption"]').eq(2).click();

      cy.contains(`Selected target context`).should('be.visible');
      cy.get('[data-cy="clonePlayerInventoryButton"]').click();

      cy.get('[data-cy="missing-objects-table"]')
        .get('.ag-header-row')
        .find(`[col-id="name"]`);
    });
  });
  // // TODO - Enable when we have local fixture for PI locally
  // if (Cypress.env('testEnvironment') === 'dev') {
  //   describe('Player Inventory', () => {
  //     const searchString = '%';
  //     beforeEach(() => {
  //       cy.server();
  //       cy.route({
  //         method: 'GET',
  //         url: makeTitleUrl({
  //           resource: 'marketplace/default-store',
  //         }),
  //       }).as('getDefaultStore');
  //       cy.route({
  //         method: 'GET',
  //         url: makeTitleUrl({
  //           resource: 'marketplace/default-store/currencies',
  //         }),
  //       }).as('getCurrencies');
  //       cy.route({
  //         method: 'GET',
  //         url: makeTitleUrl({
  //           resource: 'marketplace/stores/*',
  //         }),
  //       }).as('getStoreDetails');
  //       cy.route({
  //         method: 'GET',
  //         url: makeTitleUrl({
  //           resource: 'accounts',
  //           queryParams: `*q=${searchString}*`,
  //         }),
  //       }).as('getUser');
  //       cy.route({
  //         method: 'GET',
  //         url: makeTitleUrl({
  //           resource: 'marketplace/users/*/assets/inventory-items',
  //         }),
  //       }).as('getUserInvetoryItems');
  //       cy.route({
  //         method: 'GET',
  //         url: makeTitleUrl({
  //           resource: 'marketplace/users/*/assets/balances',
  //         }),
  //       }).as('getUserBalances');
  //       cy.visit(
  //         `/online-configuration/${Cypress.env('titleId')}/${Cypress.env(
  //           'titleEnv'
  //         )}/marketplace/player-inventory`,
  //         { timeout: 550000 }
  //       );
  //     });
  //     it('Expect player inventory data to be fetched on opening page', () => {
  //       cy.wait([
  //         '@getDefaultStore',
  //         '@getCurrencies',
  //         '@getStoreDetails',
  //       ]).then(xhrs => {
  //         xhrs.forEach($xhr => expect($xhr.status).to.equal(200));
  //       });
  //     });
  //     it('Expect player inventory details to be fetched correctly on searching user', () => {
  //       // Search user and check that corresponding data is fetched correctly
  //       cy.get('[data-cy="userAutocomplete"]').type(searchString);
  //       cy.wait('@getUser');
  //       cy.get('[data-cy="autocompleteOption"]')
  //         .first()
  //         .click();
  //     });
  //     it('Expect player inventory details to be fetched correctly on navigating through tabs', () => {
  //       // Find user
  //       cy.get('[data-cy="userAutocomplete"]').type(searchString);
  //       cy.wait('@getUser');
  //       cy.get('[data-cy="autocompleteOption"]')
  //         .first()
  //         .click();
  //       // Check that inventory tabs fetch data corretly
  //       cy.get('section[class*=playerInventory]')
  //         .contains('Currency')
  //         .click();
  //       cy.get('section[class*=storeInventory] button')
  //         .should('contain', 'Currency')
  //         .eq(2)
  //         .and('have.attr', 'aria-selected', 'true'); // Attribute found but it was false :/
  //     });
  //   });
  // }
});
