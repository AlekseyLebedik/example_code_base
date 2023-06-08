import { reducer } from '../reducer';
import * as types from '../actionTypes';

describe('Marketplace stores reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
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
    });
  });

  it('should handle STORES_FETCH_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.STORES_FETCH_SUCCESS,
        stores: [],
        nextPageToken: undefined,
        q: undefined,
      })
    ).toEqual({
      stores: [],
      nextPageToken: undefined,
      q: undefined,
      selectedStore: undefined,
      storesLoading: false,
    });

    expect(
      reducer([], {
        type: types.STORES_FETCH_SUCCESS,
        stores: [1, 2],
        nextPageToken: 'b5fb0980-0fe9-11e8-b642-0ed5f89f718b',
        q: undefined,
      })
    ).toEqual({
      stores: [1, 2],
      nextPageToken: 'b5fb0980-0fe9-11e8-b642-0ed5f89f718b',
      q: undefined,
      selectedStore: undefined,
      storesLoading: false,
    });

    expect(
      reducer([], {
        type: types.STORES_FETCH_SUCCESS,
        stores: [1, 2],
        nextPageToken: 'b5fb0980-0fe9-11e8-b642-0ed5f89f718b',
        q: 'Fenrir',
      })
    ).toEqual({
      stores: [1, 2],
      nextPageToken: 'b5fb0980-0fe9-11e8-b642-0ed5f89f718b',
      q: 'Fenrir',
      selectedStore: undefined,
      storesLoading: false,
    });

    expect(
      reducer(
        { stores: [1, 2] },
        {
          type: types.STORES_FETCH_SUCCESS,
          stores: [3, 4],
          nextPageToken: 'b5fb0980-0fe9-11e8-b642-0ed5f89f718b',
          q: 'Fenrir',
        }
      )
    ).toEqual({
      stores: [3, 4],
      nextPageToken: 'b5fb0980-0fe9-11e8-b642-0ed5f89f718b',
      q: 'Fenrir',
      selectedStore: undefined,
      storesLoading: false,
    });

    expect(
      reducer(
        { stores: [{ label: 1 }, { label: 2 }] },
        {
          type: types.STORES_FETCH_SUCCESS,
          stores: [{ label: 3 }, { label: 4 }],
          nextPageToken: 'b5fb0980-0fe9-11e8-b642-0ed5f89f718b',
          q: 'Fenrir',
          append: true,
        }
      )
    ).toEqual({
      stores: [{ label: 1 }, { label: 2 }, { label: 3 }, { label: 4 }],
      nextPageToken: 'b5fb0980-0fe9-11e8-b642-0ed5f89f718b',
      q: 'Fenrir',
      selectedStore: undefined,
      storesLoading: false,
    });
  });

  it('should handle STORES_FETCH_FAILED', () => {
    expect(
      reducer([], {
        type: types.STORES_FETCH_FAILED,
      })
    ).toEqual({
      storesLoading: false,
    });
  });

  it('should handle STORE_DETAIL_FETCH_SUCCESS', () => {
    expect(
      reducer(
        {
          selectedStore: { name: 'Gandalf' },
          selectedStoreLoading: false,
        },
        {
          type: types.STORE_DETAIL_FETCH_SUCCESS,
          code: { isWizard: true },
        }
      )
    ).toEqual({
      selectedStore: { name: 'Gandalf', code: { isWizard: true } },
      selectedStoreLoading: false,
    });
  });

  it('should handle STORE_DETAIL_FETCH_FAILED', () => {
    expect(
      reducer([], {
        type: types.STORE_DETAIL_FETCH_FAILED,
      })
    ).toEqual({
      selectedStoreLoading: false,
    });
  });

  it('should handle STORES_LIST_ITEM_ONCLICK', () => {
    expect(
      reducer(
        { stores: [] },
        {
          type: types.STORES_LIST_ITEM_ONCLICK,
        }
      )
    ).toEqual({
      stores: [],
      selectedStore: undefined,
    });

    expect(
      reducer(
        { stores: [{ label: 'Celebrimbor' }, { label: 'Thingol' }] },
        {
          type: types.STORES_LIST_ITEM_ONCLICK,
          store: { label: 'Thingol' },
        }
      )
    ).toEqual({
      stores: [{ label: 'Celebrimbor' }, { label: 'Thingol' }],
      selectedStore: { label: 'Thingol' },
    });

    expect(
      reducer(
        { stores: [{ label: 'Celebrimbor' }, { label: 'Thingol' }] },
        {
          type: types.STORES_LIST_ITEM_ONCLICK,
          store: { label: 'Hurin' },
        }
      )
    ).toEqual({
      stores: [{ label: 'Celebrimbor' }, { label: 'Thingol' }],
      selectedStore: { label: 'Hurin' },
    });
  });

  it('should handle STORE_OPEN_UPLOAD_MODAL', () => {
    expect(
      reducer(
        {},
        {
          type: types.STORE_OPEN_UPLOAD_MODAL,
        }
      )
    ).toEqual({
      uploadStoreModalVisible: true,
    });
  });

  it('should handle STORE_CLOSE_UPLOAD_MODAL and STORE_UPLOAD_SUCCESS', () => {
    expect(
      reducer(
        {},
        {
          type: types.STORE_CLOSE_UPLOAD_MODAL,
        }
      )
    ).toEqual({
      uploadStoreModalVisible: false,
      uploadStoreModalLoading: false,
    });

    expect(
      reducer(
        {},
        {
          type: types.STORE_UPLOAD_SUCCESS,
        }
      )
    ).toEqual({
      uploadStoreModalVisible: false,
      uploadStoreModalLoading: false,
    });
  });

  it('should handle STORE_OPEN_PROPAGATE_MODAL', () => {
    expect(
      reducer(
        {},
        {
          type: types.STORE_OPEN_PROPAGATE_MODAL,
        }
      )
    ).toEqual({
      StoreDetail: {
        propagateStoreModalVisible: true,
      },
    });
  });

  it('should handle STORE_PROPAGATE', () => {
    expect(
      reducer(
        {},
        {
          type: types.STORE_PROPAGATE,
        }
      )
    ).toEqual({
      StoreDetail: { propagateStoreLoading: true },
    });
  });

  it('should handle STORE_CLOSE_PROPAGATE_MODAL and STORE_PROPAGATE_SUCCESS', () => {
    expect(
      reducer(
        {},
        {
          type: types.STORE_CLOSE_PROPAGATE_MODAL,
        }
      )
    ).toEqual({
      StoreDetail: {
        propagateStoreModalVisible: false,
        propagateStoreLoading: false,
      },
    });

    expect(
      reducer(
        {},
        {
          type: types.STORE_PROPAGATE_SUCCESS,
        }
      )
    ).toEqual({
      StoreDetail: {
        propagateStoreModalVisible: false,
        propagateStoreLoading: false,
      },
    });
  });
});
