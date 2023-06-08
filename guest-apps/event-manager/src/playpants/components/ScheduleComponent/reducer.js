import { combineReducers } from 'redux';
import {
  createFetchReducer,
  INITIAL_STATE as FETCH_INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';

import { getNowTimestamp } from 'playpants/helpers/dateTime';
import { parseEventData } from 'playpants/helpers/parseEventData';

import * as AT from './actionTypes';

import { reducer as eventGroupErrorDialogReducer } from './components/EventGroupErrorDialog/reducer';
import GamertagSummaryReducer from './components/GamertagSummaryDialog/reducer';

const fetchEventBySourceEventIdReducer = createFetchReducer(
  AT.FETCH_EVENT_BY_SOURCE_EVENT_ID
);

export const CREATE_FORM_INITIAL_STATE = {
  defaultStartDate: getNowTimestamp(),
  defaultEndDate: getNowTimestamp(),
  isRange: false,
};

export const createFormReducer = (
  state = CREATE_FORM_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AT.UPDATE_CREATE_FORM_DEFAULT_DATE:
      return {
        ...state,
        defaultStartDate: action.defaultStartDate,
        defaultEndDate: action.defaultEndDate,
        isRange: action.isRange,
      };
    case AT.RESET:
      return CREATE_FORM_INITIAL_STATE;
    default:
      return state;
  }
};

// SELECTED TEMPLATE REDUCER
export const SELECTED_TEMPLATE_INITIAL_STATE = {};

export const selectedTemplateReducer = (
  state = SELECTED_TEMPLATE_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AT.SET_SELECTED_EVENT_TEMPLATE: {
      const template = action.selectedTemplate || {};
      return template;
    }
    case AT.RESET:
      return SELECTED_TEMPLATE_INITIAL_STATE;
    default:
      return state;
  }
};

// TEMPLATE SOURCE REDUCER
export const TEMPLATE_SOURCE_INITIAL_STATE = FETCH_INITIAL_STATE;

export const templateSourceEventReducer = (
  state = TEMPLATE_SOURCE_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AT.SET_SELECTED_EVENT_TEMPLATE:
      return {
        ...TEMPLATE_SOURCE_INITIAL_STATE,
      };
    case `${AT.FETCH_EVENT_BY_SOURCE_EVENT_ID}_FETCH_SUCCESS`:
      return {
        ...state,
        data: parseEventData(action.data),
        loading: false,
      };
    case AT.RESET:
      return TEMPLATE_SOURCE_INITIAL_STATE;
    default:
      return {
        ...state,
        ...fetchEventBySourceEventIdReducer(state, action),
      };
  }
};

// EVENT DETAIL REDUCER
export const EVENT_DETAIL_STATE = {
  data: {},
  loading: false,
};

export const eventDetailReducer = (state = EVENT_DETAIL_STATE, action) => {
  switch (action.type) {
    case AT.STORE_EVENT:
      return {
        ...state,
        data: action.eventData,
      };
    default:
      return state;
  }
};

// EVENT DETAIL REDUCER
export const EVENT_FETCH_DETAILS_STATE = {
  data: {},
  error: null,
  loading: false,
};

export const eventFetchDetailReducer = (
  state = EVENT_FETCH_DETAILS_STATE,
  action
) => {
  switch (action.type) {
    case AT.FETCH_EVENT_DETAILS:
      return {
        ...state,
        data: {},
        error: null,
        loading: true,
      };
    case AT.FETCH_EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        data: action.eventData,
        error: null,
        loading: false,
      };
    case AT.FETCH_EVENT_DETAILS_FAILED:
      return {
        ...state,
        data: {},
        error: action.error,
        loading: false,
      };
    case AT.RESET_EVENT_FETCH_DETAILS:
      return EVENT_FETCH_DETAILS_STATE;
    default:
      return state;
  }
};

// AB TEST DETAIL REDUCER
export const AB_TEST_DETAIL_STATE = {
  data: {},
  loading: false,
};

export const abTestDetailReducer = (state = AB_TEST_DETAIL_STATE, action) => {
  switch (action.type) {
    case AT.STORE_AB_TEST:
      return {
        ...state,
        data: action.abTestData,
      };
    default:
      return state;
  }
};

// DEMONWARE DETAIL REDUCER
export const DEMONWARE_DETAIL_STATE = {
  data: {},
  loading: false,
};

export const demonwareDetailReducer = (
  state = DEMONWARE_DETAIL_STATE,
  action
) => {
  switch (action.type) {
    case AT.STORE_DEMONWARE_EVENT:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

// EXTERNAL DETAIL REDUCER
export const EXTERNAL_DETAIL_STATE = {
  data: {},
  loading: false,
};

export const externalDetailReducer = (
  state = EXTERNAL_DETAIL_STATE,
  action
) => {
  switch (action.type) {
    case AT.STORE_EXTERNAL_EVENT:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

// FILTER PROPS DISABLED REDUCER
export const FILTER_PROPS_DISABLED_STATE = {
  customTags: false,
  environments: false,
  gamertags: false,
  platforms: false,
  projects: false,
  stories: false,
};

export const filterPropsDisabledReducer = (
  state = FILTER_PROPS_DISABLED_STATE,
  action
) => {
  switch (action.type) {
    case AT.SET_FILTER_PROPS_DISABLED:
      return {
        ...state,
        [action.filterType]: action.disabled,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  abTestDetail: abTestDetailReducer,
  demonwareDetail: demonwareDetailReducer,
  eventDetail: eventDetailReducer,
  externalDetail: externalDetailReducer,
  eventFetchDetails: eventFetchDetailReducer,
  eventGroupErrorDialog: eventGroupErrorDialogReducer,
  filterProps: combineReducers({
    disabled: filterPropsDisabledReducer,
  }),
  form: createFormReducer,
  selectedTemplate: selectedTemplateReducer,
  templateSourceEvent: templateSourceEventReducer,
  timewarpSettings: GamertagSummaryReducer,
});

export default reducer;
