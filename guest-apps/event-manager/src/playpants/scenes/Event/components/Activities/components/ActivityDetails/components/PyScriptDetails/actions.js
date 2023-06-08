import {
  createFetch,
  createUpdate,
} from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';
import { formatSchemaModelParams } from './helpers';

/**
 * Core factory action creator for fetching schemas
 */
export const fetchPyScriptSchemas = project =>
  createFetch(AT.FETCH_PYSCRIPT_SCHEMAS, project);

/**
 * Core factory action creator for updating schema model
 */
export const updateSchemaModel = params =>
  createUpdate(AT.UPDATE_SCHEMA_MODEL, null, formatSchemaModelParams(params));
