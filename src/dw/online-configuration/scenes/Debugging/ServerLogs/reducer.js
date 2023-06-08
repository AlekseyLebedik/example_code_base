import * as AT from './actionTypes';

const INITIAL_STATE = {
  serverLogs: [],
  nextPageToken: null,
  q: undefined,
  query: undefined,
  details: {},
  expandedInfo: {
    isLoading: false,
    data: [],
  },
  exportIsLoading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.SERVER_LOGS_FETCH:
      return {
        ...state,
        filters: action.filters,
        params: action.params,
      };
    case AT.SERVER_LOGS_FETCH_DETAILS:
      return !action.append
        ? {
            ...state,
            details: {
              transId: action.params.transId,
              query: action.params,
              logs: null,
            },
          }
        : {
            ...state,
            details: { ...state.details, nextPageToken: undefined },
          };
    case AT.SERVER_LOGS_FETCH_DETAILS_SUCCESS:
      return state.details.transId === action.transId
        ? {
            ...state,
            details: {
              transId: action.transId,
              logs: action.append
                ? [...state.details.logs, ...action.logs]
                : action.logs,
              nextPageToken: action.nextPageToken,
              query: state.details.query,
            },
          }
        : state;
    case AT.SERVER_LOGS_EXPANDED_FETCH:
      return {
        ...state,
        expandedInfo: {
          isLoading: true,
          data: [],
          msgId: action.msgId,
        },
      };
    case AT.SERVER_LOGS_EXPANDED_FETCH_SUCCESS:
      return {
        ...state,
        expandedInfo: {
          isLoading: false,
          data: action.logs,
          msgId: action.msgId,
        },
      };
    case AT.SERVER_LOGS_EXPORT:
      return {
        ...state,
        exportIsLoading: true,
      };
    case AT.SERVER_LOGS_EXPORT_SUCCESS:
    case AT.SERVER_LOGS_EXPORT_FAILED:
      return {
        ...state,
        exportIsLoading: false,
      };
    default:
      return state;
  }
};
