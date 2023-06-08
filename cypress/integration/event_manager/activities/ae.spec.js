import {
  createActivity,
  deleteActivity,
  // emLogin,
  fetchThenNavigateToEvent,
  makeResourceUrl,
  makeTitleResourceUrl,
  renameActivity,
  selectActivityContext,
  selectActivityTitle,
} from '../../../helpers/event_manager';

// emLogin();
fetchThenNavigateToEvent();
createActivity('Achievements Engine');
renameActivity('ae');
selectActivityTitle();

describe('Set Achievement Context', () => {
  beforeEach(() => {
    cy.server();
    cy.route(
      makeTitleResourceUrl({
        resource: `achievements-engine/rulesets`,
        titleId: '*',
      })
    ).as('fetchRulesets');
  });
  selectActivityContext({
    callback: () => {
      cy.wait('@fetchRulesets');
    },
  });
});

describe('Achievement Engine Details', () => {
  it('select ruleset option', () => {
    cy.server();
    cy.route('PUT', makeResourceUrl({ resource: `events/*/activities` })).as(
      'updateActivityRuleset'
    );
    cy.contains('Rulesets...').parent().as('rulesetsSelector');
    cy.get('@rulesetsSelector').click();
    cy.get('@rulesetsSelector')
      .find('input')
      .focus()
      .type('{enter}', { force: true });
    cy.wait('@updateActivityRuleset');
  });

  it('check ruleset details and verify the info is correct', () => {
    const checkIfExists = (key, name) => {
      cy.get(`.${key}`).parent().as('infoKeyColumn');
      cy.get('@infoKeyColumn').contains(name).should('be.visible');
      cy.get('@infoKeyColumn')
        .siblings('.ant-col')
        .find('.value')
        .should('be.visible');
    };

    checkIfExists('key', 'Last Update Timestamp');
    checkIfExists('key', 'Label');
    checkIfExists('key', 'Code Hash');
    checkIfExists('key', 'Activation Timestamp');
    checkIfExists('key', 'Creation Timestamp');
    checkIfExists('key', 'Is Active');
    checkIfExists('key', 'Code Signature Timestamp');
    checkIfExists('key', 'Code Signature');
  });
});

deleteActivity('ae');
