import moment from 'moment-timezone';

import mockState from './mockState';
import { currentProject } from './appProps';

moment.tz.setDefault('UTC');

const { data: currentEvents } = mockState.Scenes.Schedule.events.eventList;

export const scheduleProps = {
  _useProfileSettings: true,
  _userHiddenGroupsKey: '',
  _userHiddenGroupsSettings: [],
  abTestsData: [],
  abTestsError: {},
  abTestsLoading: false,
  affiliatedProjectIds: [],
  demonwareEventsData: [],
  demonwareEventsError: {},
  demonwareEventsLoading: false,
  eventManagerEventsData: [],
  eventManagerEventsError: {},
  eventManagerEventsLoading: false,
  externalCountries: [],
  externalEventsData: [],
  externalEventsError: {},
  externalEventsLoading: false,
  gamertagGroups: [],
  informationalEventsData: [],
  informationalEventsError: {},
  informationalEventsLoading: false,
  infoTypes: [],
  onFetchABTests: jest.fn(),
  onFetchDemonwareEvents: jest.fn(),
  onFetchEventManagerEvents: jest.fn(),
  onFetchExternalEvents: jest.fn(),
  onFetchGamertagGroups: jest.fn(),
  onFetchInformationalEvents: jest.fn(),
  permissions: { adminPermission: true, wipPermission: true },
  project: 1,
  user: { profile: {}, actions: {} },
};

export const statelessScheduleProps = {
  _abTestDetailData: {},
  _affiliatedProjects: [],
  _baseUrl: '',
  _currentProject: {},
  _defaultToInfo: false,
  _demonwareDetailData: {},
  _displayExternalEvents: false,
  _displayInfoEvents: false,
  _duplicateEventData: {},
  _enabledSources: ['event-manager', 'ab-testing', 'informational'],
  _eventDetailData: {},
  _eventFetchDetails: {},
  _eventTypesFilters: {},
  _externalDetailData: {},
  _externalEventTypesFilters: {},
  _filterPropsDisabled: {},
  _gamertagGroupsError: {},
  _handleEventDrop: jest.fn(),
  _handleExportEvents: jest.fn(),
  _handleGamertagGroupDrop: jest.fn(),
  _handleOpenABTestDetailModal: jest.fn(),
  _handleOpenCreateEventModal: jest.fn(),
  _handleOpenDemonwareDetailModal: jest.fn(),
  _handleOpenEventDetailModal: jest.fn(),
  _handleOpenExternalDetailModal: jest.fn(),
  _infoEventTypesFilters: {},
  _onClearEventFetchDetails: jest.fn(),
  _onFetchEventDetails: jest.fn(),
  _onOpenGamertagDetailModal: jest.fn(),
  _onUpdateEvent: jest.fn(),
  _onUpdatePresets: jest.fn(),
  _permissions: {},
  _platformSettings: [],
  _presetOptions: [],
  _selectedGamertagGroup: {},
  _setDuplicateEventData: jest.fn(),
  _setSelectedGamertagGroup: jest.fn(),
  _updateHiddenGamertagList: jest.fn(),
  _userTimezone: '',
  abTestDetailModalId: '',
  abTestsData: [],
  abTestsError: {},
  abTestsLoading: false,
  classes: {},
  createEventModalId: '',
  demonwareDetailModalId: '',
  demonwareEventsData: [],
  demonwareEventsError: {},
  demonwareEventsLoading: false,
  eventsCalendarSettings: { displayView: 'calendar', selectedView: 'month' },
  eventDetailModalId: '',
  eventManagerEventsData: [],
  eventManagerEventsError: {},
  eventManagerEventsLoading: false,
  externalEventsData: [],
  externalEventsError: {},
  externalEventsLoading: false,
  gamertagDetailModalId: '',
  gamertagGroups: [],
  informationalEventsData: [],
  informationalEventsError: {},
  informationalEventsLoading: false,
  onFetchEvents: jest.fn(),
  onFetchGamertagGroups: jest.fn(),
};

