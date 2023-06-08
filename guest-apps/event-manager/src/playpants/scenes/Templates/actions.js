import {
  createFetch,
  createUpdate,
} from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

/**
 * Core factory action creator for fetching templates
 */
export const searchTemplates = (params = {}) =>
  createFetch(
    AT.SEARCH_TEMPLATES,
    null,
    {
      ...params,
    },
    params.nextPage
  );

/**
 * Core factory action creator for deleting an template
 */
export const deleteTemplate = templateId =>
  createUpdate(AT.DELETE_TEMPLATE, templateId);

export const deleteThenRedirect = (templateId, redirect) => ({
  type: AT.DELETE_THEN_REDIRECT,
  templateId,
  redirect,
});
