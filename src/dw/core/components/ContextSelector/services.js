import axios from 'dw/core/axios';

import { createApiUrl } from 'dw/core/helpers/services';

export const fetchContextsForService = ({
  serviceName,
  titleId,
  envType,
  ...params
}) =>
  axios.get(`${createApiUrl('contexts', titleId, envType)}${serviceName}/`, {
    params,
  });

export const fetchContextsRegistryForService = ({
  serviceName,
  titleId,
  envType,
}) =>
  axios.get(
    `${createApiUrl('contexts-registry', titleId, envType)}${serviceName}/`
  );

// export { fetchContextsForService } from './mock/context';
