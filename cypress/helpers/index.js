export const login = (
  username = Cypress.env('testUsername'),
  password = Cypress.env('testPassword')
) =>
  describe('Login page', () => {
    it('Login action', () => {
      cy.login(username, password);
    });
  });

export const logout = () =>
  describe('Logging out...', () => {
    it('Logout', () => cy.logout());
  });

export const checkIsProd = () => Cypress.env('testEnvironment') === 'prod';

export const createBEUrl = url => `${Cypress.env('backendUrl')}${url}`;

export const checkAddClient = url =>
  Cypress.env('client') ? `${url}?client=${Cypress.env('client')}` : url;

export const createEntity = (url, body) =>
  cy.getToken().then(token =>
    cy.request({
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: checkAddClient(url),
      body,
    })
  );

export const updateEntity = (url, body) =>
  cy.getToken().then(token =>
    cy.request({
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: checkAddClient(url),
      body,
    })
  );

export const removeEntity = url =>
  cy.getToken().then(token =>
    cy.request({
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: checkAddClient(url),
    })
  );
