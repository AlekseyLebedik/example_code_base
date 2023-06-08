import { login } from '../../helpers';
import {
  groupName,
  // companyName,
  // makeUrl,
  // makeRouteUrl,
  visitGroup,
  testGroupObjectPermission,
} from '../../helpers/permission_management';

login();

describe('Groups', () => {
  before(() => {
    visitGroup(groupName);
    cy.deleteGroupObjectPermissions();
  });

  it('Add Change accounts permission to Company object', () => {
    testGroupObjectPermission('Company', 'Change accounts');
  });

  // it('Add Rename players permission to Project object', () => {
  //   testGroupObjectPermission('Project', 'Rename players');
  // });

  // it('Add Approve entities permission to Titleenv object', () => {
  //   testGroupObjectPermission('Titleenv', 'Approve entities');
  // });
});

// describe('Groups - Add dialog', () => {
//  beforeEach(() => {
//    cy.visit(makeUrl('groups'));
//    cy.get('button')
//      .contains('add')
//      .click();
//    cy.server();
//  });
//
//  it('Modal dialog', () => {
//    cy.get('h6')
//      .contains('Create Group')
//      .should('be.visible');
//    cy.get('label')
//      .contains('Group Name')
//      .should('have.length', 1);
//    cy.get('label')
//      .contains('Company')
//     .should('have.length', 1);
//   cy.get('div')
//     .contains('Users')
//     .should('have.length', 1);
// });
//
// it('Validation error, group name already exists', () => {
//   cy.route('POST', makeRouteUrl('company-groups/**')).as('postCompanyGroups');
//   cy.get('input[name="groupName"]').type(groupName);
//   cy.get('label')
//     .contains('Company')
//     .parent()
//     .click();
//   cy.get('li')
//     .contains(companyName)
//     .click();
//   cy.get('button')
//     .contains('Create Group')
//     .click();
//   cy.wait('@postCompanyGroups');
//   cy.get('@postCompanyGroups').should(
//     ({
//       status,
//       responseBody: {
//         error: { invalid },
//       },
//     }) => {
//       expect(status).to.eq(400);
//       cy.wrap(invalid[0])
//         .its('msg')
//         .should('eq', 'The fields company, name must make a unique set.');
//     }
//   );
// });
//
// it('Add new group', () => {
//   cy.route('POST', makeRouteUrl('company-groups/**'), {}).as(
//     'postCompanyGroups'
//   );
//   cy.route('PUT', makeRouteUrl('company-groups/*/users/**'), {}).as(
//     'putCompanyGroupsUsers'
//   );
//   const name = 'New group';
//   cy.get('input[name="groupName"]').type(name);
//   cy.get('label')
//     .contains('Company')
//     .parent()
//     .click();
//   cy.get('li')
//     .contains(companyName)
//     .then(company => {
//       const companyID = parseInt(company.attr('data-value'), 10);
//       company.click();
//       cy.get('button')
//         .contains('Create Group')
//         .click();
//       cy.wait('@postCompanyGroups');
//       cy.get('@postCompanyGroups').should(({ requestBody }) => {
//         expect(requestBody).to.eql({
//           name,
//           company: companyID,
//         });
//       });
//      });
//  });
// });
