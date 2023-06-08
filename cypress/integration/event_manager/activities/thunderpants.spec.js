import {
  createActivity,
  deleteActivity,
  // emLogin,
  fetchThenNavigateToEvent,
  makeResourceUrl,
  makeThunderpantsResourceUrl,
  renameActivity,
} from '../../../helpers/event_manager';

// emLogin();
fetchThenNavigateToEvent();
createActivity('Thunderpants Deployment');
renameActivity('tp_deployment');

describe('Thunderpants Details', () => {
  beforeEach(() => {
    cy.server();
    cy.route(makeResourceUrl({ resource: `events` })).as('refetchEvent');
    cy.route('PATCH', makeResourceUrl({ resource: `events` })).as(
      'updateEvent'
    );
    cy.route('PUT', makeResourceUrl({ resource: `events/*/activities` })).as(
      'updateActivity'
    );
    cy.route(makeThunderpantsResourceUrl({ resource: 'list' })).as(
      'fetchViewList'
    );
    cy.route(makeThunderpantsResourceUrl({ resource: '*/build_schema' })).as(
      'fetchBuildSchema'
    );
    cy.route(
      makeThunderpantsResourceUrl({ resource: '*/user_params_schema' })
    ).as('fetchUserSchema');
    cy.route(makeThunderpantsResourceUrl({ resource: '*/build/list' })).as(
      'fetchBuildList'
    );
    cy.route(makeThunderpantsResourceUrl({ resource: '*/deployment/list' })).as(
      'fetchDeploymentList'
    );
    cy.route(makeThunderpantsResourceUrl({ resource: '*/target/list' })).as(
      'fetchTargetList'
    );
  });

  it('select deployer', () => {
    cy.selectMuiSelectOption({
      selector: 'deployerSelect',
      optionSelector: 'deployerSelectOption',
    });
    cy.wait(['@updateActivity', '@refetchEvent', '@fetchViewList']);
  });

  it('select view', () => {
    cy.selectMuiSelectOption({
      selector: 'viewSelect',
      optionSelector: 'viewSelectOption',
    });
    cy.wait([
      '@fetchBuildSchema',
      '@fetchUserSchema',
      '@fetchBuildList',
      '@fetchDeploymentList',
      '@fetchTargetList',
    ]);
  });

  it('search to filter for demo flavor', () => {
    cy.contains('Enter a search string').parent().as('searchField');
    cy.fillTextField({
      selector: '@searchField',
      value: 'demo',
    });
    cy.get('.ag-center-cols-container').within(() => {
      cy.get('[col-id="4"]').each($el => {
        expect($el).to.contain('demo');
      });
    });
  });

  it('open deployer details', () => {
    cy.get('[row-index="0"] > [col-id="badges_1"]')
      .find('.ag-icon')
      .eq(1)
      .click();
    cy.get('[data-cy="buildCellTable"]').should('be.visible');
  });

  it('add deployment', () => {
    cy.clickButton({ selector: '[data-cy="addDeploymentBtn"]' });
    cy.get('[data-cy="targetCheckbox"]').eq(1).click();
    cy.clickButton({ selector: 'span', buttonTitle: 'Schedule' });
    cy.wait(['@updateActivity', '@refetchEvent']);
  });

  it('edit deployment', () => {
    cy.get('[data-cy="buildCellTable"]').within(() => {
      cy.clickButton({ selector: 'span', buttonTitle: 'build' });
    });
    cy.fillTextField({
      selector: '[data-cy="intField"]',
      value: '{selectall}{backspace}5',
    });
    cy.clickButton({ selector: 'span', buttonTitle: 'Edit' });
    cy.wait(['@updateActivity', '@refetchEvent']);
  });

  it('lock deployment', () => {
    cy.get('[data-cy="buildCellTable"]').within(() => {
      cy.clickButton({ selector: 'span', buttonTitle: 'lock' });
    });
    cy.contains('Enter password').parent().type('test{enter}');
    cy.get('.MuiDialog-paper').within(() => {
      cy.get('span').contains('Set').click({ force: true });
    });
    cy.wait(['@updateActivity', '@refetchEvent']);
  });

  it('clear deployment', () => {
    cy.get('[data-cy="buildCellTable"]').within(() => {
      cy.clickButton({ selector: 'span', buttonTitle: 'clear' });
    });
    cy.get('input[type="password"]').type('test{enter}');
    cy.clickButton({ selector: 'span', buttonTitle: 'Clear' });
    cy.wait(['@updateActivity', '@refetchEvent']);
  });
});

deleteActivity('tp_deployment');
