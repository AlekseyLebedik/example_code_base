import queryString from 'query-string';

import {
  AUTH_SERVICE_PROVIDER_HOST,
  ACCESS_TOKEN_SESSION_KEY,
  AUTH_STATE_SESSION_KEY,
  AUTH_CLIENT,
} from '../config';

export function getOAuthToken() {
  try {
    return JSON.parse(sessionStorage.getItem(ACCESS_TOKEN_SESSION_KEY));
  } catch (e) {
    return null;
  }
}

export function storeOAuthToken(tokenObject) {
  sessionStorage.setItem(ACCESS_TOKEN_SESSION_KEY, JSON.stringify(tokenObject));
}

export function removeOAuthToken() {
  sessionStorage.removeItem(ACCESS_TOKEN_SESSION_KEY);
}

export function generateRandomOAuthState() {
  const state = btoa(Math.floor(Math.random() * 10000) + 1);
  sessionStorage.setItem(AUTH_STATE_SESSION_KEY, state);
  return state;
}

export function removeOAuthState() {
  sessionStorage.removeItem(AUTH_STATE_SESSION_KEY);
}

export function validateOAuthState(givenState) {
  const expectedState = sessionStorage.getItem(AUTH_STATE_SESSION_KEY);

  /**
   * An OAuth state should be present in the local storage. The check is
   * mandatory to protect againts CSRF attack. It avoids that we validate the
   * state if it isn't present in the URL and in the local storage.
   */
  return expectedState && expectedState === givenState;
}

export function buildAuthenticationUrl(
  callbackUri,
  state,
  additionalQueryString = {}
) {
  const qs = {
    client: AUTH_CLIENT,
    redirect_uri: callbackUri,
    state,
    ...additionalQueryString,
  };
  return `${AUTH_SERVICE_PROVIDER_HOST}/authorize/?${queryString.stringify(
    qs
  )}`;
}

const CALLBACK_PART = '/callback/auth?uri=';

export function redirectToAuthProvider() {
  const { protocol, host, pathname, search } = window.location;

  const { uri, ...query } = queryString.parse(search);
  const newSearch = queryString.stringify(query);

  let newUri = uri || '';
  while (newUri.includes(CALLBACK_PART)) {
    const idx = newUri.indexOf(CALLBACK_PART);
    newUri = newUri
      .substring(0, idx)
      .concat(newUri.substring(idx + CALLBACK_PART.length));
  }

  const newPathname = pathname === '/callback/auth' ? newUri : pathname;
  const parts = [newPathname];
  if (newSearch) parts.push(newSearch);
  const callbackUri = `${protocol}//${host}/callback/auth?uri=${encodeURIComponent(
    parts.join('?')
  )}`;

  const state = generateRandomOAuthState();
  const redirectUrl = buildAuthenticationUrl(callbackUri, state);

  removeOAuthToken();
  window.location.replace(redirectUrl);
}

export function parseHash(hash) {
  const { accessToken, expiry, state } = queryString.parse(hash);
  return {
    accessToken: `Bearer ${accessToken}`,
    expiresAt: expiry * 1000, // convert to milliseconds based epoch (JS default)
    state,
  };
}
