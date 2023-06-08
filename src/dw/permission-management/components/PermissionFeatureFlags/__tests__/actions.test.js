import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/uuid', () => ({
  uuid: () => '61fe2ca1-1c23-fbcf-9cb8-f03f96a436a8',
}));

describe('Feature Flags - actions', () => {
  it('returns FEATURE_FLAG_PERMISSIONS action', () => {
    expect(
      actions.fetchfeaturePermissions({
        userID: '1234567890',
        sortType: '-active',
      })
    ).toEqual({
      append: false,
      dispatchNonCriticalError: undefined,
      params: {
        userID: '1234567890',
        sortType: '-active',
      },
      type: `${AT.FEATURE_FLAG_PERMISSIONS}_FETCH`,
      urlID: null,
    });
  });
});
