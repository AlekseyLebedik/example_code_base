import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';
import * as selectors from '../selectors';
import * as helper from '../helpers';

jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/ModalHandlers');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

const ipId = 292531;
const q = 'blah';
const ip = {
  group: 'Unassigned Group',
  groupID: 0,
  ipInt: ipId,
  ipAddr: '0.4.118.179',
  ipRange: 41,
  creatorNote: '',
  note: 'Click to add note',
  type: 'IP/Ranges',
  updatedAt: 'N/A',
};
const nextPageToken = 'CAE';
const data = [
  ip,
  {
    group: 'Unassigned Group',
    groupID: 0,
    ipInt: 5285094,
    ipAddr: '0.80.164.230',
    ipRange: 32,
    creatorNote: '',
    note: 'Click to add note',
    type: 'IP/Ranges',
    updatedAt: 'N/A',
  },
];
const payload = { data, nextPageToken };
const values = [
  {
    ipAddr: '127.0.0.1',
    ipRange: 5,
    ipInt: 2130706433,
  },
];
const err = 'error';

const userA = {
  userId: 'user_a',
  group: 'Unassigned Group',
  groupID: 0,
  creatorNote: '',
  note: 'Click to add note',
  type: 'Player UserID',
  updatedAt: 'N/A',
};
const usersData = [userA];

