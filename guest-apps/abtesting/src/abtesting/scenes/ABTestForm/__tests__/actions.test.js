import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as actions from '../actions';
import * as AT from '../actionTypes';

const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

jest.mock('@demonware/devzone-core/helpers/uuid', () => ({
  uuid: () => '5cf3624e-5770-089e-a0e7-ebabadb26b96',
}));

jest.mock('@demonware/devzone-core/helpers/errors', () => ({
  nonCriticalHTTPError: () => ({
    type: MOCKED_NON_CRITICAL_ERROR,
  }),
}));

describe('ABTestForm actions', () => {
  const context = '1:cert';
  const dispatch = jest.fn();

  it('should create an action to fetch Segments', () => {
    const expectedAction = {
      type: AT.FETCH_SEGMENTS,
      context,
    };
    expect(actions.fetchSegments(context)).toEqual(expectedAction);
  });

  it('should create an action to fetch Segments success', () => {
    const segments = [
      {
        segmentID: '5210984693501455903',
        context: '5682',
        name: 'testseg5682',
      },
    ];
    const expectedAction = {
      type: AT.FETCH_SEGMENTS_SUCCESS,
      segments,
      context,
    };
    expect(actions.fetchSegmentsSuccess({ data: segments }, context)).toEqual(
      expectedAction
    );
  });

  it('should create an action to fetch Categories', () => {
    const expectedAction = {
      type: AT.FETCH_CATEGORIES,
      context,
    };
    expect(actions.fetchCategories(context)).toEqual(expectedAction);
  });

  it('should create an action to fetch Categories success', () => {
    const categories = ['Category1', 'Category2', 'Category3'];
    const expectedAction = {
      type: AT.FETCH_CATEGORIES_SUCCESS,
      categories,
    };
    expect(actions.fetchCategoriesSuccess({ data: categories })).toEqual(
      expectedAction
    );
  });

  it('should create an action to fetch Configs', () => {
    const expectedAction = {
      type: AT.FETCH_CONFIGS,
      context,
    };
    expect(actions.fetchConfigs(context)).toEqual(expectedAction);
  });

  it('should create an action to fetch Configs success', () => {
    const configs = [
      {
        updated: '1542027298',
        modifiers: '{"second_campaign_value": 2}',
        name: 'cfg1',
        created: '1542027282',
        serviceID: 't8',
        context: 'game2',
        configID: '15716207803415653925',
        immutable: true,
      },
    ];
    const expectedAction = {
      type: AT.FETCH_CONFIGS_SUCCESS,
      configs,
      context,
    };
    expect(actions.fetchConfigsSuccess({ data: configs }, context)).toEqual(
      expectedAction
    );
  });

  it('should create an action to save Config', () => {
    const [resolve, reject, onAdd] = [jest.fn(), jest.fn(), jest.fn()];
    const values = {
      name: 'testcfg',
      serviceID: 't8',
      modifiers: '{}',
      configID: '16447923600238693316',
    };
    const expectedAction = {
      type: AT.SAVE_CONFIG,
      values,
      context,
      resolve,
      reject,
      onAdd,
    };
    expect(actions.saveConfig(values, context, resolve, reject, onAdd)).toEqual(
      expectedAction
    );
  });

  it('should create an action to create Config success', () => {
    const values = {
      name: 'testcfg',
      serviceID: 'ae',
      modifiers: '{"second_campaign_value": 2}',
      configID: '3511476886449203876',
    };
    const expectedAction = {
      type: AT.ADD_CONFIG_SUCCESS,
      context,
      values,
    };
    expect(actions.saveConfigSuccess(context, values)).toEqual(expectedAction);
  });

  it('should create an action to fetch fetchCohortUsers', () => {
    const testID = '276037080902024229';
    const cohortID = '7212643006045657787';
    const expectedAction = {
      type: AT.FETCH_COHORT_USERS,
      context,
      testID,
      cohortID,
    };
    expect(actions.fetchCohortUsers(context, testID, cohortID)).toEqual(
      expectedAction
    );
  });

  it('should create an action to fetch fetchCohortUsersSuccess success', () => {
    const cohortID = '7212643006045657787';
    const users = [
      { dwid: '12334567', context: 'game2', accountType: 'psn' },
      { dwid: '2317174234108935', context: 'game2', accountType: 'steam' },
    ];
    const expectedAction = {
      type: AT.FETCH_COHORT_USERS_SUCCESS,
      users,
      cohortID,
    };
    expect(actions.fetchCohortUsersSuccess({ data: users }, cohortID)).toEqual(
      expectedAction
    );
  });

  it('should create an action to update Config success', () => {
    const values = {
      updated: '1542123131',
      modifiers: '{"second_campaign_value": 2}',
      name: 'testcfg',
      created: '1542123131',
      serviceID: 'ae',
      context: 'game1',
      configID: '3511476886449203876',
      immutable: false,
    };
    const expectedAction = {
      type: AT.UPDATE_CONFIG_SUCCESS,
      context,
      values,
    };
    expect(actions.saveConfigSuccess(context, values, true)).toEqual(
      expectedAction
    );
  });

  it('should create an action to save Test', () => {
    const [resolve, reject] = [jest.fn(), jest.fn()];
    const data = {
      context: '1:cert',
      name: 'test6',
      purpose: null,
      cohorts: [],
    };
    const history = {
      location: { pathname: '/abtesting/edit/1/cert/276037080902024229' },
    };
    const testID = '276037080902024229';
    const expectedAction = {
      type: AT.SAVE_TEST,
      data,
      history,
      resolve,
      reject,
      testID,
    };
    expect(actions.saveTest(data, history, resolve, reject, testID)).toEqual(
      expectedAction
    );
  });

  it('should create an action to save Test success', () => {
    const historyPush = jest.fn();
    const history = {
      location: { pathname: '/abtesting/edit/1/cert/276037080902024229' },
      push: historyPush,
    };
    actions.saveTestSuccess(history)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      GlobalSnackBarActions.show('Test saved successfully.', 'success')
    );
    expect(historyPush).toHaveBeenCalledWith('/abtesting/schedule');
  });

  it('should create an action to delete Segments', () => {
    const segmentIDs = ['16857722777061166652'];
    const expectedAction = {
      type: AT.DELETE_SEGMENTS,
      context,
      segmentIDs,
    };
    expect(actions.deleteSegments(context, segmentIDs)).toEqual(expectedAction);
  });

  it('should create an action to delete Segments success', () => {
    const segmentIDs = ['16857722777061166652'];
    const expectedAction = {
      type: AT.DELETE_SEGMENTS_SUCCESS,
      context,
      segmentIDs,
    };
    expect(actions.deleteSegmentsSuccess(context, segmentIDs)).toEqual(
      expectedAction
    );
  });

  describe('Failed actions', () => {
    const err = { response: { data: { error: { msg: 'error' } } } };

    it('should create an action to fetch Context failed', () => {
      actions.fetchContextFailed(err)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(
        GlobalSnackBarActions.show('error', 'error')
      );
    });

    it('should create an action to fetch Segments failed', () => {
      const action = actions.fetchSegmentsFailed(err, context);
      expect(action).toAsyncDispatch({
        type: AT.FETCH_SEGMENTS_FAILED,
        context,
      });
      expect(action).toAsyncDispatch(
        GlobalSnackBarActions.show('error', 'error')
      );
    });

    it('should create an action to fetch Categories failed', () => {
      const action = actions.fetchCategoriesFailed(err);
      expect(action).toAsyncDispatch({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('should create an action to fetch Configs failed', () => {
      const action = actions.fetchConfigsFailed(err, context);
      expect(action).toAsyncDispatch({
        type: AT.FETCH_CONFIGS_FAILED,
        context,
      });
      expect(action).toAsyncDispatch(
        GlobalSnackBarActions.show('error', 'error')
      );
    });

    it('should create an action to fetch fetchCohortUsersFailed failed', () => {
      const cohortID = '7212643006045657787';
      const action = actions.fetchCohortUsersFailed(err, cohortID);
      expect(action).toAsyncDispatch({
        type: AT.FETCH_COHORT_USERS_FAILED,
        cohortID,
      });
      expect(action).toAsyncDispatch(
        GlobalSnackBarActions.show('error', 'error')
      );
    });

    it('should create an action to save Config failed', () => {
      const action = actions.saveConfigFailed(err);
      expect(action).toAsyncDispatch({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('should create an action to save Test failed', () => {
      actions.saveTestFailed(err)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(
        GlobalSnackBarActions.show('error', 'error')
      );
    });

    it('should create an action to delete Segment failed', () => {
      actions.deleteSegmentsFailed(err)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(
        GlobalSnackBarActions.show('error', 'error')
      );
    });
  });
});
