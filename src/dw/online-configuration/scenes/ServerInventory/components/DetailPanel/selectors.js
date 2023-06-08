import { createSelector } from 'reselect';
import compact from 'lodash/compact';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const getContext = (_, props) => props.context;
const getBuildName = (_, props) => props.buildname;
const getDataCenter = (_, props) => props.datacenter;

export const getServerList = createSelector(
  formatDateTimeSelector,
  state => state.Scenes.ServerInventory.serverList,
  (formatDateTime, serverList) => {
    if (!Array.isArray(serverList)) return serverList;

    return serverList.map(server => ({
      ...server,
      data: {
        ...server.data,
        allocated: server.data.allocated === '1',
        registrationTime: formatDateTime(server.data.registrationTime),
      },
    }));
  }
);

export const getPropMissing = createSelector(
  getContext,
  getBuildName,
  getDataCenter,
  (context, buildName, dataCenter) =>
    compact([context, buildName, dataCenter]).length < 3
);

export const getLoading = createSelector(
  getPropMissing,
  getServerList,
  (propMissing, serverList) => !propMissing && serverList === null
);

export const getEmpty = createSelector(
  getPropMissing,
  getServerList,
  (propMissing, serverList) =>
    propMissing || (Array.isArray(serverList) && serverList.length === 0)
);
