import axios from 'dw/core/axios';
import { currentTitle } from './helpers';

// export { getScripts } from './mock/scriptLaunch';

export const getScripts = (service, params) =>
  axios.get(
    `titles/${currentTitle()}/script-launch-service/${service}/staged-scripts/`,
    { params }
  );

export const uploadScript = (service, data) =>
  axios.post(
    `titles/${currentTitle()}/script-launch-service/${service}/staged-scripts/`,
    data
  );
