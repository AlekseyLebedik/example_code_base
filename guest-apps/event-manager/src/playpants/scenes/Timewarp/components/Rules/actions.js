import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

export const fetchClientRulesSchema = () =>
  createFetch(AT.FETCH_CLIENT_RULES_SCHEMA, null, {
    schemaID: 'project_setting_client_events',
  });

export const fetchClientRulesSchemaSuccess = schema => ({
  type: AT.FETCH_CLIENT_RULES_SCHEMA_SUCCESS,
  schema,
});

export const clearClientRulesSchema = () => ({
  type: AT.CLEAR_CLIENT_RULES_SCHEMA,
});

export const updateProjectSettings = params => ({
  type: AT.UPDATE_PROJECT_SETTINGS,
  ...params,
});
