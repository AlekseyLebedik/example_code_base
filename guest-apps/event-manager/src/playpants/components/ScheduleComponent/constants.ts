export const SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS = {
  AB_TESTING: 'abTests',
  EXPY_TESTING: 'expyTests',
  INFORMATIONAL: 'informationalEvents',
  EVENT_MANAGER: 'eventManagerEvents',
  EXTERNAL: 'externalEvents',
  DEMONWARE: 'demonwareEvents',
};

export const HOUR = 60 * 60;

export const EventStates = Object.freeze({
  Active: 'active',
  Approved: 'approved',
  Cancelled: 'cancelled',
  Ended: 'ended',
  EventManager: 'eventManager',
  Expired: 'expired',
  Open: 'open',
  Pending: 'pending',
  Published: 'published',
  Rejected: 'rejected',
  Scheduled: 'scheduled',
  Status: 'status',
});

export const EVENT_MANAGER_STATES = [
  EventStates.Active,
  EventStates.Approved,
  EventStates.Cancelled,
  EventStates.Ended,
  EventStates.EventManager,
  EventStates.Expired,
  EventStates.Open,
  EventStates.Pending,
  EventStates.Published,
  EventStates.Rejected,
  EventStates.Scheduled,
  EventStates.Status,
];

export const EVENT_TASK_STATES = [
  'cancelled',
  'failed',
  'inProgress',
  'succeeded',
  'timedOut',
];

export const EXTERNAL_EVENT_STATES = [
  'externalEvents',
  'holidays',
  'video-games',
  'sports',
  'pmg',
];

export const DEMONWARE_EVENT_STATES = [
  'demonwareEvents',
  'criticalEvents',
  'generalComments',
  'incidents',
  'maintenance',
];

export const ABTESTING_EVENT_STATES = [
  'abTesting',
  'active',
  'analysis',
  'archived',
  'config',
  'killed',
];

export const EXPY_EVENT_STATES = ['expyTests', 'proposed', 'approved'];

export const INFORMATIONAL_EVENTS_STATES = [
  ...EVENT_MANAGER_STATES,
  'demonware',
  'informationalEvents',
  'first-party',
  'cdl',
];

type DemonwareEventType = {
  name: string;
  children?: Record<string, DemonwareEventType> | null;
  selectedByDefault: boolean;
};

export const DEMONWARE_EVENT_TYPES = (
  isStaff: boolean
): { demonwareEvents: DemonwareEventType } => ({
  demonwareEvents: {
    name: 'Demonware',
    children: {
      criticalEvents: {
        name: 'Critical Events',
        children: null,
        selectedByDefault: true,
      },
      maintenance: {
        name: 'Maintenance',
        children: null,
        selectedByDefault: false,
      },
      ...(isStaff && {
        generalComments: {
          name: 'General Comments',
          children: null,
          selectedByDefault: false,
        },
        incidents: {
          name: 'Incidents',
          children: null,
          selectedByDefault: false,
        },
      }),
    },
    selectedByDefault: false,
  },
});

export const AB_TESTING_EVENT_TYPES = {
  abTesting: {
    name: 'A/B Testing',
    children: {
      active: {
        name: 'Active',
        children: null,
        selectedByDefault: false,
      },
      analysis: {
        name: 'Analysis',
        children: null,
        selectedByDefault: false,
      },
      archived: {
        name: 'Archived',
        children: null,
        selectedByDefault: false,
      },
      config: {
        name: 'Configuration',
        children: null,
        selectedByDefault: false,
      },
      killed: {
        name: 'Killed',
        children: null,
        selectedByDefault: false,
      },
    },
    selectedByDefault: false,
  },
};

export const EXPY_TESTING_EVENT_TYPES = {
  expyTests: {
    name: 'EXPY',
    children: {
      proposed: {
        name: 'Proposed',
        children: null,
        selectedByDefault: false,
      },
      approved: {
        name: 'Approved',
        children: null,
        selectedByDefault: false,
      },
    },
    selectedByDefault: false,
  },
};

export const EXPY_STATUS_TRANSLATION = {
  Proposal: 'proposed',
  Ready: 'approved',
};

export const DISPLAY_TIME_WITH_TITLE = true;

export const REPEAT_EVENT_INTERVALS = {
  days: 'Day(s)',
  weeks: 'Week(s)',
  months: 'Month(s)',
};

export const REPEAT_EVENT_OPTIONS = [
  { value: 'never', label: 'Never' },
  { value: 'repeat', label: 'Repeat' },
];

export const EM_EVENT_TYPES = {
  Certification: 'cert',
  Development: 'dev',
  Live: 'live',
  Unknown: 'crossEnv',
};

export const SOURCES_EVENT_TYPES = [
  'eventManager',
  'demonwareEvents',
  'informationalEvents',
  'externalEvents',
  'abTesting',
];

export const DEMONWARE_EVENTS_TYPE_NAME_MAP = {
  criticalEvents: 'Critical Event',
  generalComments: 'General Comment',
  incidents: 'Incident',
  maintenance: 'Maintenance',
};
