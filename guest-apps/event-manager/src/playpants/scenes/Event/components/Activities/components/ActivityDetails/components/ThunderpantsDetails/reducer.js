import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import * as AT from './actionTypes';

const TPANTS_INITIAL_STATE = {
  data: [],
  loading: true,
  success: false,
};

const INITIAL_STATE = {
  buildList: TPANTS_INITIAL_STATE,
  buildSchema: TPANTS_INITIAL_STATE,
  deployerList: TPANTS_INITIAL_STATE,
  deploymentList: TPANTS_INITIAL_STATE,
  filterType: 'default',
  form: {
    data: {},
    next: '',
    schema: [],
    summary: {},
    targets: [],
    type: '',
  },
  targetList: TPANTS_INITIAL_STATE,
  userParamsSchema: TPANTS_INITIAL_STATE,
  viewList: TPANTS_INITIAL_STATE,
  unlockedDeployments: {},
};

// Fetch Reducers
const buildListFetchReducer = createFetchReducer(AT.FETCH_BUILD_LIST);

const buildListReducer = (state = INITIAL_STATE.buildList, action) => {
  switch (action.type) {
    case `${AT.FETCH_BUILD_LIST}_FETCH_FAILED`:
      return {
        ...INITIAL_STATE.buildList,
      };
    default:
      return {
        ...buildListFetchReducer(state, action),
      };
  }
};

const buildSchemaFetchReducer = createFetchReducer(AT.FETCH_BUILD_SCHEMA);

const buildSchemaReducer = (state = INITIAL_STATE.buildSchema, action) => {
  switch (action.type) {
    case `${AT.FETCH_BUILD_SCHEMA}_FETCH_FAILED`:
      return {
        ...INITIAL_STATE.buildSchema,
      };
    default:
      return {
        ...buildSchemaFetchReducer(state, action),
      };
  }
};

const deployerListFetchReducer = createFetchReducer(AT.FETCH_DEPLOYER_LIST);

const deployerListReducer = (state = INITIAL_STATE.deployerList, action) => {
  switch (action.type) {
    case `${AT.FETCH_DEPLOYER_LIST}_FETCH_FAILED`:
      return {
        ...INITIAL_STATE.buildList,
      };
    default:
      return {
        ...deployerListFetchReducer(state, action),
      };
  }
};

const deploymentListFetchReducer = createFetchReducer(AT.FETCH_DEPLOYMENT_LIST);

const deploymentListReducer = (
  state = INITIAL_STATE.deploymentList,
  action
) => {
  switch (action.type) {
    case `${AT.FETCH_DEPLOYMENT_LIST}_FETCH_FAILED`:
      return {
        ...INITIAL_STATE.deploymentList,
      };
    default:
      return {
        ...deploymentListFetchReducer(state, action),
      };
  }
};

const targetListFetchReducer = createFetchReducer(AT.FETCH_TARGET_LIST);

const targetListReducer = (state = INITIAL_STATE.targetList, action) => {
  switch (action.type) {
    case `${AT.FETCH_TARGET_LIST}_FETCH_FAILED`:
      return {
        ...INITIAL_STATE.targetList,
      };
    default:
      return {
        ...targetListFetchReducer(state, action),
      };
  }
};

const userParamsSchemaFetchReducer = createFetchReducer(
  AT.FETCH_USER_PARAMS_SCHEMA
);

const userParamsSchemaReducer = (
  state = INITIAL_STATE.userParamsSchema,
  action
) => {
  switch (action.type) {
    case `${AT.FETCH_USER_PARAMS_SCHEMA}_FETCH_FAILED`:
      return {
        ...INITIAL_STATE.userParamsSchema,
      };
    default:
      return {
        ...userParamsSchemaFetchReducer(state, action),
      };
  }
};

const viewListFetchReducer = createFetchReducer(AT.FETCH_VIEW_LIST);

const viewListReducer = (state = INITIAL_STATE.viewList, action) => {
  switch (action.type) {
    case `${AT.FETCH_VIEW_LIST}_FETCH_FAILED`:
      return {
        ...INITIAL_STATE.viewList,
      };
    default:
      return {
        ...viewListFetchReducer(state, action),
      };
  }
};

// Local Data Reducers
const tpantsFormReducer = (state = INITIAL_STATE.form, action) => {
  switch (action.type) {
    case AT.SET_FORM_DATA:
      return {
        data: action.formData,
        next: action.formNext,
        schema: action.formSchema,
        summary: action.formSummaryData,
        targets: action.formTargets,
        type: action.formType,
      };
    case AT.CLEAR_FORM_DATA:
      return {
        ...INITIAL_STATE.form,
      };
    default:
      return {
        ...state,
      };
  }
};

const unlockedDeploymentsReducer = (
  state = INITIAL_STATE.unlockedDeployments,
  action
) => {
  const { deployment: { uid, password } = {} } = action;
  switch (action.type) {
    case AT.ADD_UNLOCKED_DEPLOYMENT:
      return { ...state.unlockedDeployments, [uid]: password };
    case AT.CLEAR_UNLOCKED_DEPLOYMENTS:
      return {};
    default:
      return state;
  }
};

const filterTypeReducer = (state = INITIAL_STATE.filterType, action) => {
  switch (action.type) {
    case AT.SET_FILTER_TYPE:
      return action.filterType;
    default:
      return state;
  }
};

// Base Reducer
const thunderpantsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CLEAR_THUNDERPANTS_ACTIVITY:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

const reducer = reduceReducers(
  thunderpantsReducer,
  combineReducers({
    buildList: buildListReducer,
    buildSchema: buildSchemaReducer,
    deployerList: deployerListReducer,
    deploymentList: deploymentListReducer,
    filterType: filterTypeReducer,
    targetList: targetListReducer,
    userParamsSchema: userParamsSchemaReducer,
    viewList: viewListReducer,
    form: tpantsFormReducer,
    unlockedDeployments: unlockedDeploymentsReducer,
  })
);

export default reducer;
