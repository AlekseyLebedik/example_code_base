import { createFetch } from '@demonware/devzone-core/helpers/actions';

import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import {
  FETCH_POOLED_OBJECT_TAGS,
  POOLED_OBJECT_SEARCH,
  POOLED_OBJECT_SEARCH_SUCCESS,
  POOLED_OBJECT_SEARCH_FAILED,
} from './actionTypes';

const { ObjectStore: endpoints } = ServiceEndpoints;

const getContext = (getState, endpoint) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.ObjectStore,
    endpoint,
  });

export const getPooledObjectValidTags = (params = {}) =>
  createFetch(FETCH_POOLED_OBJECT_TAGS, null, { ...params });

export const pooledObjectSearch =
  (params = {}, data, append = false) =>
  (dispatch, getState) => {
    const context = getContext(getState, endpoints.getUserObjects);
    return dispatch({
      type: POOLED_OBJECT_SEARCH,
      data,
      params: { ...params, context },
      append,
    });
  };

export const pooledObjectSearchSuccess = (data, append = false) => ({
  type: POOLED_OBJECT_SEARCH_SUCCESS,
  data,
  append,
});

export const pooledObjectSearchFailed = error => ({
  type: POOLED_OBJECT_SEARCH_FAILED,
  error,
});
