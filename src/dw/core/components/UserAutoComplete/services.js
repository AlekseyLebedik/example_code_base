import axios from 'dw/core/axios';
import { createApiUrl } from 'dw/core/helpers/services';

const RESOURCE = 'accounts';

export const getAccounts = (params, cancelToken) => {
  const { context, ...newParams } = params;
  let url;
  if (context !== undefined) {
    const [titleID, environment] = context.split(':');
    url = createApiUrl(RESOURCE, titleID, environment);
  } else {
    url = createApiUrl(RESOURCE);
  }
  return axios.get(url, { params: newParams, cancelToken });
};
