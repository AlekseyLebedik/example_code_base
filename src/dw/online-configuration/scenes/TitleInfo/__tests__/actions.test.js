import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { fetchTitleInfo } from '../titleInfoSlice';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('TitleInfo', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchTitleInfo', () => {
      it('returns TITLE_INFO_FETCH action', () => {
        expect(fetchTitleInfo.pending()).toMatchSnapshot({
          type: fetchTitleInfo.pending.type,
        });
      });
    });

    describe('fetchTitleInfoSuccess', () => {
      it('returns TITLE_INFO_FETCH_SUCCESS action', () => {
        expect(fetchTitleInfo.fulfilled()).toMatchSnapshot({
          type: fetchTitleInfo.fulfilled.type,
        });
      });
    });
  });
});
