import reducer, { fetchTitleInfoData } from '../titleInfoSlice';

describe('TitleInfo', () => {
  describe('Reducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      titleInfo: {
        cluster: { id: 313, name: 'ww2_psn_prod_las…prod_las' },
        mmp: { wsVersion: '2.136', mmpVersion: '18.51.3' },
      },
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('TITLE_INFO_FETCH_SUCCESS', () => {
      it('combines new title information with current one', () => {
        const action = {
          type: fetchTitleInfoData.fulfilled.type,
          titleInfo: {
            env: { id: 2417, type: 'Live' },
          },
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });

      it('replaces only new title information', () => {
        const action = {
          type: fetchTitleInfoData.fulfilled.type,
          titleInfo: {
            cluster: { id: 310, name: 'ww2_psn_dev_las…prod_las' },
          },
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
