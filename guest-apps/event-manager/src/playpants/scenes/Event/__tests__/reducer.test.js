import mockState from 'playpants/testUtils/mockState';
import reducer from '../reducer';
import * as AT from '../actionTypes';

const { discussion } = mockState.Scenes.Event;

const testEvent = {
  id: 5,
  title: 'asll',
  created_at: 1566330583,
  created_by: { id: 1, name: 'Initial User' },
  publish_at: 1566590400,
  end_at: null,
  status: 'open',
  activities: [
    {
      id: 11,
      type: 'pubvars',
      activity: '{"variable_sets":[]}',
      title_envs: [1],
      publish_on: 'on_start',
      exec_order: 0,
      updated_by: { id: 1, name: 'Initial User' },
    },
  ],
  updated_at: 1566335105,
  updated_by: { id: 1, name: 'Initial User' },
  note: '',
  project: 1,
  env_type: 'Development',
  authorizations: [],
  locked_by: null,
  task: null,
  manual_tags: '[]',
  auto_tags: '[]',
  platforms: '["CROSSPLAY","PC"]',
  authorizers: [
    { id: 1, name: 'Initial User' },
    { id: 11, name: 'Admin' },
  ],
};

describe('Event Reducer', () => {
  it('returns default state', () => {
    const state = reducer(undefined, {});
    expect(state).toMatchSnapshot();
  });

  describe('EVENT_FETCH', () => {
    it('fetches an event successfully', () => {
      const action = {
        type: `${AT.EVENT_FETCH}_FETCH_SUCCESS`,
        data: testEvent,
      };

      const state = reducer(undefined, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('UPDATE_EVENT', () => {
    it('attempts to edit an event', () => {
      const action = {
        type: `${AT.UPDATE_EVENT}_UPDATE`,
        data: {},
      };

      const state = reducer(undefined, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('UPDATE_EVENT_SUCCEED', () => {
    it('returned the relevant data for a successful edit of the event', () => {
      const action = {
        type: `${AT.UPDATE_EVENT}_UPDATE_SUCCESS`,
        data: testEvent,
      };

      const state = reducer(undefined, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('DISCUSSION_FETCH_SUCCEED', () => {
    it('changes the activity type', () => {
      const action = {
        type: `${AT.DISCUSSION_FETCH}_FETCH_SUCCESS`,
        discussion,
      };

      const state = reducer(undefined, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('CLEAR_CHANGE_STATUS', () => {
    it('clears change status for activity and event', () => {
      const action = {
        type: AT.CLEAR_CHANGE_STATUS,
      };
      const state = reducer(undefined, action);
      expect(state).toMatchSnapshot();
    });
  });
});
