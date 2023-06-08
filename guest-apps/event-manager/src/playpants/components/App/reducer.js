import isEmpty from 'lodash/isEmpty';
import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import {
  createFetchReducer,
  INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';
import { UPDATE_PROJECT_SETTING_SUCCEED } from 'playpants/scenes/ProjectSettings/actionTypes';

import { DEFAULT_PROJECT_SETTINGS } from 'playpants/constants/projectSettings';
import { CHANGE_PROJECT } from './components/ProjectSelector/actionTypes';
import projectSelectorReducer from './components/ProjectSelector/reducer';

import * as AT from './actionTypes';
import { parseProjectSettings, parseProjectSettingsHelper } from './helpers';

const templatesReducer = createFetchReducer(AT.FETCH_TEMPLATES);
const projectSettingsReducer = createFetchReducer(AT.FETCH_PROJECT_SETTINGS);
const storiesReducer = createFetchReducer(AT.FETCH_STORIES);
const schedulesReducer = createFetchReducer(AT.FETCH_SCHEDULES);

const PROJECT_SETTINGS_INITIAL_STATE = {
  ...INITIAL_STATE,
  data: [DEFAULT_PROJECT_SETTINGS],
};

const AppReducer = (state = PROJECT_SETTINGS_INITIAL_STATE, action) => {
  switch (action.type) {
    case `${AT.FETCH_PROJECT_SETTINGS}_FETCH`:
    case `${AT.FETCH_PROJECT_SETTINGS}_FETCH_SUCCESS`:
    case `${AT.FETCH_PROJECT_SETTINGS}_FETCH_FAILED`:
      return {
        ...state,
        ...projectSettingsReducer(state, action),
        data: !isEmpty(action.data)
          ? parseProjectSettings(action.data)
          : PROJECT_SETTINGS_INITIAL_STATE.data,
      };
    case UPDATE_PROJECT_SETTING_SUCCEED: {
      const { data } = action.settings;
      return {
        ...state,
        data: state.data.map(setting =>
          setting.id === data.id ? parseProjectSettingsHelper(data) : setting
        ),
      };
    }
    case CHANGE_PROJECT:
      return {
        ...PROJECT_SETTINGS_INITIAL_STATE,
      };
    default:
      return {
        ...state,
      };
  }
};

const updateSchedulesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.UPDATE_SCHEDULES:
      return {
        ...state,
        data: [...state.data, action.schedule],
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  currentProject: projectSelectorReducer,
  templates: templatesReducer,
  stories: storiesReducer,
  schedules: reduceReducers(schedulesReducer, updateSchedulesReducer),
  projectSettings: AppReducer,
});

export default reducer;
