import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { mockState } from 'dw/core/components/ContextSelector/test-utils';
import * as actions from '../../PlayerAchievements/components/AE/actions';
import * as AT from '../../PlayerAchievements/components/AE/actionTypes';
import { reducer } from '../reducer';

jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('@demonware/devzone-core/helpers/errors');

const playerId = '12918696864949287';
const nextPageToken = 'CAE';
const userAchievements = [
  {
    status: 'inProgress',
    completionTimestamp: null,
    kind: 1,
    name: 'daily_ch_1v1_wins',
    multiProgress: {},
    completionCount: 0,
    activationTimestamp: 1497886700,
    progress: 0,
    expirationTimestamp: null,
    progressTarget: 0,
  },
];
const payload = { userAchievements, nextPageToken };
const values = ['open_sd_with_audience', 'fte_ch_quartermaster'];

describe('Achievements - UserAchievements', () => {
  const getState = () =>
    mockState({
      serviceNames: Services.AE,
      platformEndpoints: [
        ServiceEndpoints.AE.getUserAchievements,
        ServiceEndpoints.AE.deleteUserAchievements,
      ],
      userId: playerId,
    });
  const dispatch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Action Creators', () => {
    const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
    const MOCKED_GLOBAL_SNACK_BAR = 'MOCKED_GLOBAL_SNACK_BAR_SHOW';

    beforeAll(() => {
      GlobalSnackBarActions.show.mockReturnValue({
        type: MOCKED_GLOBAL_SNACK_BAR,
      });
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('USER_ACHIEVEMENTS_FETCH', () => {
      actions.fetchUserAchievements(playerId, nextPageToken)(
        dispatch,
        getState
      );
      expect(dispatch).toBeCalledWith({
        type: AT.USER_ACHIEVEMENTS_FETCH,
        params: {
          player_id: playerId,
          nextPageToken,
          context: '5577-ps4',
        },
        append: false,
      });
    });

    it('USER_ACHIEVEMENTS_FETCH_SUCCESS', () => {
      expect(actions.fetchUserAchievementsSuccess(payload, true)).toMatchObject(
        {
          type: AT.USER_ACHIEVEMENTS_FETCH_SUCCESS,
          userAchievements,
          nextPageToken,
          append: true,
        }
      );
    });

    it('fetchUserAchievementsFailed', () => {
      expect(actions.fetchUserAchievementsFailed()).toAsyncDispatch({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('USER_ACHIEVEMENTS_DELETE', () => {
      actions.deleteUserAchievements(playerId, values)(dispatch, getState);
      expect(dispatch).toBeCalledWith({
        type: AT.USER_ACHIEVEMENTS_DELETE,
        playerId,
        values,
        params: {
          context: '5577-ps4',
        },
      });
    });

    it('USER_ACHIEVEMENTS_DELETE_SUCCESS', () => {
      const action = actions.deleteUserAchievementsSuccess(playerId, 1);
      action.getState = getState;
      expect(action).toAsyncDispatch(
        { type: AT.USER_ACHIEVEMENTS_DELETE_SUCCESS },
        { type: MOCKED_GLOBAL_SNACK_BAR },
        {
          type: AT.USER_ACHIEVEMENTS_FETCH,
          append: false,
          params: {
            context: '5577-ps4',
            nextPageToken: undefined,
            player_id: '12918696864949287',
          },
        }
      );
    });

    it('deleteUserAchievementsFailed', () => {
      expect(actions.deleteUserAchievementsFailed()).toAsyncDispatch({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle USER_ACHIEVEMENTS_FETCH_SUCCESS: empty results', () => {
      expect(
        reducer(
          undefined,
          actions.fetchUserAchievementsSuccess({ userAchievements: [] })
        )
      ).toMatchSnapshot();
    });

    it('handle USER_ACHIEVEMENTS_FETCH_SUCCESS: userAchievements and nextPagetoken assignation', () => {
      expect(
        reducer(undefined, actions.fetchUserAchievementsSuccess(payload, true))
      ).toMatchSnapshot();
    });

    it('Test append = false', () => {
      expect(
        reducer(
          { userAchievements: [1, 2] },
          actions.fetchUserAchievementsSuccess(
            { userAchievements: [3, 4], nextPageToken },
            false
          )
        )
      ).toMatchSnapshot();
    });

    it('Test append = true', () => {
      expect(
        reducer(
          { userAchievements: [1, 2] },
          actions.fetchUserAchievementsSuccess(
            { userAchievements: [3, 4], nextPageToken },
            true
          )
        )
      ).toMatchSnapshot();
    });
  });
});
