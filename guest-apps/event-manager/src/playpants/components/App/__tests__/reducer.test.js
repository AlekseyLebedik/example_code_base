import reducer from '../reducer';
import * as AT from '../actionTypes';

describe('App', () => {
  describe('Reducer', () => {
    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('FETCH_PROJECT_SETTINGS_SUCCESS', () => {
      it('sets the project Settings from data', () => {
        const action = {
          type: `${AT.FETCH_PROJECT_SETTINGS}_FETCH_SUCCESS`,
          data: [
            {
              settings: '{}',
              event_settings: '{}',
              activity_settings: '[]',
              color_settings: '[]',
              event_templates: '[]',
              platform_settings: '[]',
              notification_settings: '[]',
              event_type_settings: '[]',
              calendar_presets_settings: '[]',
            },
          ],
          loading: false,
        };
        const state = reducer(undefined, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_EVENT_TEMPLATES', () => {
      it('Starts fetch for event templates', () => {
        const action = {
          type: `${AT.FETCH_EVENT_TEMPLATES}_FETCH`,
          loading: true,
          params: { project: 1 },
        };
        const state = reducer(undefined, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_EVENT_TEMPLATES_SUCCESS', () => {
      it('Success fetch for event templates', () => {
        const action = {
          type: `${AT.FETCH_EVENT_TEMPLATES}_FETCH_SUCCESS`,
          data: [{ id: 1 }],
          loading: false,
        };
        const state = reducer(undefined, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
