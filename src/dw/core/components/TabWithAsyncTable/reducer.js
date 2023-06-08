export const INITIAL_STATE = {
  collection: [],
  nextPageToken: undefined,
  loading: false,
};

export const getReducer =
  actionTypePrefix =>
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case `${actionTypePrefix}_FETCH`: {
        return {
          ...state,
          loading: state.collection.length === 0,
        };
      }
      case `${actionTypePrefix}_FETCH_SUCCESS`:
        return {
          ...state,
          collection: action.append
            ? [...state.collection, ...action.collection]
            : action.collection,
          nextPageToken: action.nextPageToken,
          loading: false,
        };
      default:
        return state;
    }
  };
