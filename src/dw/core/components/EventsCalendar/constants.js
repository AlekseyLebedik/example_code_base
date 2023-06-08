export const LOCAL_STORAGE_CALENDAR_SETTINGS = 'calendarSettings';
export const LOCAL_STORAGE_PRESETS = 'calendarPreset';
export const CALENDAR_PRESETS_SETTINGS = 'calendar_presets_settings';

export const IGNORE_PRESET_KEYS = [
  'calendarSettingsVersion',
  'datePickerProps',
  'eventTimeOffset',
  'groupLoadingStatuses',
  'selectedDay',
  'sidebarHovering',
];

export const FILTER_TABS = ['DEFAULT', 'PLATFORMS', 'CUSTOM'];

export const ENV_TYPE_FILTERS = {
  Certification: 'cert',
  Development: 'dev',
  Live: 'live',
};

export const ENV_TYPES = ['live', 'dev', 'cert'];

export const EXTERNAL_EVENTS_TYPES = ['holidays', 'pmg'];

export const PLATFORM_FILTERS = [
  'CROSSPLAY',
  'PS5',
  'PS4',
  'XB1',
  'XBSX',
  'PSN',
  'XBL',
  'BNET',
  'PC',
  'STEAM',
  'SWITCH',
  'Multiple',
  'Unspecified',
];

export const DEMONWARE_EVENTS = [
  { id: 'criticalEvents', title: 'Critical Events' },
  { id: 'maintenance', title: 'Maintenance' },
  { id: 'incidents', title: 'Incidents' },
  { id: 'generalComments', title: 'General Comments' },
];

export const ABTESTING_STATUSES = [
  'active',
  'analysis',
  'archived',
  'config',
  'killed',
];

export const EXPYTESTS_STATUSES = ['proposed', 'approved'];

export const STORY_FILTERS = ['Group', 'Timewarp', 'None'];

export const EVENT_GROUPS_SCHEMA = {
  properties: {
    CustomEvent: { type: 'object' }, // Component
    CustomEventProps: {
      type: 'object',
      properties: { displayTimeWithTitle: { type: 'boolean' } },
    },
    GroupLink: { type: 'object' }, // Component
    classes: {
      type: 'object',
      patternProperties: {
        // Style class pattern is <group_type>-<event_type>(-<event_status>)?
        '^(w)+-(w)+-*(w)*$': { type: 'string' },
      },
    },
    customEventStyles: { type: 'object' }, // function
    eventDragDrop: { type: 'object' }, // function
    eventTypes: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        children: {
          type: 'array',
          items: { types: 'object', properties: { name: { type: 'string' } } },
        },
        selectedByDefault: { type: 'boolean' },
      },
    },
    events: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          end_at: { type: 'number' },
          env_type: {
            type: 'string',
            enum: ['Live', 'Certification', 'Development', 'Cross environment'],
          },
          event_type: {
            type: 'string',
            enum: [
              'eventManager',
              'demonwareEvents',
              'informationalEvents',
              'externalEvents',
              'abTesting',
              'expyTests',
            ],
          },
          id: { type: 'number' },
          is_deleted: { type: 'boolean' },
          is_manually_locked: { type: 'boolean' },
          is_private: { type: 'boolean' },
          is_restricted: { type: 'boolean' },
          is_schedule: { type: 'boolean' },
          is_template: { type: 'boolean' },
          manual_tags: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          platforms: {
            type: 'array',
            items: {
              type: 'string',
              enum: PLATFORM_FILTERS,
            },
          },
          project: { type: 'number' },
          projects: {
            type: 'array',
            items: {
              type: 'number',
            },
          },
          publish_at: { type: 'number' },
          status: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'active',
                'approved',
                'cancelled',
                'ended',
                'eventManager',
                'expired',
                'open',
                'pending',
                'published',
                'rejected',
                'scheduled',
                'status',
              ],
            },
          },
          title: { type: 'string' },
        },
      },
    },
    loading: {
      type: 'object',
      properties: {
        error: { type: 'boolean' },
        isLoading: { type: 'boolean' },
      },
    },
    modalId: { type: 'string' },
    modifyEvent: { type: 'object' }, // function
    onSelectEvent: { type: 'object' }, // function
    type: {
      type: 'string',
      enum: [
        'eventManager',
        'demonwareEvents',
        'informationalEvents',
        'externalEvents',
        'abTesting',
      ],
    },
    wrapper: { type: 'object' }, // function
  },
};

