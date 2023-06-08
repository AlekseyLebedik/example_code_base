import { fetchSuccess } from '@demonware/devzone-core/helpers/actions';
import fetchUsersListReducer from '../reducer';
import * as AT from '../actionTypes';

describe('Users - reducer', () => {
  it('should return state on FEATURE_FLAG_PERMISSIONS', () => {
    const state = fetchUsersListReducer(
      undefined,
      fetchSuccess(AT.FEATURE_FLAG_PERMISSIONS, {
        data: [
          {
            active: true,
            id: 1,
            name: 'foo',
            note: '',
            type: 'switch',
          },
          {
            active: true,
            id: 2,
            name: 'foo',
            note: '',
            type: 'flag',
          },
        ],
      })
    );
    expect(state.data).toHaveLength(2);
  });
});
