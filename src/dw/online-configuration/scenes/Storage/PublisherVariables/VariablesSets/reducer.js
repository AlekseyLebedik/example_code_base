import * as AT from './actionTypes';

const INITIAL_STATE = {
  entries: [],
  nextPageToken: null,
  selectedListItem: null,
  q: null,
  selectedListItemDetails: null,
  addedListItems: [],
  isAddModalOpen: false,
  isUpdateVariablesSetModalOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.STORAGE_VARIABLES_SETS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case AT.STORAGE_VARIABLES_SETS_FETCH_SUCCESS:
      return {
        ...state,
        entries: action.append
          ? [...state.entries, ...action.entries]
          : action.entries,
        nextPageToken: action.nextPageToken,
        selectedListItem: action.append ? state.selectedListItem : null,
        selectedListItemDetails: action.append
          ? state.selectedListItemDetails
          : null,
        q: action.q,
        loading: false,
      };
    case AT.STORAGE_VARIABLES_SETS_FETCH_FAILED:
      return {
        ...state,
        loading: false,
      };
    case AT.STORAGE_VARIABLES_SETS_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedListItem: action.listItem,
        selectedListItemDetails: null,
      };
    case AT.STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS_SUCCESS:
      return {
        ...state,
        selectedListItemDetails:
          action.variableSetId === state.selectedListItem.variableSetId
            ? action.data
            : state.selectedListItemDetails,
        variableMapping: action.variableMapping,
      };
    case AT.STORAGE_VARIABLES_SETS_OPEN_ADD_MODAL:
      return {
        ...state,
        isAddModalOpen: true,
      };
    case AT.STORAGE_VARIABLES_SETS_CLOSE_ADD_MODAL:
      return {
        ...state,
        isAddModalOpen: false,
      };
    case AT.STORAGE_VARIABLES_SETS_ADD_SUCCESS: {
      const exists =
        state.entries.find(
          e => e.variableSetId === action.listItem.variableSetId
        ) !== undefined;
      return {
        ...state,
        entries: exists ? state.entries : [...state.entries, action.listItem],
        addedListItems: exists
          ? state.addedListItems
          : [...state.addedListItems, action.listItem],
      };
    }
    case AT.STORAGE_VARIABLES_SET_DELETE_SUCCESS:
      return {
        ...state,
        entries: state.entries.filter(
          item => item.variableSetId !== action.variableSetId
        ),
        selectedListItemDetails: null,
        selectedListItem: null,
      };
    case AT.STORAGE_VARIABLES_SET_UPDATE_SUCCESS:
      return {
        ...state,
        selectedListItemDetails: action.variableSet,
      };
    default:
      return state;
  }
};
