import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

export const fetchfeaturePermissions = (params = {}) =>
  createFetch(AT.FEATURE_FLAG_PERMISSIONS, null, params, params.nextPageToken);
