import React from 'react';

import moment from 'moment-timezone';
import range from 'lodash/range';

import { dateToUTCTimestamp } from 'dw/core/helpers/date-time';

import { setViewComponents } from './helpers';

const eventsCalendarSettings = {
  customViewOn: false,
  envTypeFilters: {
    Development: true,
    Certification: true,
    Live: true,
  },
  eventTimeOffset: 0,
  filters: {
    customTags: {
      unspecified: true,
      userTags: {
        0: {
          checked: true,
          tags: ['PS4', 'XBOX'],
        },
        1: {
          checked: true,
          tags: ['COD', 'BO4'],
        },
      },
    },
    environments: {
      Development: true,
      Certification: true,
      Live: true,
      'Cross Environment': true,
    },
    gamertags: {},
    platforms: {
      CROSSPLAY: true,
      PC: true,
      PS4: true,
      SWITCH: true,
      XB1: true,
      Unspecified: true,
    },
    projects: {
      'GTR Project': true,
      'Call of Duty: Modern Warfare 2': true,
      'Permissions: Test 1': true,
      'Cross Project': true,
    },
    sources: {
      eventManager: {
        applied: false,
        approved: true,
        cancelled: false,
        expired: false,
        pending: false,
        rejected: false,
        scheduled: false,
        testing: false,
        'test-failed': false,
      },
      abTesting: {
        active: false,
        analysis: false,
        archived: false,
        config: false,
        killed: false,
      },
      informationalEvents: { demonware: true },
      demonwareEvents: {
        criticalEvents: true,
        generalComments: true,
        incidents: true,
        maintenance: true,
      },
      externalEvents: {
        holidays: true,
        pmg: { Other: true },
        'video-games': false,
        sports: false,
      },
    },
    stories: undefined,
  },
  displayView: 'calendar',
  groupLoadingStatuses: {
    eventManager: {
      error: null,
      isLoading: false,
    },
    abTesting: {
      error: null,
      isLoading: false,
    },
    informationalEvents: {
      error: null,
      isLoading: false,
    },
    demonwareEvents: {
      error: null,
      isLoading: false,
    },
    externalEvents: {
      error: null,
      isLoading: false,
    },
  },
  numberOfDays: 30,
  selectedDay: moment('2019-01-01T00:00:00Z'),
  selectedStyle: 'sources',
  selectedView: 'month',
};

const eventGroups = [
  {
    classes: {
      applied: 'applied-style',
      approved: 'approved-style',
      cancelled: 'cancelled-style',
      expired: 'expired-style',
      pending: 'pending-style',
      rejected: 'rejected-style',
      scheduled: 'scheduled-style',
      testing: 'testing-style',
      'test-failed': 'test-failed-style',
    },
    customEventStyles: event => event.status,
    EventDetails: () => <div />,
    events: [
      {
        allDay: false,
        id: 1,
        end: 1555460772,
        publish_at: 1555460772,
        start: 1555460772,
        status: 'approved',
        title: 'test',
        type: 'eventManager',
      },
      {
        allDay: false,
        id: 1,
        end: 1555460772,
        publish_at: 1555460772,
        start: 1555460772,
        status: 'pending',
        title: 'test 2',
        type: 'eventManager',
      },
    ],
    eventDragDrop: jest.fn(),
    eventTypes: {
      eventManager: {
        name: 'Event Manager',
        children: {
          checkedByMe: {
            name: 'Checked By Me',
            children: null,
            selectedByDefault: false,
          },
          status: {
            name: 'Status',
            children: {
              applied: {
                name: 'Applied',
                children: null,
                selectedByDefault: true,
              },
              approved: {
                name: 'Approved',
                children: null,
                selectedByDefault: true,
              },
              cancelled: {
                name: 'Cancelled',
                children: null,
                selectedByDefault: true,
              },
              expired: {
                name: 'Expired',
                children: null,
                selectedByDefault: true,
              },
              pending: {
                name: 'Pending',
                children: null,
                selectedByDefault: true,
              },
              rejected: {
                name: 'Rejected',
                children: null,
                selectedByDefault: true,
              },
              scheduled: {
                name: 'Scheduled',
                children: null,
                selectedByDefault: true,
              },
              testing: {
                name: 'Testing',
                children: null,
                selectedByDefault: true,
              },
              'test-failed': {
                name: 'Test Failed',
                children: null,
                selectedByDefault: true,
              },
            },
          },
        },
        selectedByDefault: true,
      },
    },
    GroupLink: () => <div />,
    loading: {
      error: null,
      isLoading: false,
    },
    modifyEvent: jest.fn(),
    type: 'eventManager',
    wrapper: jest.fn(),
  },
];

