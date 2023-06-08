const INITIAL_STATE = {
  data: {},
};

export const createPermissionsReducer =
  prefix =>
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case `${prefix}_FETCH`:
        return {
          ...state,
          data: {
            ...state.data,
            [action.id]: {
              data: action.append ? state.data[action.id].data : [],
              nextPageToken: action.nextPageToken,
              loading: true,
            },
          },
        };
      case `${prefix}_FETCH_SUCCESS`:
        return {
          ...state,
          data: {
            ...state.data,
            [action.id]: {
              data: action.append
                ? [...state.data[action.id].data, ...action.data]
                : action.data,
              nextPageToken: null,
              loading: false,
            },
          },
        };
      case `${prefix}_FETCH_FAILED`:
        return {
          ...state,
          data: {
            ...state.data,
            [action.id]: {
              ...state.data[action.id],
              loading: false,
            },
          },
        };
      case `${prefix}_PUT`:
        return {
          ...state,
          data: {
            ...state.data,
            [action.id]: {
              ...state.data[action.id],
              loading: true,
            },
          },
        };
      case `${prefix}_PUT_SUCCESS`:
      case `${prefix}_PUT_FAILED`:
        return {
          ...state,
          data: {
            ...state.data,
            [action.id]: {
              ...state.data[action.id],
              loading: false,
            },
          },
        };
      default:
        return state;
    }
  };
