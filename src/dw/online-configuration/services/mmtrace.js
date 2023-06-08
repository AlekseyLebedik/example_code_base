import axios from 'dw/core/axios';
import { createApiUrl } from './helpers';

const RESOURCE = 'matchmaking';

/* Check Service */
export const checkMatchmakingService = params =>
  axios.get(
    createApiUrl(RESOURCE, params.title.id, params.environment.shortType)
  );

export const getDispatcherTelemetry = params =>
  axios.get(`${createApiUrl('dispatcher-telemetry')}`, { params });

export const getDispatcherTraceTelemetry = params =>
  axios.get(`${createApiUrl('dispatcher-trace-telemetry')}`, { params });

export const getOptimizerTelemetry = params =>
  axios.get(`${createApiUrl('optimizer-telemetry')}`, { params });

export const getClientTelemetry = params =>
  axios.get(`${createApiUrl('client-telemetry')}`, { params });

/* Uncomment the following line to use the API mock */
// export {
//   getClientTelemetry,
//   getDispatcherTraceTelemetry,
//   getDispatcherTelemetry,
//   getOptimizerTelemetry,
// } from './mock/mmtrace';
