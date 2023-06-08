import { createSelector } from 'reselect';
import get from 'lodash/get';

import { currentTitleEnvOptionsSelector } from 'dw/core/helpers/title-env-selectors';

export const contentInCloudSelector = createSelector(
  currentTitleEnvOptionsSelector,
  currentTitleEnvOptions =>
    get(currentTitleEnvOptions, 'content_in_cloud', false)
);
