import { useEffect, useState, useContext } from 'react';
import isEqual from 'lodash/isEqual';

import { hasFeaturesEnabledFuncSelector } from '../../../access/FeatureSwitchesCheck/selectors';
import { usePermissions } from '../../../access/CheckPermissions';
import * as fs from '../../../access/FeatureSwitchesCheck/featureSwitches';
import { ContextConsumer } from '../../../AppStore';
import { VIEW_CRITICAL_EVENTS } from '../../../access/PermissionCheck/permissions';
import {
  fetchCriticalEvents,
  fetchMaintenance,
} from '../../../modules/notifications/actions';
import {
  criticalEventsSelector,
  maintenanceSelector,
} from '../../../modules/notifications/selectors';

export function useCriticalEvents(setUnread, setBadgeCount) {
  const { state, dispatch } = useContext(ContextConsumer);
  const fetchCriticalEvts = () => dispatch(fetchCriticalEvents());
  const hasFeatureSwitch = hasFeaturesEnabledFuncSelector(state);
  const [criticalEventsLoaded, setCriticalEventsLoaded] = useState(false);
  const [, , result] = usePermissions([VIEW_CRITICAL_EVENTS], 'company.*');
  const hasCriticalEventsPermission = result?.data?.permission || false;
  const currentCriticalEventsList = criticalEventsSelector(state);
  const currentCriticalEventsLS =
    JSON.parse(localStorage.getItem('currentCriticalEvents')) || undefined;
  const criticalEventsReadIds =
    JSON.parse(localStorage.getItem('criticalEventsReadIds')) || undefined;
  const [criticalEventsList, setCriticalEventsList] = useState([]);

  useEffect(() => {
    if (
      !criticalEventsLoaded &&
      hasFeatureSwitch([fs.NOTIFICATIONS_CRITICAL_EVENTS], false) &&
      hasCriticalEventsPermission
    ) {
      fetchCriticalEvts();
      setCriticalEventsLoaded(true);
    }
  }, [hasCriticalEventsPermission]);

  useEffect(() => {
    if (
      criticalEventsLoaded &&
      currentCriticalEventsList.length > 0 &&
      !isEqual(currentCriticalEventsList, currentCriticalEventsLS)
    ) {
      currentCriticalEventsList.forEach(item => {
        // eslint-disable-next-line no-param-reassign
        item.read = !(
          criticalEventsReadIds === undefined ||
          !criticalEventsReadIds.includes(item.id)
        );
      });
      setCriticalEventsList(currentCriticalEventsList);
      localStorage.setItem(
        'currentCriticalEvents',
        JSON.stringify(currentCriticalEventsList)
      );
      localStorage.setItem(
        'criticalEventsReadIds',
        JSON.stringify(currentCriticalEventsList.map(item => item.id))
      );
      setBadgeCount(
        prevCount =>
          prevCount +
          currentCriticalEventsList.filter(item => item.read === false).length
      );
      setUnread(preVal => ({ ...preVal, CriticalEvents: true }));
    }
  }, [criticalEventsList, currentCriticalEventsList]);
  const finalCriticalEventsList =
    criticalEventsList.length > 0
      ? criticalEventsList
      : currentCriticalEventsList;
  return finalCriticalEventsList;
}

export function useMaintenances(setUnread, setBadgeCount) {
  const { state, dispatch } = useContext(ContextConsumer);
  const fetchMaintenanceEvts = () => dispatch(fetchMaintenance());
  const hasFeatureSwitch = hasFeaturesEnabledFuncSelector(state);
  const [maintenanceListLoaded, setMaintenanceListLoaded] = useState(false);
  const currentMaintenanceList = maintenanceSelector(state);
  const currentMaintenanceLS =
    JSON.parse(localStorage.getItem('currentMaintenance')) || undefined;
  const valuesReadIds =
    JSON.parse(localStorage.getItem('valuesReadIds')) || undefined;
  const [maintenanceList, setMaintenanceList] = useState([]);

  useEffect(() => {
    if (
      !maintenanceListLoaded &&
      hasFeatureSwitch([fs.MAINTENANCE_ACTIVE], false)
    ) {
      fetchMaintenanceEvts();
      setMaintenanceListLoaded(true);
    }
  }, [maintenanceListLoaded]);

  useEffect(() => {
    if (
      hasFeatureSwitch([fs.MAINTENANCE_ACTIVE], false) &&
      currentMaintenanceList.length > 0 &&
      !isEqual(currentMaintenanceList, currentMaintenanceLS)
    ) {
      currentMaintenanceList.forEach(item => {
        // eslint-disable-next-line no-param-reassign
        item.read = !(
          valuesReadIds === undefined || !valuesReadIds.includes(item.id)
        );
      });
      setMaintenanceList(currentMaintenanceList);
      localStorage.setItem(
        'currentMaintenance',
        JSON.stringify(currentMaintenanceList)
      );
      localStorage.setItem(
        'valuesReadIds',
        JSON.stringify(currentMaintenanceList.map(item => item.id))
      );
      setBadgeCount(
        prevCount =>
          prevCount +
          currentMaintenanceList.filter(item => item.read === false).length
      );
      setUnread(preVal => ({ ...preVal, Maintenance: true }));
    }
  }, [maintenanceList, currentMaintenanceList]);
  // send old list if tracker list is empty
  const finalMaintenanceList =
    maintenanceList.length > 0 ? maintenanceList : currentMaintenanceList;
  return finalMaintenanceList;
}
