export const INITIAL_STATE = {
  data: [],
  nextPageToken: undefined,
  next: undefined,
  params: undefined,
  error: false,
  loading: false,
};

export const createFetchReducer =
  (actionTypePrefix, params = {}) =>
  (state = params?.INITIAL_STATE || INITIAL_STATE, action) => {
    switch (action.type) {
      case `${actionTypePrefix}_FETCH`: {
        return {
          ...state,
          data: action.append ? state.data : params?.INITIAL_STATE?.data || [],
          params: action.params,
          loading: true,
        };
      }
      case `${actionTypePrefix}_FETCH_SUCCESS`:
        return {
          ...state,
          data: action.append ? [...state.data, ...action.data] : action.data,
          nextPageToken: action.nextPageToken,
          next: action.next,
          loading: false,
        };
      case `${actionTypePrefix}_FETCH_FAILED`:
        return {
          ...state,
          loading: false,
          error: true,
          data: params.undefinedOnFail ? undefined : state.data,
        };
      default:
        return state;
    }
  };

export const createUpdateReducer =
  actionTypePrefix =>
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case `${actionTypePrefix}_UPDATE`: {
        return {
          ...state,
          loading: true,
        };
      }
      case `${actionTypePrefix}_UPDATE_SUCCESS`:
        return {
          ...state,
          data: action.append ? [...state.data, ...action.data] : action.data,
          loading: false,
        };
      case `${actionTypePrefix}_UPDATE_FAILED`:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };
