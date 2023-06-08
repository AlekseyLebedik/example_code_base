import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('App', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchPyScriptSchemas', () => {
      it('returns FETCH_PYSCRIPT_SCHEMAS action', () => {
        expect(actions.fetchPyScriptSchemas(1)).toMatchObject({
          append: false,
          params: undefined,
          type: 'playpants/ACTIVITIES.PYSCRIPT.SCHEMAS_FETCH',
          urlID: 1,
        });
      });
    });
  });
});
