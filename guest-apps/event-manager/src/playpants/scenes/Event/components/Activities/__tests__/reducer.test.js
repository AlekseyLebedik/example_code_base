import mockState from 'playpants/testUtils/mockState';
import { reducer } from '../reducer';
import * as AT from '../actionTypes';

const { activity } = mockState.Scenes.Event;

describe('Activity Reducer', () => {
  const defaultState = {
    searchAvailable: true,
    selectedActivity: undefined,
    selectedActivityType: 'all',
    selectedActivityPublishType: 'on_start',
    variableSets: [],
    files: {},
    uploadProgress: {},
  };

  it('returns default state', () => {
    const state = reducer(defaultState, {});
    expect(state).toMatchSnapshot();
  });

  describe('CHANGE_ACTIVITIES_TYPE', () => {
    it('changes the activity type', () => {
      const action = {
        type: AT.CHANGE_ACTIVITIES_TYPE,
        activityType: 'Publisher Variables',
      };

      const state = reducer(defaultState, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('ACTIVITIES_SEARCH', () => {
    it('searches through the activities according to a query', () => {
      const action = {
        type: AT.ACTIVITIES_SEARCH,
        query: '1',
      };

      const state = reducer(defaultState, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('ACTIVITY_LIST_ITEM_ONCLICK', () => {
    it('selects an activity that is clicked', () => {
      const action = {
        type: AT.ACTIVITY_LIST_ITEM_ONCLICK,
        activity: 11,
      };
      const state = reducer(activity, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('CREATE_ACTIVITY_SUCCESS', () => {
    it('activity is created successfully', () => {
      const action = {
        type: AT.CREATE_ACTIVITY_SUCCESS,
        activity: {
          activity: "{'type':'motd','languages':[]}",
          id: 100,
          languages: [],
          title_envs: [],
          type: 'motd',
        },
      };
      const state = reducer(defaultState, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('CREATE_ACTIVITY_FAIL', () => {
    it('fails to create an activity', () => {
      const action = {
        type: AT.CREATE_ACTIVITY_FAIL,
        error: {
          response: {
            data: 'locked',
            status: 423,
          },
        },
      };
      const state = reducer(defaultState, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('DELETE_ACTIVITY_SUCCESS', () => {
    it('an activity is successfully deleted', () => {
      const action = {
        type: AT.DELETE_ACTIVITY_SUCCESS,
        data: '',
        id: 11,
      };
      const state = reducer(activity, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('DELETE_ACTIVITY_FAIL', () => {
    it('fails to delete activity successfully', () => {
      const action = {
        type: AT.DELETE_ACTIVITY_FAIL,
        error: {
          response: {
            data: 'locked',
            status: 423,
          },
        },
      };
      const state = reducer(defaultState, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('UPDATE_ACTIVITY_SUCCESS', () => {
    it('an activity is successfully updated', () => {
      const updatedActivity = {
        activity: '{"type":"motd","languages":[]}',
        id: 11,
        title_envs: [3],
        type: 'motd',
      };
      const action = {
        type: AT.UPDATE_ACTIVITY_SUCCESS,
        activity: updatedActivity,
      };
      const state = reducer(activity, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('UPDATE_ACTIVITY_FAIL', () => {
    it('fails to update activity successfully', () => {
      const action = {
        type: AT.UPDATE_ACTIVITY_FAIL,
        error: {
          response: {
            data: 'locked',
            status: 423,
          },
        },
      };
      const state = reducer(defaultState, action);
      expect(state).toMatchSnapshot();
    });
  });
});
