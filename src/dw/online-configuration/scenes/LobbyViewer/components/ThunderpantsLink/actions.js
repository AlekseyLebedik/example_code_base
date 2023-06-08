import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as AT from './actionTypes';

export function fetchThunderpantsLink(serverID) {
  return {
    type: AT.LOBBIES_FETCH_THUNDERPANTS_LINK,
    serverID,
  };
}

export function fetchThunderpantsLinkSuccess(data, serverID) {
  return dispatch => {
    dispatch(GlobalSnackBarActions.show('Fetched link!', 'success'));
    dispatch({
      type: AT.LOBBIES_FETCH_THUNDERPANTS_LINK_SUCCESS,
      link: data.thunderpants_url,
      serverID,
    });
  };
}

export function fetchThunderpantsLinkFailed(err) {
  return GlobalSnackBarActions.show(err.response.data.error.msg, 'error');
}
