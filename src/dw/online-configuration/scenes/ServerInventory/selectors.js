import { createSelector } from 'reselect';
import uniqBy from 'lodash/uniqBy';
import get from 'lodash/get';

import { currentTitleEnvOptionsSelector } from 'dw/core/helpers/title-env-selectors';

const ENV_LIVE = 'live';

export const getServersAllocation = state =>
  state.Scenes.ServerInventory.serversAllocation.data || [];

export const getCurrentTitle = state =>
  state.Components.TitleSelector.currentTitle;

export const getPreviousTitle = state =>
  state.Components.TitleSelector.previousTitle;

export const getCurrentEnv = state => state.Components.TitleSelector.currentEnv;

export const getServerAllocationLoading = state =>
  state.Scenes.ServerInventory.serversAllocation.isLoading;

export const getEnvInMatchParams = (_, props) => props.match.params.env;

export const getDisableServerList = createSelector(
  getEnvInMatchParams,
  currentTitleEnvOptionsSelector,
  (env, options) =>
    env === ENV_LIVE && !get(options, 'show_server_list_prod', false)
);

export const getSelectedContext = (_, props) => props.match.params.context;

export const getSelectedBuildName = (_, props) => props.match.params.buildName;

export const getSelectedDataCenter = (_, props) =>
  props.match.params.dataCenter;

export const getContexts = createSelector(
  getServersAllocation,
  serversAllocation => uniqBy(serversAllocation, 'context').map(x => x.context)
);

const getCountsByField = (field, serversAllocation) =>
  serversAllocation.reduce((prevValues, curValue) => {
    const foundItem = prevValues.find(x => x.name === curValue[field]);
    const status = curValue.status.toLowerCase();
    if (foundItem) {
      return prevValues.map(item =>
        item === foundItem
          ? {
              ...foundItem,
              [`${status}Count`]:
                curValue.count + (foundItem[`${status}Count`] || 0),
            }
          : item
      );
    }
    return [
      ...prevValues,
      {
        name: curValue[field],
        [`${status}Count`]: curValue.count,
      },
    ];
  }, []);

export const getBuildNames = createSelector(
  getSelectedContext,
  getServersAllocation,
  (selectedContext, serversAllocation) =>
    getCountsByField(
      'buildName',
      serversAllocation.filter(x => x.context === selectedContext)
    )
);

export const getDataCenters = createSelector(
  getSelectedContext,
  getSelectedBuildName,
  getServersAllocation,
  (selectedContext, selectedBuildName, serversAllocation) =>
    getCountsByField(
      'dataCenter',
      serversAllocation.filter(
        x => selectedContext === x.context && selectedBuildName === x.buildName
      )
    )
);

export const getCounters = createSelector(
  getSelectedContext,
  getSelectedBuildName,
  getSelectedDataCenter,
  getBuildNames,
  getDataCenters,
  (
    selectedContext,
    selectedBuildName,
    selectedDataCenter,
    buildNames,
    dataCenters
  ) => {
    const empty = { idle: 0, allocated: 0 };
    if (!selectedContext) return empty;

    if (!selectedBuildName)
      return buildNames.reduce(
        (acc, build) => ({
          idle: acc.idle + get(build, 'idleCount', 0),
          allocated: acc.allocated + get(build, 'allocatedCount', 0),
        }),
        { ...empty }
      );

    if (!selectedDataCenter) {
      const buildName = buildNames.find(
        build => build.name === selectedBuildName
      );
      return buildName
        ? {
            idle: get(buildName, 'idleCount', 0),
            allocated: get(buildName, 'allocatedCount', 0),
          }
        : empty;
    }

    const dataCenter = dataCenters.find(dc => dc.name === selectedDataCenter);
    return dataCenter
      ? {
          idle: get(dataCenter, 'idleCount', 0),
          allocated: get(dataCenter, 'allocatedCount', 0),
        }
      : empty;
  }
);