export const CALENDAR_SETTINGS_SCHEMA = {
  properties: {
    customViewOn: { type: 'boolean' },
    displayView: {
      type: 'string',
      enum: ['calendar', 'list', 'timeline'],
    },
    filters: {
      type: 'object',
      properties: {
        customTags: {
          type: 'object',
          required: ['unspecified', 'userTags'],
          properties: {
            unspecified: {
              type: 'boolean',
              default: false,
            },
            userTags: {
              type: 'object',
              patternProperties: {
                '^.+$': {
                  type: 'object',
                  required: ['checked', 'tags'],
                  properties: {
                    checked: {
                      type: 'boolean',
                      default: false,
                    },
                    tags: {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        environments: {
          type: 'object',
          required: [
            'Development',
            'Certification',
            'Live',
            'Cross Environment',
          ],
          properties: {
            Development: {
              type: 'boolean',
              default: false,
            },
            Certification: {
              type: 'boolean',
              default: false,
            },
            Live: {
              type: 'boolean',
              default: false,
            },
            'Cross Environment': {
              type: 'boolean',
              default: false,
            },
          },
        },
        gamertags: {
          type: 'object',
          patternProperties: {
            '^.+$': {
              type: 'boolean',
            },
          },
        },
        platforms: {
          type: 'object',
          patternProperties: {
            '^.+$': {
              type: 'boolean',
            },
          },
        },
        projects: {
          type: 'object',
          patternProperties: {
            '^.+$': {
              type: 'boolean',
            },
          },
        },
        sources: {
          type: 'object',
          properties: {
            abTesting: {
              type: 'object',
              title: 'The Abtesting Schema',
              required: ABTESTING_STATUSES,
              properties: {
                active: {
                  type: 'boolean',
                  default: false,
                },
                analysis: {
                  type: 'boolean',
                  default: false,
                },
                archived: {
                  type: 'boolean',
                  default: false,
                },
                config: {
                  type: 'boolean',
                  default: false,
                },
                killed: {
                  type: 'boolean',
                  default: false,
                },
              },
            },
            expyTests: {
              type: 'object',
              title: 'The EXPY Tests Schema',
              required: EXPYTESTS_STATUSES,
              properties: {
                approved: {
                  type: 'boolean',
                  default: false,
                },
                proposed: {
                  type: 'boolean',
                  default: false,
                },
              },
            },
            eventManager: {
              type: 'object',
              required: [
                'scheduled',
                'cancelled',
                'expired',
                'rejected',
                'ended',
                'published',
                'active',
                'open',
                'approved',
                'pending',
              ],
              properties: {
                scheduled: {
                  type: 'boolean',
                  default: false,
                },
                cancelled: {
                  type: 'boolean',
                  default: false,
                },
                expired: {
                  type: 'boolean',
                  default: false,
                },
                rejected: {
                  type: 'boolean',
                  default: false,
                },
                ended: {
                  type: 'boolean',
                  default: false,
                },
                published: {
                  type: 'boolean',
                  default: false,
                },
                active: {
                  type: 'boolean',
                  default: false,
                },
                open: {
                  type: 'boolean',
                  default: false,
                },
                approved: {
                  type: 'boolean',
                  default: false,
                },
                pending: {
                  type: 'boolean',
                  default: false,
                },
              },
            },
            informationalEvents: {
              type: 'object',
              properties: {
                demonware: {
                  type: 'boolean',
                  default: false,
                },
                'first-party': {
                  type: 'boolean',
                  default: false,
                },
                cdl: {
                  type: 'boolean',
                  default: false,
                },
              },
            },
            demonwareEvents: {
              type: 'object',
              properties: {
                criticalEvents: {
                  type: 'boolean',
                  default: true,
                },
                generalComments: {
                  type: 'boolean',
                  default: false,
                },
                incidents: {
                  type: 'boolean',
                  default: false,
                },
                maintenance: {
                  type: 'boolean',
                  default: false,
                },
              },
            },
            externalEvents: {
              type: 'object',
              properties: {
                holidays: {
                  type: 'object',
                  patternProperties: {
                    '^.+$': {
                      type: 'boolean',
                    },
                  },
                },
                'video-games': {
                  type: 'boolean',
                  default: false,
                },
                sports: {
                  type: 'boolean',
                  default: false,
                },
                pmg: {
                  type: 'object',
                  patternProperties: {
                    '^.+$': {
                      type: 'boolean',
                    },
                  },
                },
              },
            },
          },
        },
        stories: {
          type: 'object',
          required: ['Group', 'Timewarp', 'None'],
          properties: {
            Group: {
              type: 'boolean',
              default: true,
            },
            Timewarp: {
              type: 'boolean',
              default: true,
            },
            None: {
              type: 'boolean',
              default: true,
            },
          },
        },
      },
    },
    numberOfDays: { type: 'integer' },
    selectedView: {
      type: 'string',
      enum: ['day', 'week', 'month'],
    },
  },
};

export const STATUS_GROUPS = {
  active: 'Active',
  analysis: 'Analysis',
  approved: 'Approved',
  archived: 'Archived',
  cancelled: 'Cancelled',
  config: 'Config',
  ended: 'Ended',
  expired: 'Expired',
  killed: 'Killed',
  open: 'Open',
  pending: 'Pending',
  proposed: 'Proposed',
  published: 'Published',
  rejected: 'Rejected',
  scheduled: 'Scheduled',
};

export const HOUR = 3600;
export const DAY = 1000 * 60 * 60 * 24;
export const WEEK = DAY * 7;
export const MILLISECONDS_FORMAT = 1000;
