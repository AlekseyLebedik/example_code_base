import * as AT from './actionTypes';

export const fetchMonitoringGroups = () => ({
  type: AT.MONITORING_GROUPS_FETCH,
});

export const fetchMonitoringGroupsSuccess = payload => ({
  type: AT.MONITORING_GROUPS_FETCH_SUCCESS,
  monitoringGroups: payload.data,
});
