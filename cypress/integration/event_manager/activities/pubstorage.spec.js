import {
  createActivity,
  deleteActivity,
  // emLogin,
  fetchThenNavigateToEvent,
  renameActivity,
  selectActivityTitle,
} from '../../../helpers/event_manager';

// emLogin();
fetchThenNavigateToEvent();
createActivity('Publisher Storage');
renameActivity('pubstorage');
selectActivityTitle();

describe('Publisher Storage Details', () => {
  const fileName = 'e2e_test.json';

  it('check upload is enabled', () =>
    cy.get('span').contains('cloud_upload').should('not.be.disabled'));

  it('upload a file with button', () => {
    cy.get('button[title="Upload File"]').click();
    cy.fixture(fileName).then(fileContent =>
      cy
        .get('[data-cy="fileInput"]')
        .upload({ fileContent, fileName, mimeType: 'application/json' })
    );
  });

  it('upload a file with dropzone', () => {
    cy.fixture(fileName).then(fileContent =>
      cy
        .get('[data-cy="fileInputDropzone"]')
        .upload(
          { fileContent, fileName, mimeType: 'application/json' },
          { subjectType: 'drag-n-drop' }
        )
    );
  });

  it('change attributes for both files', () => {
    const clickFieldAndType = (
      idx,
      type,
      inputType = '.ag-text-field-input'
    ) => {
      cy.get(`[row-index="${idx}"] > [col-id="${type}"]`).click();
      cy.get(inputType).clear();
      cy.get(inputType).type(`${type} ${idx}{enter}`);
    };
    // enter title for file 1
    clickFieldAndType(0, 'title');

    // enter comment for file 1
    clickFieldAndType(0, 'comment', '.ag-text-area-input');

    // change filename for file 1
    clickFieldAndType(0, 'remoteFilename');

    // enter title for file 2
    clickFieldAndType(1, 'title');

    // enter comment for file 2
    clickFieldAndType(1, 'comment', '.ag-text-area-input');

    // change filename for file 2
    clickFieldAndType(1, 'remoteFilename');

    cy.contains('Loading...').should('be.visible');
    cy.contains('Changes Saved').should('be.visible');
  });

  it('download a file', () => {
    cy.get('span').contains('save_alt').parent().click();
  });

  it('delete a file', () => {
    cy.get('[row-index="0"]').get('span').contains('delete').click();
    cy.get('span').contains('Delete').click();
  });
});

deleteActivity('pubstorage');
