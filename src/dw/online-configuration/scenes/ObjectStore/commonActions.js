import axios from 'axios';
import { hasData } from 'dw/core/helpers/object';
import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { getInvalidFieldsErrorMessage } from 'dw/core/helpers/form-error';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { currentEnvSelector } from 'dw/core/helpers/title-env-selectors';
import { OBJECTS_LIST_PREFIX } from './constants';
import * as AT from './actionTypes';

const { ObjectStore: endpoints } = ServiceEndpoints;

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.ObjectStore,
    endpoint,
  });

export const fetchObjects =
  (params = {}) =>
  (dispatch, getState) => {
    const context = getContext(getState, endpoints.getPublisherObjects);
    dispatch(createFetch(OBJECTS_LIST_PREFIX, null, { ...params, context }));
  };

export const downloadObject =
  (name, groupID = undefined, contentURL, acl) =>
  (dispatch, getState) => {
    const context = getContext(getState, endpoints.getPublisherObjectDetails);
    dispatch({
      type: AT.OBJECT_DOWNLOAD,
      name,
      groupID,
      contentURL,
      acl,
      params: { context },
    });
  };

export const downloadObjectSuccess = () => ({
  type: AT.OBJECT_DOWNLOAD_SUCCESS,
});

export const downloadObjectFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));

export const deleteObjects =
  (objects, groupID, params = {}) =>
  (dispatch, getState) => {
    const context = getContext(getState, endpoints.deletePublisherObject);
    dispatch({
      type: AT.OBJECTS_DELETE,
      objects,
      groupID,
      params: { ...params, context },
    });
  };

export const deleteObjectsSuccess = () => ({
  type: AT.OBJECTS_DELETE_SUCCESS,
});

export const promoteObject =
  (groupID, name, allObjectsCheck, params = {}) =>
  (dispatch, getState) => {
    const context = getContext(getState, endpoints.createPublisherObject);
    dispatch({
      type: AT.OBJECT_PROMOTE,
      name,
      groupID,
      allObjectsCheck,
      params: { ...params, context },
    });
  };

export const onUploadProgress = (dispatch, data) => progressEvent => {
  const percentCompleted = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  );
  dispatch({
    type: AT.INCREMENT_UPLOAD_PROGRESS,
    formData: data,
    progress: percentCompleted,
  });
};

export const uploadObject =
  (values, allObjectsCheck, displayProgress, params = {}) =>
  (dispatch, getState) => {
    const validValues = {
      fileData: values.fileData.file,
      groupID: values.groupID,
      fileName: values.fileName || values.fileData.file.name,
      acl: values.acl,
      expiresOn: values.expiresOn ? values.expiresOn : 0,
      category: values.category,
      checksumType: values.checksumType,
      checksum: values.checksum,
      confirmed: values.confirmed,
    };
    const data = new FormData();
    Object.keys(validValues).forEach(key => {
      if (validValues[key] !== undefined) data.append(key, validValues[key]);
    });
    const context = getContext(getState, endpoints.createPublisherObject);
    const cancelSource = axios.CancelToken.source();
    dispatch({
      type: AT.UPLOAD_OBJECT,
      data,
      groupID: values.groupID,
      allObjectsCheck,
      displayProgress,
      cancelSource,
      config: {
        params: { ...params, context },
        cancelToken: cancelSource.token,
        onUploadProgress: onUploadProgress(dispatch, data),
      },
    });
  };

export const propagateObjects =
  (values, resolve, reject) => (dispatch, getState) => {
    dispatch({
      type: AT.PROPAGATE_OBJECTS,
      values,
      sourceEnv: currentEnvSelector(getState()),
      sourceContext: getContext(getState, endpoints.propagatePublisherObject),
      resolve,
      reject,
    });
  };

export const propagateObjectsSuccess = (data, env) => dispatch => {
  const { success, errors } = data;
  if (hasData(success)) {
    const msg =
      success.length > 1
        ? `'${success.join(', ')}' were successfully propagated to ${env}.`
        : `'${success[0]}' was successfully propagated to ${env}.`;
    dispatch(GlobalSnackBarActions.show(msg, 'success'));
  }
  if (hasData(errors)) {
    errors.forEach(error => {
      const [obj, err] = Object.entries(error)[0];
      let errMsg = err;
      if (typeof err === 'object') {
        if ('error' in err) {
          errMsg = getInvalidFieldsErrorMessage({ response: { data: err } });
        } else {
          const [field, fieldError] = Object.entries(err)[0];
          errMsg = `${field} - ${fieldError[0]}`;
        }
      }
      dispatch(
        GlobalSnackBarActions.show(
          `${obj} Propagation failed, error: ${errMsg}`,
          'error'
        )
      );
    });
  }
};

export const startUploadProgress = (formData, cancelSource) => ({
  type: AT.START_UPLOAD_PROGRESS,
  formData,
  cancelSource,
});

export const incrementUploadProgress = (formData, progress) => ({
  type: AT.INCREMENT_UPLOAD_PROGRESS,
  formData,
  progress,
});

export const stopUploadProgress = (formData, fileName) => ({
  type: AT.STOP_UPLOAD_PROGRESS,
  formData,
  fileName,
});

export const failUploadProgress = (formData, error) => ({
  type: AT.FAIL_UPLOAD_PROGRESS,
  formData,
  error,
});
