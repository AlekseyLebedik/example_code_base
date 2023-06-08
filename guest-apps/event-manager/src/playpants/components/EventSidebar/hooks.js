import { useSelector } from 'react-redux';
import { featureSwitches as fs } from '@demonware/devzone-core/access/FeatureSwitchesCheck';
import { makeHasFeaturesEnabledSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';

export const useEventFiltersEnabledCheck = () => {
  const hasFeaturesEnabledSelector = makeHasFeaturesEnabledSelector();
  return useSelector(state =>
    hasFeaturesEnabledSelector(state, {
      featureSwitches: [fs.EVENT_FILTERS_ENABLED],
      isStaffAllowed: false,
    })
  );
};

export const useInformationalEventsEnabledCheck = () => {
  const hasFeaturesEnabledSelector = makeHasFeaturesEnabledSelector();
  return useSelector(state =>
    hasFeaturesEnabledSelector(state, {
      featureSwitches: [fs.EVENT_FILTERS_ENABLED],
      isStaffAllowed: false,
    })
  );
};

export const useEventManagerEventsEnabledCheck = () => {
  const hasFeaturesEnabledSelector = makeHasFeaturesEnabledSelector();
  return useSelector(state =>
    hasFeaturesEnabledSelector(state, {
      featureSwitches: [fs.EVENT_MANAGER_EVENTS_ENABLED],
      isStaffAllowed: false,
    })
  );
};
