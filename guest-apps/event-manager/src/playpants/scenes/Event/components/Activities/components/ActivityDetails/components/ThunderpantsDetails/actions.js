import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

export const addUnlockedDeployment = ({ password, uid }) => ({
  type: AT.ADD_UNLOCKED_DEPLOYMENT,
  deployment: { password, uid },
});

export const checkDeploymentPassword = ({ ...args }) => ({
  ...args,
  type: AT.CHECK_DEPLOYMENT_PASSWORD,
});

export const clearFormData = () => ({
  type: AT.CLEAR_FORM_DATA,
});

export const clearThunderpantsActivity = () => ({
  type: AT.CLEAR_THUNDERPANTS_ACTIVITY,
});

export const clearUnlockedDeployments = () => ({
  type: AT.CLEAR_UNLOCKED_DEPLOYMENTS,
});

export const deleteDeployment = ({ uid, params }) => ({
  type: AT.DELETE_DEPLOYMENT,
  uid,
  params,
});

export const fetchBuildList = params =>
  createFetch(AT.FETCH_BUILD_LIST, null, params);

export const fetchBuildSchema = params =>
  createFetch(AT.FETCH_BUILD_SCHEMA, null, params);

export const fetchDeployerList = params =>
  createFetch(AT.FETCH_DEPLOYER_LIST, null, params);

export const fetchDeploymentList = params =>
  createFetch(AT.FETCH_DEPLOYMENT_LIST, null, params);

export const fetchTargetList = params =>
  createFetch(AT.FETCH_TARGET_LIST, null, params);

export const fetchUserParamsSchema = params =>
  createFetch(AT.FETCH_USER_PARAMS_SCHEMA, null, params);

export const fetchViewList = params =>
  createFetch(AT.FETCH_VIEW_LIST, null, params);

export const modifyLock = ({ ...args }) => ({
  ...args,
  type: AT.MODIFY_LOCK,
});

export const setFilterType = filterType => ({
  type: AT.SET_FILTER_TYPE,
  filterType,
});

export const setFormData = ({
  formData = {},
  formNext = '',
  formSchema = [],
  formSummaryData = {},
  formTargets = [],
  formType = '',
  onSuccess,
}) => ({
  type: AT.SET_FORM_DATA,
  formData,
  formNext,
  formSchema,
  formSummaryData,
  formTargets,
  formType,
  onSuccess,
});
