import * as AT from './actionTypes';

const INITIAL_STATE = {
  revisions: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.REVISION_HISTORY_FETCH_SUCCESS:
      return {
        ...state,
        revisions: action.revisions,
      };
    case AT.REVISION_HISTORY_REVERT_SUCCESS:
      return {
        ...state,
        revisions: state.revisions.filter(
          revision => revision.revision !== action.revisionId
        ),
      };
    default:
      return state;
  }
};

export default reducer;
