/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  initialState,
  startLoading,
  loadingFailed,
  addSuccess,
  deleteSuccess,
  createAddThunk,
  createDeleteThunk,
} from 'dw/core/helpers/slices';
import * as api from 'dw/online-configuration/services/debugging';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

// Slice types
export const REMOTE_COMMANDS_TYPE = 'RemoteCommands';
export const SEND_COMMAND_TYPE = 'sendRemoteCommand';
export const FAVORITE_COMMANDS_TYPE = 'favorite';
export const RECENT_COMMANDS_TYPE = 'recent';

// Custom actions
const fetchCommandsSuccessAction = (state, { payload: { data } }) => {
  state[FAVORITE_COMMANDS_TYPE].data = data[FAVORITE_COMMANDS_TYPE];
  state[RECENT_COMMANDS_TYPE].data = data[RECENT_COMMANDS_TYPE];
};

const changeSearchQueryAction = (state, { payload }) => {
  state.q = payload.q;
};

// Slices
const remoteCommandsSlice = createSlice({
  name: REMOTE_COMMANDS_TYPE,
  initialState: {
    ...initialState,
    [SEND_COMMAND_TYPE]: initialState,
    [FAVORITE_COMMANDS_TYPE]: { ...initialState, q: null },
    [RECENT_COMMANDS_TYPE]: { ...initialState, q: null },
  },
  reducers: {
    fetchCommandsStart: startLoading,
    fetchCommandsSuccess: fetchCommandsSuccessAction,
    fetchCommandsFailed: loadingFailed,
    sendCommandStart: (state, action) =>
      startLoading(state[SEND_COMMAND_TYPE], action),
    sendCommandSuccess: (state, action) =>
      addSuccess(state[SEND_COMMAND_TYPE], action),
    sendCommandFailed: (state, action) =>
      loadingFailed(state[SEND_COMMAND_TYPE], action),
    addFavoriteStart: (state, action) =>
      startLoading(state[FAVORITE_COMMANDS_TYPE], action),
    addFavoriteSuccess: (state, action) =>
      addSuccess(state[FAVORITE_COMMANDS_TYPE], action),
    addFavoriteFailed: (state, action) =>
      loadingFailed(state[FAVORITE_COMMANDS_TYPE], action),
    deleteFavoriteStart: (state, action) =>
      startLoading(state[FAVORITE_COMMANDS_TYPE], action),
    deleteFavoriteSuccess: (state, action) =>
      deleteSuccess(state[FAVORITE_COMMANDS_TYPE], action),
    deleteFavoriteFailed: (state, action) =>
      loadingFailed(state[FAVORITE_COMMANDS_TYPE], action),
    changeSearchQueryFavorites: (state, action) =>
      changeSearchQueryAction(state[FAVORITE_COMMANDS_TYPE], action),
    addRecentStart: (state, action) =>
      startLoading(state[RECENT_COMMANDS_TYPE], action),
    addRecentSuccess: (state, action) =>
      addSuccess(state[RECENT_COMMANDS_TYPE], action),
    addRecentFailed: (state, action) =>
      loadingFailed(state[RECENT_COMMANDS_TYPE], action),
    changeSearchQueryRecent: (state, action) =>
      changeSearchQueryAction(state[RECENT_COMMANDS_TYPE], action),
  },
});

export default remoteCommandsSlice.reducer;

const {
  fetchCommandsStart,
  fetchCommandsSuccess,
  fetchCommandsFailed,
  sendCommandStart,
  sendCommandSuccess,
  sendCommandFailed,
  addFavoriteStart,
  addFavoriteSuccess,
  addFavoriteFailed,
  deleteFavoriteStart,
  deleteFavoriteSuccess,
  deleteFavoriteFailed,
  changeSearchQueryFavorites,
  addRecentStart,
  addRecentSuccess,
  addRecentFailed,
  changeSearchQueryRecent,
} = remoteCommandsSlice.actions;

// Helper functions
const formatMessageToStore = message => ({
  message,
  id: message,
  timestamp: Date.now(),
});

// Thunks
export const addFavoriteCommand = createAddThunk({
  actions: {
    addStart: addFavoriteStart,
    addSuccess: addFavoriteSuccess,
    addFailed: addFavoriteFailed,
  },
  apiCallFn: api.addRemoteCall,
  formatter: message => ({
    data: formatMessageToStore(message),
    commandType: FAVORITE_COMMANDS_TYPE,
  }),
});

