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
createActivity('Publisher Objects');
renameActivity('pubobj');
selectActivityTitle();

describe('Set Achievement Context', () => {
  beforeEach(() => {
    cy.server();
    cy.route(
      makeTitleResourceUrl({
        resource: `object-store/categories`,
        titleId: '*',
      })
    ).as('fetchCategories');
    cy.route(
      makeTitleResourceUrl({
        resource: `groups-service/groups`,
        titleId: '*',
      })
    ).as('fetchGroups');
  });
  selectActivityContext({
    callback: () => {
      cy.wait(['@fetchCategories', '@fetchGroups']);
    },
  });
});

describe('Publisher Objects Details', () => {
  it('no rows overlay is rendered', () => {
    cy.contains('No Rows To Show').should('be.visible');
  });

  describe('File Upload', () => {
    const fileName = 'e2e_test.json';

    // shared actions/tests for File Upload
    const upload = (subjectType = 'input') => {
      cy.fixture(fileName).then(fileContent => {
        if (subjectType === 'input')
          cy.contains('Choose file')
            .siblings()
            .children('input')
            .as('fileInput');
        else cy.get('[data-cy="fileUploadDropzone"]').as('fileInput');

        cy.get('@fileInput').upload(
          { fileContent, fileName, mimeType: 'application/json' },
          { subjectType }
        );
      });
      cy.contains(fileName).should('be.visible');
    };

    const openModal = () =>
      it('open modal', () => {
        cy.get('[data-cy="objectStoreUploadButton"]').click();
      });

    const changeFilename = (name = 'hello.json') => {
      cy.get('[name="fileName"]').clear();
      cy.get('[name="fileName"]').type(name);
    };

    const submitModal = () => cy.get('span').contains('Upload').click();

    const selectAcl = (type = 'public') => {
      cy.get('#mui-component-select-acl').click();
      cy.get(`[data-value="${type}"]`).click();
    };

    openModal();

    it('upload file with button, delete it, upload it again', () => {
      cy.contains('Browse file').click();
      upload();
      cy.get('[title="Delete"]').click();
      upload();
    });

    it('form fields: new category, and change filename', () => {
      cy.contains('Select or Create Category')
        .parent()
        .children()
        .children()
        .children('input')
        .type('New Category{enter}');

      changeFilename();
    });

    it('check required field ACL validation', () => {
      submitModal();
      cy.get('p').contains('Required').should('be.visible');
    });

    it('finish fields and submit', () => {
      selectAcl();
      cy.contains('Expires On (optional)')
        .siblings()
        .children('input')
        .as('publishDate');
      cy.updateDateTimePicker({
        selector: '@publishDate',
        date: Cypress.moment().add(1, 'hour'),
      });
      cy.server();
      cy.route('PUT', makeResourceUrl({ resource: `events/*/activities` })).as(
        'uploadObject'
      );
      submitModal();
      cy.wait('@uploadObject');
    });

    openModal();

    it('upload a file with dropzone', () => {
      upload('drag-n-drop');
    });

    // TODO: Bug fix, error message no longer shows in upload dialog
    // it('change filename to one that already exists and validate error', () => {
    //   changeFilename();
    //   selectAcl();
    //   submitModal();

    //   cy.contains('Error: Action required').should('be.visible');
    //   cy.contains('File name "hello.json" already exists.').as('errorText');
    //   cy.get('@errorText').should('be.visible');

    //   cy.get('body').trigger('keydown', {
    //     key: 'Escape',
    //     code: 'Escape',
    //     which: 27,
    //   });
    //   changeFilename('hi.json');
    //   submitModal();
    // });

    it('close modal', () => {
      cy.get('span').contains('Cancel').click();
    });
  });

  describe('File Table', () => {
    const checkTextValue = (colId, val) => {
      // cy.get('.ag-center-cols-container').within(() => {
      cy.get(`[row-index="0"] > [col-id="${colId}"]`)
        .scrollIntoView()
        .invoke('text')
        .then(text => expect(text.trim()).match(val));
      // });
    };

    it('check for correct file attributes', () => {
      checkTextValue('name', /hello.json/);
      // scroll to center so columns render
      cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('center');
      checkTextValue('category', /brand new category/);
      checkTextValue('contentLength', /15 bytes/);
      checkTextValue('acl', /public/);
      checkTextValue('extraData', /N[/]A/);
      const date = Cypress.moment().format('MMM D, YYYY').split(' ');
      const dateRegex = new RegExp(
        `${date[0]} \\d*${date[1]} ${date[2]}\\s\\d+[\\s\\S]\\d+\\s[\\s\\S]+`
      );
      checkTextValue('created', dateRegex);
      checkTextValue('modified', dateRegex);
      checkTextValue('expiresOn', dateRegex);
    });

    // TODO: figure out how to interact with the browser download dialog
    it('download file', () => {
      cy.clickButton({ selector: 'span', buttonTitle: 'file_download' });
    });

    it('delete file', () => {
      cy.server();
      cy.route('DELETE', makeResourceUrl({ resource: `files` })).as(
        'deleteFile'
      );
      cy.get('.ag-body-horizontal-scroll-viewport').scrollTo('left');
      cy.get('.ag-checkbox-input').check({ force: true });
      cy.get('[data-cy="pubObjTitleComponents"]').within(() => {
        cy.clickButton({ selector: 'span', buttonTitle: 'delete' });
      });
      cy.get('span').contains('Delete').click();
      cy.wait('@deleteFile');
      cy.contains('No Rows To Show').should('be.visible');
    });
  });
});

deleteActivity('publisher_objects');
