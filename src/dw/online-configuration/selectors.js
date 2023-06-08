import { createSelector } from 'reselect';

import { getReactBaseURL as origGetReactBaseURL } from 'dw/core/helpers/title-env-selectors';

export const getKeysCollection = key =>
  createSelector(
    state => state,
    collection => collection.map(item => item[key])
  );

export const getReactBaseURL = state =>
  origGetReactBaseURL(state, { baseUrl: 'online-configuration' });
