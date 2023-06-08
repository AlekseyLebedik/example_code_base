import moment from 'moment-timezone';
import mockState from 'playpants/testUtils/mockState';
import { parseEventData } from 'playpants/helpers/parseEventData';
import { INITIAL_STATE as FETCH_INITIAL_STATE } from '@demonware/devzone-core/helpers/reducers';
import {
  CREATE_FORM_INITIAL_STATE,
  createFormReducer,
  SELECTED_TEMPLATE_INITIAL_STATE,
  selectedTemplateReducer,
  TEMPLATE_SOURCE_INITIAL_STATE,
  templateSourceEventReducer,
} from '../reducer';
import * as AT from '../actionTypes';

moment.tz.setDefault('UTC');

describe('ScheduleComponent reducers', () => {
  const {
    Components: {
      ScheduleComponent: {
        form: {
          defaultStartDate: targetStartDate,
          defaultEndDate: targetEndDate,
        },
        selectedTemplate: targetTemplate,
      },
    },
  } = mockState;
  let state;
  let initialState;
  let action;

  describe('Create event reducer', () => {
    beforeEach(() => {
      initialState = CREATE_FORM_INITIAL_STATE;
      state = createFormReducer(initialState, {});
    });

    it('returns default state', () => {
      state = createFormReducer(initialState, {});
      state.defaultStartDate = targetStartDate;
      state.defaultEndDate = targetEndDate;
      expect(state).toMatchSnapshot();
    });

    it('updates the default start and end dates for Create Event', () => {
      action = {
        type: AT.UPDATE_CREATE_FORM_DEFAULT_DATE,
        defaultStartDate: targetStartDate,
        defaultEndDate: targetEndDate,
        isRange: false,
      };
      state = createFormReducer(initialState, action);
      const { type, ...expected } = action;
      expect(state).toMatchObject(expected);
    });

    it('handles default case', () => {
      action = {
        type: null,
        defaultStartDate: targetStartDate,
        defaultEndDate: targetEndDate,
        isRange: false,
      };
      state = createFormReducer(initialState, action);
      expect(state).toMatchObject(initialState);
    });
  });

  describe('Selected Template reducer', () => {
    beforeEach(() => {
      initialState = SELECTED_TEMPLATE_INITIAL_STATE;
      state = selectedTemplateReducer(initialState, {});
    });

    it('returns default state', () => {
      expect(state).toMatchSnapshot();
    });

    it('handles SET_SELECTED_EVENT_TEMPLATE', () => {
      action = {
        type: AT.SET_SELECTED_EVENT_TEMPLATE,
        selectedTemplate: targetTemplate,
      };
      state = selectedTemplateReducer(initialState, action);
      const { selectedTemplate: expected } = action;
      expect(state).toMatchObject(expected);
    });

    it('handles default case', () => {
      action = {
        type: null,
        selectedTemplate: null,
      };
      state = selectedTemplateReducer(initialState, action);
      expect(state).toMatchSnapshot();
    });
  });

  describe('Template Source reducer', () => {
    beforeEach(() => {
      initialState = TEMPLATE_SOURCE_INITIAL_STATE;
      state = templateSourceEventReducer(initialState, {});
    });

    it('returns default state', () => {
      expect(state).toMatchSnapshot();
    });

    it('handles SET_SELECTED_EVENT_TEMPLATE', () => {
      action = {
        type: AT.SET_SELECTED_EVENT_TEMPLATE,
        selectedTemplate: targetTemplate,
      };
      state = templateSourceEventReducer(initialState, action);
      expect(state).toMatchObject(initialState);
    });

    it('handles EVENT_BY_SOURCE_EVENT_ID_FETCH_SUCCESS', () => {
      const targetSourceTemplate = {
        id: 4,
        title: 'Title 1',
        created_at: 1568227413,
        created_by: { id: 1, name: 'Initial User' },
        publish_at: 1568228400,
        end_at: 1568486592,
        status: 'open',
        activities: [
          {
            id: 3,
            type: 'playlist',
            activity: '{"songs":[]}',
            title_envs: [],
            publish_on: 'on_start',
            exec_order: 0,
            updated_by: { id: 1, name: 'Initial User' },
          },
        ],
        updated_at: 1568235141,
        updated_by: { id: 1, name: 'Initial User' },
        note: 'This is a test event!',
        project: 1,
        env_type: 'Development',
        authorizations: [],
        locked_by: null,
        task: null,
        manual_tags: '["tag"]',
        auto_tags:
          '["development", "title", "crossplay", "1", "pc", "test", "open", "event", "ps4"]',
        platforms: '["CROSSPLAY","PC","PS4"]',
        authorizers: [],
        is_private: false,
        is_deleted: false,
        is_manually_locked: false,
        is_template: true,
        is_restricted: false,
        watchers: [],
      };

      action = {
        type: `${AT.FETCH_EVENT_BY_SOURCE_EVENT_ID}_FETCH_SUCCESS`,
        data: targetSourceTemplate,
      };
      state = templateSourceEventReducer(initialState, action);
      const { type, ...rest } = action;
      const expected = {
        ...FETCH_INITIAL_STATE,
        data: parseEventData(rest.data),
      };
      expect(state).toMatchObject(expected);
    });
  });
});
