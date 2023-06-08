import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export const onSearch = q => ({
  type: AT.IP_CONTROL_SEARCH,
  q,
});

export function fetchIPControl(params, append = false) {
  return {
    type: AT.IP_CONTROL_FETCH,
    params,
    append,
  };
}

export function fetchIPControlSuccess(payload, append) {
  return {
    type: AT.IP_CONTROL_FETCH_SUCCESS,
    payload,
    append,
  };
}

export function fetchIPControlFailed(err, action) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}

export function fetchAllIPControl(params, append = false) {
  return {
    type: AT.IP_CONTROL_FETCH_ALL,
    params,
    append,
  };
}

export function fetchAllIPControlSuccess(payload, append) {
  return {
    type: AT.IP_CONTROL_FETCH_ALL_SUCCESS,
    payload,
    append,
  };
}

export function fetchAllIPControlFailed(err, action) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}

export function fetchIPGroups(params, append) {
  return {
    type: AT.IP_CONTROL_FETCH_GROUPS,
    params,
    append,
  };
}

export function fetchIPGroupsSuccess(payload, append) {
  return {
    type: AT.IP_CONTROL_FETCH_GROUPS_SUCCESS,
    payload,
    append,
  };
}

export function fetchIPGroupsFailed(err, action) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}

export function fetchIPNotes(params, append) {
  return {
    type: AT.IP_CONTROL_FETCH_NOTES,
    params,
    append,
  };
}

export function fetchIPNotesSuccess(payload, append) {
  return {
    type: AT.IP_CONTROL_FETCH_NOTES_SUCCESS,
    payload,
    append,
  };
}

export function fetchIPNotesFailed(err, action) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}

export const addIPNote = values => ({
  type: AT.IP_CONTROL_ADD_NOTE,
  values,
});

export const updateIPNote = values => ({
  type: AT.IP_CONTROL_UPDATE_NOTE,
  values,
});

export const deleteIPNote = values => ({
  type: AT.IP_CONTROL_DELETE_NOTE,
  values,
});

export const addIPNoteSuccess = values => dispatch => {
  dispatch({
    type: AT.IP_CONTROL_ADD_NOTE_SUCCESS,
    payload: values,
  });
  dispatch(GlobalSnackBarActions.show('IP Note added.', 'success'));
};

export const updateIPNoteSuccess = values => dispatch => {
  dispatch({
    type: AT.IP_CONTROL_UPDATE_NOTE_SUCCESS,
    payload: values,
  });
  dispatch(GlobalSnackBarActions.show('IP Note updated.', 'success'));
};

export const deleteIPNoteSuccess = values => dispatch => {
  dispatch({
    type: AT.IP_CONTROL_DELETE_NOTE_SUCCESS,
    payload: values,
  });
  dispatch(GlobalSnackBarActions.show('IP Note deleted.', 'success'));
};

export const addIPNoteFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
  dispatch({
    type: AT.IP_CONTROL_ADD_NOTE_FAILED,
  });
};

export const addIPGroupFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
  dispatch({
    type: AT.IP_CONTROL_ADD_GROUP_FAILED,
  });
};

export const updateIPNoteFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
  dispatch({
    type: AT.IP_CONTROL_UPDATE_NOTE_FAILED,
  });
};

export const deleteIPNoteFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
  dispatch({
    type: AT.IP_CONTROL_DELETE_NOTE_FAILED,
  });
};

export const deleteIPGroupFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
  dispatch({
    type: AT.IP_CONTROL_DELETE_GROUP_FAILED,
  });
};

export const addIPGroup = values => ({
  type: AT.IP_CONTROL_ADD_GROUP,
  values,
});

export const addIPGroupSuccess = values => dispatch => {
  dispatch({
    type: AT.IP_CONTROL_ADD_GROUP_SUCCESS,
    payload: values,
  });
  dispatch(
    GlobalSnackBarActions.show('IP Group added successfully.', 'success')
  );
};

export const deleteIPGroup = values => ({
  type: AT.IP_CONTROL_DELETE_GROUP,
  values,
});

export const deleteIPGroupSuccess = values => dispatch => {
  dispatch({
    type: AT.IP_CONTROL_DELETE_GROUP_SUCCESS,
    payload: values,
  });
  dispatch(
    GlobalSnackBarActions.show('IP Group deleted successfully.', 'success')
  );
};

export const openAddModal = () => ({
  type: AT.IP_CONTROL_ADD_MODAL_OPEN,
});

export const closeAddModal = () => ({
  type: AT.IP_CONTROL_ADD_MODAL_CLOSE,
});

export const addIPControl = values => ({
  type: AT.IP_CONTROL_ADD,
  values,
});

export const addIPControlSuccess = values => dispatch => {
  dispatch({
    type: AT.IP_CONTROL_ADD_SUCCESS,
    payload: values,
  });
  dispatch(
    GlobalSnackBarActions.show('IP/Range added successfully.', 'success')
  );
  dispatch(fetchAllIPControl());
};

export const addIPControlFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
  dispatch({
    type: AT.IP_CONTROL_ADD_FAILED,
  });
};

export const deleteIPControl = (ips, groups, checkedOption) => dispatch => {
  dispatch({
    type: AT.IP_CONTROL_DELETE,
    ips,
    groups,
    checkedOption,
  });
  dispatch(
    GlobalSnackBarActions.show('IP/Ranges deleted successfully.', 'success')
  );
  if (checkedOption) {
    groups.forEach(g => {
      dispatch({
        type: AT.IP_CONTROL_DELETE_GROUP,
        id: g,
        deleteContents: false,
      });
    });
  }
};

export const deleteIPControlSuccess = ips => ({
  type: AT.IP_CONTROL_DELETE_SUCCESS,
  ips,
});

export const deleteIPControlFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
};

export function fetchWhitelistedUsers(params, append = false) {
  return {
    type: AT.WHITELISTED_USERS_FETCH,
    params,
    append,
  };
}

export function fetchWhitelistedUsersSuccess(payload, append) {
  return {
    type: AT.WHITELISTED_USERS_FETCH_SUCCESS,
    payload,
    append,
  };
}

export function fetchWhitelistedUsersFailed(err, action) {
  return dispatch => {
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}
