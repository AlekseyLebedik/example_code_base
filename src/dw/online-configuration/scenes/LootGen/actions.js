import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';
import { SCRIPTS_LIST_PREFIX } from './constants';

export const fetchScripts = (params = null) =>
  createFetch(
    SCRIPTS_LIST_PREFIX,
    null,
    params,
    params && params.nextPageToken
  );

export function uploadScript(data) {
  return { type: AT.UPLOAD_SCRIPT_POST, data };
}

export function uploadScriptSuccess(data) {
  return { type: AT.UPLOAD_SCRIPT_POST_SUCCESS, data };
}

export function uploadScriptFailed(error) {
  return { type: AT.UPLOAD_SCRIPT_POST_FAILED, error };
}

export const openUploadModal = () => ({
  type: AT.UPLOAD_SCRIPT_OPEN_MODAL,
});

export const closeUploadModal = () => ({
  type: AT.UPLOAD_SCRIPT_CLOSE_MODAL,
});
