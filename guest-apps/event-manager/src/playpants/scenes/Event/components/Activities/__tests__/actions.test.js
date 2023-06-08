import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('Activity actions', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  beforeEach(() => {
    nonCriticalHTTPError.mockReset();
    nonCriticalHTTPError.mockReturnValue({
      type: MOCKED_NON_CRITICAL_ERROR,
    });
  });

  describe('changeActivities', () => {
    it('changes the activity type', () => {
      expect(actions.changeActivities('MOTD')).toMatchObject({
        type: AT.CHANGE_ACTIVITIES_TYPE,
        activityType: 'MOTD',
      });
    });
  });

  describe('searchActivities', () => {
    it('search activities with a query', () => {
      expect(actions.searchActivities('2')).toMatchObject({
        type: AT.ACTIVITIES_SEARCH,
        query: '2',
      });
    });
  });

  describe('createActivity', () => {
    it('creates a new activity of the chosen activity type', () => {
      expect(actions.createActivity('MOTD')).toMatchObject({
        type: AT.CREATE_ACTIVITY,
        activityType: 'MOTD',
      });
    });
  });

  describe('deleteActivity', () => {
    it('deletes an activity', () => {
      expect(actions.deleteActivity(50)).toMatchObject({
        type: AT.DELETE_ACTIVITY,
        id: 50,
      });
    });
  });

  describe('updateActivity', () => {
    it('updates an activity', () => {
      expect(
        actions.updateActivity(
          {
            id: 15,
            type: 'motd',
            title_envs: [3],
            languages: [],
          },
          3
        )
      ).toMatchObject({
        type: AT.UPDATE_ACTIVITY,
        selectedActivity: {
          id: 15,
          type: 'motd',
          title_envs: [3],
          languages: [],
        },
        eventId: 3,
      });
    });
  });

  describe('createActivitySuccess', () => {
    it('successfully creates a new activity', () => {
      expect(
        actions.createActivitySuccess({
          id: 15,
          type: 'motd',
          activity: '{"type":"motd","languages":[]}',
          title_envs: [],
          languages: [],
        })
      ).toMatchObject({
        type: AT.CREATE_ACTIVITY_SUCCESS,
        activity: {
          id: 15,
          type: 'motd',
          activity: '{"type":"motd","languages":[]}',
          title_envs: [],
          languages: [],
        },
      });
    });
  });

  describe('updateActivitySuccess', () => {
    it('successfully updates a new activity', () => {
      expect(
        actions.updateActivitySuccess({
          id: 15,
          type: 'motd',
          activity: '{"type":"motd","languages":[]}',
          title_envs: [3],
        })
      ).toMatchObject({
        type: AT.UPDATE_ACTIVITY_SUCCESS,
        activity: {
          id: 15,
          type: 'motd',
          activity: '{"type":"motd","languages":[]}',
          title_envs: [3],
        },
      });
    });
  });

  describe('deleteActivitySuccess', () => {
    it('successfully deletes a new activity', () => {
      expect(actions.deleteActivitySuccess('', 15)).toMatchObject({
        type: AT.DELETE_ACTIVITY_SUCCESS,
        data: '',
      });
    });
  });

  describe('createActivityFailed', () => {
    it('fails to create a new activity', () => {
      expect(actions.createActivityFailed('test error')).toMatchObject({
        type: AT.CREATE_ACTIVITY_FAILED,
        error: 'test error',
      });
    });
  });

  describe('deleteActivityFailed', () => {
    it('fails to delete a new activity', () => {
      expect(actions.deleteActivityFailed('test error')).toMatchObject({
        type: AT.DELETE_ACTIVITY_FAILED,
        error: 'test error',
      });
    });
  });

  describe('updateActivityFailed', () => {
    it('fails to update a new activity', () => {
      expect(actions.updateActivityFailed('test error')).toMatchObject({
        type: AT.UPDATE_ACTIVITY_FAILED,
        error: 'test error',
      });
    });
  });

  describe('updateThenRevertActivity', () => {
    it('updates then reverts an activity', () => {
      const callback = () => {};
      expect(
        actions.updateThenRevertActivity(
          {
            id: 15,
            type: 'motd',
            title_envs: [3],
            languages: [],
          },
          callback
        )
      ).toMatchObject({
        type: AT.UPDATE_THEN_REVERT_ACTIVITY,
        selectedActivity: {
          id: 15,
          type: 'motd',
          title_envs: [3],
          languages: [],
        },
        callback,
      });
    });
  });
});
