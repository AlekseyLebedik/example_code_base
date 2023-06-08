import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as AT from '../actionTypes';
import * as actions from '../actions';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('Reporting Actions', () => {
  it('fetchFranchises', () => {
    expect(actions.fetchFranchises({})).toEqual({
      type: AT.REPORTING_FETCH_FRANCHISES,
      params: {},
    });
  });
  it('fetchFranchisesSucceed', () => {
    expect(
      actions.fetchFranchisesSucceed([{ id: 1, name: 'Franchise 1' }])
    ).toEqual({
      type: AT.REPORTING_FETCH_FRANCHISES_SUCCESS,
      data: [{ id: 1, name: 'Franchise 1' }],
    });
  });
  it('fetchFranchisesFail', () => {
    const dispatch = jest.fn();
    const error = 'some error';
    actions.fetchFranchisesFail(error)(dispatch);
    expect(dispatch).toBeCalledWith({
      type: AT.REPORTING_FETCH_FRANCHISES_FAILED,
    });
    expect(nonCriticalHTTPError).toBeCalledWith(error);
  });
});
