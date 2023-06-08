import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { setSelectedRowKeys } from 'dw/core/components/TableHydrated';

import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';

import * as AT from './actionTypes';

const { AE: endpoints } = ServiceEndpoints;

const getContext = (getState, endpoint, userId) =>
  makeContextToUseSelector(getState(), {
    serviceName: Services.AE,
    endpoint,
    userId,
  });

export const fetchUserAchievements =
  (playerId, nextPageToken = undefined, append = false, params = {}) =>
  (dispatch, getState) => {
    const { isClan } = params;
    const context = isClan
      ? getContext(getState, endpoints.getClanAchievements)
      : getContext(getState, endpoints.getUserAchievements, playerId);
    if (!isClan && context === undefined) return;
    dispatch({
      type: AT.USER_ACHIEVEMENTS_FETCH,
      params: !playerId
        ? {}
        : { ...params, player_id: playerId, nextPageToken, context },
      append,
    });
  };

export function fetchUserAchievementsSuccess(payload, append) {
  return {
    type: AT.USER_ACHIEVEMENTS_FETCH_SUCCESS,
    userAchievements: payload.userAchievements,
    nextPageToken: payload.nextPageToken,
    append,
  };
}

export function fetchUserAchievementsFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export const deleteUserAchievements =
  (playerId, values, params = {}) =>
  (dispatch, getState) => {
    const { isClan } = params;
    const context = isClan
      ? getContext(getState, endpoints.deleteClanAchievements)
      : getContext(getState, endpoints.deleteUserAchievements);
    return dispatch({
      type: AT.USER_ACHIEVEMENTS_DELETE,
      playerId,
      values,
      params: { ...params, context, isClan },
    });
  };

export function deleteUserAchievementsSuccess(playerId, total) {
  return dispatch => {
    dispatch({ type: AT.USER_ACHIEVEMENTS_DELETE_SUCCESS });
    dispatch(
      GlobalSnackBarActions.show(
        total > 0
          ? `${total} achievement${
              total > 1 ? 's were' : ' was'
            } deleted successfully.`
          : `User state and achievements deleted successfully.`,
        'success'
      )
    );
    dispatch(fetchUserAchievements(playerId));
    dispatch(setSelectedRowKeys([]));
  };
}

export function deleteUserAchievementsFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
