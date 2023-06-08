import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import * as AT from './actionTypes';

export const fetchChallengeGenerators = () => ({
  type: AT.CHALLENGE_GENERATORS_FETCH,
});

export const fetchChallengeGeneratorsSuccess = payload => ({
  type: AT.CHALLENGE_GENERATORS_FETCH_SUCCESS,
  challengeGenerators: payload.data,
});

export const fetchChallengeGeneratorsFailed = (err, action) => dispatch => {
  dispatch(GlobalProgressActions.done());
  dispatch(CriticalErrorActions.show(err, () => action));
};

export const addChallengeGenerator = (values, resolve, reject) => dispatch => {
  dispatch({
    type: AT.CHALLENGE_GENERATOR_ADD,
    values,
    resolve,
    reject,
  });
  dispatch(ModalHandlers.submit());
};

export const addChallengeGeneratorSuccess = () => dispatch => {
  dispatch(ModalHandlers.close());
  dispatch(
    GlobalSnackBarActions.show(
      'ChallengeGenerator was successfully added.',
      'success'
    )
  );
  dispatch(fetchChallengeGenerators());
};

export const addChallengeGeneratorFailed = err => dispatch => {
  if (err !== undefined) dispatch(nonCriticalHTTPError(err));
  dispatch(ModalHandlers.stopSubmitting());
};

export const updateChallengeGenerator = values => ({
  type: AT.CHALLENGE_GENERATOR_UPDATE,
  values,
});

export const updateChallengeGeneratorSuccess = values => dispatch => {
  const action = values.state === 'DISABLED' ? 'disabled' : 'enabled';
  dispatch(
    GlobalSnackBarActions.show(
      `Challenge Generator was successfully ${action}.`,
      'success'
    )
  );
  dispatch(fetchChallengeGenerators());
};

export const updateChallengeGeneratorFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
};

export const deleteChallengeGenerator = generatorId => ({
  type: AT.CHALLENGE_GENERATOR_DELETE,
  generatorId,
});

export const deleteChallengeGeneratorSuccess = () => dispatch => {
  dispatch(
    GlobalSnackBarActions.show(
      'Challenge Generators deleted properly.',
      'success'
    )
  );
  dispatch(fetchChallengeGenerators());
};

export const deleteChallengeGeneratorFailed = err => dispatch => {
  dispatch(nonCriticalHTTPError(err));
};