export const deleteFavoriteCommand = createDeleteThunk({
  actions: {
    deleteStart: deleteFavoriteStart,
    deleteSuccess: deleteFavoriteSuccess,
    deleteFailed: deleteFavoriteFailed,
  },
  apiCallFn: api.deleteRemoteCall,
  formatter: message => ({
    data: formatMessageToStore(message),
    commandType: FAVORITE_COMMANDS_TYPE,
  }),
});

export const addRecentCommand = createAddThunk({
  actions: {
    addStart: addRecentStart,
    addSuccess: addRecentSuccess,
    addFailed: addRecentFailed,
  },
  apiCallFn: api.addRemoteCall,
  formatter: message => ({
    data: formatMessageToStore(message),
    commandType: RECENT_COMMANDS_TYPE,
  }),
});

export const fetchRemoteCommands = () => async dispatch => {
  try {
    dispatch(fetchCommandsStart());
    const { data } = await api.fetchRemoteCalls();
    dispatch(fetchCommandsSuccess({ data }));
  } catch (err) {
    dispatch(fetchCommandsFailed({ error: err.toString() }));
  }
};

export const sendRemoteCommand =
  (userId, message) => async (dispatch, getState) => {
    if (!userId) {
      dispatch(
        GlobalSnackBarActions.show(
          'Please select a user to send a remote call.',
          'error'
        )
      );
      return;
    }
    // NOTE: Context is not needed for this endpoint at the moment. The endpoint will just ignore the context query param now.
    const context = makeContextToUseSelector(getState(), {
      serviceName: Services.DWPushService,
      endpoint: ServiceEndpoints.DWPushService.postRemoteCall,
    });
    try {
      dispatch(sendCommandStart());
      await api.createRemoteCommandCall({
        payload: { user_id: userId, message },
        params: { context },
      });
      dispatch(sendCommandSuccess({ data: message }));
      dispatch(
        GlobalSnackBarActions.show(
          'Remote command sent successfully',
          'success'
        )
      );
    } catch (err) {
      dispatch(sendCommandFailed({ error: err.toString() }));
      dispatch(nonCriticalHTTPError(err));
    }
    dispatch(addRecentCommand(message));
  };

export const searchFavorites = payload => dispatch =>
  dispatch(changeSearchQueryFavorites(payload));

export const searchRecent = payload => dispatch =>
  dispatch(changeSearchQueryRecent(payload));

// Selectors
const favoriteCommandsDataSelector = state =>
  state.Scenes.RemoteCalls[FAVORITE_COMMANDS_TYPE].data;
const favoriteCommandsSearchQuerySelector = state =>
  state.Scenes.RemoteCalls[FAVORITE_COMMANDS_TYPE].q;

export const favoriteCommandsSelector = createSelector(
  favoriteCommandsDataSelector,
  favoriteCommandsSearchQuerySelector,
  (favoriteCommands, searchQuery) =>
    (searchQuery &&
      favoriteCommands &&
      Array.isArray(favoriteCommands) &&
      favoriteCommands.filter(cmd => cmd.message.includes(searchQuery))) ||
    favoriteCommands
);

const recentCommandsDataSelector = state =>
  state.Scenes.RemoteCalls[RECENT_COMMANDS_TYPE].data;
const recentCommandsSearchQuerySelector = state =>
  state.Scenes.RemoteCalls[RECENT_COMMANDS_TYPE].q;

export const recentCommandsSelector = createSelector(
  recentCommandsDataSelector,
  recentCommandsSearchQuerySelector,
  (recentCommands, searchQuery) =>
    (searchQuery &&
      recentCommands &&
      Array.isArray(recentCommands) &&
      recentCommands.filter(cmd =>
        cmd.message.toLowerCase().includes(searchQuery.toLowerCase())
      )) ||
    recentCommands
);

export const sendCommandLoadingSelector = state =>
  state.Scenes.RemoteCalls[SEND_COMMAND_TYPE].loading;

export const favoriteCommandsLoadingSelector = state =>
  state.Scenes.RemoteCalls[FAVORITE_COMMANDS_TYPE].loading;

export const recentCommandsLoadingSelector = state =>
  state.Scenes.RemoteCalls[RECENT_COMMANDS_TYPE].loading;
