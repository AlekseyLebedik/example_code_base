import * as AT from './actionTypes';

const INITIAL_STATE = {
  cohortUsers: {},
  configs: {},
  segments: {},
  contexts: {},
  saving: false,
  cohorts: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.FETCH_SEGMENTS:
      return {
        ...state,
        segments: { ...state.segments, [action.context]: null },
      };
    case AT.FETCH_SEGMENTS_SUCCESS:
      return {
        ...state,
        segments: { ...state.segments, [action.context]: action.segments },
      };
    case AT.FETCH_SEGMENTS_FAILED:
      return {
        ...state,
        segments: { ...state.segments, [action.context]: [] },
      };
    case AT.DELETE_SEGMENTS_SUCCESS:
      return {
        ...state,
        segments: {
          ...state.segments,
          [action.context]: state.segments[action.context].filter(
            item => !action.segmentIDs.includes(item.segmentID)
          ),
        },
      };
    case AT.FETCH_COHORT_USERS:
      return {
        ...state,
        cohortUsers: { ...state.cohortUsers, [action.cohortID]: null },
      };
    case AT.FETCH_COHORT_USERS_SUCCESS:
      return {
        ...state,
        cohortUsers: { ...state.cohortUsers, [action.cohortID]: action.users },
      };
    case AT.FETCH_COHORT_USERS_FAILED:
    case AT.DELETE_COHORT_USERS_SUCCESS:
      return {
        ...state,
        cohortUsers: { ...state.cohortUsers, [action.cohortID]: [] },
      };
    case AT.FETCH_CONFIGS:
      return {
        ...state,
        configs: { ...state.configs, [action.context]: null },
      };
    case AT.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        contexts: {
          ...state.contexts,
          [action.context]: {
            ...(state.contexts[action.context] || {}),
            categories: action.categories,
          },
        },
      };
    case AT.FETCH_FIRST_PARTIES_SUCCESS:
      return {
        ...state,
        contexts: {
          ...state.contexts,
          [action.context]: {
            ...(state.contexts[action.context] || {}),
            firstParties: action.firstParties,
          },
        },
      };
    case AT.FETCH_CONFIGS_SUCCESS:
      return {
        ...state,
        configs: { ...state.configs, [action.context]: action.configs },
      };
    case AT.FETCH_CONFIGS_FAILED:
      return {
        ...state,
        configs: { ...state.configs, [action.context]: [] },
      };
    case AT.ADD_CONFIG_SUCCESS:
      return {
        ...state,
        configs: {
          ...state.configs,
          [action.context]: [
            ...state.configs[action.context],
            {
              configID: action.values.configID,
              name: action.values.name,
              created: Date.now() / 1000,
              updated: Date.now() / 1000,
              serviceID: action.values.serviceID,
              modifiers: action.values.modifiers,
            },
          ],
        },
      };
    case AT.UPDATE_CONFIG_SUCCESS:
      return {
        ...state,
        configs: {
          ...state.configs,
          [action.context]: state.configs[action.context].map(c =>
            c.configID === action.values.configID
              ? { ...c, ...action.values }
              : c
          ),
        },
      };
    case AT.SAVE_TEST:
      return {
        ...state,
        saving: true,
      };
    case AT.SAVE_TEST_SUCCESS:
    case AT.SAVE_TEST_FAILED:
      return { ...state, saving: false };
    default:
      return state;
  }
};
