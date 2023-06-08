import axios from 'dw/core/axios';
import {
  FAVORITE_COMMANDS_TYPE,
  RECENT_COMMANDS_TYPE,
} from 'dw/online-configuration/scenes/RemoteCalls/slice';
import { EXPORT_LOGS_COUNT } from 'dw/config';
import { createApiUrl } from './helpers';

const RESOURCE = 'mmp';

/* Call Search */

export const getCalls = params =>
  axios.get(`${createApiUrl(RESOURCE)}calls/`, { params });

/* Server Logs */
export const getServerLogs = ({ userId, ...params }) => {
  const newParams = {
    ...params,
    userId: userId && userId.hasOwnProperty('value') ? userId.value : userId,
  };
  return axios.get(`${createApiUrl()}logs/`, { params: newParams });
};

export const exportServerLogs = ({ userId, fileType, ...params }) => {
  const newParams = {
    ...params,
    userId: userId?.value || userId,
    count: EXPORT_LOGS_COUNT,
  };
  const headers = { Accept: `text/${fileType}` };
  return axios.get(`${createApiUrl()}logs/`, { params: newParams, headers });
};

/* Server Logs Mock */
// export { getServerLogs } from './mock/debugging';

/* Remote Calls */
export const createRemoteCommandCall = ({ payload, params }) =>
  axios.post(`${createApiUrl('remote-calls')}`, payload, { params });

export const fetchRemoteCalls = () => {
  const storeCommands = JSON.parse(localStorage.getItem('remoteCommands'));
  const commands = {
    [FAVORITE_COMMANDS_TYPE]: storeCommands[FAVORITE_COMMANDS_TYPE] || [],
    [RECENT_COMMANDS_TYPE]: storeCommands[RECENT_COMMANDS_TYPE] || [],
    ...storeCommands,
  };
  return { data: commands };
};

export const addRemoteCall = ({ data, commandType }) => {
  const remoteCommands =
    JSON.parse(localStorage.getItem('remoteCommands')) || {};
  const { [commandType]: current = [] } = remoteCommands;

  const newCommandList = [data, ...current];
  remoteCommands[commandType] = newCommandList;
  localStorage.setItem('remoteCommands', JSON.stringify(remoteCommands));
  return { data: newCommandList };
};

export const deleteRemoteCall = ({ data, commandType }) => {
  const remoteCommands =
    JSON.parse(localStorage.getItem('remoteCommands')) || {};
  const { [commandType]: current = [] } = remoteCommands;

  const newCommandList = current.filter(cmd => cmd.id !== data.id);
  remoteCommands[commandType] = newCommandList;
  localStorage.setItem('remoteCommands', JSON.stringify(remoteCommands));
  return { data: newCommandList };
};
