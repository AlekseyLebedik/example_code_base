import { reducer as LeaderboardDetailsReducer } from './components/LeaderboardDetails/reducer';
import * as AT from './actionTypes';
import {
  LEADERBOARD_DATA_FETCH_SUCCESS,
  LEADERBOARD_DELETE_ENTITIES_SUCCESS,
  LEADERBOARD_RESET_SUCCESS,
} from './components/LeaderboardDetails/actionTypes';

const INITIAL_STATE = {
  leaderboards: [],
  leaderboardsLoading: false,
  nextPageToken: undefined,
  selectedLeaderboard: undefined,
  elementsOrder: [],
  q: undefined,
  refreshId: '',
  leaderboardDetails: undefined,
  searchAvailable: true,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.LEADERBOARDS_FETCH:
      return {
        ...state,
        leaderboardsLoading: true,
      };
    case AT.LEADERBOARDS_FETCH_SUCCESS:
      return {
        ...state,
        leaderboards: action.append
          ? [...state.leaderboards, ...action.leaderboards]
          : action.leaderboards,
        leaderboardsLoading: action.stillLoading,
        nextPageToken: action.nextPageToken,
        searchAvailable: action.searchAvailable,
        elementsOrder: action.elementsOrder,
        q: action.q,
      };
    case AT.LEADERBOARDS_FETCH_FAILED:
      return {
        ...state,
        leaderboardsLoading: false,
      };
    case AT.LEADERBOARDS_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedLeaderboard: action.leaderboard,
      };
    case AT.LEADERBOARDS_FETCH_STATUS_SUCCESS: {
      const newEntries = [];
      let stateUpdated = false;
      state.leaderboards.forEach(leaderboard => {
        const lbId = leaderboard.id.toString();
        if (action.status.hasOwnProperty(lbId) && leaderboard.resetStatus) {
          if (
            (leaderboard.resetStatus.length === undefined &&
              leaderboard.resetStatus.label !== action.status[lbId].label) ||
            leaderboard.resetStatus.length > 0
          ) {
            // eslint-disable-next-line no-param-reassign
            leaderboard = { ...leaderboard, resetStatus: action.status[lbId] };
            if (action.status[lbId].label === 'success') {
              // eslint-disable-next-line no-param-reassign
              leaderboard = {
                ...leaderboard,
                rowscount: 0,
              };
            }
          }
          stateUpdated = true;
        }
        newEntries.push(leaderboard);
      });

      if (stateUpdated) {
        return {
          ...state,
          leaderboards: newEntries,
        };
      }
      return state;
    }
    case LEADERBOARD_DATA_FETCH_SUCCESS:
      return {
        ...state,
        leaderboardDetails: LeaderboardDetailsReducer(
          state.leaderboardDetails,
          action
        ),
      };
    case LEADERBOARD_DELETE_ENTITIES_SUCCESS:
      return {
        ...state,
        refreshId: action.refreshId,
      };
    case LEADERBOARD_RESET_SUCCESS:
      return {
        ...state,
        refreshId: action.refreshId,
        leaderboardDetails: undefined,
      };
    default:
      return state;
  }
};
