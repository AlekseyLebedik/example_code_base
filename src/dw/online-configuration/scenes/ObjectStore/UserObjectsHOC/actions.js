import download from 'downloadjs';
import { SubmissionError } from 'redux-form';

import { createFetch } from '@demonware/devzone-core/helpers/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { getFormError } from 'dw/core/helpers/form-error';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';

import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import * as API from 'dw/online-configuration/services/objectStore';

import * as AT from './actionTypes';
import { isUserObjectsSelector } from './selectors';
import { sortDeletedObjects } from './helpers';

const { ObjectStore: endpoints } = ServiceEndpoints;

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.ObjectStore,
    endpoint,
  });

/* USER OBJECTS */

export const fetchUserObjects =
  (userId, params = {}, append = undefined) =>
  (dispatch, getState) => {
    const context = getContext(getState, endpoints.getUserObjects);
    return dispatch(
      createFetch(
        AT.USER_OBJECTS_FETCH,
        userId,
        { ...params, context },
        append ||
          (params.nextPageToken !== null && params.nextPageToken !== undefined)
      )
    );
  };

export const downloadUserObject =
  (userId, name, objectVersion) => (dispatch, getState) => {
    const context = getContext(getState, endpoints.getUserObjectDetails);
    return dispatch({
      type: AT.USER_OBJECT_DOWNLOAD,
      userId,
      name,
      objectVersion,
      context,
    });
  };

export const downloadUserObjectSuccess = payload => dispatch => {
  dispatch({ type: AT.USER_OBJECT_DOWNLOAD_SUCCESS });
  download(payload.fileData, payload.metadata.name);
};

export const downloadUserObjectFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));

export const restoreUserObjectBackup =
  (userId, name, objectVersion) => (dispatch, getState) => {
    const context = getContext(getState, endpoints.restoreUserObjectBackup);
    return dispatch({
      type: AT.USER_OBJECT_RESTORE_BACKUP,
      userId,
      name,
      objectVersion,
      context,
    });
  };

export const userObjectRestoreBackupSuccess =
  (userId, name) => (dispatch, getState) => {
    fetchUserObjects(userId)(dispatch, getState);
    dispatch(
      GlobalSnackBarActions.show(
        `User Object ${name} successfully restored from backup.`,
        'success'
      )
    );
  };

export const userObjectRestoreBackupFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));

export const deleteUserObjects = (userId, names) => (dispatch, getState) => {
  const context = getContext(getState, endpoints.deleteUserObject);
  return dispatch({
    type: AT.USER_OBJECTS_DELETE,
    userId,
    names,
    context,
  });
};

export const deleteUserObjectsSuccess = (userId, results) => dispatch => {
  const { deletedObjects, notDeletedObjects } = sortDeletedObjects(results);
  dispatch({
    type: AT.USER_OBJECTS_DELETE_SUCCESS,
    userId,
    deletedObjects,
  });

  const total = deletedObjects.length + notDeletedObjects.length;
  const NotificationType = deletedObjects.length > 0 ? 'success' : 'error';
  dispatch(
    GlobalSnackBarActions.show(
      `${deletedObjects.length}/${total} objects were deleted properly.`,
      NotificationType
    )
  );
};

const refreshObjects = userId => (dispatch, getState) => {
  const isCurrentUserId = isUserObjectsSelector(getState(), { userId });
  if (isCurrentUserId) {
    dispatch(fetchUserObjects(userId));
  }
};

export const uploadUserObject = values => (dispatch, getState) => {
  const context = getContext(getState, endpoints.createUserObject);
  const { userId } = values;
  const validValues = {
    fileData: values.fileData.file,
    fileName: values.fileName || values.fileData.file.name,
    acl: values.acl,
    expiresOn: values.expiresOn ? values.expiresOn : 0,
    checksumType: values.checksumType,
    checksum: values.checksum,
  };
  const data = new FormData();
  Object.keys(validValues).forEach(key => {
    if (validValues[key] !== undefined) data.append(key, validValues[key]);
  });

  dispatch({
    type: AT.USER_OBJECTS_UPLOAD,
    loading: true,
  });
  return API.putUserObject(userId, data, context)
    .then(() => {
      dispatch({
        type: AT.USER_OBJECTS_UPLOAD,
        loading: false,
      });
      dispatch(refreshObjects(userId));
      dispatch(ModalHandlers.close());
    })
    .catch(err => {
      const validationErrors = getFormError(err);
      if (validationErrors) {
        throw new SubmissionError(validationErrors);
      } else {
        dispatch(nonCriticalHTTPError(err));
        dispatch({
          type: AT.USER_OBJECTS_UPLOAD,
          loading: false,
        });
      }
    });
};

/* POOLED OBJECTS */

export const fetchPooledObjects =
  (userId, params = {}, append = undefined) =>
  (dispatch, getState) => {
    const context = getContext(getState, endpoints.getPooledObjects);
    return dispatch(
      createFetch(
        AT.POOLED_OBJECTS_FETCH,
        userId,
        { ...params, context },
        append ||
          (params.nextPageToken !== null && params.nextPageToken !== undefined)
      )
    );
  };

export const deletePooledObjects = (userId, names) => (dispatch, getState) => {
  const context = getContext(getState, endpoints.deletePooledObject);
  return dispatch({
    type: AT.POOLED_OBJECTS_DELETE,
    userId,
    names,
    context,
  });
};

export const deletePooledObjectsSuccess = (userId, results) => dispatch => {
  const { deletedObjects, notDeletedObjects } = sortDeletedObjects(results);
  const total = deletedObjects.length + notDeletedObjects.length;
  dispatch({
    type: AT.POOLED_OBJECTS_DELETE_SUCCESS,
    userId,
    deletedObjects,
  });
  dispatch(
    GlobalSnackBarActions.show(
      `${deletedObjects.length}/${total} objects were deleted properly.`,
      'success'
    )
  );
};

export const unloadUserObjects = () => dispatch => {
  dispatch({
    type: AT.USER_OBJECTS_UNLOAD,
  });
};

export const unloadPooledObjects = () => dispatch => {
  dispatch({
    type: AT.POOLED_OBJECTS_UNLOAD,
  });
};