const filteredEvents = [
  {
    allDay: false,
    id: 1,
    end: 1555460772,
    publish_at: 1555460772,
    start: 1555460772,
    status: 'approved',
    title: 'test',
    type: 'eventManager',
  },
];

export const eventCalendarTestProps = {
  addCustomTagSet: jest.fn(),
  changeCalendarView: jest.fn(),
  changeNumberOfDays: jest.fn(),
  classes: {},
  clearEventsCalendarSettings: jest.fn(),
  copyLinkToClipboard: jest.fn(),
  customRangeError: '',
  customRangeInput: 30,
  customViewOn: false,
  createEventModalId: 'CREATE_EVENT',
  date: moment('2019-01-01T00:00:00Z').toDate(),
  daysWithDots: {},
  defaultDate: moment('2019-01-01T00:00:00Z'),
  disabledFilters: {},
  eventGroups,
  eventsCalendarSettings,
  eventTimeOffset: 0,
  filteredEvents,
  filteredGamertagGroups: [],
  handleSelectEvent: jest.fn(),
  handleOpenCreateEventModal: jest.fn(),
  history: { replace: jest.fn() },
  localizer: { format: jest.fn() },
  location: { search: '' },
  navigateCalendar: jest.fn(),
  onChangeDatePickerSelection: jest.fn(),
  onDrillDown: jest.fn(),
  onEventDrop: jest.fn(),
  onFetchEvents: jest.fn(),
  onNavigate: jest.fn(),
  onPresetsUpdate: jest.fn(),
  onSelectSlot: jest.fn(),
  onSetCalendarSettings: jest.fn(),
  permissions: {
    adminPermission: true,
    adminUser: true,
    emUser: true,
    eventWritePermission: true,
    staffUser: true,
  },
  platforms: ['CROSSPLAY', 'PC', 'PS4', 'SWITCH', 'XB1'],
  presetOptions: [],
  currentProject: { id: 1 },
  projectId: '1',
  setCalendarSettings: jest.fn(),
  setCustomEvent: jest.fn(),
  setDayMonthStyle: jest.fn(),
  setEventStyle: jest.fn(),
  setNonCustomDays: jest.fn(),
  showAllColors: false,
  sidebar: false,
  toastMsg: jest.fn(),
  toggleDisplayView: jest.fn(),
  userTimezone: 'UTC',
  views: setViewComponents(['day', 'week', 'month']),
};

const events = [
  {
    created_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
    end: moment('2019-01-01T00:00:00Z').toDate(),
    publish_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
    start: moment('2019-01-01T00:00:00Z').toDate(),
    status: 'pending',
    title: 'Test 1',
    type: 'eventManager',
  },
  {
    created_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
    end: moment('2019-01-01T00:00:00Z').toDate(),
    publish_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
    start: moment('2019-01-01T00:00:00Z').toDate(),
    status: 'approved',
    title: 'Test 2',
    type: 'eventManager',
  },
  {
    created_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
    end: moment('2019-01-01T00:00:00Z').toDate(),
    publish_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
    start: moment('2019-01-01T00:00:00Z').toDate(),
    status: 'pending',
    title: 'Test 3',
    type: 'eventManager',
  },
  {
    created_at: dateToUTCTimestamp(new Date(2019, 0, 8)),
    end: moment('2019-01-08T00:00:00Z').toDate(),
    publish_at: dateToUTCTimestamp(new Date(2019, 0, 8)),
    start: moment('2019-01-08T00:00:00Z').toDate(),
    status: 'pending',
    title: 'Test 4',
    type: 'eventManager',
  },
];

const timeGridProps = {
  accessors: {},
  components: {},
  getDrilldownView: jest.fn(),
  getNow: jest.fn(),
  getters: {},
};

export const eventCalendarChildrenTestProps = {
  ...eventCalendarTestProps,
  ...eventsCalendarSettings,
  ...timeGridProps,
  customFiltersSelected: false,
  events,
};

export const customMonthTestProps = {
  ...eventCalendarChildrenTestProps,
  closePopup: jest.fn(),
  filterWeekEvents: jest.fn(),
  getOverlayPlacement: jest.fn(),
  handleSelectSlot: jest.fn(),
  handleShowMore: jest.fn(),
  needLimitMeasure: false,
  maxRows: 7,
  monthRange: (customViewOn, numberOfDays, selectedDay) => {
    const start = customViewOn
      ? moment(selectedDay).startOf('week').subtract(1, 'day')
      : moment(selectedDay).startOf('month').startOf('week').subtract(1, 'day');
    const end = customViewOn
      ? moment(selectedDay)
          .add(numberOfDays - 1, 'day')
          .endOf('week')
      : moment(selectedDay).endOf('month').endOf('week');
    const numCalendarDays = end.diff(start, 'days');
    return range(0, numCalendarDays).map(() => start.add(1, 'day').toDate());
  },
  monthRef: {},
  onSelectEvent: jest.fn(),
  popup: true,
  popupEvents: [],
  position: {},
  renderHeader: jest.fn(),
  setDraggingHeaderGroup: jest.fn(),
  setPosition: jest.fn(),
};

