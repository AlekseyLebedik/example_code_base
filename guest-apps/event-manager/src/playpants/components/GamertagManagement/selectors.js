import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { getDurationFromSeconds } from 'playpants/helpers/dateTime';
import {
  currentProjectIdSelector,
  currentUserSelector,
} from 'playpants/components/App/selectors';

export const groupsBaseSelector = state => state.Components.GamertagManagement;

export const groupsSelector = createSelector(
  groupsBaseSelector,
  gamertagGroups => gamertagGroups.groups
);

/** Groups */
export const groupDataSelector = createSelector(
  groupsSelector,
  groupsState => groupsState.data
);
export const groupLoadingSelector = createSelector(
  groupsSelector,
  groupsState => groupsState.loading
);
export const nextGroupsSelector = createSelector(
  groupsSelector,
  groupsState => groupsState.next
);

/** User Hidden Groups Settings */
export const hiddenGroupsKeySelector = createSelector(
  currentProjectIdSelector,
  projectId => `hidden-gamertag-groups-${projectId}`
);
export const hiddenGroupsSelector = createSelector(
  currentUserSelector,
  hiddenGroupsKeySelector,
  (userProfile, groupKey) =>
    userProfile.settings && userProfile.settings[groupKey]
);

export const groupListSelector = createSelector(
  groupDataSelector,
  hiddenGroupsSelector,
  (groups, hiddenGroups) => {
    const groupList = hiddenGroups
      ? groups.map(g =>
          !hiddenGroups.includes(g.id.toString()) ? { ...g, active: true } : g
        )
      : groups;
    return sortBy(groupList, ['active', 'id']);
  }
);

/** Accounts */
export const accountsSelector = createSelector(
  groupsBaseSelector,
  gamertagGroups => gamertagGroups.accounts
);
export const accountListSelector = createSelector(
  accountsSelector,
  accountsState => accountsState.data
);

/** Timewarp Settings */
const timewarpSettingsDataSelector = createSelector(
  groupsBaseSelector,
  gamertagGroups => gamertagGroups.timewarpSettings.data
);

const timewarpSettingsSelector = createSelector(
  timewarpSettingsDataSelector,
  settings => (!isEmpty(settings) ? settings : {})
);

/** Form Initial Values */
export const initialValuesSelector = createSelector(
  accountListSelector,
  timewarpSettingsSelector,
  (accounts, settings) => ({
    ...settings,
    accounts,
    duration: getDurationFromSeconds(Math.abs(settings.time_delta)),
    negativeOffset: settings.time_delta < 0,
    provider: 'uno',
  })
);
