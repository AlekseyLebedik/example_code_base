import { createSelector } from 'reselect';

export const loginQueueSelector = state => state.Scenes.LoginQueue;

export const loginQueueTitleStatusSelector = createSelector(
  loginQueueSelector,
  loginQueueState => loginQueueState?.queueStatus?.data
);

export const loginQueueTitleStatusLoadingSelector = createSelector(
  loginQueueSelector,
  loginQueueState => loginQueueState?.queueStatus?.loading
);

export const loginQueueTitleVIPListSelector = createSelector(
  loginQueueSelector,
  loginQueueState => loginQueueState?.queueVIPList?.data
);

export const loginQueueTitleVIPListLoadingSelector = createSelector(
  loginQueueSelector,
  loginQueueState => loginQueueState?.queueVIPList?.loading
);

export const loginQueueSettingsErrorSelector = createSelector(
  loginQueueSelector,
  loginQueueState => loginQueueState?.queueSettingsUpdate?.error
);

export const loginQueueTitleSettingsErrorSelector = createSelector(
  loginQueueSelector,
  loginQueueState => loginQueueState?.titleSettingsUpdate?.error
);

export const loginQueueTitleVIPListUpdatingSelector = createSelector(
  loginQueueSelector,
  loginQueueState => loginQueueState?.queueVIPListUpdate?.updating
);
