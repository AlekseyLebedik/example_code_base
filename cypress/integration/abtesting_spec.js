import moment from 'moment-timezone';

import { login } from '../helpers';
import { makeUrl, makeTitleUrlAbTesting } from '../helpers/abtesting';

login();

const visitPage = (testName, url) => {
  cy.seedABTests();
  cy.seedConfigs();
  cy.visit(makeUrl(url));
  cy.wait(['@fetchABTestingTests', '@fetchABTestingConfigs']);

  cy.get('.common__search input').as('searchInput');
  cy.get('@searchInput').type(testName).type('{enter}');
};

if (
  Cypress.env('testEnvironment') === 'qa' ||
  Cypress.env('testEnvironment') === 'prod'
) {
  describe('Navigation and redirection', () => {
    const testName = 'CY ABTest';
    before(() => {
      visitPage(testName);
    });

    it('Navigation displays four options', () => {
      cy.get('.nav-menu a').should($menuItems => {
        expect($menuItems).to.have.length(4);
        expect($menuItems.eq(0)).to.contain('Schedule');
        expect($menuItems.eq(1)).to.contain('Archive');
        expect($menuItems.eq(2)).to.contain('Killed');
        expect($menuItems.eq(3)).to.contain('Group');
      });
    });

    it('Clicking navigation item redirects correctly', () => {
      cy.get('.nav-schedule').click();
      cy.url().should('include', makeUrl('schedule'));

      cy.get('.nav-archive').click();
      cy.url().should('include', makeUrl('archive'));

      cy.get('.nav-killed').click();
      cy.url().should('include', makeUrl('killed'));

      cy.get('.nav-groups').click();
      cy.url().should('include', makeUrl('groups'));
    });
  });

  describe('AB Testing', () => {
    const testID = '12708888182788125695';
    const testName = 'CY ABTest';

    describe('ABTest view mode', () => {
      beforeEach(() => {
        cy.seedABTest(testID);
        cy.route(
          makeTitleUrlAbTesting({
            resource: 'abtesting/categories',
            queryParams: '**',
          })
        ).as('fetchABTestingCategories');
        cy.visit(
          makeUrl(
            `view/${Cypress.env('titleIdABTesting')}/${Cypress.env(
              'titleEnv'
            )}/${testID}`
          )
        );
        cy.wait('@fetchABTestingCategories');
      });

      it('All fields are disabled', () => {
        cy.get('input[name="name"]')
          .should('be.disabled')
          .and('have.value', testName);
        cy.get('textarea[name="purpose"]')
          .should('be.disabled')
          .and('have.value', 'CY testing');
        cy.get('input[name="creator"]')
          .should('be.disabled')
          .and('have.value', 'cy@test.com');
        cy.get('input[name="organisation"]')
          .should('be.disabled')
          .and('have.value', 'DW');
        cy.get('input[name="data_scientist"]')
          .should('be.disabled')
          .and('have.value', 'data_scientist@test.com');
        cy.get('textarea[name="comments"]')
          .should('be.disabled')
          .and('have.value', 'CY comments');
        cy.contains('Enrollment Period From')
          .parent('div')
          .find('input')
          .should('be.disabled');
        cy.contains('Enrollment Period To')
          .parent('div')
          .find('input')
          .should('be.disabled');
      });

      it('Action panel is displayed', () => {
        cy.get('[data-cy="actions-panel"')
          .find('button')
          .should(actions => {
            expect(actions).to.have.length(6);
            expect(actions.eq(0)).to.contain('poll');
            expect(actions.eq(1)).to.contain('edit');
            expect(actions.eq(2)).to.contain('file_copy');
            expect(actions.eq(3)).to.contain('call_split');
            expect(actions.eq(4)).to.contain('done_all');
            expect(actions.eq(5)).to.contain('delete');
          });
      });
    });

    describe('Add ABTest', () => {
      const DATE_TIME_WITHOUT_TIMEZONE = 'MMM DD, YYYY HH:mm';
      const testConfig = 'CY Test Config';
      const purpose = 'Testing ...';
      const creator = 'creator@test.com';
      const organisation = 'DW';
      const dataScientist = 'data_scientist@test.com';
      const comments = 'Comments ...';
      const catchStart = moment();
      const catchEnd = moment().add(1, 'days');
      const configID = '5727683439329241410';

      beforeEach(() => {
        cy.seedConfigs();
        cy.route(
          'POST',
          makeTitleUrlAbTesting({
            resource: 'abtesting/tests',
            queryParams: '**',
          }),
          []
        ).as('postABTest');
        cy.visit(makeUrl('create'));
        cy.get('#select-context').click();
        cy.get(
          `[data-value="${Cypress.env('titleIdABTesting')}:${Cypress.env(
            'titleEnv'
          )}"]`
        ).click();

        cy.get('input[name="name"]').type(testName);
        cy.get('textarea[name="purpose"]').type(purpose);
        cy.get('input[name="creator"]').type(creator);
        cy.get('input[name="organisation"]').type(organisation);
        cy.get('input[name="data_scientist"]').type(dataScientist);
        cy.get('textarea[name="comments"]').type(comments);

        cy.contains('Enrollment Period From')
          .parent('div')
          .find('input')
          .click();
        cy.get('[data-cy="calendar-picker"]')
          .find('input')
          .first()
          .clear()
          .type(catchStart.format(DATE_TIME_WITHOUT_TIMEZONE))
          .type('{enter}');
        cy.get('[data-cy="calendar-picker"]').contains('Add').click();
        cy.contains('Enrollment Period To').parent('div').find('input').click();
        cy.get('[data-cy="calendar-picker"]')
          .find('input')
          .first()
          .clear()
          .type(catchEnd.format(DATE_TIME_WITHOUT_TIMEZONE))
          .type('{enter}');
        cy.get('[data-cy="calendar-picker"]').contains('Add').click();
      });

      it('Create ABTest without cohort', () => {
        cy.get('[data-cy="cohorts[0]"]')
          .find('[title="Delete Cohort"]')
          .click();

        cy.contains('Save').click();

        cy.wait('@postABTest');
        cy.get('@postABTest').should(({ requestBody }) => {
          expect(requestBody).to.eql({
            name: testName,
            purpose,
            creator,
            organisation,
            data_scientist: dataScientist,
            comments,
            catchStart: requestBody.catchStart,
            catchEnd: requestBody.catchEnd,
            cohorts: [],
          });
          // eslint-disable-next-line
          expect(requestBody.catchStart).not.to.be.empty;
          // eslint-disable-next-line
          expect(requestBody.catchEnd).not.be.be.empty;
        });
      });

      it('Create ABTest with one cohort', () => {
        const cohortName = 'CY Cohort 1';
        const treatmentStart = moment().add(2, 'days');
        const treatmentEnd = moment().add(3, 'days');
        cy.get('input[name="cohorts[0].name"]').type(cohortName);
        cy.get('input[name="cohorts[0].source"]').parent().click();
        cy.get('[data-value="manual"]').click();

        cy.get('[data-cy="cohorts[0]"]')
          .contains('From')
          .parent('div')
          .find('input')
          .click();
        cy.get('[data-cy="calendar-picker"]')
          .find('input')
          .first()
          .clear()
          .type(treatmentStart.format(DATE_TIME_WITHOUT_TIMEZONE))
          .type('{enter}');
        cy.get('[data-cy="calendar-picker"]').contains('Add').click();

        cy.get('[data-cy="cohorts[0]"]')
          .contains('To')
          .parent('div')
          .find('input')
          .click();
        cy.get('[data-cy="calendar-picker"]')
          .find('input')
          .first()
          .clear()
          .type(treatmentEnd.format(DATE_TIME_WITHOUT_TIMEZONE))
          .type('{enter}');
        cy.get('[data-cy="calendar-picker"]').contains('Add').click();

        cy.get('[data-cy="cohorts[0]"]')
          .find('[title="View/Select Config"]')
          .click();
        cy.get('[role="dialog"]').contains(testConfig).click();
        cy.get('[role="dialog"]').contains('Add').click();

        cy.contains('Save').click();

        cy.wait('@postABTest');
        cy.get('@postABTest').should(({ requestBody }) => {
          expect(requestBody).to.eql({
            name: testName,
            purpose,
            creator,
            organisation,
            data_scientist: dataScientist,
            comments,
            catchStart: requestBody.catchStart,
            catchEnd: requestBody.catchEnd,
            cohorts: [
              {
                name: cohortName,
                source: { type: 'manual' },
                treatments: [
                  {
                    start: requestBody.cohorts[0].treatments[0].start,
                    end: requestBody.cohorts[0].treatments[0].end,
                    configs: [configID],
                  },
                ],
              },
            ],
          });
          // eslint-disable-next-line
          expect(requestBody.catchStart).not.to.be.empty;
          // eslint-disable-next-line
          expect(requestBody.catchEnd).not.be.be.empty;
          // eslint-disable-next-line
          expect(requestBody.cohorts[0].treatments[0].start).not.be.be.empty;
          // eslint-disable-next-line
          expect(requestBody.cohorts[0].treatments[0].end).not.be.be.empty;
        });
      });

      it('Create ABTest with two cohorts', () => {
        const cohortName1 = 'CY Cohort 1';
        const cohortName2 = 'CY Cohort 2';
        cy.get('[title="Add Cohort"]').click();

        cy.get('input[name="cohorts[0].name"]').type(cohortName1);
        cy.get('input[name="cohorts[0].source"]').parent().click();
        cy.get('[data-value="manual"]').click();

        cy.get('[data-cy="cohorts[0]"]')
          .contains('From')
          .parent('div')
          .find('input')
          .click();
        cy.get('[data-cy="calendar-picker"]')
          .find('input')
          .first()
          .clear()
          .type(moment().add(2, 'days').format(DATE_TIME_WITHOUT_TIMEZONE))
          .type('{enter}');
        cy.get('[data-cy="calendar-picker"]').contains('Add').click();

        cy.get('[data-cy="cohorts[0]"]')
          .contains('To')
          .parent('div')
          .find('input')
          .click();
        cy.get('[data-cy="calendar-picker"]')
          .find('input')
          .first()
          .clear()
          .type(moment().add(3, 'days').format(DATE_TIME_WITHOUT_TIMEZONE))
          .type('{enter}');
        cy.get('[data-cy="calendar-picker"]').contains('Add').click();

        cy.get('[data-cy="cohorts[0]"]')
          .find('[title="View/Select Config"]')
          .click();
        cy.get('[role="dialog"]').contains(testConfig).click();
        cy.get('[role="dialog"]').contains('Add').click();

        cy.get('input[name="cohorts[1].name"]').type(cohortName2);
        cy.get('input[name="cohorts[1].source"]').parent().click();
        cy.get('[data-value="manual"]').click();

        cy.get('[data-cy="cohorts[1]"]')
          .contains('From')
          .parent('div')
          .find('input')
          .click();
        cy.get('[data-cy="calendar-picker"]')
          .find('input')
          .first()
          .clear()
          .type(moment().add(2, 'days').format(DATE_TIME_WITHOUT_TIMEZONE))
          .type('{enter}');
        cy.get('[data-cy="calendar-picker"]').contains('Add').click();

        cy.get('[data-cy="cohorts[1]"]')
          .contains('To')
          .parent('div')
          .find('input')
          .click();
        cy.get('[data-cy="calendar-picker"]')
          .find('input')
          .first()
          .clear()
          .type(moment().add(3, 'days').format(DATE_TIME_WITHOUT_TIMEZONE))
          .type('{enter}');
        cy.get('[data-cy="calendar-picker"]').contains('Add').click();

        cy.get('[data-cy="cohorts[1]"]')
          .find('[title="View/Select Config"]')
          .click();
        cy.get('[role="dialog"]').contains(testConfig).click();
        cy.get('[role="dialog"]').contains('Add').click();

        cy.contains('Save').click();

        cy.wait('@postABTest');
        cy.get('@postABTest').should(({ requestBody }) => {
          expect(requestBody).to.eql({
            name: testName,
            purpose,
            creator,
            organisation,
            data_scientist: dataScientist,
            comments,
            catchStart: requestBody.catchStart,
            catchEnd: requestBody.catchEnd,
            cohorts: [
              {
                name: cohortName1,
                source: { type: 'manual' },
                treatments: [
                  {
                    start: requestBody.cohorts[0].treatments[0].start,
                    end: requestBody.cohorts[0].treatments[0].end,
                    configs: [configID],
                  },
                ],
              },
              {
                name: cohortName2,
                source: { type: 'manual' },
                treatments: [
                  {
                    start: requestBody.cohorts[1].treatments[0].start,
                    end: requestBody.cohorts[1].treatments[0].end,
                    configs: [configID],
                  },
                ],
              },
            ],
          });
          // eslint-disable-next-line
          expect(requestBody.catchStart).not.to.be.empty;
          // eslint-disable-next-line
          expect(requestBody.catchEnd).not.be.be.empty;
          // eslint-disable-next-line
          expect(requestBody.cohorts[0].treatments[0].start).not.be.be.empty;
          // eslint-disable-next-line
          expect(requestBody.cohorts[0].treatments[0].end).not.be.be.empty;
        });
      });
    });
  });

  describe('AB Testing Schedule Tab', () => {
    const testName = 'CY ABTest';

    describe('Upcoming ABTests', () => {
      const testID = '12708888182788125695';
      before(() => {
        visitPage(testName);
      });

      it('Section displays 1 result', () => {
        cy.get('[data-cy="Upcoming-section"]').within(() => {
          cy.get('span').should('contain', '(1 shown)');
        });
      });

      it('Table displays ABTest with config status', () => {
        cy.get('[data-cy="Upcoming-section"]').within(() => {
          cy.get('table').within(() => {
            cy.get('td')
              .eq(0)
              .should('contain', `...${testID.substr(testID.length - 4)}`);
            cy.get('td').eq(1).should('contain', testName);
            cy.get('td').eq(4).should('contain', Cypress.env('titleEnv'));
            cy.get('td').eq(7).should('contain', 'testCategory');
            cy.get('td').eq(10).should('contain', 'config');
          });
        });
      });

      it('Table displays ABTest actions', () => {
        cy.get('[data-cy="Upcoming-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td')
                .eq(11)
                .find('button')
                .should(actions => {
                  expect(actions).to.have.length(6);
                  expect(actions.eq(0)).to.contain('poll');
                  expect(actions.eq(1)).to.contain('edit');
                  expect(actions.eq(2)).to.contain('file_copy');
                  expect(actions.eq(3)).to.contain('call_split');
                  expect(actions.eq(4)).to.contain('done_all');
                  expect(actions.eq(5)).to.contain('delete');
                });
            });
        });
      });

      it('Reporting action is disabled', () => {
        cy.get('[data-cy="Upcoming-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td').eq(11).find('button').first().should('be.disabled');
            });
        });
      });

      it('Approve and delete actions are enabled', () => {
        cy.get('[data-cy="Upcoming-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td')
                .eq(11)
                .find('button')
                .eq(4)
                .should('be.not.disabled');
              cy.get('td')
                .eq(11)
                .find('button')
                .eq(5)
                .should('be.not.disabled');
            });
        });
      });

      describe('Action redirections', () => {
        beforeEach(() => {
          visitPage(testName);
        });

        it('Redirect to Edit screen', () => {
          cy.get('[data-cy="Upcoming-section"]').within(() => {
            cy.contains(testName)
              .parent()
              .parent('tr')
              .within(() => {
                cy.get('td')
                  .eq(11)
                  .find('[title="Edit"]')
                  .then(btn => {
                    btn.click();
                    cy.url().should(
                      'include',
                      makeUrl(
                        `edit/${Cypress.env('titleIdABTesting')}/${Cypress.env(
                          'titleEnv'
                        )}/${testID}`
                      )
                    );
                  });
              });
          });
        });

        it('Redirect to Clone screen', () => {
          cy.get('[data-cy="Upcoming-section"]').within(() => {
            cy.contains(testName)
              .parent()
              .parent('tr')
              .within(() => {
                cy.get('td')
                  .eq(11)
                  .find('[title="Clone"]')
                  .then(btn => {
                    btn.click();
                    cy.url().should(
                      'include',
                      makeUrl(
                        `clone/${Cypress.env('titleIdABTesting')}/${Cypress.env(
                          'titleEnv'
                        )}/${testID}`
                      )
                    );
                  });
              });
          });
        });

        it('Redirect to Propagate screen', () => {
          cy.get('[data-cy="Upcoming-section"]').within(() => {
            cy.contains(testName)
              .parent()
              .parent('tr')
              .within(() => {
                cy.get('td')
                  .eq(11)
                  .find('[title="Propagate"]')
                  .then(btn => {
                    btn.click();
                    cy.url().should(
                      'include',
                      makeUrl(
                        `propagate/${Cypress.env(
                          'titleIdABTesting'
                        )}/${Cypress.env('titleEnv')}/${testID}`
                      )
                    );
                  });
              });
          });
        });
      });
    });

    describe('Live ABTests', () => {
      const testID = '134706488182788175625';
      before(() => {
        visitPage(testName);
      });

      it('Section displays 2 results', () => {
        cy.get('[data-cy="Live-section"]').within(() => {
          cy.get('span').should('contain', '(2 shown)');
        });
      });

      it('Table displays first ABTest with active status', () => {
        cy.get('[data-cy="Live-section"]').within(() => {
          cy.get('table').within(() => {
            cy.get('td')
              .eq(0)
              .should('contain', `...${testID.substr(testID.length - 4)}`);
            cy.get('td').eq(1).should('contain', testName);
            cy.get('td').eq(4).should('contain', Cypress.env('titleEnv'));
            cy.get('td').eq(7).should('contain', 'testCategory');
            cy.get('td').eq(10).should('contain', 'active');
          });
        });
      });

      it('Table displays ABTest actions', () => {
        cy.get('[data-cy="Live-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td')
                .eq(11)
                .find('button')
                .should(actions => {
                  expect(actions).to.have.length(6);
                  expect(actions.eq(0)).to.contain('poll');
                  expect(actions.eq(1)).to.contain('edit');
                  expect(actions.eq(2)).to.contain('file_copy');
                  expect(actions.eq(3)).to.contain('call_split');
                  expect(actions.eq(4)).to.contain('done_all');
                  expect(actions.eq(5)).to.contain('cancel');
                });
            });
        });
      });

      it('Reporting, Edit and Approve actions are disabled', () => {
        cy.get('[data-cy="Live-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td').eq(11).find('button').first().should('be.disabled');
              cy.get('td').eq(11).find('button').eq(1).should('be.disabled');
              cy.get('td').eq(11).find('button').eq(4).should('be.disabled');
            });
        });
      });

      it('Kill action is enabled', () => {
        cy.get('[data-cy="Upcoming-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td')
                .eq(11)
                .find('button')
                .eq(5)
                .should('be.not.disabled');
            });
        });
      });

      describe('Action redirections', () => {
        beforeEach(() => {
          visitPage(testName);
        });

        it('Redirect to Clone screen', () => {
          cy.get('[data-cy="Live-section"]').within(() => {
            cy.contains(testName)
              .parent()
              .parent('tr')
              .within(() => {
                cy.get('td')
                  .eq(11)
                  .find('[title="Clone"]')
                  .then(btn => {
                    btn.click();
                    cy.url().should(
                      'include',
                      makeUrl(
                        `clone/${Cypress.env('titleIdABTesting')}/${Cypress.env(
                          'titleEnv'
                        )}/${testID}`
                      )
                    );
                  });
              });
          });
        });

        it('Redirect to Propagate screen', () => {
          cy.get('[data-cy="Live-section"]').within(() => {
            cy.contains(testName)
              .parent()
              .parent('tr')
              .within(() => {
                cy.get('td')
                  .eq(11)
                  .find('[title="Propagate"]')
                  .then(btn => {
                    btn.click();
                    cy.url().should(
                      'include',
                      makeUrl(
                        `propagate/${Cypress.env(
                          'titleIdABTesting'
                        )}/${Cypress.env('titleEnv')}/${testID}`
                      )
                    );
                  });
              });
          });
        });
      });
    });

    describe('Recently Finished ABTests', () => {
      const testID = '164706499182788175621';
      before(() => {
        visitPage(testName);
      });

      it('Section displays 1 results', () => {
        cy.get('[data-cy="Recently Finished-section"]').within(() => {
          cy.get('span').should('contain', '(1 shown)');
        });
      });

      it('Table displays first ABTest with analysis status', () => {
        cy.get('[data-cy="Recently Finished-section"]').within(() => {
          cy.get('table').within(() => {
            cy.get('td')
              .eq(0)
              .should('contain', `...${testID.substr(testID.length - 4)}`);
            cy.get('td').eq(1).should('contain', testName);
            cy.get('td').eq(4).should('contain', Cypress.env('titleEnv'));
            cy.get('td').eq(7).should('contain', 'testCategory');
            cy.get('td').eq(10).should('contain', 'analysis');
          });
        });
      });

      it('Table displays ABTest actions', () => {
        cy.get('[data-cy="Recently Finished-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td')
                .eq(11)
                .find('button')
                .should(actions => {
                  expect(actions).to.have.length(6);
                  expect(actions.eq(0)).to.contain('poll');
                  expect(actions.eq(1)).to.contain('edit');
                  expect(actions.eq(2)).to.contain('file_copy');
                  expect(actions.eq(3)).to.contain('call_split');
                  expect(actions.eq(4)).to.contain('done_all');
                  expect(actions.eq(5)).to.contain('archive');
                });
            });
        });
      });

      it('Reporting, Edit and Approve actions are disabled', () => {
        cy.get('[data-cy="Recently Finished-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td').eq(11).find('button').first().should('be.disabled');
              cy.get('td').eq(11).find('button').eq(1).should('be.disabled');
              cy.get('td').eq(11).find('button').eq(4).should('be.disabled');
            });
        });
      });

      it('Archive action is enabled', () => {
        cy.get('[data-cy="Recently Finished-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td')
                .eq(11)
                .find('button')
                .eq(5)
                .should('be.not.disabled');
            });
        });
      });

      describe('Action redirections', () => {
        beforeEach(() => {
          visitPage(testName);
        });

        it('Redirect to Clone screen', () => {
          cy.get('[data-cy="Recently Finished-section"]').within(() => {
            cy.contains(testName)
              .parent()
              .parent('tr')
              .within(() => {
                cy.get('td')
                  .eq(11)
                  .find('[title="Clone"]')
                  .then(btn => {
                    btn.click();
                    cy.url().should(
                      'include',
                      makeUrl(
                        `clone/${Cypress.env('titleIdABTesting')}/${Cypress.env(
                          'titleEnv'
                        )}/${testID}`
                      )
                    );
                  });
              });
          });
        });

        it('Redirect to Propagate screen', () => {
          cy.get('[data-cy="Recently Finished-section"]').within(() => {
            cy.contains(testName)
              .parent()
              .parent('tr')
              .within(() => {
                cy.get('td')
                  .eq(11)
                  .find('[title="Propagate"]')
                  .then(btn => {
                    btn.click();
                    cy.url().should(
                      'include',
                      makeUrl(
                        `propagate/${Cypress.env(
                          'titleIdABTesting'
                        )}/${Cypress.env('titleEnv')}/${testID}`
                      )
                    );
                  });
              });
          });
        });
      });
    });
  });

  describe('AB Testing Archived Tab', () => {
    describe('Archived ABTests', () => {
      const testID = '456706499182348175621';
      const testName = 'CY ABTest';

      before(() => {
        visitPage(testName, 'archive');
      });

      it('Section displays 1 results', () => {
        cy.get('[data-cy="Archived-section"]').within(() => {
          cy.get('span').should('contain', '(1 shown)');
        });
      });

      it('Table displays first ABTest with archived status', () => {
        cy.get('[data-cy="Archived-section"]').within(() => {
          cy.get('table').within(() => {
            cy.get('td')
              .eq(0)
              .should('contain', `...${testID.substr(testID.length - 4)}`);
            cy.get('td').eq(1).should('contain', testName);
            cy.get('td').eq(4).should('contain', Cypress.env('titleEnv'));
            cy.get('td').eq(7).should('contain', 'testCategory');
            cy.get('td').eq(10).should('contain', 'archived');
          });
        });
      });

      it('Table displays ABTest actions', () => {
        cy.get('[data-cy="Archived-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td')
                .eq(11)
                .find('button')
                .should(actions => {
                  expect(actions).to.have.length(6);
                  expect(actions.eq(0)).to.contain('poll');
                  expect(actions.eq(1)).to.contain('edit');
                  expect(actions.eq(2)).to.contain('file_copy');
                  expect(actions.eq(3)).to.contain('call_split');
                  expect(actions.eq(4)).to.contain('done_all');
                  expect(actions.eq(5)).to.contain('archive');
                });
            });
        });
      });

      it('Reporting, Edit, Approve and Archive actions are disabled', () => {
        cy.get('[data-cy="Archived-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td').eq(11).find('button').first().should('be.disabled');
              cy.get('td').eq(11).find('button').eq(1).should('be.disabled');
              cy.get('td').eq(11).find('button').eq(4).should('be.disabled');
              cy.get('td').eq(11).find('button').eq(5).should('be.disabled');
            });
        });
      });

      describe('Action redirections', () => {
        beforeEach(() => {
          visitPage(testName, 'archive');
        });

        it('Redirect to Clone screen', () => {
          cy.get('[data-cy="Archived-section"]').within(() => {
            cy.contains(testName)
              .parent()
              .parent('tr')
              .within(() => {
                cy.get('td')
                  .eq(11)
                  .find('[title="Clone"]')
                  .then(btn => {
                    btn.click();
                    cy.url().should(
                      'include',
                      makeUrl(
                        `clone/${Cypress.env('titleIdABTesting')}/${Cypress.env(
                          'titleEnv'
                        )}/${testID}`
                      )
                    );
                  });
              });
          });
        });

        it('Redirect to Propagate screen', () => {
          cy.get('[data-cy="Archived-section"]').within(() => {
            cy.contains(testName)
              .parent()
              .parent('tr')
              .within(() => {
                cy.get('td')
                  .eq(11)
                  .find('[title="Propagate"]')
                  .then(btn => {
                    btn.click();
                    cy.url().should(
                      'include',
                      makeUrl(
                        `propagate/${Cypress.env(
                          'titleIdABTesting'
                        )}/${Cypress.env('titleEnv')}/${testID}`
                      )
                    );
                  });
              });
          });
        });
      });
    });
  });

  describe('AB Testing Killed Tab', () => {
    describe('Killed ABTests', () => {
      const testID = '568706499182348175621';
      const testName = 'CY ABTest';

      before(() => {
        visitPage(testName, 'killed');
      });

      it('Section displays 1 results', () => {
        cy.get('[data-cy="Killed-section"]').within(() => {
          cy.get('span').should('contain', '(1 shown)');
        });
      });

      it('Table displays first ABTest with killed status', () => {
        cy.get('[data-cy="Killed-section"]').within(() => {
          cy.get('table').within(() => {
            cy.get('td')
              .eq(0)
              .should('contain', `...${testID.substr(testID.length - 4)}`);
            cy.get('td').eq(1).should('contain', testName);
            cy.get('td').eq(4).should('contain', Cypress.env('titleEnv'));
            cy.get('td').eq(7).should('contain', 'testCategory');
            cy.get('td').eq(10).should('contain', 'killed');
          });
        });
      });

      it('Table displays ABTest actions', () => {
        cy.get('[data-cy="Killed-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td')
                .eq(11)
                .find('button')
                .should(actions => {
                  expect(actions).to.have.length(6);
                  expect(actions.eq(0)).to.contain('poll');
                  expect(actions.eq(1)).to.contain('edit');
                  expect(actions.eq(2)).to.contain('file_copy');
                  expect(actions.eq(3)).to.contain('call_split');
                  expect(actions.eq(4)).to.contain('done_all');
                  expect(actions.eq(5)).to.contain('cancel');
                });
            });
        });
      });

      it('Reporting, Edit, Propagate, Approve and Delete actions are disabled', () => {
        cy.get('[data-cy="Killed-section"]').within(() => {
          cy.contains(testName)
            .parent()
            .parent('tr')
            .within(() => {
              cy.get('td').eq(11).find('button').first().should('be.disabled');
              cy.get('td').eq(11).find('button').eq(1).should('be.disabled');
              cy.get('td').eq(11).find('button').eq(3).should('be.disabled');
              cy.get('td').eq(11).find('button').eq(4).should('be.disabled');
              cy.get('td').eq(11).find('button').eq(5).should('be.disabled');
            });
        });
      });

      describe('Action redirections', () => {
        beforeEach(() => {
          visitPage(testName, 'killed');
        });

        it('Redirect to Clone screen', () => {
          cy.get('[data-cy="Killed-section"]').within(() => {
            cy.contains(testName)
              .parent()
              .parent('tr')
              .within(() => {
                cy.get('td')
                  .eq(11)
                  .find('[title="Clone"]')
                  .then(btn => {
                    btn.click();
                    cy.url().should(
                      'include',
                      makeUrl(
                        `clone/${Cypress.env('titleIdABTesting')}/${Cypress.env(
                          'titleEnv'
                        )}/${testID}`
                      )
                    );
                  });
              });
          });
        });
      });
    });
  });
}
