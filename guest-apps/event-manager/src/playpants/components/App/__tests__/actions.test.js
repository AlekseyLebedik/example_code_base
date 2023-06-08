import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as AT from '../actionTypes';
import * as actions from '../actions';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('App', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
  const mockCurrentProject = {
    id: 1,
    shortType: 'dev',
    title: 1,
    project: 1,
    type: 'Development',
  };

  describe('Actions', () => {
    beforeEach(() => {
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchProjectSettings', () => {
      it('returns FETCH_PROJECT_SETTINGS action', () => {
        expect(actions.fetchProjectSettings(mockCurrentProject)).toMatchObject({
          append: false,
          params: { project: 1 },
          type: `${AT.FETCH_PROJECT_SETTINGS}_FETCH`,
          urlID: null,
        });
      });
    });

    describe('fetchTemplates', () => {
      it('returns FETCH_USERS action', () => {
        expect(actions.fetchTemplates(mockCurrentProject)).toMatchObject({
          append: false,
          params: { project: 1 },
          type: `${AT.FETCH_TEMPLATES}_FETCH`,
          urlID: null,
        });
      });
    });
  });
});
