import { createSelector } from 'reselect';
import get from 'lodash/get';
import keyBy from 'lodash/keyBy';

export const contentTypesSelector = state => get(state, 'contentType.data', []);
export const contentTypesByIdSelector = createSelector(
  contentTypesSelector,
  contentTypes => keyBy(contentTypes, 'id')
);
