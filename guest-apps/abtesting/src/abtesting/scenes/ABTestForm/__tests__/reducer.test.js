import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('ABTestForm reducer', () => {
  const context = '1:dev';
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle FETCH_CATEGORIES_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: AT.FETCH_CATEGORIES_SUCCESS,
        categories: ['Category1', 'Category2', 'Other'],
      })
    ).toMatchSnapshot();
  });

  it('should handle FETCH_SEGMENTS', () => {
    expect(
      reducer(undefined, { type: AT.FETCH_SEGMENTS, context })
    ).toMatchSnapshot();
  });

  it('should handle FETCH_SEGMENTS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: AT.FETCH_SEGMENTS_SUCCESS,
        segments: [
          {
            segmentID: '5210984693501455903',
            context: '5682',
            name: 'testseg5682',
          },
        ],
        context,
      })
    ).toMatchSnapshot();
  });

  it('should handle FETCH_SEGMENTS_FAILED', () => {
    expect(
      reducer(undefined, { type: AT.FETCH_SEGMENTS_FAILED, context })
    ).toMatchSnapshot();
  });

  it('should handle DELETE_SEGMENTS_SUCCESS', () => {
    const state = {
      segments: {
        '1:dev': [
          {
            name: 'cert-sgm',
            segmentID: '3005367293471685760',
          },
          {
            name: 'cert-sgm1',
            segmentID: '6829511270709825939',
          },
        ],
      },
    };
    expect(
      reducer(state, {
        type: AT.DELETE_SEGMENTS_SUCCESS,
        context,
        segmentIDs: ['6829511270709825939'],
      })
    ).toMatchSnapshot();
  });

  it('should handle FETCH_CONFIGS', () => {
    expect(
      reducer(undefined, { type: AT.FETCH_CONFIGS, context })
    ).toMatchSnapshot();
  });

  it('should handle FETCH_CONFIGS_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: AT.FETCH_CONFIGS_SUCCESS,
        configs: [
          {
            updated: '1542123287',
            modifiers: '{"second_campaign_value": 2}',
            name: 'testcfg1',
            created: '1542123131',
            serviceID: 'ae',
            context: 'game1',
            configID: '3511476886449203876',
            immutable: false,
          },
        ],
        context,
      })
    ).toMatchSnapshot();
  });

  it('should handle FETCH_CONFIGS_FAILED', () => {
    expect(
      reducer(undefined, { type: AT.FETCH_CONFIGS_FAILED, context })
    ).toMatchSnapshot();
  });

  it('should handle fetchCohortUsers', () => {
    expect(
      reducer(undefined, {
        type: AT.FETCH_COHORT_USERS,
        cohortID: '7212643006045657787',
      })
    ).toMatchSnapshot();
  });

  it('should handle fetchCohortUsersSuccess', () => {
    expect(
      reducer(undefined, {
        type: AT.FETCH_COHORT_USERS_SUCCESS,
        users: [
          { dwid: '12334567', context: 'game2', accountType: 'psn' },
          { dwid: '2317174234108935', context: 'game2', accountType: 'steam' },
        ],
        cohortID: '7212643006045657787',
      })
    ).toMatchSnapshot();
  });

  it('should handle fetchCohortUsersFailed', () => {
    expect(
      reducer(undefined, {
        type: AT.FETCH_COHORT_USERS_FAILED,
        cohortID: '7212643006045657787',
      })
    ).toMatchSnapshot();
  });

  it('should handle ADD_CONFIG_SUCCESS', () => {
    Date.now = jest.fn();
    const values = {
      name: 'testcfg2',
      serviceID: 'ae',
      created: Date.now() / 1000,
      updated: Date.now() / 1000,
      modifiers: '{"second_campaign_value": 2}',
      configID: '3511476886449203876',
    };
    const state = reducer(undefined, {
      type: AT.FETCH_CONFIGS_SUCCESS,
      configs: [{ name: 'testcfg1', configID: '3511476886449203568' }],
      context,
    });
    expect(
      reducer(state, {
        type: AT.ADD_CONFIG_SUCCESS,
        context,
        values,
      })
    ).toMatchSnapshot();
  });

  it('should handle UPDATE_CONFIG_SUCCESS', () => {
    const values = {
      name: 'testcfg2Updated',
      serviceID: 'ae',
      modifiers: '{"second_campaign_value": 3}',
      configID: '3511476886449203876',
    };
    const state = reducer(undefined, {
      type: AT.FETCH_CONFIGS_SUCCESS,
      configs: [
        { name: 'testcfg1', configID: '3511476886449203568' },
        {
          name: 'testcfg2',
          serviceID: 'ae',
          modifiers: '{"second_campaign_value": 2}',
          configID: '3511476886449203876',
        },
      ],
      context,
    });
    expect(
      reducer(state, {
        type: AT.UPDATE_CONFIG_SUCCESS,
        context,
        values,
      })
    ).toMatchSnapshot();
  });
});
