import { fetchSuccess } from '@demonware/devzone-core/helpers/actions';
import { reducer } from '../reducer';
import {
  USERS_LIST_PREFIX,
  AVAILABLE_GROUPS_LIST_PREFIX,
  ASSIGNED_GROUPS_LIST_PREFIX,
} from '../constants';

describe('Users - reducer', () => {
  it('should return state on USERS_LIST_FETCH_SUCCESS', () => {
    const state = reducer(
      undefined,
      fetchSuccess(USERS_LIST_PREFIX, {
        data: [
          { id: 3, username: 'admin' },
          { id: 1, username: 'test' },
        ],
      })
    );
    expect(state.Users.data).toHaveLength(2);
  });

  it('should return state on AVAILABLE_GROUPS_FETCH_SUCCESS', () => {
    const state = reducer(
      undefined,
      fetchSuccess(AVAILABLE_GROUPS_LIST_PREFIX, {
        data: [
          { id: 3, name: 'Coreviz' },
          { id: 1, name: 'developer' },
          { id: 1, name: 'test-group' },
        ],
      })
    );
    expect(state.Groups.data).toHaveLength(3);
  });

  it('should return state on ASSIGNED_GROUPS_FETCH_SUCCESS', () => {
    const state = reducer(
      undefined,
      fetchSuccess(ASSIGNED_GROUPS_LIST_PREFIX, {
        data: [{ id: 3, name: 'Coreviz' }],
      })
    );
    expect(state.AssignedGroups.data).toHaveLength(1);
  });
});
