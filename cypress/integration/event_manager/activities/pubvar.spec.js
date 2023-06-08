import {
  createActivity,
  deleteActivity,
  // emLogin,
  fetchThenNavigateToEvent,
  makeResourceUrl,
  makeTitleResourceUrl,
  renameActivity,
  selectActivityTitle,
} from '../../../helpers/event_manager';
import { makeNavigationUrl as makeOnlineConfigUrl } from '../../../helpers/online_configuration';

// emLogin();

// Only necessary if testing locally and no variables are available
describe.skip('Publisher Variable Creation', () => {
  it('create pubvar in online config', () => {
    cy.visit(
      makeOnlineConfigUrl({
        url: 'storage/publisher-variables/variables-sets/',
      })
    );
    cy.get('[title="Add Variables Set"]').click();
    cy.get('[name="namespace"]').type('Namespace');
    cy.get('[name="context"]').type('Context');
    cy.get('[name="groupId"]').type('1');
    cy.get('[name="variables[0].key"]').type('Test Variable Key');
    cy.get('[name="variables[0].value"]').type('Test Variable Value');
    cy.get('[title="Add new (key, value) pair"]').click();
    cy.get('span').contains('Add').click();
  });
});

fetchThenNavigateToEvent();
createActivity('Publisher Variables');
renameActivity('pubvars');

describe('Select Pub Var Title', () => {
  beforeEach(() => {
    cy.server();
    cy.route(
      makeTitleResourceUrl({
        resource: `storages/variables/sets`,
        titleId: '*',
      })
    ).as('fetchVarSets');
  });
  selectActivityTitle({
    callback: () => {
      cy.wait('@fetchVarSets');
    },
  });
});

describe('Publisher Variables Details', () => {
  beforeEach(() => {
    cy.server();
    cy.route('PUT', makeResourceUrl({ resource: `events/*/activities` })).as(
      'updateActivity'
    );
  });

  it('Set Context', () => {
    cy.selectMuiSelectOption({
      selector: 'pubvarContext',
      optionSelector: 'contextOption',
    });
  });
  it.skip('Set GroupID', () => {
    cy.selectMuiSelectOption({
      selector: 'pubvarGroupID',
      optionSelector: 'group_idOption',
      optionId: '2',
    });
  });
  it.skip('Set Namespace', () => {
    cy.selectMuiSelectOption({
      selector: 'pubvarNamespace',
      optionSelector: 'namespaceOption',
    });
  });

  it('create new variable', () => {
    cy.clickButton({ selector: 'span', buttonTitle: 'add_circle' });
    cy.get('input[name="pubVarsVariable"]').focus().type('v1');
    cy.get('input[name="pubVarsValue"]').focus().type('test_value');
    cy.get('span').contains('Create').click();
    cy.wait('@updateActivity');
  });

  it('change variable value', () => {
    cy.get('[row-index="0"] > [col-id="newValue"]').as('newValue');
    cy.get('@newValue').click();
    cy.get('.ag-text-field-input').type('New Value{enter}');
    cy.wait('@updateActivity');
  });

  it('view all changes', () => {
    cy.get('span').contains('View All Changes').click();
  });

  it('new value shows in summary', () => {
    cy.get('[row-index="0"] > [col-id="newValue"]')
      .invoke('text')
      .then(text => expect(text.trim()).equal('New Value'));
    cy.get('span').contains('Select Namespace').click();
  });

  it('Clear variable', () => {
    cy.get('[title="Clear Variable"]').eq(1).click();
    cy.wait('@updateActivity');
  });
});

deleteActivity('pubvars');
