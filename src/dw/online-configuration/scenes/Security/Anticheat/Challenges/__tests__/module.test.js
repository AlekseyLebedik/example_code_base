import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';

jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/ModalHandlers');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

const challenge = {
  weight: 10,
  challengeGroup: 20,
  gameModes: [0],
  challengeCondition: 'none',
  functionId: 16,
  id: '5',
  recipientGroups: [[1, false]],
  recipientGroupsFormatted: 'debug(unenforced)',
  validResponse: '-',
  parameters: '',
  challengeConditionValue: 0,
  safetyLevel: 2,
};

const data = [challenge];
const values = {
  validResponse: '591:630',
  parameters: '51',
  functionId: '2',
  challengeGroup: '1',
};
const editValues = {
  weight: 10,
  challengeGroup: 0,
  gameModes: '0',
  challengeCondition: 'none',
  functionId: 2,
  id: '1',
  recipientGroups: ['1*', '2*', '3'],
  validResponse: '591:630',
  parameters: 'cb47',
  challengeConditionValue: 0,
  safetyLevel: 2,
  recipientGroupsFormatted: 'debug(unenforced), suspect(unenforced), custom_1',
  key: '5d3a0831-2d33-9f09-66d4-58e719689be4',
};
const err = 'error';

describe('Security - Anticheat - Challenges', () => {
  describe('Action Creators', () => {
    const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
    const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
    const MOCKED_GLOBAL_SNACK_BAR = 'MOCKED_GLOBAL_SNACK_BAR_SHOW';
    const MOCKED_MODAL_HANDLERS_CLOSE = 'MOCKED_MODAL_HANDLERS_CLOSE';
    const MOCKED_MODAL_HANDLERS_SUBMIT = 'MOCKED_MODAL_HANDLERS_SUBMIT';
    const MOCKED_MODAL_HANDLERS_STOP_SUBMITTING =
      'MOCKED_MODAL_HANDLERS_STOP_SUBMITTING';

    beforeAll(() => {
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      GlobalSnackBarActions.show.mockReturnValue({
        type: MOCKED_GLOBAL_SNACK_BAR,
      });
      ModalHandlers.close.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_CLOSE,
      });
      ModalHandlers.submit.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_SUBMIT,
      });
      ModalHandlers.stopSubmitting.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_STOP_SUBMITTING,
      });
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('CHALLENGES_FETCH', () => {
      expect(actions.fetchChallenges()).toHaveProperty(
        'type',
        AT.CHALLENGES_FETCH
      );
    });

    it('CHALLENGES_FETCH_SUCCESS', () => {
      const action = actions.fetchChallengesSuccess({ data });

      expect(action).toHaveProperty('type', AT.CHALLENGES_FETCH_SUCCESS);
      expect(action).toHaveProperty('challenges', data);
    });

    it('fetchChallengesFailed', () => {
      const action = actions.fetchChallengesFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_CRITICAL_ERROR });
    });

    it('CHALLENGE_ADD', () => {
      const resolve = jest.fn();
      const reject = jest.fn();
      const action = actions.addChallenge(values, resolve, reject);

      expect(action).toAsyncDispatch({
        type: AT.CHALLENGE_ADD,
        values,
        resolve,
        reject,
      });
      expect(action).toAsyncDispatch({ type: MOCKED_MODAL_HANDLERS_SUBMIT });
    });

    it('addChallengeSuccess', () => {
      const action = actions.addChallengeSuccess();

      expect(action).toAsyncDispatch({ type: MOCKED_MODAL_HANDLERS_CLOSE });
      expect(action).toAsyncDispatch({ type: MOCKED_GLOBAL_SNACK_BAR });
      expect(action).toAsyncDispatch({ type: AT.CHALLENGES_FETCH });
    });

    it('addChallengeFailed', () => {
      const action = actions.addChallengeFailed(err);

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
      expect(action).toAsyncDispatch({
        type: MOCKED_MODAL_HANDLERS_STOP_SUBMITTING,
      });
    });

    it('CHALLENGE_EDIT', () => {
      const resolve = jest.fn();
      const reject = jest.fn();
      const action = actions.editChallenge(editValues, resolve, reject);

      expect(action).toAsyncDispatch({
        type: AT.CHALLENGE_EDIT,
        values: editValues,
        resolve,
        reject,
      });
      expect(action).toAsyncDispatch({ type: MOCKED_MODAL_HANDLERS_SUBMIT });
    });

    it('editChallengeSuccess', () => {
      const action = actions.editChallengeSuccess();

      expect(action).toAsyncDispatch({ type: MOCKED_MODAL_HANDLERS_CLOSE });
      expect(action).toAsyncDispatch({ type: MOCKED_GLOBAL_SNACK_BAR });
      expect(action).toAsyncDispatch({ type: AT.CHALLENGES_FETCH });
    });

    it('editChallengeFailed', () => {
      const action = actions.editChallengeFailed(err);

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
    });

    it('CHALLENGES_SET_CURRENT', () => {
      const action = actions.setCurrentChallenge(challenge);
      expect(action).toHaveProperty('type', AT.CHALLENGES_SET_CURRENT);
      expect(action).toHaveProperty('challenge', challenge);
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle CHALLENGES_FETCH_SUCCESS', () => {
      expect(
        reducer(undefined, actions.fetchChallengesSuccess({ data }))
      ).toMatchSnapshot();
    });

    it('handle CHALLENGES_SET_CURRENT', () => {
      expect(
        reducer(undefined, actions.setCurrentChallenge(challenge))
      ).toMatchSnapshot();
    });
  });
});
