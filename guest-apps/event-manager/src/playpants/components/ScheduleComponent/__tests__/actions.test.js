import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('Schedule', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('createEvent', () => {
      it('returns CREATE_EVENT action', () => {
        const baseUrl = 'playpants/1/dev/';
        const data = {
          authorizations: [],
          activities: [],
          created_at: 1541029793,
          env_type: 'Development',
          note: undefined,
          project: 1,
          publish_at: 1541029740,
          title: 'tttt',
        };
        const history = { push: jest.fn() };
        const formName = '';
        const onCancel = jest.fn();

        expect(
          actions.createEvent(baseUrl, data, history, formName, onCancel)
        ).toMatchObject({
          type: AT.CREATE_EVENT,
          baseUrl,
          data,
          history,
          formName,
          onCancel,
        });
      });
    });

    describe('createEventFailed', () => {
      it('dispatches NonCriticalError show action', () => {
        const action = actions.createEventFailed(Error());
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('updateCreateFormDefaultDate', () => {
      it('returns UPDATE_CREATE_FORM_DEFAULT_DATE action', () => {
        expect(
          actions.updateCreateFormDefaultDate(1541029740, 1541029740, false)
        ).toMatchObject({
          type: AT.UPDATE_CREATE_FORM_DEFAULT_DATE,
          defaultStartDate: 1541029740,
          defaultEndDate: 1541029740,
          isRange: false,
        });
      });
    });
  });
});
