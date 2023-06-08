import * as AT from './actionTypes';

const initialState = {
  tournaments: [],
  lobbies: [],
  q: {},
  loading: false,
  loadingList: false,
  accounts: [],
  nextPageToken: '',
  append: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AT.TOURNAMENT_SESSION_VIEWER_TOURNAMENTS_FETCH:
      return {
        ...state,
        q: action.params,
        lobbies: [],
        loadingList: true,
      };
    case AT.TOURNAMENT_SESSION_VIEWER_TOURNAMENTS_FETCH_SUCCESS:
      return {
        ...state,
        loadingList: false,
        tournaments: action.append
          ? [...state.tournaments, ...action.data.data]
          : action.data.data,
        nextPageToken: action.data.nextPageToken,
      };
    case AT.TOURNAMENT_SESSION_VIEWER_LOBBIES_FETCH:
      return {
        ...state,
        loading: true,
      };
    case AT.TOURNAMENT_SESSION_VIEWER_LOBBIES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        lobbies: action.data,
      };
    case AT.TOURNAMENT_SESSION_VIEWER_ACCOUNTS_FETCH_SUCCESS:
      return {
        ...state,
        accounts: action.data.data,
      };
    default:
      return state;
  }
};
