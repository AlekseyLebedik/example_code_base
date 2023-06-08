import { createFetch } from '@demonware/devzone-core/helpers/actions';

import { FETCH_ALL_TESTS_PREFIX } from './constants';

export const fetchAllTests = (params = {}) =>
  createFetch(FETCH_ALL_TESTS_PREFIX, null, params);
