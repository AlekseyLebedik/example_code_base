/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { useSelector } from 'react-redux';
import * as fs from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';
import { makeHasFeaturesEnabledSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { RootState } from 'playpants/types/store';
import * as selectors from './selectors';
import {
  SCHEDULE_AB_TEST_DETAIL_ID,
  SCHEDULE_DEMONWARE_DETAIL_ID,
  SCHEDULE_EVENT_DETAIL_ID,
  SCHEDULE_EXPY_TEST_DETAIL_ID,
  SCHEDULE_EXTERNAL_DETAIL_ID,
} from './constants';

export const useNewEventsEnabled = (): boolean => {
  const hasFeatureSelector = useCallback(makeHasFeaturesEnabledSelector(), []);
  return useSelector((state: RootState) =>
    hasFeatureSelector(state, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      featureSwitches: fs.EM_USE_NEW_EVENTS as string,
      isStaffAllowed: false,
    })
  );
};

const useEventManagerGroup = () => {
  const events = useSelector(selectors.eventManagerEventsDataSelector, isEqual);
  const error = useSelector(selectors.eventManagerEventsErrorSelector);
  const isLoading = useSelector(selectors.eventManagerEventsLoadingSelector);
  return useMemo(
    () => ({
      events,
      loading: {
        error,
        isLoading,
      },
      type: 'eventManager',
      modalId: SCHEDULE_EVENT_DETAIL_ID,
    }),
    [events, error, isLoading]
  );
};

const useInformationalEventsGroup = () => {
  const events = useSelector(
    selectors.informationalEventsDataSelector,
    isEqual
  );
  const error = useSelector(selectors.informationalEventsErrorSelector);
  const isLoading = useSelector(selectors.informationalEventsLoadingSelector);
  return useMemo(
    () => ({
      events,
      loading: {
        error,
        isLoading,
      },
      type: 'informationalEvents',
      modalId: SCHEDULE_EVENT_DETAIL_ID,
    }),
    [events, error, isLoading]
  );
};
const useDemonwareEventsGroup = () => {
  const events = useSelector(selectors.demonwareEventsDataSelector, isEqual);
  const error = useSelector(selectors.demonwareEventsErrorSelector);
  const isLoading = useSelector(selectors.demonwareEventsLoadingSelector);
  return useMemo(
    () => ({
      events,
      loading: {
        error,
        isLoading,
      },
      type: 'demonwareEvents',
      modalId: SCHEDULE_DEMONWARE_DETAIL_ID,
    }),
    [events, error, isLoading]
  );
};
const useExternalEventsGroup = () => {
  const events = useSelector(selectors.externalEventsDataSelector, isEqual);
  const error = useSelector(selectors.externalEventsErrorSelector);
  const isLoading = useSelector(selectors.externalEventsLoadingSelector);
  return useMemo(
    () => ({
      events,
      loading: {
        error,
        isLoading,
      },
      type: 'externalEvents',
      modalId: SCHEDULE_EXTERNAL_DETAIL_ID,
    }),
    [events, error, isLoading]
  );
};
const useABTestingEventsGroup = () => {
  const events = useSelector(selectors.abTestsDataSelector, isEqual);
  const error = useSelector(selectors.abTestsErrorSelector);
  const isLoading = useSelector(selectors.abTestsLoadingSelector);
  return useMemo(
    () => ({
      events,
      loading: {
        error,
        isLoading,
      },
      type: 'abTesting',
      modalId: SCHEDULE_AB_TEST_DETAIL_ID,
    }),
    [events, error, isLoading]
  );
};
const useExpyTestingEventsGroup = () => {
  const events = useSelector(selectors.expyTestsDataSelector, isEqual);
  const error = useSelector(selectors.expyTestsErrorSelector);
  const isLoading = useSelector(selectors.expyTestsLoadingSelector);
  return useMemo(
    () => ({
      events,
      loading: {
        error,
        isLoading,
      },
      type: 'expyTests',
      modalId: SCHEDULE_EXPY_TEST_DETAIL_ID,
    }),
    [events, error, isLoading]
  );
};

export const useScheduleEventGroups = (): Record<string, unknown>[] => {
  const eventManagerGroup = useEventManagerGroup();
  const informationalGroup = useInformationalEventsGroup();
  const demonwareGroup = useDemonwareEventsGroup();
  const externalGroup = useExternalEventsGroup();
  const abTestGroup = useABTestingEventsGroup();
  const expyTestGroup = useExpyTestingEventsGroup();
  return useMemo(
    () => [
      eventManagerGroup,
      informationalGroup,
      demonwareGroup,
      externalGroup,
      abTestGroup,
      expyTestGroup,
    ],
    [
      eventManagerGroup,
      informationalGroup,
      demonwareGroup,
      externalGroup,
      abTestGroup,
      expyTestGroup,
    ]
  );
};
