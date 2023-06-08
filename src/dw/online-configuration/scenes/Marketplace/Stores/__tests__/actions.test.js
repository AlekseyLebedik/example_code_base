import { Services } from 'dw/online-configuration/constants';
import {
  mockState,
  DEFAULT_TITLE_CONTEXT,
} from 'dw/core/components/ContextSelector/test-utils';
import * as actions from '../actions';
import * as types from '../actionTypes';

describe('Marketplace stores actions', () => {
  const getState = () =>
    mockState({
      serviceNames: Services.Marketplace,
    });
  let dispatch = null;

  beforeEach(() => {
    jest.clearAllMocks();
    dispatch = jest.fn();
  });

  it('should create an action to fetch stores', () => {
    const params = { q: 'query' };
    const expectedAction = {
      type: types.STORES_FETCH,
      params: {
        ...params,
        context: DEFAULT_TITLE_CONTEXT,
      },
      append: false,
    };
    actions.fetchStores(params)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should create an action to fetch stores with params', () => {
    const params = { q: 'query', anyOtherParam: 'anyotherparam' };
    const expectedAction = {
      type: types.STORES_FETCH,
      params: {
        ...params,
        context: DEFAULT_TITLE_CONTEXT,
      },
      append: true,
    };
    actions.fetchStores(params, true, true)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should create an action to fetch stores success', () => {
    let payload = { data: 'data', nextPageToken: 'token' };
    let expectedAction = {
      type: types.STORES_FETCH_SUCCESS,
      stores: payload.data,
      nextPageToken: payload.nextPageToken,
      q: payload.q,
      append: false,
    };
    expect(actions.fetchStoresSuccess(payload, false, false)).toAsyncDispatch(
      expectedAction
    );

    payload = { data: 'data', nextPageToken: 'token' };
    expectedAction = {
      type: types.STORES_FETCH_SUCCESS,
      stores: payload.data,
      nextPageToken: payload.nextPageToken,
      q: payload.q,
      append: true,
    };
    expect(actions.fetchStoresSuccess(payload, true, true)).toAsyncDispatch(
      expectedAction
    );
  });
});
