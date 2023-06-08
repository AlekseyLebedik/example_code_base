import get from 'lodash/get';
import {
  AVAILABLE_CONTEXTS_PREFIX,
  CONTEXT_REGISTRY_PREFIX,
  SERVICE_CHANGE_CONTEXT,
  CONTEXT_SELECTOR_CHANGE_USER,
  CONTEXT_SELECTOR_CHANGE_PROPS,
  CONTEXT_SELECTOR_RESET_PROPS,
} from './constants';

const initialState = {
  Available: {},
  Registry: {},
  User: { userId: null },
  Props: {},
  UserAvailableLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${AVAILABLE_CONTEXTS_PREFIX}_FETCH`:
      return {
        ...state,
        UserAvailableLoaded: false,
        userId: action.userId,
      };
    case `${AVAILABLE_CONTEXTS_PREFIX}_FETCH_SUCCESS`:
      return {
        ...state,
        Available: {
          ...state.Available,
          [action.serviceName]: {
            ...get(state, `Available.${action.serviceName}`, {}),
            data: action.data,
            currentContext: {
              // For each context type, find previous context in new available list and if matches, use previous context
              ...Object.keys(
                get(state, `Available.${action.serviceName}.currentContext`, {})
              ).map(type => {
                const currentContextName = get(
                  state,
                  `Available.${action.serviceName}.currentContext.${type}.name`
                );
                if (currentContextName) {
                  return action.data.find(
                    ctx => ctx.name === currentContextName
                  );
                }
                return undefined;
              }),
            },
          },
        },
        UserAvailableLoaded: !!action.userId,
        userId: action.userId,
      };
    case `${CONTEXT_REGISTRY_PREFIX}_FETCH_SUCCESS`:
      return {
        ...state,
        Registry: {
          ...state.Registry,
          [action.serviceName]: {
            ...state.Registry[action.serviceName],
            data: action.data,
          },
        },
      };
    case SERVICE_CHANGE_CONTEXT:
      return {
        ...state,
        Available: {
          ...state.Available,
          [action.serviceName]: {
            ...get(state, `Available.${action.serviceName}`, {}),
            currentContext: {
              [action.context.type]: action.context,
            },
          },
        },
      };
    case CONTEXT_SELECTOR_CHANGE_USER:
      return {
        ...state,
        User: { userId: action.userId },
      };
    case CONTEXT_SELECTOR_CHANGE_PROPS:
      return {
        ...state,
        Props: { ...action.props },
      };
    case CONTEXT_SELECTOR_RESET_PROPS:
      return {
        ...state,
        Props: {},
      };
    default:
      return state;
  }
};

export default reducer;
