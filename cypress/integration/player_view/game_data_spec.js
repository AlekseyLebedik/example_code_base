// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-file-upload';
import { login } from '../../helpers';

login();

describe('Player View - Game Data', () => {
  const testPlayerId = '3396501'; // bren_dillon
  beforeEach(() => {
    cy.server();
    cy.visit(`/player/game-data/${testPlayerId}`);
    cy.waitForGraph('ServiceConfigInfo');
    cy.waitForGraph('PlayerInfo');
    cy.waitForGraph('PlayerTitleEnvs');
  });

  it('Title summary should not be visible in Service view', () => {
    cy.get('[data-cy="playerViewTitleSummaryDetails"]').should(
      'not.be.visible'
    );
  });

  it('Title summary should be visible in Title view', () => {
    cy.selectOptionField({
      fieldSelector: '[data-cy="playerViewSelectGroupBy"]',
      optionSelector: '[data-value="titles"]',
    });
    cy.get('[data-cy="playerViewTitleSummaryDetails"]', {
      timeout: 60000,
    })
      .scrollIntoView()
      .should('be.visible');
  });

  //   describe('A/B Testing', () => {
  //     beforeEach(() => {
  //       cy.server();
  //       cy.waitForGraph('PlayerAbTests');
  //     });

  //     it('Loads graph data', () => {});
  //   });

  //   describe('Accounts', () => {
  //     beforeEach(() => {
  //       cy.server();
  //       cy.waitForGraph('PlayerLinkedAccounts');
  //       cy.waitForGraph('PlayerActivity');
  //       cy.waitForGraph('RecentLogins');
  //       cy.waitForGraph('PlayerFriends');
  //     });

  //     it('Loads graph data', () => {});
  //   });

  //   describe('Achievements', () => {
  //     beforeEach(() => {
  //       cy.server();
  //       cy.waitForGraph('PlayerAchievements');
  //     });

  //     it('Loads graph data', () => {});
  //   });

  //   describe('Battlepass', () => {
  //     beforeEach(() => {
  //       cy.server();
  //       cy.waitForGraph('Battlepass');
  //     });

  //     it('Loads graph data', () => {});
  //   });

  //   describe('Inventory', () => {
  //     beforeEach(() => {
  //       cy.server();
  //       cy.waitForGraph('PlayerInventory');
  //     });

  //     it('Loads graph data', () => {});
  //   });

  //   describe('Logs', () => {
  //     beforeEach(() => {
  //       cy.server();
  //       cy.waitForGraph('PlayerLogs');
  //     });

  //     it('Loads graph data', () => {});
  //   });

  //   describe('Storage', () => {
  //     beforeEach(() => {
  //       cy.server();
  //       cy.waitForGraph('Storage');
  //     });

  //     it('Loads graph data', () => {});
  //   });
});
