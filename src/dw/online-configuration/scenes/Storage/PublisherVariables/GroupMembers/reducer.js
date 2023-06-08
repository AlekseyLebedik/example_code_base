import * as AT from './actionTypes';

const INITIAL_STATE = {
  entries: [],
  nextPageToken: null,
  selectedListItem: null,
  q: null,
  selectedListItemDetails: null,
  addedListItems: [],
  isAddModalOpen: false,
  isAddMembersModalOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.STORAGE_GROUP_MEMBERS_FETCH:
      return {
        ...state,
      };
    case AT.STORAGE_GROUP_MEMBERS_FETCH_SUCCESS:
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
      };
    case AT.STORAGE_GROUP_MEMBERS_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedListItem: action.listItem,
        selectedListItemDetails: null,
      };
    case AT.STORAGE_GROUP_MEMBERS_FETCH_GROUP_DETAILS_SUCCESS:
      return {
        ...state,
        selectedListItemDetails:
          action.groupID === state.selectedListItem
            ? action.data
            : state.selectedListItemDetails,
      };
    case AT.STORAGE_GROUP_MEMBERS_OPEN_ADD_MODAL:
      return {
        ...state,
        isAddModalOpen: true,
      };
    case AT.STORAGE_GROUP_MEMBERS_CLOSE_ADD_MODAL:
      return {
        ...state,
        isAddModalOpen: false,
      };
    case AT.STORAGE_GROUP_MEMBERS_OPEN_ADD_MEMBERS_MODAL:
      return {
        ...state,
        isAddMembersModalOpen: true,
      };
    case AT.STORAGE_GROUP_MEMBERS_CLOSE_ADD_MEMBERS_MODAL:
      return {
        ...state,
        isAddMembersModalOpen: false,
      };
    case AT.STORAGE_GROUP_MEMBERS_ADD_SUCCESS:
      return {
        ...state,
        entries: state.entries.includes(action.listItem)
          ? state.entries
          : [...state.entries, action.listItem],
        addedListItems: state.entries.includes(action.listItem)
          ? state.addedListItems
          : [...state.addedListItems, action.listItem],
      };
    case AT.STORAGE_GROUP_MEMBERS_DELETE_SUCCESS:
      return {
        ...state,
        selectedListItemDetails:
          action.groupId === state.selectedListItem
            ? state.selectedListItemDetails.filter(
                item => !action.userIds.includes(item.userID)
              )
            : state.selectedListItemDetails,
      };
    default:
      return state;
  }
};
