import { createSelector } from 'reselect';

import { activitySettingsSelector } from 'playpants/components/App/selectors';
import { isStaffSelector } from '@demonware/devzone-core/modules/user/selectors';
import { orderedActivitiesSelector } from '../../selectors';
import { PUBLISH_TYPE } from './constants';

export const activitySelectedTypeSelector = createSelector(
  state => state.Scenes.Event.activity,
  activityState => activityState.selectedActivityType
);

export const initialValuesSelector = createSelector(
  activitySelectedTypeSelector,
  activityType => ({
    dateType: PUBLISH_TYPE.start,
    activityType: activityType === 'all' ? null : activityType,
  })
);

/* Activity Sidebar List */

export const filteredActivitiesSelector = createSelector(
  orderedActivitiesSelector,
  activitySelectedTypeSelector,
  (activities, selectedActivityType) =>
    selectedActivityType !== 'all'
      ? activities.filter(activity => activity.type === selectedActivityType)
      : activities
);

export const dropListActivitiesSelector = createSelector(
  filteredActivitiesSelector,
  listItems => ({
    [PUBLISH_TYPE.start]: listItems.filter(
      activity => activity.publish_on === 'on_start'
    ),
    [PUBLISH_TYPE.end]: listItems.filter(
      activity => activity.publish_on === 'on_end'
    ),
  })
);

/* Activity Settings */

const sortedActivitySettingsSelector = createSelector(
  activitySettingsSelector,
  activitySettings =>
    [...activitySettings].sort((a, b) => (a.name > b.name ? 1 : -1))
);

export const filteredActivitySettingsSelector = createSelector(
  sortedActivitySettingsSelector,
  isStaffSelector,
  (sortedActivities, isStaff) =>
    !isStaff
      ? sortedActivities.filter(activity => activity.enabled)
      : sortedActivities
);
