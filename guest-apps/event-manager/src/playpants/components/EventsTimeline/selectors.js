import { createSelector } from 'reselect';

export const conflictsSelector = state =>
  state.Components.EventsTimeline.conflicts;

const eventIdPropSelector = (_, props) => props?.eventId;

export const eventConflictDataSelector = createSelector(
  conflictsSelector,
  eventIdPropSelector,
  (conflicts, eventId) => conflicts[eventId] || {}
);