export const createEventProps = {
  baseUrl: 'event-manager/1/',
  closeModal: jest.fn(),
  createEvent: jest.fn(),
  currentProject,
  defaultToInfo: false,
  displayInfoEvents: true,
  formName: '',
  hasCurrentProjectSettings: true,
  history: { push: jest.fn() },
  initialValues: {
    eventDates: {
      endDate: null,
      startDate: null,
    },
    eventEnvType: '',
    eventName: '',
    eventNotes: '',
    eventProjects: [1],
    eventRecurrence: 'never',
    eventRepeatFrequency: 1,
    eventRepeatInterval: 'days',
    eventType: '',
    isSchedule: null,
    schedule: null,
    story: null,
  },
  isModalVisible: true,
  onResetCreateDialog: jest.fn(),
  onSetSelectedTemplate: jest.fn(),
  selectedStory: { id: 1 },
  selectedTemplate: {},
  setToggleTypeOn: jest.fn(),
  templatesData: [],
  templateSourceEventData: {},
  templateSourceEventLoading: false,
  toggleTypeOn: false,
};

export const createEventFormProps = {
  submitFailed: false,
  submitting: false,
  hasEndDate: false,
  endDateMinDate: 1548981564,
  footerLabel: 'Confirm',
  handleFormSubmit: jest.fn(),
  handleSubmit: jest.fn(),
  closeModal: jest.fn(),
  onEndDate: jest.fn(),
  change: jest.fn(),
  reset: jest.fn(),
  onSetSelectedTemplate: jest.fn(),
  createEventDefaultStartDate: 1548981564,
  clearTagEntry: jest.fn(),
  initializeTags: jest.fn(),
  selectedTemplate: {
    id: 1,
    project: 1,
    created_at: 1567529602,
    updated_at: 1567529602,
    created_by: null,
    updated_by: null,
    duration: 2159538,
    name: 'Event template',
    description: '',
    is_available: true,
    restrict_activities: true,
    source_event: 2,
  },
  templatesData: [
    {
      id: 1,
      project: 1,
      created_at: 1567529602,
      updated_at: 1567529602,
      created_by: null,
      updated_by: null,
      duration: 2159538,
      name: 'Event template',
      description: '',
      is_available: true,
      restrict_activities: true,
      source_event: 2,
    },
  ],
  fetchEventBySourceEventId: jest.fn(),
  templateSourceEventLoading: false,
  templateSourceEventData: {
    id: 2,
  },
  deleteTag: jest.fn(),
  addTag: jest.fn(),
  tags: [],
  tagText: '',
  onChangeTag: jest.fn(),
  platformSettings: ['CROSSPLAY', 'PC', 'PS4', 'XB1'],
  onSubmit: jest.fn(),
  tagsError: null,
};

export const createEventFormActionsProps = {
  onCancel: jest.fn(),
  submitting: false,
};

export const eventDateFieldPublishDateProps = {
  maxDate: 1548981564,
  minDate: 1548981464,
};

export const eventDateFieldRepeatingEventProps = {
  eventRecurrence: 'never',
  repeatEndMinDate: 1548981564,
};

export const eventDateFieldEndDateProps = {
  endDateMinDate: 1548981564,
};

export const eventPlatformsFieldProps = {
  platformSettings: ['CROSSPLAY', 'PC', 'PS4', 'SWITCH', 'XB1'],
};

export const eventTypeFieldProps = {
  eventTypeSettings: [
    { key: 'event-manager', name: 'Event Manager' },
    { key: 'pmg', name: 'PMG' },
    { key: 'demonware', name: 'Demonware' },
  ],
};

export const tagsFieldProps = {
  addTag: jest.fn(),
  deleteTag: jest.fn(),
  tags: [],
  tagText: '',
  onChangeTag: jest.fn(),
};

export const templatesFieldProps = {
  templatesData: [],
  onChangeSelectedTemplate: jest.fn(),
  selectedTemplate: {},
};

export const eventDetailsProps = {
  ...statelessScheduleProps,
  event: currentEvents[0],
};

export const abTestDetailsProps = {
  ...statelessScheduleProps,
  event: {
    category: ['Category1', 'Category2'],
    environment: 'dev',
    id: 1,
    name: 'test',
    source: ['global'],
    status: 'config',
    testPeriodFrom: '1564092704',
    testPeriodTo: '1564265504',
    title: 'test',
    titleID: 1,
    type: 'abTesting',
  },
  parentClasses: 'test parentClass',
  selectedView: 'month',
};

