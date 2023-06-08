import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as AT from './actionTypes';

export function fetchRevisions() {
  return {
    type: AT.REVISION_HISTORY_FETCH,
  };
}

export function fetchRevisionsSuccess(payload) {
  return {
    type: AT.REVISION_HISTORY_FETCH_SUCCESS,
    revisions: payload.data,
  };
}

export function fetchRevisionsFailed(err, action) {
  return dispatch => {
    dispatch(GlobalProgressActions.done());
    dispatch(CriticalErrorActions.show(err, () => action));
  };
}

export function revertRevision(revisionId) {
  return {
    type: AT.REVISION_HISTORY_REVERT,
    revisionId,
  };
}

export function revertRevisionSuccess(revisionId) {
  return dispatch => {
    dispatch({
      type: AT.REVISION_HISTORY_REVERT_SUCCESS,
      revisionId,
    });
    dispatch(
      GlobalSnackBarActions.show('Change reverted successfully.', 'success')
    );
  };
}

export function revertRevisionFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}
