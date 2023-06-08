type ConflictLevel =
  | 'all-conflict-types'
  | 'event-overlap'
  | 'activity-overlap'
  | 'activity-title-overlap'
  | 'activity-title-conflict'
  | 'conflictToggleBlock';

// eslint-disable-next-line import/prefer-default-export
export const CONFLICT_LEVELS: ConflictLevel[] = [
  'all-conflict-types',
  'event-overlap',
  'activity-overlap',
  'activity-title-overlap',
  'activity-title-conflict',
];
