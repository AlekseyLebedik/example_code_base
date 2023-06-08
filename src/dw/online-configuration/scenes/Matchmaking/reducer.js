import * as AT from './actionTypes';

const INITIAL_STATE = {
  items: undefined,
  nextPageToken: undefined,
  rulesetDetails: undefined,
  q: undefined,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.FETCH:
      return state.q === action.params.q
        ? state
        : {
            ...state,
            q: action.params.q,
            items: action.append ? state.items : undefined,
          };
    case AT.FETCH_FAILED:
      return {
        ...state,
        items: [],
      };
    case AT.FETCH_SUCCESS:
      return {
        ...state,
        items: action.append
          ? [...state.items, ...action.data.data]
          : [...action.data.data],
        nextPageToken:
          action.data.nextPageToken !== undefined
            ? action.data.nextPageToken
            : state.nextPageToken,
        rulesetDetails: action.detailsReload ? undefined : state.rulesetDetails,
      };
    case AT.LIST_ITEM_ONCLICK:
      return {
        ...state,
        rulesetDetails: undefined,
      };
    case AT.FETCH_DETAILS:
      return {
        ...state,
        rulesetDetails: null,
      };
    case AT.FETCH_DETAILS_SUCCESS:
      return {
        ...state,
        rulesetDetails: action.data,
      };
    case AT.FETCH_DETAILS_FAILED:
      return {
        ...state,
        rulesetDetails: {},
      };
    case AT.ACTIVATE_SUCCESS:
      return {
        ...state,
        items: state.items.map(item => ({
          ...item,
          status: item.id === action.id ? 'active' : 'inactive',
          appliedAt:
            item.id === action.id
              ? Math.round(Date.now().valueOf() / 1000)
              : item.appliedAt,
        })),
        rulesetDetails: undefined, // Trigger item reload
      };
    default:
      return state;
  }
};

export default reducer;
