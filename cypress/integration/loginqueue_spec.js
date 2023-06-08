import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

const LOGINQUEUE_URL = makeNavigationUrl({
  url: 'loginqueue/controls',
});

login();
describe('LoginQueue', () => {
  beforeEach(() => {
    cy.server();
    if (
      Cypress.env('testEnvironment') === 'qa' ||
      Cypress.env('testEnvironment') === 'prod'
    ) {
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'loginqueue/all/status**',
          queryParams: '',
        }),
      }).as('getLoginQueueStatus');
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'loginqueue/all/propagate**',
          queryParams: '',
        }),
      }).as('getLoginQueuePropagateList');
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'loginqueue/*/vips**',
          queryParams: '',
        }),
      }).as('getLoginQueueVIPList');
    } else {
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'loginqueue/all/status',
        }),
      }).as('getLoginQueueStatus');
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'loginqueue/all/propagate',
        }),
      }).as('getLoginQueuePropagateList');
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'loginqueue/*/vips',
        }),
      }).as('getLoginQueueVIPList');
    }
  });
  describe('LoginQueue', () => {
    it('Expect the LoginQueue status section to load successfully', () => {
      cy.visit(LOGINQUEUE_URL);
      cy.wait('@getLoginQueueStatus', { timeout: 15000 });
      cy.get('.SubnavLink_activeElement__2KSYq > span').contains('Login Queue');
    });
    it('Expect the LoginQueue VIPs section to load successfully', () => {
      cy.visit(LOGINQUEUE_URL);
      cy.wait('@getLoginQueueVIPList', { timeout: 15000 });
      cy.get('.ant-input');
      cy.get('.ag-header-cell-label > .ag-header-cell-text').contains(
        'Gamertag'
      );
    });
    describe('Edit LoginQueue Settings', () => {
      beforeEach(() => {
        cy.visit(LOGINQUEUE_URL);
        cy.wait('@getLoginQueueStatus', { timeout: 15000 });
        cy.get('.SubnavLink_activeElement__2KSYq > span').contains(
          'Login Queue'
        );
      });
      describe('Queue State', () => {
        it('Expect the LoginQueue status section to edit, save and cancel successfully', () => {
          cy.get('input[name="queueState"]')
            .invoke('val')
            .then(target => {
              const newQueueStateVal = target === 'true' ? 'Closed' : 'Open';
              const newQueueStateBool = target === 'true' ? 'false' : 'true';
              cy.get('#mui-component-select-queueState')
                .click()
                .get('.MuiMenu-list')
                .contains(newQueueStateVal)
                .click();
              cy.get('input[name="queueState"]').should(
                'have.value',
                newQueueStateBool
              );
              cy.contains('Save').click();
              cy.contains('Queue State');
              cy.get('.LoginQueueSettings_loginQueueDialogBtn__3Nvxl')
                .contains('Cancel')
                .click();
              cy.get('input[name="queueState"]').should(
                'have.value',
                newQueueStateBool
              );
            });
        });
        it('Expect the LoginQueue status section to edit and cancel successfully', () => {
          cy.get('input[name="queueState"]')
            .invoke('val')
            .then(target => {
              const newQueueStateVal = target === 'true' ? 'Closed' : 'Open';
              cy.get('#mui-component-select-queueState')
                .click()
                .get('.MuiMenu-list')
                .contains(newQueueStateVal)
                .click();
              cy.contains('Cancel').click();
              cy.get('input[name="queueState"]').should('have.value', target);
            });
        });
      });
      describe('Max Login Rate', () => {
        it('Expect the LoginQueue status section to edit, save and cancel successfully', () => {
          cy.get('input[name="targetRateLimit"]').clear();
          cy.get('input[name="targetRateLimit"]').type('1005');
          cy.get('input[name="targetRateLimit"]').should(
            'have.value',
            '1,005 / second'
          );
          cy.contains('Save').click();
          cy.contains('Max Login Rate');
          cy.get('.LoginQueueSettings_loginQueueDialogBtn__3Nvxl')
            .contains('Cancel')
            .click();
          cy.get('input[name="targetRateLimit"]').should(
            'have.value',
            '1,005 / second'
          );
        });
        it('Expect the LoginQueue status section to edit and cancel successfully', () => {
          cy.get('input[name="targetRateLimit"]')
            .invoke('val')
            .then(target => {
              cy.get('input[name="targetRateLimit"]').clear();
              cy.get('input[name="targetRateLimit"]').type('1,005 / second');
              cy.get('input[name="targetRateLimit"]').should(
                'have.value',
                '1,005 / second'
              );
              cy.contains('Cancel').click();
              cy.get('input[name="targetRateLimit"]').should(
                'have.value',
                target
              );
            });
        });
      });
      describe('Queue Closed Code', () => {
        it('Expect the LoginQueue status section to edit, save and cancel successfully', () => {
          cy.get('input[name="queueClosedCode"]').clear();
          cy.get('input[name="queueClosedCode"]').type('8907');
          cy.get('input[name="queueClosedCode"]').should('have.value', '8907');
          cy.contains('Save').click();
          cy.contains('Queue Closed Code');
          cy.get('.LoginQueueSettings_loginQueueDialogBtn__3Nvxl')
            .contains('Cancel')
            .click();
          cy.get('input[name="queueClosedCode"]').should('have.value', '8907');
        });
        it('Expect the LoginQueue status section to edit and cancel successfully', () => {
          cy.get('input[name="queueClosedCode"]')
            .invoke('val')
            .then(target => {
              cy.get('input[name="queueClosedCode"]').clear();
              cy.get('input[name="queueClosedCode"]').type('8907');
              cy.get('input[name="queueClosedCode"]').should(
                'have.value',
                '8907'
              );
              cy.contains('Cancel').click();
              cy.get('input[name="queueClosedCode"]').should(
                'have.value',
                target
              );
            });
        });
      });
      describe('Max CCU', () => {
        it('Expect the LoginQueue status section to edit, save and cancel successfully', () => {
          cy.get('input[name="maxCCU"]').clear();
          cy.get('input[name="maxCCU"]').type('128907');
          cy.get('input[name="maxCCU"]').should('have.value', '128,907');
          cy.get('#LoginQueueTitleSettings').contains('Save').click();
          cy.contains('Max CCU');
          cy.get('.LoginQueueSettings_loginQueueDialogBtn__3Nvxl')
            .contains('Cancel')
            .click();
        });
        it('Expect the LoginQueue status section to edit and cancel successfully', () => {
          cy.get('input[name="maxCCU"]')
            .invoke('val')
            .then(target => {
              cy.get('input[name="maxCCU"]').clear();
              cy.get('input[name="maxCCU"]').type('128,907');
              cy.get('input[name="maxCCU"]').should('have.value', '128,907');
              cy.get('#LoginQueueTitleSettings').contains('Cancel').click();
              cy.get('input[name="maxCCU"]').should('have.value', target);
            });
        });
      });
    });
    describe('Edit LoginQueue VIP Lists', () => {
      beforeEach(() => {
        cy.visit(LOGINQUEUE_URL);
        cy.wait('@getLoginQueueStatus', { timeout: 15000 });
        cy.get('.SubnavLink_activeElement__2KSYq > span').contains(
          'Login Queue'
        );
      });
      it('Add bulk GamerTag to VIP List', () => {
        cy.get('#add_button_lq').click();
        cy.get('#bulkAdd').click();
        cy.get('.AddModal_loginQueueTextArea__3JPbE').type(
          'devzone-test-2222{enter}devzone-test-1111'
        );
        cy.get('.AddModal_loginQueueDialogBtn__m0mWv').click();
      });
      it('Add multiple new GamerTag to VIP List and delete them', () => {
        cy.get('#add_button_lq').click();
        cy.get('.components_loginQueueInputBox__1CJrV').type(
          'devzone-test-1111'
        );
        cy.get('#add_gamertag_lq').click();
        cy.get('.components_loginQueueInputBox__1CJrV').type(
          'devzone-test-2222'
        );
        cy.get('#add_gamertag_lq').click();

        // check if new gamertags are in grid
        cy.get('[row-index="0"]')
          .get('[col-id="firstPartyGamertag"]')
          .contains('devzone-test-1111');
        cy.get('[row-index="1"]')
          .get('[col-id="firstPartyGamertag"]')
          .contains('devzone-test-2222');

        // remove gamertags from grid
        cy.get('#deleteAll').click();
        cy.get('[col-id="firstPartyGamertag"]')
          .parent('[row-index="1"]')
          .should('not.contain', 'devzone-test-2222');
      });
      it('Add single new GamerTag to VIP List and delete it', () => {
        cy.get('#add_button_lq').click();
        cy.get('.components_loginQueueInputBox__1CJrV').type(
          'devzone-test-1111'
        );
        cy.get('#add_gamertag_lq').click();

        // check if new gamertags are in grid
        cy.get('[row-index="0"]')
          .get('[col-id="firstPartyGamertag"]')
          .contains('devzone-test-1111');

        // remove gamertags from grid
        cy.get('[row-index="0"]').get('[col-id="0"]').click({ multiple: true });
        cy.get('[col-id="firstPartyGamertag"]')
          .parent('[row-index="0"]')
          .should('not.contain', 'devzone-test-1111');
      });
      it('Delete the new Player from VIP List', () => {
        cy.get('.ag-selection-checkbox').first().click();
        cy.get('#delete_button_lq').click();
        cy.get('.MuiPaper-root').contains('Cancel').click();
        cy.get('.ag-selection-checkbox').first().click();
      });
    });
    describe('Propagate LoginQueue VIP List', () => {
      beforeEach(() => {
        cy.visit(LOGINQUEUE_URL);
        cy.wait('@getLoginQueueStatus', { timeout: 15000 });
        cy.wait('@getLoginQueuePropagateList', { timeout: 15000 });
        cy.get('.SubnavLink_activeElement__2KSYq > span').contains(
          'Login Queue'
        );
      });
      describe('Propagate Button', () => {
        it('Expect the LoginQueue Propagate VIP list button to be present', () => {
          cy.get(
            '[title="Propagate"] > .MuiIconButton-label > .material-icons'
          );
        });
      });
      describe('Propagate Modal', () => {
        it('Expect the LoginQueue Propagate VIP list modal to appear on click and load queue data', () => {
          cy.get(
            '[title="Propagate"] > .MuiIconButton-label > .material-icons'
          ).click();
          cy.wait('@getLoginQueueVIPList', { timeout: 15000 });
          cy.get('.MuiDialogTitle-root > .MuiTypography-root').contains(
            'Propagate VIP gamertags to'
          );
          cy.get('.MuiDialogActions-root > :nth-child(1)').contains('Cancel');
          cy.get(
            '.MuiDialogActions-root > .MuiButton-textPrimary > .MuiButton-label'
          ).contains('Propagate');
        });
      });
    });
  });
});
