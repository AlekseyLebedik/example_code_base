import { TAGS_PREFIX } from './constants';

const initialState = {
  tags: undefined,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${TAGS_PREFIX}_FETCH`:
      return {
        ...state,
        tags: null,
      };
    case `${TAGS_PREFIX}_FETCH_SUCCESS`:
      return {
        ...state,
        tags: action.data,
      };
    case `${TAGS_PREFIX}_FETCH_FAILED`:
      return {
        ...state,
        tags: [],
      };
    case `${TAGS_PREFIX}_ADD_TAG`:
      return {
        ...state,
        tags: [...state.tags, { name: action.tag }],
      };
    default:
      return state;
  }
};

export default reducer;