describe('Security - Anticheat - Whitelist - IPControl', () => {
  describe('Action Creators', () => {
    const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
    const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
    const MOCKED_GLOBAL_SNACK_BAR = 'MOCKED_GLOBAL_SNACK_BAR_SHOW';
    const MOCKED_MODAL_HANDLERS_CLOSE = 'MOCKED_MODAL_HANDLERS_CLOSE';
    const MOCKED_MODAL_HANDLERS_SUBMIT = 'MOCKED_MODAL_HANDLERS_SUBMIT';
    const MOCKED_MODAL_HANDLERS_STOP_SUBMITTING =
      'MOCKED_MODAL_HANDLERS_STOP_SUBMITTING';

    beforeAll(() => {
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      GlobalSnackBarActions.show.mockReturnValue({
        type: MOCKED_GLOBAL_SNACK_BAR,
      });
      ModalHandlers.close.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_CLOSE,
      });
      ModalHandlers.submit.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_SUBMIT,
      });
      ModalHandlers.stopSubmitting.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_STOP_SUBMITTING,
      });
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('IP_CONTROL_SEARCH', () => {
      const action = actions.onSearch(q);

      expect(action).toHaveProperty('type', AT.IP_CONTROL_SEARCH);
      expect(action).toHaveProperty('q', q);
    });

    it('IP_CONTROL_FETCH', () => {
      const action = actions.fetchIPControl({});

      expect(action).toHaveProperty('type', AT.IP_CONTROL_FETCH);
      expect(action).toHaveProperty('params', {});
      expect(action).toHaveProperty('append', false);
    });

    it('IP_CONTROL_FETCH_SUCCESS', () => {
      const action = actions.fetchIPControlSuccess(payload, true);

      expect(action).toHaveProperty('type', AT.IP_CONTROL_FETCH_SUCCESS);
      expect(action).toHaveProperty('payload', payload);
      expect(action).toHaveProperty('append', true);
    });

    it('fetchIPControlFailed', () => {
      const action = actions.fetchIPControlFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_CRITICAL_ERROR });
    });

    it('WHITELISTED_USERS_FETCH', () => {
      const action = actions.fetchWhitelistedUsers({});

      expect(action).toHaveProperty('type', AT.WHITELISTED_USERS_FETCH);
      expect(action).toHaveProperty('params', {});
      expect(action).toHaveProperty('append', false);
    });

    it('WHITELISTED_USERS_FETCH_SUCCESS', () => {
      const action = actions.fetchWhitelistedUsersSuccess(payload, true);

      expect(action).toHaveProperty('type', AT.WHITELISTED_USERS_FETCH_SUCCESS);
      expect(action).toHaveProperty('payload', payload);
      expect(action).toHaveProperty('append', true);
    });

    it('fetchWhitelistedUsersFailed', () => {
      const action = actions.fetchWhitelistedUsersFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_CRITICAL_ERROR });
    });

    it('IP_CONTROL_ADD_MODAL_OPEN', () => {
      expect(actions.openAddModal()).toHaveProperty(
        'type',
        AT.IP_CONTROL_ADD_MODAL_OPEN
      );
    });

    it('IP_CONTROL_ADD_MODAL_CLOSE', () => {
      expect(actions.closeAddModal()).toHaveProperty(
        'type',
        AT.IP_CONTROL_ADD_MODAL_CLOSE
      );
    });

    it('IP_CONTROL_ADD', () => {
      const action = actions.addIPControl(values);

      expect(action).toHaveProperty('type', AT.IP_CONTROL_ADD);
      expect(action).toHaveProperty('values', values);
    });

    it('IP_CONTROL_ADD_SUCCESS', () => {
      const action = actions.addIPControlSuccess(values);

      expect(action).toAsyncDispatch(
        { type: AT.IP_CONTROL_ADD_SUCCESS, payload: values },
        { type: MOCKED_GLOBAL_SNACK_BAR }
      );
    });

    it('addIPControlFailed', () => {
      const action = actions.addIPControlFailed(err);

      expect(action).toAsyncDispatch(
        { type: MOCKED_NON_CRITICAL_ERROR },
        { type: AT.IP_CONTROL_ADD_FAILED }
      );
    });
    // IP GROUPS start
    it('fetchIPGroups action', () => {
      const action = actions.fetchIPGroups('test', 'test');
      expect(action).toMatchSnapshot();
    });

    it('fetchIPGroupsSuccess action', () => {
      const action = actions.fetchIPGroupsSuccess('test', 'test');
      expect(action).toMatchSnapshot();
    });

    it('fetchIPGroupsFailed action', () => {
      CriticalErrorActions.show.mockClear();
      const mockDispatch = jest.fn();
      actions.fetchIPGroupsFailed()(mockDispatch);
      expect(mockDispatch).toHaveBeenCalled();
      expect(CriticalErrorActions.show).toHaveBeenCalled();
    });
    // IP GROUPS end
    // IP NOTES start
    it('fetchIPNotes action', () => {
      const action = actions.fetchIPNotes('test', 'test');
      expect(action).toMatchSnapshot();
    });

    it('fetchIPNotesSuccess action', () => {
      const action = actions.fetchIPNotesSuccess('test', 'test');
      expect(action).toMatchSnapshot();
    });

    it('fetchIPNotesFailed action', () => {
      CriticalErrorActions.show.mockClear();
      const mockDispatch = jest.fn();
      actions.fetchIPNotesFailed()(mockDispatch);
      expect(mockDispatch).toHaveBeenCalled();
      expect(CriticalErrorActions.show).toHaveBeenCalled();
    });

    it('addIPNote action', () => {
      const action = actions.addIPNote('test');
      expect(action).toMatchSnapshot();
    });

    it('updateIPNote action', () => {
      const action = actions.updateIPNote('test');
      expect(action).toMatchSnapshot();
    });

    it('deleteIPNote action', () => {
      const action = actions.deleteIPNote('test');
      expect(action).toMatchSnapshot();
    });

    it('addIPNoteSuccess action', () => {
      GlobalSnackBarActions.show.mockClear();
      const mockDispatch = jest.fn();
      actions.addIPNoteSuccess('test')(mockDispatch);
      expect(mockDispatch).toHaveBeenCalled();
      expect(GlobalSnackBarActions.show).toHaveBeenCalled();
    });

    it('updateIPNoteSuccess action', () => {
      GlobalSnackBarActions.show.mockClear();
      const mockDispatch = jest.fn();
      actions.updateIPNoteSuccess('test')(mockDispatch);
      expect(mockDispatch).toHaveBeenCalled();
      expect(GlobalSnackBarActions.show).toHaveBeenCalled();
    });

    it('deleteIPNoteSuccess action', () => {
      GlobalSnackBarActions.show.mockClear();
      const mockDispatch = jest.fn();
      actions.deleteIPNoteSuccess('test')(mockDispatch);
      expect(mockDispatch).toHaveBeenCalled();
      expect(GlobalSnackBarActions.show).toHaveBeenCalled();
    });

    it('addIPNoteFailed action', () => {
      const mockDispatch = jest.fn();
      actions.addIPNoteFailed('test')(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: AT.IP_CONTROL_ADD_NOTE_FAILED,
      });
    });

    it('addIPGroupFailed action', () => {
      const mockDispatch = jest.fn();
      actions.addIPGroupFailed('test')(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: AT.IP_CONTROL_ADD_GROUP_FAILED,
      });
    });

    it('updateIPNoteFailed action', () => {
      const mockDispatch = jest.fn();
      actions.updateIPNoteFailed('test')(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: AT.IP_CONTROL_UPDATE_NOTE_FAILED,
      });
    });

    it('deleteIPGroupFailed action', () => {
      const mockDispatch = jest.fn();
      actions.deleteIPGroupFailed('test')(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: AT.IP_CONTROL_DELETE_GROUP_FAILED,
      });
    });

    // IP NOTES end

    it('IP_CONTROL_DELETE', () => {
      const action = actions.deleteIPControl([ipId]);

      expect(action).toAsyncDispatch(
        { type: AT.IP_CONTROL_DELETE, ips: [ipId] },
        { type: MOCKED_GLOBAL_SNACK_BAR }
      );
    });

    it('IP_CONTROL_DELETE_SUCCESS', () => {
      const action = actions.deleteIPControlSuccess([ipId]);

      expect(action).toHaveProperty('type', AT.IP_CONTROL_DELETE_SUCCESS);
      expect(action).toHaveProperty('ips', [ipId]);
    });

    it('deleteIPControlFailed', () => {
      const action = actions.deleteIPControlFailed(err);

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle IP_CONTROL_SEARCH', () => {
      expect(reducer(undefined, actions.onSearch(q))).toMatchSnapshot();
    });

    it('handle IP_CONTROL_FETCH_SUCCESS: empty results', () => {
      expect(
        reducer(undefined, actions.fetchIPControlSuccess({ data: [] }))
      ).toMatchSnapshot();
    });

    it('handle IP_CONTROL_FETCH_SUCCESS: ipControl and nextPagetoken assignation', () => {
      expect(
        reducer(undefined, actions.fetchIPControlSuccess(payload))
      ).toMatchSnapshot();
    });

    it('Test append = false', () => {
      expect(
        reducer(
          { ipControl: [{ ipInt: 1 }, { ipInt: 2 }] },
          actions.fetchIPControlSuccess(
            { data: [{ ipInt: 3 }, { ipInt: 4 }] },
            false
          )
        )
      ).toMatchSnapshot();
    });

    it('Test append = true', () => {
      expect(
        reducer(
          { ipControl: [{ ipInt: 1 }, { ipInt: 2 }] },
          actions.fetchIPControlSuccess(
            { data: [{ ipInt: 3 }, { ipInt: 4 }] },
            true
          )
        )
      ).toMatchSnapshot();
    });

    it('handle IP_CONTROL_ADD_MODAL_OPEN', () => {
      expect(reducer(undefined, actions.openAddModal())).toMatchSnapshot();
    });

    it('handle IP_CONTROL_ADD_MODAL_CLOSE', () => {
      expect(reducer(undefined, actions.closeAddModal())).toMatchSnapshot();
    });

    it('handle IP_CONTROL_ADD', () => {
      expect(
        reducer(undefined, actions.addIPControl(values))
      ).toMatchSnapshot();
    });

    it('handle IP_CONTROL_ADD_SUCCESS', () => {
      expect(
        reducer(undefined, { type: AT.IP_CONTROL_ADD_SUCCESS, payload: values })
      ).toMatchSnapshot();
    });

    it('handle IP_CONTROL_ADD_FAILED', () => {
      expect(
        reducer(undefined, { type: AT.IP_CONTROL_ADD_FAILED })
      ).toMatchSnapshot();
    });

    it('handle IP_CONTROL_DELETE_SUCCESS', () => {
      const state = reducer(
        undefined,
        actions.fetchIPControlSuccess(payload, false)
      );
      expect(
        reducer(state, actions.deleteIPControlSuccess([ipId]))
      ).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    it('validate searchParams', () => {
      const state = {
        Scenes: {
          Security: { Anticheat: { Whitelist: { IPControl: { q } } } },
        },
      };

      expect(selectors.searchParams(state)).toBe(q);
    });

    it('validate filteredSelector', () => {
      const state = {
        user: {
          profile: { timezone: null },
        },
        Scenes: {
          Security: {
            Anticheat: {
              Whitelist: {
                IPControl: {
                  ipControl: data,
                  q: { default: true, q: '0.4.118.179' },
                },
              },
            },
          },
        },
      };

      expect(selectors.filteredSelector(state)).toEqual([ip]);
    });

    it('validate filteredSelector, empty search', () => {
      const state = {
        user: {
          profile: { timezone: null },
        },
        Scenes: {
          Security: {
            Anticheat: { Whitelist: { IPControl: { ipControl: data } } },
          },
        },
      };

      expect(selectors.filteredSelector(state)).toEqual(data);
    });

    it('validate usersGroupAndDateSelector', () => {
      const state = {
        user: {
          profile: { timezone: null },
        },
        Scenes: {
          Security: {
            Anticheat: {
              Whitelist: {
                IPControl: {
                  whitelistedUsers: usersData,
                  q: { default: true, q: 'user_a' },
                },
              },
            },
          },
        },
      };

      expect(selectors.usersGroupAndDateSelector(state)).toEqual([userA]);
    });
  });
});

describe('Security - Anticheat - Whitelist - Helpers', () => {
  it('validates mapping whitelist type', () => {
    const common = {
      group: 'Unassigned Group',
      groupID: 0,
      creatorNote: '',
      note: 'Click to add note',
      type: 'IP/Ranges',
      updatedAt: 'N/A',
    };
    expect(
      helper.mapWhitelistType({
        ...common,
        ipInt: ipId,
        ipAddr: '0.4.118.179',
        ipRange: 41,
      })
    ).toBe('IP/Ranges');

    expect(
      helper.mapWhitelistType({
        ...common,
        userId: '1234',
      })
    ).toBe('Player UserID');

    expect(
      helper.mapWhitelistType({
        ...common,
        gamerTag: 'Player A',
      })
    ).toBe('Player GamerTag');

    expect(
      helper.mapWhitelistType({
        ...common,
        consoleId: 'ABCD-1234',
      })
    ).toBe('ConsoleID');
  });
});
