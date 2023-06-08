import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';
import { challengeGeneratorsSelector } from '../selectors';

jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/ModalHandlers');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

const generatorId = 1;
const genearator = {
  lastRun: 1531727704,
  generatorId,
  nextRun: 1531742400,
  state: 'DISABLED',
  config: {
    type: 'checksum_blob',
    challenge_group: '1',
    cron: '0 */6 * * *',
    function_id: '200',
    data: {
      min_offset: '0',
      max_offset: '1024',
    },
  },
  history: [],
};
const data = [genearator];
const values = {
  config:
    '{"cron": "0 */6 * * *", "function_id": 200, "challenge_group": 1, "user_group": 0, "data": {"min_offset": 0, "max_offset": 1024}}',
  generatorId: '2',
};
const err = 'error';
const editValues = {
  generatorId,
  state: 'IDLE',
};

describe('Security - Anticheat - ChallengeGenerators', () => {
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

    it('CHALLENGE_GENERATORS_FETCH', () => {
      expect(actions.fetchChallengeGenerators()).toHaveProperty(
        'type',
        AT.CHALLENGE_GENERATORS_FETCH
      );
    });

    it('CHALLENGE_GENERATORS_FETCH_SUCCESS', () => {
      const action = actions.fetchChallengeGeneratorsSuccess({ data });

      expect(action).toHaveProperty(
        'type',
        AT.CHALLENGE_GENERATORS_FETCH_SUCCESS
      );
      expect(action).toHaveProperty('challengeGenerators', data);
    });

    it('fetchChallengeGeneratorsFailed', () => {
      const action = actions.fetchChallengeGeneratorsFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_CRITICAL_ERROR });
    });

    it('CHALLENGE_GENERATOR_ADD', () => {
      const resolve = jest.fn();
      const reject = jest.fn();
      const action = actions.addChallengeGenerator(values, resolve, reject);

      expect(action).toAsyncDispatch(
        { type: AT.CHALLENGE_GENERATOR_ADD, values, resolve, reject },
        { type: MOCKED_MODAL_HANDLERS_SUBMIT }
      );
    });

    it('addChallengeGeneratorSuccess', () => {
      const action = actions.addChallengeGeneratorSuccess();

      expect(action).toAsyncDispatch(
        { type: MOCKED_MODAL_HANDLERS_CLOSE },
        { type: MOCKED_GLOBAL_SNACK_BAR },
        { type: AT.CHALLENGE_GENERATORS_FETCH }
      );
    });

    it('addChallengeGeneratorFailed', () => {
      const action = actions.addChallengeGeneratorFailed(err);

      expect(action).toAsyncDispatch(
        { type: MOCKED_NON_CRITICAL_ERROR },
        { type: MOCKED_MODAL_HANDLERS_STOP_SUBMITTING }
      );
    });

    it('CHALLENGE_GENERATOR_UPDATE', () => {
      const action = actions.updateChallengeGenerator(editValues);

      expect(action).toHaveProperty('type', AT.CHALLENGE_GENERATOR_UPDATE);
      expect(action).toHaveProperty('values', editValues);
    });

    it('updateChallengeGeneratorSuccess', () => {
      const action = actions.updateChallengeGeneratorSuccess(editValues);

      expect(action).toAsyncDispatch(
        { type: MOCKED_GLOBAL_SNACK_BAR },
        { type: AT.CHALLENGE_GENERATORS_FETCH }
      );
    });

    it('updateChallengeGeneratorFailed', () => {
      const action = actions.updateChallengeGeneratorFailed(err);

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
    });

    it('CHALLENGE_GENERATOR_DELETE', () => {
      const action = actions.deleteChallengeGenerator(generatorId);

      expect(action).toHaveProperty('type', AT.CHALLENGE_GENERATOR_DELETE);
      expect(action).toHaveProperty('generatorId', generatorId);
    });

    it('deleteChallengeGeneratorSuccess', () => {
      const action = actions.deleteChallengeGeneratorSuccess();

      expect(action).toAsyncDispatch(
        { type: MOCKED_GLOBAL_SNACK_BAR },
        { type: AT.CHALLENGE_GENERATORS_FETCH }
      );
    });

    it('deleteChallengeGeneratorFailed', () => {
      const action = actions.deleteChallengeGeneratorFailed(err);

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle CHALLENGE_GENERATORS_FETCH_SUCCESS', () => {
      expect(
        reducer(undefined, actions.fetchChallengeGeneratorsSuccess({ data }))
      ).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    it('validate challengeGeneratorsSelector', () => {
      const state = {
        user: { profile: { timezone: 'America/Vancouver' } },
        Scenes: {
          Security: {
            Anticheat: {
              ChallengeGenerators: { challengeGenerators: data },
            },
          },
        },
      };
      const expected = [
        {
          lastRun: 'Jul 16, 2018 12:55 am PDT',
          generatorId: 1,
          nextRun: 'Jul 16, 2018 05:00 am PDT',
          state: 'DISABLED',
          config:
            '{\n "type": "checksum_blob",\n "challenge_group": "1",\n "cron": "0 */6 * * *",\n "function_id": "200",\n "data": {\n  "min_offset": "0",\n  "max_offset": "1024"\n }\n}',
          history: '[]',
        },
      ];

      expect(challengeGeneratorsSelector(state)).toEqual(expected);
    });
  });
});
