import { login } from '../../helpers';
import {
  companyName,
  visitCompany,
  testCompanyObjectPermission,
} from '../../helpers/permission_management';

login();

describe('Companies', () => {
  describe('Content display', () => {
    it('Get permissions for each content type', () => {
      visitCompany(companyName);
    });
  });

  describe('Permission Management', () => {
    // We can't run parallel builds changing permissions on the same company
    if (Cypress.env('testEnvironment') === 'dev') {
      return;
    }

    before(() => {
      visitCompany(companyName);
      cy.deleteCompanyObjectPermissions();
    });

    beforeEach(() => {
      visitCompany(companyName);
    });

    it('Add Reset stats permission to Company object', () => {
      testCompanyObjectPermission('Company', 'Reset stats');
    });

    it('Add Delete entities permission to Project object', () => {
      testCompanyObjectPermission('Project', 'Delete entities');
    });

    it('Add Delete rulesets permission to Titleenv object', () => {
      testCompanyObjectPermission('Titleenv', 'Delete rulesets');
    });
  });
});
