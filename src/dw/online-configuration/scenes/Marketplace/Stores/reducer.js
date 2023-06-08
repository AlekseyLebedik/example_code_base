import * as AT from './actionTypes';

const INITIAL_STATE = {
  stores: [],
  storesLoading: false,
  nextPageToken: undefined,
  q: undefined,
  selectedStore: undefined,
  selectedStoreLoading: false,
  uploadStoreModalVisible: false,
  uploadStoreModalLoading: false,
  StoreDetail: {
    propagateStoreModalVisible: false,
    propagateStoreLoading: false,
  },
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.STORES_FETCH:
      return {
        ...state,
        storesLoading: true,
      };
    case AT.STORES_FETCH_SUCCESS: {
      let { selectedStore } = state;
      if (action.q && action.stores.length === 0) {
        selectedStore = undefined;
      }
      const newLabels = action.stores.map(store => store.label);
      return {
        ...state,
        stores: action.append
          ? [
              ...state.stores.filter(store => !newLabels.includes(store.label)),
              ...action.stores,
            ]
          : action.stores,
        storesLoading: false,
        nextPageToken: action.nextPageToken,
        q: action.q,
        selectedStore,
      };
    }
    case AT.STORES_FETCH_FAILED:
      return {
        ...state,
        storesLoading: false,
      };
    case AT.STORE_DETAIL_FETCH:
      return {
        ...state,
        selectedStoreLoading: true,
      };
    case AT.STORE_DETAIL_FETCH_SUCCESS:
      return {
        ...state,
        selectedStore: { ...state.selectedStore, code: action.code },
        selectedStoreLoading: false,
      };
    case AT.STORE_DETAIL_FETCH_FAILED:
      return {
        ...state,
        selectedStoreLoading: false,
      };
    case AT.STORES_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedStore: action.store,
      };
    case AT.STORE_OPEN_UPLOAD_MODAL:
      return {
        ...state,
        uploadStoreModalVisible: true,
      };
    case AT.STORE_UPLOAD:
      return {
        ...state,
        uploadStoreModalLoading: true,
      };
    case AT.STORE_UPLOAD_FAILED:
      return {
        ...state,
        uploadStoreModalLoading: false,
      };
    case AT.STORE_CLOSE_UPLOAD_MODAL:
    case AT.STORE_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadStoreModalVisible: false,
        uploadStoreModalLoading: false,
      };
    case AT.STORE_OPEN_PROPAGATE_MODAL:
      return {
        ...state,
        StoreDetail: {
          ...state.StoreDetail,
          propagateStoreModalVisible: true,
        },
      };
    case AT.STORE_PROPAGATE:
      return {
        ...state,
        StoreDetail: {
          ...state.StoreDetail,
          propagateStoreLoading: true,
        },
      };
    case AT.STORE_CLOSE_PROPAGATE_MODAL:
    case AT.STORE_PROPAGATE_SUCCESS:
      return {
        ...state,
        StoreDetail: {
          ...state.StoreDetail,
          propagateStoreModalVisible: false,
          propagateStoreLoading: false,
        },
      };
    case AT.STORE_PROPAGATE_FAILED:
      return {
        ...state,
        StoreDetail: {
          ...state.StoreDetail,
          propagateStoreModalVisible: false,
          propagateStoreLoading: false,
        },
      };
    case AT.STORE_CLOSE_PROPAGATE_LOADING:
      return {
        ...state,
        StoreDetail: {
          ...state.StoreDetail,
          propagateStoreLoading: false,
        },
      };
    default:
      return state;
  }
};
