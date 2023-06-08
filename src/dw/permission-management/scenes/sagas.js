import { fetchNextUrl } from 'dw/devzone/services/general';
import * as permissionsAPI from 'dw/permission-management/services/permissions';
import { getLoopSaga } from '@demonware/devzone-core/helpers/sagas';

import groupsSagas from './Groups/sagas';
import companiesSaga from './Companies/sagas';
import usersSagas from './Users/sagas';
import featureFlagsSaga from '../components/PermissionFeatureFlags/saga';

import { COMPANIES_LIST_PREFIX } from './constants';

const fetchCompaniesListSaga = getLoopSaga(
  COMPANIES_LIST_PREFIX,
  permissionsAPI.getCompaniesList,
  fetchNextUrl
);

export default [
  featureFlagsSaga,
  fetchCompaniesListSaga,
  ...groupsSagas,
  ...usersSagas,
  ...companiesSaga,
];
