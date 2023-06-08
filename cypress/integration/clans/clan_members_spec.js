// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-file-upload';
import { login } from '../../helpers';

login();

describe('Clan View - Clan Members', () => {
  it('Clan members page should load', () => {
    cy.server();
    cy.visit('/clans/members?env=PROD');
    cy.waitForGraph('AccountsServiceConfigInfo');
  });

  it('Clan summary should be hidden until clan is selected', () => {
    cy.get('[data-cy="clansSummaryTable"]').should('not.be.visible');
  });

  describe('Clan selector', () => {
    it('should be able to select DEV env', () => {
      cy.get('[data-cy="clanEnvSelector"]').should('be.visible');
      cy.get('[data-cy="clanEnvSelector"]').click();
      cy.clickButton({ selector: 'li', buttonTitle: 'DEV' });
      cy.get('[data-cy="clanEnvSelector"]')
        .find('div[role="button"]')
        .should('contain', 'DEV');
    });

    it('should select clan given query string', () => {
      cy.server();
      cy.get('[data-cy="clansSelector"]').should('be.visible');
      cy.get('[data-cy=clansSelector]').type('a');
      cy.waitForGraph('ClansSelect');
      cy.get('[data-cy="clansSelector"]').click().type('{enter}');
      cy.waitForGraph('ClanInfo');
    });

    it('should select clan given id', () => {
      cy.server();
      cy.get('[data-cy="clansSelector"]').should('be.visible');
      const testClanId = '535513160695038962';
      cy.get('[data-cy=clansSelector]').type(testClanId);
      cy.waitForGraph('ClansSelect');
      cy.get('[data-cy="clansSelector"]').click().type('{enter}');
      cy.waitForGraph('ClanInfo');
    });
  });

  describe('Clan Summary', () => {
    it('should be visible with correct clan name', () => {
      cy.get('[data-cy="clansSummaryTable"]').should('be.visible');
      cy.get('[data-cy="clansSummaryTable"]').within(() => {
        cy.contains('td.MuiTableCell-body', 'test');
      });
    });

    it('tags should be correctly formatted', () => {
      cy.get('[data-cy="clansSummaryTable"]').within(() => {
        const tags = ['new-tag, tag1', 'tag1, new-tag'];
        const regex = new RegExp(`${tags.join('|')}`, 'g');
        cy.contains('td.MuiTableCell-body', regex);
      });
    });

    it('should enable edit mode on edit action', () => {
      cy.contains('Summary').next().contains('edit').click();
      cy.contains('Summary').next().contains('done').should('be.visible');
      cy.get('[data-cy="clansSummaryTable"]')
        .find('td.MuiTableCell-body')
        .eq(2)
        .find('div.MuiTextField-root')
        .should('exist');
    });

    it('should handle clan updates', () => {
      cy.get('[data-cy="clansSummaryTable"]')
        .find('td.MuiTableCell-body')
        .eq(1)
        .as('nameCell');
      cy.get('@nameCell').find('input').as('nameInput');
      const newName = 'test';
      cy.fillTextField({
        selector: '@nameInput',
        value: `{selectall}{backspace}${newName}`,
      });

      cy.get('[data-cy="clansSummaryTable"]')
        .find('td.MuiTableCell-body')
        .eq(2)
        .as('tagCell');
      cy.get('@tagCell').find('input').as('tagInput');
      const newTag = 'DEV T';
      cy.fillTextField({
        selector: '@tagInput',
        value: `{selectall}{backspace}${newTag}`,
      });

      cy.contains('Summary').next().contains('done').click();
      cy.contains('Summary').next().contains('edit').should('be.visible');
      cy.get('[data-cy="clansSummaryTable"]').within(() => {
        cy.contains('td.MuiTableCell-body', newName);
        cy.contains('td.MuiTableCell-body', newTag);
      });
    });
  });

  describe('Clan Members Table', () => {
    it('should be visible with owner available', () => {
      cy.get('[data-cy="clanMembersTable"]').should('be.visible');
      cy.get('[data-cy="clanMembersTable"]').within(() => {
        cy.contains('span.ag-cell-value', 'OWNER');
        cy.contains(
          'span.ag-cell-value a',
          'qam_pigeon_0449#6523389 | 5835414818285979841'
        );
      });
    });

    it('members count should match summary', () => {
      cy.get('[data-cy="clansSummaryTable"]')
        .find('td.MuiTableCell-body')
        .eq(5)
        .as('memberCount');
      cy.get('@memberCount').then($div => {
        const text = $div.text();
        cy.get('[data-cy="clanMembersTable"]').within(() => {
          cy.get('div.ag-center-cols-container')
            .find('.ag-row')
            .should('have.length', parseInt(text, 10));
        });
      });
    });

    it('should handle removing members', () => {
      cy.server();
      cy.get('[data-cy="clanMembersTable"]')
        .find('div.ag-center-cols-container')
        .find('div.ag-row-last')
        .click();
      cy.contains('h6', 'Members').next().contains('delete').click();
    });

    describe('Add Clan Members', () => {
      it('should open dialog on button click', () => {
        cy.contains('h6', 'Members').next().contains('playlist_add').click();
        cy.contains('h2', 'Add Clan Members').should('be.visible');
      });

      it('should allow selecting members', () => {
        cy.server();
        cy.get('div.ag-floating-top-viewport')
          .find('[col-id="player"]')
          .find('div.MuiFormControl-root')
          .as('memberSelector');
        cy.get('@memberSelector').should('be.visible');
        cy.get('@memberSelector').type('s');
        cy.waitForGraph('UnoSelectInfo');
        cy.get('@memberSelector').click().type('{enter}');
        cy.get('div.ag-pinned-right-floating-top').contains('add').click();
        cy.get('div.ag-center-cols-container')
          .find('div.ag-row')
          .should('exist');
      });

      it('should handle adding members', () => {
        cy.clickButton({ selector: 'span', buttonTitle: 'Add Members' });
      });
    });
  });

  describe('Clan Proposals', () => {
    it('table should be visible', () => {
      cy.get('[data-cy="clanProposalsTable"]').should('be.visible');
    });
  });

  describe('Clan Bans', () => {
    it('table should be visible with expected banned users', () => {
      cy.get('[data-cy="clanBansTable"]').should('be.visible');
      cy.get('[data-cy="clanBansTable"]').within(() => {
        cy.contains('span.ag-cell-value a', '5779243048524473608');
        cy.contains('span.ag-cell-value a', '7307022213772839286');
      });
    });
  });
});
