/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback, useEffect, useState } from 'react';
import {
  useEventFiltersEnabledCheck,
  useInformationalEventsEnabledCheck,
  useEventManagerEventsEnabledCheck,
} from 'playpants/components/EventFilters/hooks';
import isEqual from 'lodash/isEqual';
import { useUserProfileActions } from '@demonware/devzone-core/modules/user/hooks';
import ScheduleComponent from 'playpants/components/EventsTimeline';
import getPublishAtRange from 'playpants/helpers/getPublishAtRange';
import { useInterval, useEMPermissionsResult } from 'playpants/hooks';
import {
  allAffiliatedProjectsSelector,
  currentProjectIdSelector,
  enabledMaxCalCountriesSelector,
  shouldUseProfileSettingsSelector,
} from 'playpants/components/App/selectors';
import { infoEventTypesSelector } from 'playpants/components/ScheduleComponent/selectors';
import {
  hiddenGroupsKeySelector,
  hiddenGroupsSelector,
} from 'playpants/components/GamertagManagement/selectors';
import { GamertagGroup } from 'playpants/types/schedule';
import { useAppSelector, useAppDispatch } from 'playpants/redux-hooks';
import * as selectors from './selectors';
import * as actions from './actions';
import { CREATE_EVENT_FORM, SCHEDULE_GAMERTAG_DETAIL_ID } from './constants';
import { useNewEventsEnabled, useScheduleEventGroups } from './hooks';

interface Params {
  project__in: string;
  publish_at__range: string | null;
}

interface EMParams extends Params {
  event_type?: string;
}

interface InfoParams extends Params {
  event_type__in?: string;
}

interface ExternalParams {
  start_at__range: string | null;
  tags__tag_type: string;
  tags__value__in: string;
}

