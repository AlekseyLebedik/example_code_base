import * as AT from './actionTypes';

export const checkTemplateName = (name, oldName) => ({
  type: AT.CHECK_TEMPLATE_NAME,
  name,
  oldName,
});

export const checkTemplateNameSuccess = isValidName => ({
  type: AT.CHECK_TEMPLATE_NAME_SUCCESS,
  isValidName,
});

export const checkTemplateNameFailed = error => ({
  type: AT.CHECK_TEMPLATE_NAME_FAILED,
  error,
});
// Save as template action
export const saveAsTemplate = (params, form) => ({
  type: AT.SAVE_AS_TEMPLATE,
  form,
  params,
});

export const saveAsTemplateSuccess = () => ({
  type: AT.SAVE_AS_TEMPLATE_SUCCESS,
});

export const saveAsTemplateFailed = error => ({
  type: AT.SAVE_AS_TEMPLATE_FAILED,
  error,
});

export const createTemplate = (params, form, redirect) => ({
  type: AT.CREATE_TEMPLATE,
  form,
  params,
  redirect,
});

export const createTemplateSuccess = () => ({
  type: AT.CREATE_TEMPLATE_SUCCESS,
});

export const createTemplateFailed = error => ({
  type: AT.CREATE_TEMPLATE_FAILED,
  error,
});

export const patchTemplate = (params, form) => ({
  type: AT.PATCH_TEMPLATE,
  form,
  params,
});

export const patchTemplateSuccess = template => ({
  type: AT.PATCH_TEMPLATE_SUCCESS,
  sourceEventId: template.source_event,
});
export const patchTemplateFailed = () => ({
  type: AT.PATCH_TEMPLATE_FAILED,
});

export const clearError = () => ({
  type: AT.CLEAR_ERROR,
});