export const sidebarDefaultTabProps = {
  agGridReact: {
    props: {
      calendarProps: {
        ...eventCalendarTestProps,
        classes: {
          defaultCheckbox: 'defaultCheckbox',
          loadingErrorIcon: 'loading-error',
          noCustomTags: 'no-custom-tags',
        },
        setExpandedStyle: jest.fn(),
      },
    },
  },
  api: {
    redrawRows: jest.fn(),
  },
  eventsCalendarSettings,
  node: {
    data: {},
    expanded: false,
    field: 'filterType',
    group: true,
    key: 'sources',
    selected: true,
    setExpanded: jest.fn(),
    setSelected: jest.fn(),
  },
  showAllColors: false,
};

export const statelessSidebarDefaultTabProps = {
  ...sidebarDefaultTabProps,
  checkboxColor: 'eventManager-checked',
  checkboxTitle: 'Event Manager',
  classes: {},
  filterStructure: ['eventManager'],
  handleRefetchGroup: jest.fn(),
  isGroup: true,
  isLoading: false,
  setCalendarSettings: jest.fn(),
  toggleGroups: jest.fn(),
  toggleStatuses: jest.fn(),
};

export const sidebarEnvPlatformProjectsFiltersProps = {
  agGridReact: {
    props: {
      calendarProps: {
        ...eventCalendarTestProps,
      },
    },
  },
  api: { redrawRows: jest.fn() },
  eventsCalendarSettings,
  node: {
    data: {
      group: 'envType',
      platform: 'CROSSPLAY',
    },
    selected: true,
    setExpanded: jest.fn(),
    setSelected: jest.fn(),
  },
  toggleSelectedFilters: jest.fn(),
  toggleGroupsExpanded: jest.fn(),
  value: 'CROSSPLAY',
};

export const tagFiltersProps = {
  checked: true,
  classes: {},
  deleteCustomTagSet: jest.fn(),
  eventsCalendarSettings,
  filters: eventsCalendarSettings.filters,
  idx: '0',
  selectedStyle: 'sources',
  setCalendarSettings: jest.fn(),
  setTagsExpanded: jest.fn(),
  tags: ['COD', 'PS4', 'XB1'],
  toggleCustomTags: jest.fn(),
  value: 'CROSSPLAY',
};

export const datePickerFieldsProps = {
  eventsCalendarSettings: {
    ...eventsCalendarSettings,
    datePickerProps: {
      disableDateSelection: jest.fn(),
      project: {
        id: 1,
        name: 'Test Project',
      },
      setEndDate: jest.fn(),
      setEndValue: jest.fn(),
      setEndValueError: jest.fn(),
      setStartDate: jest.fn(),
      setStartValue: jest.fn(),
      setStartValueError: jest.fn(),
    },
  },
  onChangeDatePickerSelection: jest.fn(),
  userTimezone: eventCalendarTestProps.userTimezone,
};

export const mockState = {
  Core: {
    EventsCalendar: eventsCalendarSettings,
  },
};

export const mockStateFn = eventsCalendarSettingsOverride => ({
  Core: {
    EventsCalendar: eventsCalendarSettingsOverride,
  },
});
export const eventFilterProps = {
  eventGroups,
  eventsCalendarSettings,
  disabledFilters: {},
  onFetchEvents: jest.fn(),
};

export const eventFilterGroupProps = {
  group: {
    disabled: true,
    groupProps: { classes: {}, loading: { error: null, isLoading: false } },
    isGroup: true,
    items: [
      {
        isSubgroup: true,
        items: [
          { name: 'active', items: false, isSubgroup: false },
          { name: 'analysis', items: false, isSubgroup: false },
          { name: 'archived', items: false, isSubgroup: false },
          { name: 'config', items: false, isSubgroup: false },
          { name: 'killed', items: false, isSubgroup: false },
        ],
        name: 'demonwareABTesting',
      },
    ],
    name: 'abTesting',
  },
  eventGroups,
  eventsCalendarSettings,
  onFetchEvents: jest.fn(),
  setCalendarSettings: jest.fn(),
};
