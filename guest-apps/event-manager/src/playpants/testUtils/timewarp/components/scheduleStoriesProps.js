export const statelessScheduleStoriesProps = {
  match: {},
  selectedScheduleStory: {},
};

export const statelessScheduleStoriesDetailProps = {
  allowDetachedEvents: false,
  baseUrl: '',
  classes: {},
  detachedEvent: false,
  detachedSchedule: false,
  handleSetPrimaryTab: jest.fn(),
  handleSetSecondaryTab: jest.fn(),
  history: {},
  permissions: {},
  primaryTab: '',
  secondaryTab: '',
  selectedScheduleStory: {},
};

export const detailsProps = {
  classes: {},
  currentProject: {},
  detachedSchedule: false,
  eventCount: 1,
  history: {},
  isSafe: {},
  onFetchScheduleStoryEventsCount: jest.fn(),
  selectedScheduleStory: { id: 1 },
};

export const actionsProps = {
  isSafe: { toDelete: true },
  eventCount: 1,
  onDeleteThenRedirect: jest.fn(),
  storyId: 1,
};

export const fieldsProps = {
  isSafe: { toEditSchedule: true, unsafeReason: '' },
  categoryFetchOptions: { titleId: 1, env: 'dev', context: '1' },
  categoryOptions: [],
  eventCount: 1,
  change: jest.fn(),
  currentProject: {},
  form: '',
  handleSubmit: jest.fn(),
  initialValues: {},
  onFetchCategories: jest.fn(),
  onFetchContexts: jest.fn(),
  onFetchSchedules: jest.fn(),
  onPatchScheduleStory: jest.fn(),
  onUploadStorySchedule: jest.fn(),
  scheduleOptions: [],
  selectedScheduleStory: {},
  selectedScheduleStoryContextName: '',
  titleEnvOptions: [],
  titleEnvs: [],
  values: {},
  onSetSelectedSchedule: jest.fn(),
  schedulesData: [],
};

export const contextProps = {
  context: '',
};

export const createdByProps = {
  createdBy: {},
};

export const formattedTimestampProps = {
  timestamp: 1,
  label: '',
  timezone: '',
};

export const scheduleFieldWrapperProps = {
  disabledTooltip: '',
  isDisabled: false,
  options: [],
  handleOnLoadComplete: jest.fn(),
  onSetSelectedSchedule: jest.fn(),
  schedulesData: [],
};

export const disabledScheduleFieldProps = {
  schedule: '',
  disabledTooltip: '',
};

export const statusProps = {
  status: '',
};