export const demonwareDetailsProps = {
  ...statelessScheduleProps,
  isStaff: true,
  event: {
    allDay: true,
    description: 'Something Critical!',
    end: 'Thu Dec 17 2020 06:08:23 GMT-0800 (Pacific Standard Time)',
    endTime: 1608214103,
    end_at: 1608214103,
    endpoint:
      'https://devzone-qa.demonware.net/admin/events/criticalevent/6/change/',
    env_type: 'Unknown',
    event_type: 'criticalEvents',
    id: 6,
    isReadOnly: true,
    name: 'Critical Event in QA',
    publish_at: 1597068502,
    start: 'Mon Aug 10 2020 07:08:22 GMT-0700 (Pacific Daylight Time)',
    startTime: 1597068502,
    title: 'Critical Event in QA',
    title_id: undefined,
    type: 'demonwareEvents',
  },
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
  isHidden: false,
  icon: '',
  iconClassName: '',
  disableTypography: false,
  primary: '',
  secondary: '',
};

export const statusDotProps = {
  iconClassName: '',
  statusText: '',
};

export const eventManagerLinkProps = {
  baseUrl: '/event-manager/1/',
  data: {
    id: 1,
    event: {},
    title: 'test',
  },
  eventsCalendarSettings: { displayView: 'calendar', selectedView: 'month' },
  group: {},
  userTimezone: 'UTC',
};

export const abTestingLinkProps = {
  data: {
    id: 1,
    title: 'test',
  },
  group: {
    events: [
      {
        environment: 'dev',
        id: 1,
        name: 'test',
        titleID: 1,
      },
    ],
  },
};

export const abTestFetchResultsProps = [
  {
    data: {
      data: [
        {
          status: 'killed',
          cohorts: [
            {
              cohortID: '5594634547316897624',
              source: {
                percent: '50',
                type: 'global',
                maxMembers: '1000',
              },
              name: 'Cohort 1',
              isControl: true,
              treatments: [
                {
                  start: '1540462920',
                  configs: ['1587158772831630686'],
                  end: '1540635720',
                  service_id: 'ae',
                },
              ],
            },
            {
              cohortID: '7371160746155987318',
              source: {
                percent: '50',
                type: 'global',
                maxMembers: '1000',
              },
              name: 'Cohort 2',
              isControl: false,
              treatments: [
                {
                  start: '1540463040',
                  configs: ['7970163228696734137'],
                  end: '1540441440',
                  service_id: 'ae',
                },
              ],
            },
          ],
          updated: '1540376773',
          catchEnd: '1543641600',
          catchStart: '1541157600',
          assignmentSeed: 'afdsfadsfsadfsadfds',
          creator: 'gpowley@demonware.net',
          assignmentAlgorithm: 'sha256',
          purpose: 'Test 1',
          created: '1540376773',
          comments: null,
          testID: '148959614994188569',
          context: '5681',
          data_scientist: 'gpowley@demonware.net',
          stakeholders: [],
          organisation: 'Demonware',
          categories: [],
          name: 'Test 1- GP',
          environment: 'cert',
          titleID: 5681,
          id: '148959614994188569',
          source: ['global', 'global'],
          testPeriodFrom: '1541157600',
          testPeriodTo: '1543641600',
          testPeriodStart: 1540462920,
          testPeriodEnd: 1543641600,
          title: 'Test 1- GP',
          start: 'Oct 25, 2018 10:22 am UTC',
          end: 'Dec 01, 2018 05:20 am UTC',
          allDay: true,
          type: 'abTesting',
        },
      ],
    },
  },
  {
    data: {
      data: [
        {
          status: 'killed',
          cohorts: [
            {
              cohortID: '2970927096226116193',
              source: {
                type: 'manual',
              },
              name: 'Test',
              isControl: false,
              treatments: [
                {
                  start: '1540649160',
                  configs: ['1587158772831630686'],
                  end: '1540641960',
                  service_id: 'ae',
                },
              ],
            },
          ],
          updated: '1540476421',
          catchEnd: '1540641900',
          catchStart: '1540649100',
          assignmentSeed: 'Test',
          creator: 'pedro.pereira@demonware.com',
          assignmentAlgorithm: 'sha256',
          purpose: 'Purpose',
          created: '1540476421',
          comments: null,
          testID: '459951878572224942',
          context: '5681',
          data_scientist: null,
          stakeholders: [],
          organisation: null,
          categories: [],
          name: 'Test',
          environment: 'dev',
          titleID: 5681,
          id: '459951878572224942',
          source: ['manual'],
          testPeriodFrom: '1540649100',
          testPeriodTo: '1540641900',
          testPeriodStart: 1540649100,
          testPeriodEnd: 1540641960,
          title: 'Test',
          start: 'Oct 27, 2018 02:05 pm UTC',
          end: 'Oct 27, 2018 12:06 pm UTC',
          allDay: false,
          type: 'abTesting',
        },
      ],
    },
  },
];
