import * as AT from './actionTypes';

export const getPubVars = (title, env, params) => ({
  type: AT.GET_PUBVARS,
  title,
  env,
  params,
});

export const getPubVarsSuccess = data => ({
  type: AT.GET_PUBVARS_SUCCESS,
  data,
});

export const getPubVarsFailed = error => ({
  type: AT.GET_PUBVARS_FAILED,
  error,
});

export const updateSelectedValues = data => ({
  type: AT.UPDATE_SELECTED_VALUES,
  data,
});
