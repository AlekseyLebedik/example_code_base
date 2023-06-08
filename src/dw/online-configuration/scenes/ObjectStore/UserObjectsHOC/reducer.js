import * as AT from './actionTypes';
import { filterObject, normalizeObjects } from './helpers';

const INITIAL_STATE = {
  userId: null,
  objects: {},
  nextPageToken: undefined,
  loading: false,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case `${AT.USER_OBJECTS_FETCH}_FETCH`:
    case `${AT.POOLED_OBJECTS_FETCH}_FETCH`:
      return { ...state, userId: action.urlID };
    case `${AT.USER_OBJECTS_FETCH}_FETCH_SUCCESS`:
    case `${AT.POOLED_OBJECTS_FETCH}_FETCH_SUCCESS`: {
      const objects = normalizeObjects(action.data);
      return {
        ...state,
        objects: action.append
          ? { ...state.objects, ...objects }
          : { ...objects },
        nextPageToken: action.nextPageToken,
      };
    }
    case AT.USER_OBJECTS_DELETE_SUCCESS:
    case AT.POOLED_OBJECTS_DELETE_SUCCESS:
      return {
        ...state,
        objects: filterObject(
          state.objects,
          metadata => !action.deletedObjects.includes(metadata.name)
        ),
      };
    case AT.USER_OBJECTS_UNLOAD:
    case AT.POOLED_OBJECTS_UNLOAD:
      return {
        ...state,
        objects: {},
      };
    case AT.USER_OBJECTS_UPLOAD:
      return {
        ...state,
        loading: action.loading,
      };
    default:
      return state;
  }
}

export default reducer;
