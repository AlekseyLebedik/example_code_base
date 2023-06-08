import axios from 'axios';
import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import {
  GROUPS_LIST_PREFIX,
  CATEGORIES_LIST_PREFIX,
  MAX_ZIP_DOWNLOAD_GB_SIZE,
} from './constants';
import * as AT from './actionTypes';
import { onUploadProgress } from '../commonActions';

export {
  downloadObject as downloadPublisherObject,
  deleteObjects as deletePublisherObjects,
  promoteObject as promotePublisherObject,
  uploadObject as uploadPublisherObject,
  fetchObjects as fetchPublisherObjects,
  propagateObjects as propagatePublisherObjects,
  startUploadProgress,
  stopUploadProgress,
  failUploadProgress,
} from '../commonActions';

const { ObjectStore: endpoints } = ServiceEndpoints;

const getContext = (getState, endpoint, serviceName) =>
  makeContextToUseSelector(getState(), {
    serviceName: serviceName || Services.ObjectStore,
    endpoint,
  });

export const fetchPublisherCategories = () => (dispatch, getState) => {
  const context = getContext(getState, endpoints.getPublisherObjectsCategories);
  dispatch(createFetch(CATEGORIES_LIST_PREFIX, null, { context }));
};

export const fetchPublisherGroups = () => (dispatch, getState) => {
  const context = getContext(
    getState,
    ServiceEndpoints.Groups.getGroups,
    Services.Groups
  );
  dispatch(
    createFetch(GROUPS_LIST_PREFIX, null, {
      context,
      dispatchNonCriticalError: false,
    })
  );
};

export const addCategory = values => (dispatch, getState) => {
  const context = getContext(
    getState,
    endpoints.createPublisherObjectsCategory
  );
  dispatch({
    type: AT.ADD_CATEGORY,
    name: values.categoryName,
    params: { context },
  });
};

export const reUploadObject =
  (data, allObjectsCheck, displayProgress, successCallback) =>
  (dispatch, getState) => {
    const context = getContext(getState, endpoints.createPublisherObject);
    const cancelSource = axios.CancelToken.source();
    dispatch({
      type: AT.UPLOAD_OBJECT,
      data,
      groupID: data.get('groupID'),
      allObjectsCheck,
      displayProgress,
      cancelSource,
      config: {
        params: { context, successCallback },
        cancelToken: cancelSource.token,
        onUploadProgress: onUploadProgress(dispatch, data),
      },
    });
  };

export const downloadMultiPublisherObjects =
  (params, canDownload) => (dispatch, getState) => {
    if (canDownload) {
      const context = getContext(getState, endpoints.getPublisherObjects);
      dispatch(
        createFetch(AT.MULTI_PUBLISHER_OBJECT_DOWNLOAD, null, {
          ...params,
          context,
        })
      );
    } else {
      const msg = `Download limit exceeded. Maximum combined zip is ${MAX_ZIP_DOWNLOAD_GB_SIZE}GB`;
      dispatch(GlobalSnackBarActions.show(msg, 'info'));
    }
  };

export const downloadMultiPublisherObjectsSuccess = () => ({
  type: AT.MULTI_PUBLISHER_OBJECT_DOWNLOAD_SUCCESS,
});
