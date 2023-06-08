// import { login } from '../../helpers/event_manager';

// login();
// describe('Project Setttings Page', () => {
//   it('go to projects settings tab', () => {
//     // cy.setToken();
//     cy.visit('/event-manager/1/dev/events/');

//     cy.contains('Project Settings').click();
//     cy.url().should(
//       'include',
//       '/event-manager/1/dev/project-settings/responsibilities/groups'
//     );
//   });

//   describe('Responsibilities', () => {
//     describe('Groups', () => {
//       const createGroup = (name = 'My Group') => {
//         cy.get('[data-cy="createGroupButton"]')
//           .contains('add')
//           .click();

//         // TODO: change here, and other spots in tests that use redux-form Field, to use 'data-cy'
//         cy.get('[name="groupName"]').type(name);
//         cy.get('[data-cy="dropdownIndicator"]').click();
//         cy.get('[data-cy="Admin"]').click();
//         // try deleting a user we accidentally added
//         cy.log('try deleting a user we accidentally added');
//         cy.get('[data-cy="removeSelected"]').click();
//         cy.get('[data-cy="dropdownIndicator"]').click();
//         cy.get('[data-cy="Initial User"]')
//           .scrollIntoView()
//           .click();
//         cy.get('[title="Add User"]')
//           .find('button')
//           .click();
//         cy.get('[name="description"]').type('My Description');
//         cy.get('[data-cy="submitCreateGroupButton"]').click();
//       };

//       it('create a group', () => {
//         cy.server();
//         cy.route('POST', 'http://127.0.0.1:8081/api/v2/playpants/groups/').as(
//           'createGroup'
//         );
//         // fill out group form
//         cy.log('fill out group form');
//         createGroup();
//         // verify group renders into list
//         cy.log('verify group renders into list');
//         cy.wait('@createGroup').then(res => {
//           const { id } = res.response.body;
//           cy.window().then(win => win.localStorage.setItem('groupId', id));
//           cy.get(`[data-cy="groupListItem${id}"]`)
//             // id of the new group (obtained from the POST response)
//             .contains(new RegExp(`^${id}$`))
//             .should('be.visible');

//           cy.get(`[data-cy="groupListItem${id}"]`)
//             .contains('My Group')
//             .should('be.visible');
//         });

//         // check that a duplicate Group name cannot be made
//         cy.log('check that a duplicate Group name cannot be made');
//         createGroup();
//         cy.get('.non-critical-error').should('be.visible');
//         cy.window().then(win =>
//           cy
//             .get(
//               `[data-cy="groupListItem${win.localStorage.getItem('groupId') +
//                 1}"]`
//             )
//             .should('not.be.visible')
//         );
//       });

//       it('add and remove users from a group', () => {
//         cy.window().then(({ localStorage }) =>
//           cy
//             .get(`[data-cy="groupListItem${localStorage.getItem('groupId')}"]`)
//             .click()
//         );

//         cy.contains('expand_more').click();

//         // try removing a user with indivisual user remove button
//         cy.log('try removing a user with individual user remove button');
//         cy.task(
//           'log',
//           'try removing a user with indivisual user remove button'
//         );
//         cy.get('[data-cy="removeUserButton1"]')
//           .contains('delete')
//           .click();
//         cy.get('[data-cy="confirmRemoveUserDialog"]')
//           .contains('Confirm Remove')
//           .should('be.visible');
//         cy.get('[data-cy="confirmRemoveUserDialog"]')
//           .contains(
//             'Are you sure you want to remove "Initial User" from the group?'
//           )
//           .should('be.visible');
//         cy.get('[data-cy ="confirmRemoveUserButton"]').click();

//         // check No Users message + button disabled
//         cy.log('check No Users message + button disabled');
//         cy.get('[data-cy="emptyContainer"]')
//           .invoke('text')
//           .then(text => expect(text.trim()).equal('No Users'));
//         cy.get('[data-cy="addUserButton"]').should(
//           'have.attr',
//           'title',
//           'Select User first'
//         );
//         cy.get('[data-cy="addUserButton"]')
//           .children('button')
//           .should('be.disabled');

//         // add some users
//         cy.log('add some users');
//         cy.get('[data-cy="dropdownIndicator"]').click();
//         cy.get('[data-cy="Admin"]').click();
//         cy.get('[data-cy="dropdownIndicator"]').click();
//         cy.get('[data-cy="Guest"]').click();
//         cy.get('[data-cy="dropdownIndicator"]').click();
//         cy.get('[data-cy="Initial User"]').click();
//         cy.get('[data-cy="addUserButton"]')
//           .children('button')
//           .click();
//         // check remove selected button is disabled
//         cy.log('check remove selected button is disabled');
//         cy.get('[data-cy="removeSelectedUsersButton"]')
//           .parent()
//           .parent()
//           .scrollIntoView()
//           .should('be.disabled');
//         // remove some users with checkbox removal
//         cy.log('remove some users with checkbox removal');
//         cy.contains('Admin (admin)')
//           .siblings()
//           .find('.ag-selection-checkbox')
//           .click();
//         cy.contains('Guest (guest)')
//           .siblings()
//           .find('.ag-selection-checkbox')
//           .click();
//         cy.get('[data-cy="removeSelectedUsersButton"]').click();
//         // confirm delete message and submit deletion
//         cy.log('confirm delete message and submit deletion');
//         cy.get('[data-cy="confirmRemoveUserDialog"]')
//           .contains('Confirm Remove')
//           .should('be.visible');
//         cy.get('[data-cy="confirmRemoveUserDialog"]')
//           .contains('Are you sure you want to remove 2 Users from a list?')
//           .should('be.visible');
//         cy.get('[data-cy ="confirmRemoveUserButton"]').click();
//       });

//       it('add responsibilities to a group', () => {
//         // make sure set responsibilities only work for given env
//         cy.log('test responsibility environment');
//         cy.get('[data-cy="scrollableContent"]').scrollTo('bottom');
//         cy.get('[data-cy="CertificationResponsibilities"]').click();
//         cy.contains('li', 'Achievements Engine').click();
//         cy.get('[id="menu-envTypes[1].responsibilities"]').click();
//         cy.get('[data-cy="LiveResponsibilities"]').click();
//         cy.contains('li', 'Achievements Engine').click();
//         cy.get('body').trigger('keydown', {
//           key: 'Escape',
//           code: 'Escape',
//           which: 27,
//         });
//         cy.get('[data-cy="saveResponsibilitiesButton"]').click();
//         cy.createEvent('Responsibilities Tests');
//         cy.navigateToEvent(1, 'dev', 1);

//         // set a single responsibility. approval is only allowed if that one activity is included
//         cy.log('test a single responsibility');

//         // set all responsibilities. try approving each one
//         cy.log('set all responsibilities');
//       });

//       it('test responsibility assignments against authorization action on events page', () => {});

//       it('reset and save buttons work correctly', () => {
//         // try saving
//         // try resetting
//         // try leacing without saving
//       });
//     });

//     describe('Users', () => {});
//   });

//   describe('Color Settings', () => {});

//   describe('Activity Settings', () => {});
// });
