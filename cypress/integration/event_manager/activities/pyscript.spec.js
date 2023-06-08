import {
  createActivity,
  deleteActivity,
  // emLogin,
  fetchThenNavigateToEvent,
  makeResourceUrl,
  renameActivity,
  selectActivityTitle,
} from '../../../helpers/event_manager';

// emLogin();
fetchThenNavigateToEvent();

describe('Create Pyscript Activity', () => {
  beforeEach(() => {
    cy.server();
    cy.route(makeResourceUrl({ resource: `pyscripts` })).as('fetchTemplates');
  });
  createActivity('Python Script', () => cy.wait('@fetchTemplates'));
});

renameActivity('pyscript');
selectActivityTitle();

describe('PyScript Details', () => {
  beforeEach(() => {
    cy.server();
    cy.route(makeResourceUrl({ resource: `events` })).as('refetch');
    cy.route('PUT', makeResourceUrl({ resource: `events/*/activities` })).as(
      'updateActivity'
    );
  });

  it('select template', () => {
    cy.selectMuiSelectOption({
      selector: 'pyscriptTemplates',
      optionSelector: 'pyscriptTemplateOption',
      optionId: 'weapon-drop',
    });
  });

  it('upload file and check new rows and file info', () => {
    cy.get('button[label="Select File"]').click();
    const fileName = 'e2e_test.json';
    cy.fixture(fileName).then(fileContent =>
      cy
        .get('.ant-upload')
        .children('input')
        .upload({ fileContent, fileName, mimeType: 'application/json' })
    );
    cy.wait(['@updateActivity', '@refetch']);
    cy.contains('attachment_icons (2)').should('be.visible');
    cy.contains(fileName).should('be.visible');
    cy.contains('15 bytes').should('be.visible');
  });

  it('delete uploaded file attachment', () => {
    cy.clickButton({
      selector: 'span[name="attachment_icons (1)"]',
      buttonTitle: 'delete_forever',
    });
    cy.wait('@updateActivity');
  });

  it('check input errors', () => {
    cy.get('[id="textfield-cost"]').type('1');
    cy.get('[aria-describedby="textfield-cost-helper-text"]').should(
      'be.visible'
    );
    cy.get('[id="textfield-cost"]').clear();
  });

  it('add cost input', () => {
    cy.get('[id="textfield-cost"]').type('10{enter}');
    cy.wait(['@updateActivity', '@refetch']);
  });

  it('add fire rate input', () => {
    cy.get('[id="textfield-fire_rate"]').type('35{enter}');
    cy.wait(['@updateActivity', '@refetch']);
  });

  it('add weapon type input', () => {
    cy.get('[id="textfield-weapon_type"]').type('AK-47{enter}');
    cy.wait(['@updateActivity', '@refetch']);
  });

  it('add attachment and check new attachment row exists', () => {
    cy.get('[id="textfield-attachments (1)"]').type('1{enter}');
    cy.wait(['@updateActivity', '@refetch']);
    cy.contains('attachments (2)').should('be.visible');
  });
});

deleteActivity('pyscript');
