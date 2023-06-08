import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

const rulesetsTimeout = 10000;

login();

describe('Achievements Engine', () => {
  describe('Active Ruleset', () => {
    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'achievements-engine/rulesets',
        }),
      }).as('getRuleset');

      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'achievements-engine/achievements',
        }),
      }).as('getAchievements');
    });

    it('Expect active ruleset date to be fetched when opening page', () => {
      cy.visit(makeNavigationUrl({ url: 'achievements/active-ruleset' }));
      cy.url().should('include', 'achievements/active-ruleset');
      cy.wait(['@getRuleset', '@getAchievements']).then(xhrs => {
        xhrs.forEach($xhr => expect($xhr.status).to.equal(200));
      });
    });
    it('Expect table to display specific columns', () => {
      cy.get('.ag-header-cell-text[role="columnheader"]').should($headers => {
        expect($headers).to.contain('Name');
        expect($headers).to.contain('Achievement ID');
        expect($headers).to.contain('Description');
        expect($headers).to.contain('Kind');
      });
    });
  });

  describe('Rulesets', () => {
    const searchString = 'Test1';
    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'achievements-engine/rulesets',
        }),
      }).as('getRuleset');

      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'achievements-engine/rulesets/*',
        }),
      }).as('getRulesetDetails');

      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'achievements-engine/rulesets/*/checks',
          queryParams: `*q=${searchString}*`,
        }),
      }).as('getRulesetChecking');

      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'achievements-engine/rulesets',
          queryParams: `*q=${searchString}*`,
        }),
      }).as('getRulesetSearch');
      cy.route(
        makeTitleUrl({
          resource: 'contexts-registry/AchievementsEngine',
          queryParams: '**',
        })
      ).as('getContextsRegistry');
      cy.visit(makeNavigationUrl({ url: 'achievements/rulesets' }));
      cy.wait('@getContextsRegistry');
      cy.wait('@getRuleset', { timeout: rulesetsTimeout })
        .its('status')
        .should('eq', 200);
    });

    it('Expect rulesets details data to be fetched on clicking list element', () => {
      // Ruleset details
      cy.get('[data-cy="rulesetName"]')
        .first()
        .then($firstItem => {
          $firstItem.click();
          cy.wait('@getRulesetDetails');
        });
    });

    it('Expect ruleset checking data to be fetched on clicking list element', () => {
      // Check ruleset
      cy.get('data-cy="rulesetName"]')
        .first()
        .then($firstItem => {
          $firstItem.click();
          cy.wait('@getRulesetChecking');
        });
    });

    it('Expect search field filter rulesets', () => {
      cy.get('.common__search input').type(searchString).type('{enter}');
      cy.wait('@getRulesetSearch').its('status').should('eq', 200);
    });
  });

  describe('Player Achievements', () => {
    const q = '?*';
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
          resource: 'accounts/*/achievements',
          queryParams: q,
        }),
      }).as('getUserAchievements');

      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'accounts/*/achievements/state',
          queryParams: q,
        }),
      }).as('getUserState');

      cy.route({
        method: 'PUT',
        url: makeTitleUrl({
          resource: 'accounts/*/achievements/state',
          queryParams: q,
        }),
      }).as('putUserState');

      cy.route({
        method: 'POST',
        url: makeTitleUrl({
          resource: 'accounts/*/achievements/events',
          queryParams: q,
        }),
      }).as('postEvent');
      cy.route(
        makeTitleUrl({
          resource: 'contexts-registry/AchievementsEngine',
          queryParams: '**',
        })
      ).as('getContextsRegistry');

      cy.visit(makeNavigationUrl({ url: 'achievements/player-achievements' }));
      cy.wait('@getContextsRegistry');
    });

    it('Achievements data to be fetched on search', () => {
      cy.get('[data-cy=userAutocomplete]').type(searchString);
      cy.wait('@getUser');
      cy.get('[data-cy="autocompleteOption"]').first().click();
      cy.wait('@getUserAchievements');
      cy.get('[class^="presentational_header__"]').contains('Achievements');
      cy.get('[class^="RowsCountStatusBarComponent"] strong', {
        timeout: 15000,
      }).should($value => {
        expect(parseInt($value.text(), 10)).to.be.greaterThan(0);
      });
    });

    it('Achievements data could be filtered', () => {
      const filterValue = 'a';
      cy.get('[data-cy=userAutocomplete]').type(searchString);
      cy.wait('@getUser');
      cy.get('[data-cy="autocompleteOption"]').first().click();
      cy.wait('@getUserAchievements');
      cy.get('[class^="FilteredStatusBarComponent"]').should('not.be.visible');
      cy.get(
        '[class^=presentational_headerContainer] .MuiFormControl-root'
      ).type(filterValue);
      cy.get('[class^="FilteredStatusBarComponent"] strong', {
        timeout: 15000,
      }).should($value => {
        expect(parseInt($value.text(), 10)).to.be.greaterThan(0);
      });
    });

    it('Player state data to be fetched on search', () => {
      if (Cypress.env('testEnvironment') === 'prod') {
        // Remove this when issue with assignign 'Change active player state' and 'Send player events' are resolved.
        return;
      }
      cy.get('[data-cy=userAutocomplete]').type(searchString);
      cy.wait('@getUser');
      cy.get('[data-cy="autocompleteOption"]').first().click();
      cy.wait('@getUserState');

      // User State Expandable panel
      cy.get('[class^=UserState_container] .MuiAccordion-root').as('userState');
      cy.get('@userState')
        .find('.react-monaco-editor-container')
        .should('not.be.visible');
      cy.get('@userState')
        .find('.MuiAccordionSummary-root')
        .as('userStateSummary');
      cy.get('@userStateSummary')
        .invoke('attr', 'aria-expanded')
        .should('eq', 'false');
      cy.get('@userStateSummary').click();
      cy.get('@userStateSummary')
        .invoke('attr', 'aria-expanded')
        .should('eq', 'true');
      cy.get('@userState').find('.react-monaco-editor-container').as('editor');
      cy.get('@editor').should('be.visible');

      cy.get('@userState')
        .find('.MuiAccordionActions-root button')
        .as('saveBtn');

      // Validation

      const selectAllKeys =
        Cypress.platform === 'darwin' ? '{cmd}a' : '{ctrl}a';
      const changeEditorValue = value => {
        cy.get('@editor').click().focused().type(selectAllKeys).type(value);
      };

      const inputs = [
        { input: 'INVALID', error: 'Make sure the input is a valid JSON' },
        { input: '{del}', error: 'Required' },
      ];

      inputs.forEach(({ input, error }) => {
        changeEditorValue(input);
        cy.get('@saveBtn').click();
        cy.get('[data-cy=userStateError]').contains(error);
      });

      // Submit

      changeEditorValue('{{}"NP": 1000{}}');
      cy.get('@saveBtn').click();
      cy.get('[data-cy=userStateError]').should('not.be.visible');
      cy.wait('@putUserState');
    });

    it('Send Player State', () => {
      if (Cypress.env('testEnvironment') === 'prod') {
        // Remove this when issue with assignign 'Change active player state' and 'Send player events' are resolved.
        return;
      }
      cy.get('[data-cy=userAutocomplete]').type(searchString);
      cy.wait('@getUser');
      cy.get('[data-cy="autocompleteOption"]').first().click();
      cy.wait('@getUserAchievements');

      // Send Player Event Expandable panel
      cy.get('[class^=SendEvent_container] .MuiAccordion-root').as('sendEvent');
      cy.get('@sendEvent')
        .find('.react-monaco-editor-container')
        .should('not.be.visible');
      cy.get('@sendEvent')
        .find('.MuiAccordionSummary-root')
        .as('sendEventSummary');
      cy.get('@sendEventSummary')
        .invoke('attr', 'aria-expanded')
        .should('eq', 'false');
      cy.get('@sendEventSummary').click();
      cy.get('@sendEventSummary')
        .invoke('attr', 'aria-expanded')
        .should('eq', 'true');
      cy.get('@sendEvent').find('.react-monaco-editor-container').as('editor');
      cy.get('@editor').should('be.visible');

      cy.get('@sendEvent')
        .find('.MuiAccordionActions-root button')
        .as('saveBtn');

      // Validation

      const superKey = Cypress.platform === 'darwin' ? '{cmd}' : '{ctrl}';
      const changeEditorValue = value => {
        cy.get('@editor').click().focused().type(`${superKey}a`).type(value);
      };

      const inputs = [
        { input: 'INVALID', error: 'Make sure the input is a valid JSON' },
        { input: '{del}', error: 'Required' },
      ];

      inputs.forEach(({ input, error }) => {
        changeEditorValue(input);
        cy.get('@saveBtn').click();
        cy.get('[data-cy=valuesError]').contains(error);
      });

      cy.get('@sendEvent')
        .find('.MuiTextField-root .Mui-error')
        .contains('Required');

      // Submit

      cy.get('@sendEvent').find('.MuiTextField-root').type('login');
      changeEditorValue('{{}"NP": 1000{}}');
      cy.get('@saveBtn').click();
      cy.get('[data-cy=valuesError]').should('not.be.visible');
      cy.wait('@postEvent');
    });

    if (['dev', 'qa'].includes(Cypress.env('testEnvironment'))) {
      it('Clone player achievements dialog can be opened', () => {
        cy.get('[data-cy=userAutocomplete]').type(searchString);
        cy.wait('@getUser');
        cy.get('[data-cy="autocompleteOption"]').first().click();
        cy.wait('@getUserAchievements');
        cy.get('[data-cy="cloneButton"]').should('be.visible').first().click();
        cy.get('[role="dialog"]').contains("Clone player's achievements");
        cy.get('[role="dialog"]')
          .find('button')
          .should(actions => {
            expect(actions).to.have.length(2);
            expect(actions.eq(0)).to.contain('Cancel');
            expect(actions.eq(1)).to.contain('Clone');
          });
      });
    }
  });
});
