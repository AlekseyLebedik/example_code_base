import * as AT from './actionTypes';

const INITIAL_STATE = {
  entries: [],
  nextPageToken: undefined,
  selectedListItem: undefined,
  elementsOrder: [],
  q: undefined,
  addModalVisible: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.STORAGE_QUOTA_USAGE_FETCH_SUCCESS: {
      const existingIds = state.entries.map(item => item.userID);
      return {
        ...state,
        entries: action.append
          ? [
              ...state.entries,
              ...action.entries.filter(
                item => !existingIds.includes(item.userID)
              ),
            ]
          : action.entries,
        nextPageToken: action.nextPageToken,
        elementsOrder: action.elementsOrder,
        selectedListItem: action.append ? state.selectedListItem : undefined,
        q: action.q,
      };
    }
    case AT.STORAGE_QUOTA_USAGE_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedListItem: action.listItem,
      };
    case AT.STORAGE_QUOTA_USAGE_ADD_MODAL_OPEN:
      return {
        ...state,
        addModalVisible: true,
      };
    case AT.STORAGE_QUOTA_USAGE_ADD_MODAL_CLOSE:
      return {
        ...state,
        addModalVisible: false,
      };
    case AT.STORAGE_QUOTA_USAGE_ADD_SUCCESS: {
      const idx = state.entries.findIndex(
        item => item.userID === action.listItem.userID
      );
      const newEntries = [...state.entries];
      if (idx > -1) {
        newEntries.splice(idx, 1, action.listItem);
      } else {
        newEntries.push(action.listItem);
      }
      return {
        ...state,
        entries: newEntries,
        addModalVisible: false,
      };
    }
    default:
      return state;
  }
};
