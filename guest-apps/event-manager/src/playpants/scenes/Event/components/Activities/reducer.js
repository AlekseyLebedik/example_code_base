import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';

import AchievementsReducer from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/AchievementDetails/reducer';
import FileStorageReducer from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/FileStorage/reducer';
import PublisherObjectsReducer from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/PublisherObjectsDetails/reducer';
import PubVarsReducer from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/PubVarsDetails/reducer';
import PyScriptsReducer from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/PyScriptDetails/reducer';
import ThunderpantsReducer from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/ThunderpantsDetails/reducer';

import * as AT from './actionTypes';

const contextFetchReducer = createFetchReducer(AT.CONTEXTS_FETCH);
const titleEnvFetchReducer = createFetchReducer(AT.TITLE_ENV_FETCH);

export const INITIAL_STATE = {
  searchAvailable: true,
  selectedActivityType: 'all',
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CHANGE_ACTIVITIES_TYPE: {
      return {
        ...state,
        selectedActivityType: action.activityType,
      };
    }
    case AT.ACTIVITIES_SEARCH: {
      return {
        ...state,
        query: action.query,
      };
    }
    default: {
      return {
        ...state,
        contexts: contextFetchReducer(state.contexts, action),
        envSettings: titleEnvFetchReducer(state.envSettings, action),
        achievements: AchievementsReducer(state.achievements, action),
        filestorage: FileStorageReducer(state.filestorage, action),
        pubvars: PubVarsReducer(state.pubvars, action),
        publisherObjects: PublisherObjectsReducer(
          state.publisherObjects,
          action
        ),
        pyscripts: PyScriptsReducer(state.pyscripts, action),
        thunderpants: ThunderpantsReducer(state.thunderpants, action),
      };
    }
  }
};