export const Schedule = (): JSX.Element => {
  const {
    user: {
      actions: { createUserProfileSetting, updateUserProfileSetting },
    },
  } = useUserProfileActions();
  const newEventsEnabled = useNewEventsEnabled();
  const userHiddenGroupsKey = useAppSelector(hiddenGroupsKeySelector, isEqual);
  const userHiddenGroupsSettings = useAppSelector(
    hiddenGroupsSelector,
    isEqual
  );
  const useProfileSettings = useAppSelector(
    shouldUseProfileSettingsSelector,
    isEqual
  );
  // creating user settings if none already available
  useEffect(() => {
    if (!useProfileSettings && useProfileSettings) {
      createUserProfileSetting({ key: userHiddenGroupsKey, value: '[]' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHiddenGroupsKey]);
  const dispatch = useAppDispatch();
  const onFetchGamertagGroups = useCallback(
    (params: { type: string; project: number }, append?: boolean) =>
      dispatch(actions.fetchGamertagGroups(params, append)),
    [dispatch]
  );
  const permissions = useEMPermissionsResult();
  const project = useAppSelector(currentProjectIdSelector, isEqual);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (permissions.adminPermission && project)
      onFetchGamertagGroups({ type: 'gamertag-management', project });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Re-fetch gamertag groups to maintain live data
  useInterval(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!newEventsEnabled && permissions.adminPermission && project)
      onFetchGamertagGroups({ type: 'gamertag-management', project }, true);
  }, 60000);
  const externalCountries: string[] = useAppSelector(
    enabledMaxCalCountriesSelector,
    isEqual
  );
  const affiliatedProjectIds: number[] = useAppSelector(
    allAffiliatedProjectsSelector,
    isEqual
  );
  const infoTypes: string[] = useAppSelector(infoEventTypesSelector, isEqual);
  const onFetchABTests = useCallback(
    () => dispatch(actions.fetchABTests()),
    [dispatch]
  );
  const onFetchExpyTests = useCallback(
    () => dispatch(actions.fetchExpyTests()),
    [dispatch]
  );
  const onFetchDemonwareEvents = useCallback(
    (params?: ExternalParams) => dispatch(actions.fetchDemonwareEvents(params)),
    [dispatch]
  );
  const onFetchEventManagerEvents = useCallback(
    (params?: EMParams) => dispatch(actions.fetchEventManagerEvents(params)),
    [dispatch]
  );
  const onFetchExternalEvents = useCallback(
    (params?: ExternalParams) => dispatch(actions.fetchExternalEvents(params)),
    [dispatch]
  );
  const onFetchInformationalEvents = useCallback(
    (params?: InfoParams) => dispatch(actions.fetchInformationalEvents(params)),
    [dispatch]
  );
  const eventFiltersEnabled = useEventFiltersEnabledCheck();
  const informationalEventsEnabled = useInformationalEventsEnabledCheck();
  const eventManagerEventsEnabled = useEventManagerEventsEnabledCheck();
  const handleFetchEvents = useCallback(
    (groups: string[], range: { startRange: number; endRange: number }) => {
      groups.forEach((group: string) => {
        if (group === 'abTesting') {
          onFetchABTests();
        } else if (group === 'expyTests') {
          onFetchExpyTests();
        } else if (group === 'demonwareEvents') {
          onFetchDemonwareEvents();
        } else if (group === 'externalEvents') {
          const params = {
            start_at__range: getPublishAtRange(range),
            tags__tag_type: 'country',
            tags__value__in: externalCountries.toString(),
          };
          onFetchExternalEvents(params);
        } else if (
          group === 'eventManager' &&
          (!eventFiltersEnabled || eventManagerEventsEnabled)
        ) {
          const params = {
            project__in: affiliatedProjectIds.toString(),
            publish_at__range: getPublishAtRange(range),
          };
          (params as EMParams).event_type = 'event-manager';
          onFetchEventManagerEvents(params);
        } else if (
          group === 'informationalEvents' &&
          (!eventFiltersEnabled || informationalEventsEnabled)
        ) {
          // Latest Event Filters do not need Informational events
          const params = {
            project__in: affiliatedProjectIds.toString(),
            publish_at__range: getPublishAtRange(range),
          };
          (params as InfoParams).event_type__in = infoTypes.toString();
          onFetchInformationalEvents(params);
        }
      });
    },
    [
      infoTypes,
      onFetchABTests,
      onFetchDemonwareEvents,
      onFetchExpyTests,
      onFetchExternalEvents,
      affiliatedProjectIds,
      onFetchEventManagerEvents,
      onFetchInformationalEvents,
      externalCountries,
      eventFiltersEnabled,
      informationalEventsEnabled,
      eventManagerEventsEnabled,
    ]
  );
  const gamertagGroupsRaw: GamertagGroup[] = useAppSelector(
    selectors.scheduleGamertagGroupsFormattedSelector,
    isEqual
  );
  const [gamertagGroups, setGamertagGroups] =
    useState<GamertagGroup[]>(gamertagGroupsRaw);
  useEffect(() => {
    if (!isEqual(gamertagGroupsRaw, gamertagGroups))
      setGamertagGroups(gamertagGroupsRaw);
  }, [gamertagGroupsRaw, gamertagGroups, setGamertagGroups]);
  const updateHiddenGamertagList = useCallback(
    (gamertags: GamertagGroup) => {
      const activeGroupList = new Set(userHiddenGroupsSettings);
      Object.entries(gamertags).forEach(([k, v]) =>
        gamertagGroups.forEach((group: { name: string; id: number }) => {
          if (group.name === k) {
            const id = group.id.toString();
            if (activeGroupList.has(id) && v) {
              activeGroupList.delete(id);
            } else if (!activeGroupList.has(id) && v === false) {
              activeGroupList.add(id);
            }
          }
        })
      );
      if (useProfileSettings) {
        updateUserProfileSetting(userHiddenGroupsKey, {
          value: JSON.stringify([...activeGroupList]),
        });
      }
    },
    [
      userHiddenGroupsSettings,
      gamertagGroups,
      useProfileSettings,
      updateUserProfileSetting,
      userHiddenGroupsKey,
    ]
  );

  const eventGroups = useScheduleEventGroups();
  return (
    <ScheduleComponent
      createEventModalId={CREATE_EVENT_FORM}
      gamertagDetailModalId={SCHEDULE_GAMERTAG_DETAIL_ID}
      gamertagGroups={gamertagGroups}
      onFetchEvents={handleFetchEvents}
      onFetchGamertagGroups={onFetchGamertagGroups}
      _updateHiddenGamertagList={updateHiddenGamertagList}
      eventGroups={eventGroups}
      eventLoading={useAppSelector(selectors.eventsLoadingSelector)}
      eventError={useAppSelector(selectors.eventsErrorSelector)}
    />
  );
};

export default Schedule;
