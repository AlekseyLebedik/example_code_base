import * as AT from './actionTypes';

const INITIAL_STATE = {
  loading: true,
  backgroundLoading: true,
  lobbies: [],
  playlists: [],
  pageTokens: {},
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.SESSION_VIEWER_LOBBIES_FETCH:
      return state;
    case AT.SESSION_VIEWER_LOBBIES_FETCH_SUCCESS:
      return {
        ...state,
        pageTokens: {
          ...state.pageTokens,
          ...action.pageTokens,
        },
        lobbies: [
          ...state.lobbies,
          ...action.payload.filter(
            payloadLobby =>
              !state.lobbies
                .map(stateLobby => stateLobby.id)
                .includes(payloadLobby.id)
          ),
        ],
        loading: false,
        backgroundLoading: !action.finished,
      };
    case AT.SESSION_VIEWER_PLAYLISTS_FETCH_SUCCESS:
      return {
        ...state,
        playlists: action.payload,
        lobbies: [],
        pageTokens: [],
      };
    default:
      return state;
  }
};
