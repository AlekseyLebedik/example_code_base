import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import * as AT from './actionTypes';

export const fetchChallenges = params => ({
  type: AT.CHALLENGES_FETCH,
  params,
});

export const fetchChallengesSuccess = payload => ({
  type: AT.CHALLENGES_FETCH_SUCCESS,
  challenges: payload.data,
});

export const fetchChallengesFailed = (err, action) => dispatch => {
  dispatch({
    type: AT.CHALLENGES_FETCH_FAILED,
  });
  dispatch(CriticalErrorActions.show(err, () => action));
};

export const addChallenge = (values, resolve, reject) => dispatch => {
  dispatch({
    type: AT.CHALLENGE_ADD,
    values,
    resolve,
    reject,
  });
  dispatch(ModalHandlers.submit());
};

export const addChallengeSuccess = () => dispatch => {
  dispatch(ModalHandlers.close());
  dispatch(
    GlobalSnackBarActions.show('Challenge was successfully added.', 'success')
  );
  dispatch(fetchChallenges());
};

export const addChallengeFailed = err => dispatch => {
  if (err !== undefined) dispatch(nonCriticalHTTPError(err));
  dispatch(ModalHandlers.stopSubmitting());
};

export const editChallenge = (values, resolve, reject) => dispatch => {
  dispatch({
    type: AT.CHALLENGE_EDIT,
    values,
    resolve,
    reject,
  });
  dispatch(ModalHandlers.submit());
};

export const editChallengeSuccess = () => dispatch => {
  dispatch(ModalHandlers.close());
  dispatch(
    GlobalSnackBarActions.show('Challenge was successfully saved.', 'success')
  );
  dispatch(fetchChallenges());
};

export const editChallengeFailed = err => dispatch => {
  if (err !== undefined) dispatch(nonCriticalHTTPError(err));
  dispatch(ModalHandlers.stopSubmitting());
};

export const setCurrentChallenge = challenge => ({
  type: AT.CHALLENGES_SET_CURRENT,
  challenge,
});
