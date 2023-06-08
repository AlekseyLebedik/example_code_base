import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import {
  mockState,
  DEFAULT_PLATFORM_CONTEXT,
} from 'dw/core/components/ContextSelector/test-utils';

import {
  postGrantProducts,
  postGrantProductsSuccess,
  postGrantProductsFailed,
} from '../actions';
import * as AT from '../actionTypes';

describe('Products actions', () => {
  const dispatch = jest.fn();
  const getState = () =>
    mockState({
      serviceNames: Services.Marketplace,
      platformEndpoints: ServiceEndpoints.Marketplace.postPlayerProduct,
    });
  it('postGrantProducts', () => {
    postGrantProducts('1', { test: 'something' })(dispatch, getState);
    expect(dispatch).toBeCalledWith({
      type: AT.GRANT_PRODUCTS_POST,
      playerId: '1',
      data: { test: 'something' },
      params: {
        context: DEFAULT_PLATFORM_CONTEXT,
        isClan: false,
      },
    });
  });

  it('postGrantProductsSuccess', () => {
    const result = postGrantProductsSuccess('1', { test: 'something' });
    expect(result).toEqual({
      type: AT.GRANT_PRODUCTS_POST_SUCCESS,
      playerId: '1',
      data: { test: 'something' },
      isClan: false,
    });
  });

  it('postGrantProductsFailed', () => {
    const result = postGrantProductsFailed('1', 'error');
    expect(result).toEqual({
      type: AT.GRANT_PRODUCTS_POST_FAILED,
      playerId: '1',
      error: 'error',
    });
  });
});
