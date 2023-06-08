import flatMap from 'lodash/flatMap';
import lowerCase from 'lodash/lowerCase';
import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';

import { getNowTimestamp } from 'playpants/helpers/dateTime';

import { EVENT_OVER_STATUSES } from 'playpants/constants/event';
import { CONFLICT_SEVERITY_ORDER } from 'playpants/constants/conflicts';
/* Conflict Sidebar helpers */

export const conflictQueryMatch = (conflictStr, query) =>
  conflictStr.toLowerCase().includes(query.toLowerCase());

export const filterConflicts = (conflicts, searchQuery, conflictType) =>
  conflicts
    .filter(conflict =>
      conflictType === 'all' ? conflict : conflict.severity === conflictType
    )
    .filter(conflict =>
      !/^\d+$/.test(searchQuery)
        ? conflictQueryMatch(conflict.conflicting_event.title, searchQuery) ||
          conflict.conflicts.find(
            c =>
              conflictQueryMatch(c.activity_type, searchQuery) ||
              conflictQueryMatch(c.event_activity.type, searchQuery) ||
              conflictQueryMatch(c.overlapping_event_activity.type, searchQuery)
          )
        : String(conflict.conflicting_event.id).includes(searchQuery)
    );

/* Conflict Details helpers */

export const getPubVarsConflicts = (variableSets, details) =>
  variableSets &&
  flatMap(
    variableSets.map(varSet =>
      sortBy(uniq(Object.keys(varSet.variables)))
        .map(
          variable =>
            varSet.variables[variable] && {
              variable,
              value: varSet.variables[variable],
              context: varSet.context,
              groupId: varSet.group_id,
              namespace: varSet.namespace,
            }
        )
        .filter(variable =>
          details.find(
            detail =>
              detail.context === varSet.context &&
              detail.group_id === varSet.group_id &&
              detail.namespace === varSet.namespace &&
              detail.conflicting_variables.find(cv => cv === variable.variable)
          )
        )
    )
  );

export const getConflictEventInfo = event =>
  `Event "${event.title}" ID ${event.id}`;

export const getConflictActivityInfo = (activity1, activity2) =>
  `${activity1.type} ${activity1.id} / ${activity2.type} ${activity2.id}`;

export const isConflictingEventSelected = (eventId, selectedEventId) =>
  !!(selectedEventId && Number(selectedEventId) === eventId);

export const isConflictingActivitySelected = (
  eventId,
  activityId,
  overlappingActivityId,
  conflictingEventId,
  conflictingActivityId,
  conflictingOverlappingActivityId
) =>
  !!(
    conflictingEventId &&
    conflictingActivityId &&
    conflictingOverlappingActivityId &&
    Number(conflictingEventId) === eventId &&
    Number(conflictingActivityId) === activityId &&
    Number(conflictingOverlappingActivityId) === overlappingActivityId
  );

export const splitConflictUrlId = conflictId =>
  conflictId.length
    ? conflictId.split(',').map(id => Number(id))
    : [undefined, undefined, undefined];

export const sortConflicts = conflicts =>
  sortBy(conflicts, conflict => [
    CONFLICT_SEVERITY_ORDER[conflict.severity],
    lowerCase(conflict.conflicting_event.title),
    conflict.conflicting_event.id,
  ]).map(conflict => ({
    ...conflict,
    conflicts: sortBy(conflict.conflicts, c => [
      CONFLICT_SEVERITY_ORDER[c.severity],
      c.event_activity.type,
      c.event_activity.id,
      c.overlapping_event_activity.type,
      c.overlapping_event_activity.id,
    ]),
  }));

export const getTitleFromTitleEnv = (titles, titleEnv) =>
  titleEnv
    ? titles.find(t => t.environments.find(tEnv => tEnv.id === titleEnv))
    : undefined;

export const isEventOver = event =>
  EVENT_OVER_STATUSES.find(status => status === event.status) ||
  (event.end_at
    ? getNowTimestamp() > event.end_at
    : getNowTimestamp() > event.publish_at);
