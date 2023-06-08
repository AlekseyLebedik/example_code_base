export const USER_EVENT_SETTINGS = {
  lastVisit: {
    key: 'em_last_visit_event_',
    value: { discussion: 0 },
  },
};

export const EVENT_OVER_STATUSES = ['cancelled', 'ended', 'expired'];

export const EVENT_TASK_STATES_TO_SIGNAL = [
  'failed',
  'in-progress',
  'timed-out',
];

export const REFETCH_STATUSES = ['pending', 'approved', 'scheduled', 'active'];
