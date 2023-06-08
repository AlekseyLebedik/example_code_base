import { createSelector } from 'reselect';
import { getNowSubstracting } from 'playpants/helpers/dateTime';
import isEmpty from 'lodash/isEmpty';
import {
  eventSettingsSelector,
  currentUserSelector,
} from 'playpants/components/App/selectors';
import { splitConflictUrlId } from 'playpants/scenes/Event/components/Conflicts/helpers';
import {
  EVENT_TASK_STATES_TO_SIGNAL,
  USER_EVENT_SETTINGS,
} from 'playpants/constants/event';

/** General selectors */
export const activitySelector = state => state.Scenes.Event.activity;
export const discussionSelector = state => state.Scenes.Event.discussion;
export const eventSelector = state => state.Scenes.Event.event;
export const conflictsSelector = state => state.Scenes.Event.conflicts;
export const responsibilitiesSelector = state =>
  state.Scenes.Event.responsibilities;

/** Event/activity */
export const activityLoadingSelector = createSelector(
  activitySelector,
  activityState => activityState.loading
);

/** Event/discussion */
export const discussionDataSelector = createSelector(
  discussionSelector,
  discussionState => discussionState.data
);

export const discussionLoadingSelector = createSelector(
  discussionSelector,
  discussionState => discussionState.loading
);

/** Event/event */
export const eventDataSelector = createSelector(
  eventSelector,
  eventState => eventState.data
);

export const eventLoadingSelector = createSelector(
  eventSelector,
  eventState => eventState.loading
);

/** Event/event/data */
export const eventIdSelector = createSelector(
  eventDataSelector,
  eventState => eventState.id
);

export const eventTitleSelector = createSelector(
  eventDataSelector,
  eventState => eventState.title
);

export const eventPublishAtSelector = createSelector(
  eventDataSelector,
  eventData => eventData.publish_at
);

export const eventActivitiesSelector = createSelector(
  eventDataSelector,
  eventData => eventData.activities
);

export const eventEndAtSelector = createSelector(
  eventDataSelector,
  eventData => eventData.end_at
);

export const eventDurationSelector = createSelector(
  eventDataSelector,
  eventState =>
    eventState.end_at ? eventState.end_at - eventState.publish_at : null
);

export const tagsSelector = createSelector(eventDataSelector, eventState => [
  ...eventState.auto_tags,
  ...eventState.manual_tags,
]);

export const lockedBySelector = createSelector(
  eventDataSelector,
  eventState => eventState.locked_by
);

export const hasEndDateSelector = createSelector(
  eventDataSelector,
  eventState => eventState.end_at !== null
);

export const eventEnvSelector = createSelector(
  eventDataSelector,
  eventState => eventState.env_type
);

export const eventProjectSelector = createSelector(
  eventDataSelector,
  eventState => eventState.project
);

export const eventTaskSelector = createSelector(
  eventDataSelector,
  eventState => eventState.task
);

export const eventTypeSelector = createSelector(
  eventDataSelector,
  eventState => eventState.event_type
);

export const eventManagerTypeSelector = createSelector(
  eventTypeSelector,
  eventType => eventType === 'event-manager'
);

/** Event/responsibilities */
export const responsibilitiesListSelector = createSelector(
  responsibilitiesSelector,
  responsibilities => responsibilities.data
);

/** Other */
export const statusSelector = createSelector(
  eventDataSelector,
  eventSettingsSelector,
  currentUserSelector,
  lockedBySelector,
  (event, eventSettings, { id }, lockedBy) => {
    if (event.status && !isEmpty(eventSettings)) {
      const {
        name,
        is_read_only: readOnly,
        allow_open: canOpen,
        allow_cancel: canCancel,
        allow_delete: canDelete,
        allow_duplication: canDuplicate,
        allow_authorization: allowAuths,
        show_authorization: showAuths,
        allow_save_template: showTemplates,
      } = eventSettings?.statuses[event.status];
      return {
        name,
        readOnly,
        allowAuths,
        canOpen,
        canCancel,
        canDelete,
        canDuplicate,
        showAuths,
        showTemplates,
        deleted: event.is_deleted,
        failed: event.task && event.task.state === 'failed',
        locked:
          event.updated_at > getNowSubstracting(5, 'minutes') &&
          lockedBy &&
          lockedBy.id !== id,
      };
    }
    return {};
  }
);

export const disabledSelector = createSelector(
  statusSelector,
  status => status && (status.readOnly || status.locked || status.deleted)
);

export const fileStorageContextsLoadingSelector = createSelector(
  activitySelector,
  activity => activity.filestorage.contexts.loading
);

export const getSelectedConflictId = (_, props) =>
  props.params && splitConflictUrlId(props.params.id);

/* Badges */
export const userLastVisitsSelector = createSelector(
  currentUserSelector,
  eventDataSelector,
  ({ settings }, { id }) =>
    settings[`${USER_EVENT_SETTINGS.lastVisit.key}${id}`] || {}
);

const discussionBadgeCountSelector = createSelector(
  currentUserSelector,
  userLastVisitsSelector,
  discussionDataSelector,
  ({ id }, lastVisits, comments) =>
    (lastVisits &&
      comments.filter(
        comment =>
          comment.timestamp > lastVisits.discussion && comment.user.id !== id
      ).length) ||
    0
);

const authorizationsBadgeCountSelector = createSelector(
  eventDataSelector,
  currentUserSelector,
  ({ status, authorizers, authorizations }, { id }) =>
    status === 'pending' &&
    authorizers.some(a => a.id === id) &&
    isEmpty(authorizations.filter(a => a.id === id && a.status !== 'none'))
      ? 1
      : 0
);

const tasksBadgeBoolSelector = createSelector(
  eventTaskSelector,
  eventTask =>
    eventTask && EVENT_TASK_STATES_TO_SIGNAL.includes(eventTask.state)
);

const conflictsBadgeCountSelector = createSelector(
  conflictsSelector,
  ({ conflictList }) => conflictList.length
);

const workflowBadgeCountSelector = createSelector(
  authorizationsBadgeCountSelector,
  tasksBadgeBoolSelector,
  (authCount, tasksBool) => authCount + tasksBool && 1
);

export const badgeCountSelector = createSelector(
  workflowBadgeCountSelector,
  discussionBadgeCountSelector,
  tasksBadgeBoolSelector,
  conflictsBadgeCountSelector,
  (workflowCount, discussionCount, tasksBool, conflictsCount) => ({
    detailsCount: workflowCount,
    workflowCount,
    discussionCount,
    tasksBool,
    conflictsCount,
  })
);
