import { createSelector } from 'reselect';

import { getSelectedConflictId } from 'playpants/scenes/Event/selectors';

export const conflictsQuerySelector = state =>
  state.Scenes.Event.conflicts.query;
export const conflictsSelector = state =>
  state.Scenes.Event.conflicts.conflictList;
export const conflictTypeSelector = state =>
  state.Scenes.Event.conflicts.conflictType;

export const conflictDetailsSelector = createSelector(
  conflictsSelector,
  getSelectedConflictId,
  (conflictList, conflictId) =>
    conflictId && conflictId.length >= 1 && conflictList && conflictList.length
      ? conflictList.find(
          conflict => conflict.conflicting_event.id === Number(conflictId[0])
        )
      : undefined
);

export const conflictActivityDetailsSelector = createSelector(
  conflictDetailsSelector,
  getSelectedConflictId,
  (conflictDetails, conflictId) =>
    conflictId && conflictId.length === 3 && conflictDetails
      ? conflictDetails.conflicts.find(
          conflict =>
            conflict.event_activity.id === Number(conflictId[1]) &&
            conflict.overlapping_event_activity.id === Number(conflictId[2])
        )
      : undefined
);
