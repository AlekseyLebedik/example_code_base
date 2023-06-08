import createStore from 'playpants/store';
import { currentProject } from './appProps';
import mockState from './mockState';

const { store } = createStore();

const { event } = mockState.Scenes.Event;

export const eventSummaryProps = {
  currentProject,
  event,
  setVisible: jest.fn(),
};

export const statelessEventSummaryProps = {
  ...eventSummaryProps,
  store,
  activitiesOnEnd: [],
  activitiesOnStart: [],
  baseUrl: '/event-manager/1/',
  blockPrimaryAction: false,
  classes: {},
  tags: ['test', 'COD'],
  endDate: 'Friday, August 9, 2019 2:47 PM',
  eventDuration: 'Monday, August 5, 2019 3:00 PM - Friday, August 9, 2019',
  eventSummaryTitles: [{ id: 1, name: 'MW-PS3', platform: 'PS3' }],
  publishDate: 'Monday, August 5, 2019 3:00 PM',
  publishTime: '03:00 PM',
  selectedView: 'month',
  uniqOnStart: [],
  uniqOnEnd: [],
  visible: true,
};

export const eventDetailActivityChipsProps = {
  uniqActivities: [],
  activities: [],
  classes: {},
};

export const eventItemChipsProps = {
  classes: {},
  uniqItems: [],
};

export const eventDetailHeaderProps = {
  className: '',
  avatarClassName: '',
  primary: '',
  secondary: '',
};

export const eventDetailItemProps = {
  disableTypography: false,
  icon: '',
  iconClassName: '',
  isHidden: false,
  linkTo: 'test/link',
  primary: '',
  secondary: '',
};

export const statusDotProps = {
  iconClassName: '',
  statusText: '',
};

export const eventDetailConflictProps = {
  ...statelessEventSummaryProps,
  conflicts: [
    {
      conflicts: [
        {
          activity_type: 'pubstorage',
          details: [],
          event_activity: {
            id: 5,
            type: 'pubstorage',
            activity: '{"files":[4]}',
            title_envs: [1],
          },
          overlapping_event_activity: {
            id: 8,
            type: 'pubstorage',
            activity: '{"files":[4]}',
            title_envs: [1],
          },
          severity: 'activity-title-conflict',
          titles: [1],
        },
      ],
      conflicting_event: {
        id: 2,
        title: 'Overlapping Event',
        status: 'open',
        activities: [8],
        project: 1,
      },
      severity: 'activity-title-conflict',
    },
  ],
  eventId: 1,
  onClick: jest.fn(),
  needsConfirmations: { conflictsCheck: true },
  requiresConfirmation: true,
  setNeedsConfirmations: jest.fn(),
};

export const publishNowConfirmationProps = {
  classes: {},
  needsConfirmations: { publishNowCheck: true },
  setNeedsConfirmations: jest.fn(),
};

export const endNowConfirmationProps = {
  classes: {},
  needsConfirmations: { endNowCheck: true },
  setNeedsConfirmations: jest.fn(),
};

export const eventTaskProps = {
  badgeCount: { discussion: 1, tasks: 1 },
  classes: {},
  eventData: { task: { title: 'test', state: 'title state' } },
};

export const eventStatusIndicatorProps = {
  classes: {
    [`eventManager-active-noEnd`]: {
      backgroundColor: `transparent !important`,
    },
    [`eventManager-active`]: {
      backgroundColor: `green`,
    },
  },
  displayTimeWithTitle: true,
  envType: 'Development',
  eventStatus: 'active',
  isCalendarView: true,
  parentClasses: 'test',
  platforms: ['CROSSPLAY', 'PC'],
  taskStatus: 'failed',
  type: 'eventManager',
};
