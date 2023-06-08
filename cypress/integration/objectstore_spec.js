// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-file-upload';
import moment from 'moment';
import { login } from '../helpers';
import {
  makeNavigationUrl,
  makeTitleUrl,
} from '../helpers/online_configuration';

const PUBLISHER_URL = makeNavigationUrl({
  url: 'object-store/publisher',
});

login();

describe('Object Store', () => {
  describe('Publisher Objects', () => {
    let uniqueFileName;
    const waitingTimeout = 110000; // ms

    beforeEach(() => {
      cy.server();
      cy.route({
        method: 'PUT',
        url: makeTitleUrl({
          resource: 'object-store/publisher/objects',
        }),
      }).as('putObject');
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'object-store/publisher/objects',
        }),
      }).as('getObjects');
      cy.route({
        method: 'GET',
        url: makeTitleUrl({
          resource: 'object-store/publisher/objects/*',
        }),
      }).as('downloadFile');

      cy.visit(PUBLISHER_URL);
      cy.wait('@getObjects', { timeout: waitingTimeout });
    });

    it('Expect heading bar and inputs to be visible', () => {
      cy.get('[data-cy="filename-lookup"]').should('be.visible');
      cy.get('[data-cy="objectStoreUploadButton"]').should('be.visible');
    });

    describe('File upload', () => {
      // Test files
      const testFileNameJSON = 'e2e_test.json';
      // const testFileNameZIP = '1MB.zip';
      const openModal = () =>
        cy.clickButton({ selector: '[data-cy="objectStoreUploadButton"]' });
      const submitModal = () =>
        cy.clickButton({ selector: 'span', buttonTitle: 'Upload' });

      it('Expect to be able to upload file with button', () => {
        openModal();
        // Load file in modal, delete and load it again
        cy.contains('Browse file').click();
        cy.uploadFile({ fileName: testFileNameJSON });
        cy.contains(testFileNameJSON).should('be.visible');

        cy.get('[title="Delete"]').click();
        cy.uploadFile({ fileName: testFileNameJSON });
        cy.contains(testFileNameJSON).should('be.visible');

        // Test new category and change filename inputs work
        cy.contains('Select or Create Category')
          .parent()
          .children()
          .children()
          .children('input')
          .type('New Category{enter}');

        uniqueFileName = moment().valueOf();
        cy.changeField({
          fieldName: 'fileName',
          value: uniqueFileName,
        });

        // Submit modal
        submitModal();

        // Check that ACL is required
        cy.get('p').contains('Required').should('be.visible');
        // Finish fields and submit
        cy.selectOptionField({
          fieldSelector: '#mui-component-select-acl',
          optionSelector: '[data-value="public"]',
        });
        cy.selectOptionField({
          fieldSelector: '#mui-component-select-checksumType',
          optionSelector: '[data-value="none"]',
        });
        submitModal();
        cy.wait('@putObject', { timeout: waitingTimeout });
        cy.get('[data-cy="modalForm"]').should('not.exist');
        cy.wait('@getObjects', { timeout: waitingTimeout });
        cy.findRow({
          contains: uniqueFileName,
          timeout: waitingTimeout,
        }).should('be.visible');
      });

      it('Expect to be able to download files', () => {
        // wait until lastly upload file is displayed
        cy.findRow({
          contains: uniqueFileName,
          timeout: waitingTimeout,
        }).as('zipRow');
        cy.get('@zipRow').should('be.visible');
        // Find row index for .zip file
        cy.get('.ag-pinned-right-cols-container')
          .first()
          .find('[title="Download"]')
          .then(cell => {
            cell.click();
          });
      });
    });

    describe('Delete uploaded files', () => {
      it('Expect to be able to delete uploaded publisher object files', () => {
        // Delete button appears only when grid has selected rows
        cy.findRow({
          contains: uniqueFileName,
          timeout: waitingTimeout,
        })
          .parent()
          .within(() => {
            cy.get('.ag-input-field-input.ag-checkbox-input').click();
          });
        cy.get('[data-cy="deleteButton"]').then($button => {
          cy.get($button).should('be.visible');
          cy.get('[data-cy="deleteButton"]:not([disabled])').click();
          cy.get('[data-cy=confirmButton]').click();
          cy.get('[data-cy="notifications-success"', {
            timeout: waitingTimeout,
          }).should('be.visible');
          cy.get('[role="row"]').contains(uniqueFileName).should('not.exist');
        });
      });
    });
  });

  describe('User Objects', () => {
    const searchString = '%';
    beforeEach(() => {
      cy.server();
      cy.route(
        makeTitleUrl({
          resource: 'accounts',
          queryParams: `?q=${searchString}*`,
        })
      ).as('getUsersPartialSearch');

      cy.route(
        makeTitleUrl({
          resource: 'object-store/users/*/objects',
        })
      ).as('getUserDetails');

      cy.route(
        makeTitleUrl({
          resource: 'contexts-registry/ObjectStore',
          queryParams: '**',
        })
      ).as('getContextsRegistry');

      cy.visit(makeNavigationUrl({ url: 'object-store/user' }));
      cy.wait('@getContextsRegistry');
    });

    it('Expect user search field to trigger user objects data fetch', () => {
      cy.get('[data-cy=userAutocomplete]').type(searchString);
      cy.wait('@getUsersPartialSearch');
      cy.get('[data-cy="autocompleteOption"]').first().click();
      cy.wait('@getUserDetails').its('status').should('eq', 200);
    });

    it('Expect to be able to download user objects', () => {
      cy.get('[data-cy=userAutocomplete]').type(searchString);
      cy.wait('@getUsersPartialSearch');
      cy.get('[data-cy="autocompleteOption"]').first().click();
      cy.wait('@getUserDetails').its('status').should('eq', 200);
      cy.get('.ag-pinned-right-cols-container')
        .first()
        .find('[title="Download"]')
        .then(cell => {
          cell.click();
        });
    });
  });

  describe('Pooled Objects', () => {
    const openUserTagEntryModal = () =>
      cy.clickButton({ selector: '[data-cy=userTagEntryModalButtom]' });

    beforeEach(() => {
      cy.server();

      cy.route(
        makeTitleUrl({
          resource: 'object-store/users/pooled-objects/tags',
          queryParams: '**',
        })
      ).as('getPooledObjectsTags');

      cy.visit(makeNavigationUrl({ url: 'object-store/pooled-objects' }));
      cy.wait('@getPooledObjectsTags', { timeout: 60000 });
    });

    it('User Tag Entry modal comes up when add user/tag to search query button clicked', () => {
      openUserTagEntryModal();
      cy.get('[data-cy=userTagEntryModal]').should('be.visible');
    });
  });

  describe('Object Groups', () => {
    const groupName = moment().valueOf();
    const description = 'This is a test';
    const openModal = () =>
      cy.clickButton({ selector: '[data-cy=createGroupModalButton]' });
    const submitModal = () =>
      cy.clickButton({ selector: 'span', buttonTitle: 'Create Group' });

    beforeEach(() => {
      cy.server();
      cy.route(
        makeTitleUrl({
          resource: 'groups-service/groups',
        })
      ).as('getGroups');

      cy.route({
        method: 'POST',
        url: makeTitleUrl({
          resource: 'groups-service/groups',
        }),
      }).as('createGroup');

      cy.route(
        makeTitleUrl({
          resource: 'object-store/publisher/objects',
          queryParams: '?groupID=*',
        })
      ).as('getRelatedPublisherObjects');

      cy.route({
        method: 'POST',
        url: makeTitleUrl({
          resource: 'groups-service/groups',
        }),
      }).as('createGroup');

      cy.route({
        method: 'DELETE',
        url: makeTitleUrl({
          resource: 'groups-service/groups',
        }),
      }).as('deleteGroup');

      cy.visit(makeNavigationUrl({ url: 'object-store/groups' }));
      cy.wait('@getGroups', { timeout: 60000 });
    });

    it('Expect CreateGroup modal to create group', () => {
      openModal();
      cy.changeField({ fieldName: 'groupName', value: groupName });
      cy.changeField({ fieldName: 'description', value: description });
      submitModal();
      cy.wait('@createGroup').its('status').should('eq', 201);
    });

    it('Expect object group details to be fetched correctly', () => {
      cy.contains(groupName).click();
    });

    it('Expect Delete group button on list to delete group', () => {
      cy.contains(groupName).click();
      cy.get('[title="Delete group"]').click();
      cy.get('span').contains('Delete').click();
      cy.wait('@deleteGroup', { timeout: 20000 });
      cy.contains(`Successfully deleted group with name ${groupName}.`).should(
        'be.visible'
      );
    });
  });
});
