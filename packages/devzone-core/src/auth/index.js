import { matchPath } from 'react-router-dom';
import queryString from 'query-string';

import SilentAuthenticationHandler from './silent-authentication-handler';
import * as utils from './utils';
import { ONE_MIN_IN_MS } from './constants';

function authenticate(tokenObject) {
  if (!utils.validateOAuthState(tokenObject.state)) {
    return false;
  }

  utils.removeOAuthState();
  utils.storeOAuthToken(tokenObject);

  // eslint-disable-next-line
  scheduleTokenRenewal(tokenObject.expiresAt);

  return true;
}

function renewToken() {
  const { protocol, host } = window.location;
  const callbackUri = `${protocol}//${host}/callback/silent-auth`;

  const state = utils.generateRandomOAuthState();
  const authenticationUrl = utils.buildAuthenticationUrl(callbackUri, state, {
    prompt: false,
  });

  const handler = new SilentAuthenticationHandler({ authenticationUrl });

  return new Promise((resolve, reject) => {
    handler.login((err, hash) => {
      const tokenObject = utils.parseHash(hash);
      return authenticate(tokenObject) ? resolve() : reject();
    });
  }).then(
    // eslint-disable-next-line
    () => console.log('Successfully renewed token.')
  );
}

function scheduleTokenRenewal(expiresAt) {
  const delay = expiresAt - Date.now();
  if (delay > 0) {
    // Renew token 2 min before expiration
    setTimeout(() => {
      renewToken();
    }, delay - 2 * ONE_MIN_IN_MS);
  }
}

function tryToAuthenticate(history) {
  const { uri } = queryString.parse(window.location.search);
  const tokenObject = utils.parseHash(window.location.hash);
  if (authenticate(tokenObject)) {
    history.replace(uri);
    return true;
  }

  return false;
}

export function redirectIfUnauthenticated(history) {
  const matchSilentAuthCallback = matchPath(window.location.pathname, {
    path: '/callback/silent-auth',
    exact: true,
  });
  const matchAuthCallback = matchPath(window.location.pathname, {
    path: '/callback/auth',
    exact: true,
  });
  const e2eAuth = JSON.parse(sessionStorage.getItem('e2e-testing-auth'));

  return new Promise((resolve, reject) => {
    // If this CI build, do not redirect
    if (e2eAuth) {
      return resolve({ isSilentAuth: false });
    }
    /**
     * Match /callback/silent-auth/
     * OR match /callback/auth/ and successfully authenticated the user
     */

    if (
      matchSilentAuthCallback ||
      (matchAuthCallback && tryToAuthenticate(history))
    ) {
      return resolve({ isSilentAuth: matchSilentAuthCallback });
    }

    // Unauthenticated, redirect to the authentication provider
    utils.redirectToAuthProvider();
    return reject();
  });
}

export function logout() {
  utils.removeOAuthToken();
  utils.redirectToAuthProvider();
}
