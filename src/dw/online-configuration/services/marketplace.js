import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'marketplace';

/* Check Service */
export const checkMarketplaceService = params =>
  axios.get(
    createApiUrl(RESOURCE, params.title.id, params.environment.shortType)
  );

/* Active Store */
// export { getActiveStore } from './mock/marketplace';

export const getActiveStore = params =>
  axios.get(`${createApiUrl(RESOURCE)}default-store/`, { params });

export const getCurrencies = params =>
  axios.get(`${createApiUrl(RESOURCE)}default-store/currencies/`, {
    params,
  });

// export { getItems } from './mock/marketplace';
export const getItems = params =>
  axios.get(`${createApiUrl(RESOURCE)}default-store/items/`, {
    params,
  });

export const getEntitlements = params =>
  axios.get(`${createApiUrl(RESOURCE)}default-store/entitlements/`, {
    params,
  });

// export { getProducts } from './mock/marketplace';

export const getProducts = params =>
  axios.get(`${createApiUrl(RESOURCE)}default-store/products/`, {
    params,
  });

export const getSkus = params =>
  axios.get(`${createApiUrl(RESOURCE)}default-store/skus/`, { params });

export const getPawnableItems = params =>
  axios.get(`${createApiUrl(RESOURCE)}default-store/pawnable-items/`, {
    params,
  });

export const getConversionRules = params =>
  axios.get(`${createApiUrl(RESOURCE)}default-store/conversion-rules/`, {
    params,
  });

export const getExchangeItems = ({ q, ...params }) =>
  axios.get(`${createApiUrl(RESOURCE)}exchange/`, {
    params: { first_party: q, ...params },
  });

/* Stores */

export const getStores = params =>
  axios.get(`${createApiUrl(RESOURCE)}stores/`, { params });

export const uploadStore = async (
  values,
  { onUploadProgress, cancelToken, ...params }
) => {
  const data = {
    store: values.store.base64,
    label: values.label,
  };
  return axios.post(`${createApiUrl(RESOURCE)}stores/`, data, {
    params,
    onUploadProgress,
    cancelToken,
  });
};

// export { getStoreDetail } from './mock/marketplace';

export const getStoreDetail = (label, params) =>
  axios.get(`${createApiUrl(RESOURCE)}stores/${label}/`, { params });

export const clearStoreDetailCache = label =>
  axios.delete(`${createApiUrl(RESOURCE)}stores/${label}/clear-cache/`);

export const propagateStore = (store, values, params) => {
  const data = {
    store: window.btoa(JSON.stringify(store.code)),
    label: values.label,
  };

  return axios.post(
    `${createApiUrl(RESOURCE, ...values.environment.key.split(':'))}stores/`,
    data,
    { params }
  );
};

export const setActiveStore = (label, context) =>
  axios.put(
    `${createApiUrl(RESOURCE)}default-store/`,
    { label },
    { params: { context } }
  );

export const deleteStore = (label, context) =>
  axios.delete(`${createApiUrl(RESOURCE)}stores/${label}/`, {
    params: { context },
  });

// export { getPlayerBalances } from './mock/marketplace';

export const getPlayerBalances = ({ playerId, isClan, ...params }) =>
  axios.get(
    isClan
      ? `${createApiUrl(RESOURCE)}clans/${playerId}/assets/balances/`
      : `${createApiUrl(RESOURCE)}users/${playerId}/assets/balances/`,
    { params }
  );

// export { getPlayerItemsFail as getPlayerItems } from './mock/marketplace';
// export { getPlayerItemsFailOther as getPlayerItems } from './mock/marketplace';

export const getPlayerItems = ({ playerId, isClan, ...params }) =>
  axios.get(
    isClan
      ? `${createApiUrl(RESOURCE)}clans/${playerId}/assets/inventory-items/`
      : `${createApiUrl(RESOURCE)}users/${playerId}/assets/inventory-items/`,
    { params }
  );

// export { postPlayerAssetChanges } from './mock/marketplace';
export const postPlayerAssetChanges = (playerId, data, rest) => {
  const { isClan, ...params } = rest;
  return axios.post(
    isClan
      ? `${createApiUrl(RESOURCE)}clans/${playerId}/assets/`
      : `${createApiUrl(RESOURCE)}users/${playerId}/assets/`,
    data,
    {
      params,
    }
  );
};

export const postGrantPlayerProducts = (playerId, data, rest) => {
  const { isClan, ...params } = rest;
  return axios.post(
    isClan
      ? `${createApiUrl(RESOURCE)}clans/${playerId}/products/`
      : `${createApiUrl(RESOURCE)}users/${playerId}/products/`,
    data,
    {
      params,
    }
  );
};

export const getAuditLogs = ({
  playerId,
  successCallback,
  failCallback,
  ...params
}) =>
  axios.get(`${createApiUrl(RESOURCE)}users/${playerId}/audit-logs/short/`, {
    params,
  });

export const deletePlayerInventory = (playerId, params) =>
  axios.delete(`${createApiUrl(RESOURCE)}users/${playerId}/inventory/`, {
    params,
  });

export const clonePlayerInventory = (playerId, data, params) =>
  axios.post(
    `${createApiUrl(RESOURCE)}users/${playerId}/inventory/clone/`,
    data,
    { params }
  );

export const getBackupPlayerInventory = (playerId, params) =>
  axios.get(`${createApiUrl(RESOURCE)}users/${playerId}/inventory/restore/`, {
    params,
  });

export const restorePlayerInventory = (playerId, params) =>
  axios.post(
    `${createApiUrl(RESOURCE)}users/${playerId}/inventory/restore/`,
    {},
    { params }
  );

export const bulkInventoryUpdate = (data, params) =>
  axios.post(`${createApiUrl(RESOURCE)}inventory/bulk/`, data, {
    params,
  });
