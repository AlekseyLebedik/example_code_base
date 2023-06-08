import mockState from './mockState';
import { templates, pyScript } from './schemaFormProps';
import {
  currentProject,
  activitySettings,
  platformSettings,
  eventTypeSettings,
  permissions,
} from './appProps';

const { event, status, activity, discussion } = mockState.Scenes.Event;
const { data: eventData } = event;
const { variableSets } = activity;

export const eventProps = {
  allowDetachedEvents: false,
  event,
  status,
  eventId: 2,
  currentUser: { id: 1, name: 'Initial User' },
  permissions,
  disabled: false,
  baseUrl: '/event-manager/3/',
  eventUrl: '/event-manager/3/events/2',
  tabUrl: '/event-manager/3/events/2/activities',
  isEventManagerEvent: true,
  history: { push: jest.fn() },
  loadDiscussion: jest.fn(),
  deleteEvent: jest.fn(),
  loadEvent: jest.fn(),
  editAuths: jest.fn(),
  saveEdit: jest.fn(),
  dateTime: jest.fn(),
  eventData: {},
  conflicts: [],
  user: {
    actions: {
      createUserProfileSetting: jest.fn(),
      updateUserProfileSetting: jest.fn(),
    },
  },
};

export const statelessEventProps = {
  ...eventProps,
  badgeCount: { discussion: 2, tasks: 0 },
  changeMainTab: jest.fn(),
  classes: {},
  editEvent: jest.fn(),
  handleSetPrimaryTab: jest.fn(),
  handleSetSecondaryTab: jest.fn(),
  isLoadingEventsPage: false,
  onCloseRequestErrorDialog: jest.fn(),
  onDeleteEvent: jest.fn(),
  onSave: jest.fn(),
  primaryTab: 'details',
  requestErrorDialogOpen: { open: false },
  secondaryTab: 'tasks',
  selectedTab: 'activities',
  updateUserProfileSetting: jest.fn(),
  permissions: {
    achievementWritePermission: true,
    adminPermission: true,
    eventWritePermission: true,
    publisherObjectsWritePermission: true,
    pubstorageWritePermission: true,
    pubvarsWritePermission: true,
    pyscriptWritePermission: true,
    staffUser: true,
    tpDeploymentWritePermission: true,
    wipPermission: true,
  },
};

/* Discussion */
export const discussionProps = {
  ...statelessEventProps,
  discussionData: discussion.data,
  userLastVisits: { discussion: 0, tasks: 0 },
  updateUserProfileSetting: jest.fn(),
  createComment: jest.fn(),
  lastDiscussionView: 1565116032,
  timezone: 'UTC',
  _useProfileSettings: true,
};

/* Tasks */
export const taskMonitorProps = {
  status: '',
  baseUrl: '',
  classes: {},
  id: 1,
  tabUrl: '',
  onResetTaskMonitor: jest.fn(),
  onFetchEventTasks: jest.fn(),
  onFetchStoryTasks: jest.fn(),
  match: { params: { tab: 'tasks', tabId: '1' } },
  tasksType: 'test',
  type: '',
  dateTime: jest.fn(),
};

export const taskMonitorSidebarProps = {
  baseUrl: '',
  classes: {},
  handleOnSelectItem: jest.fn(),
  handleSetSelectedTab: jest.fn(),
  initialTab: '',
  onSelectItem: jest.fn(),
  selectedItemId: '',
  selectedTab: '',
  tabOptions: [],
  tasksData: [],
};

export const taskListItemProps = {
  classes: {},
  task: { children: [] },
  handleOnSelectItem: jest.fn(),
  selectedItemId: '',
};

export const taskDetailsProps = {
  classes: {},
  handleOnSelectItem: jest.fn(),
  details: [],
  subTasks: [],
};

export const monacoExpansionProps = {
  code: '',
  title: 'logs',
  defaultExpanded: true,
};

/* Activities */
export const activitiesProps = {
  ...statelessEventProps,
  activitySettings,
  selectedItemId: '12',
};

/* Activities Sidebar */
export const activitiesSidebarProps = {
  ...activitiesProps,
  activityTypeFilter: 'All',
  hasEndDate: false,
  dropLists: {
    on_start: [
      {
        id: 50,
        type: 'motd',
        activity: '{"type":"motd","languages":[{"language":"it","text":""}]}',
        title_envs: [],
      },
    ],
    on_end: [
      {
        id: 56,
        type: 'pubvars',
        activity: '{"type":"pubvars","variable_sets":[]}',
        title_envs: [],
      },
    ],
  },
  detachedEvent: false,
  displayActivityCreate: true,
  changeActivityType: jest.fn(),
  onDeleteActivity: jest.fn(),
  onCreateActivity: jest.fn(),
  onClickListItem: jest.fn(),
  onSelectItem: jest.fn(),
};

export const statelessActivitiesSidebarProps = {
  ...activitiesSidebarProps,
  handleActivitySelection: jest.fn(),
  handleCreation: jest.fn(),
  handleDelete: jest.fn(),
  onDragStart: jest.fn(),
  onDragEnd: jest.fn(),
};

export const activityListItemProps = {
  ...statelessActivitiesSidebarProps,
  id: 13,
  type: 'pyscript',
  activity: {
    template_id: 'double_xp',
    name: 'Double XP',
    version: 'v1.0.4',
    inputs: [
      { key: 'weapon_type', value: 'Gun' },
      { key: 'attachment_icons', value: [] },
      { key: 'invalid', value: 'test' },
    ],
  },
  exec_order: 2,
  selectedTitles: [{ id: 1, name: 'MW-PS3', platform: 'PS3' }],
};

export const createActivityFormProps = {
  ...statelessActivitiesSidebarProps,
  hasEndDate: false,
  handleSubmit: jest.fn(),
  onSubmit: jest.fn(),
};

export const activityTypeProps = {
  ...statelessActivitiesSidebarProps,
  changeActivityType: jest.fn(),
};

/* Activity Details */
export const activitiesDetailsProps = {
  ...activitiesProps,
  selectedActivity: {
    id: 12,
    type: 'pyscript',
    activity: {
      template_id: 'double_xp',
      name: 'Double XP',
      version: 'v1.0.4',
      inputs: [
        { key: 'weapon_type', value: 'Gun' },
        { key: 'attachment_icons', value: [] },
        { key: 'invalid', value: 'test' },
      ],
    },
    title_envs: [4],
    publish_on: 'on_start',
    exec_order: 1,
    updated_by: {
      id: 1,
      name: 'Initial User',
    },
  },
  contextsData: ['1', 'test', 'another'],
  uploadProgress: {
    1563392198: {
      received: 776,
      size: 776,
    },
  },
  uploadProgressFetch: jest.fn().mockResolvedValue(),
  removeFile: jest.fn((_, res) => res()),
  uploadFileAction: jest.fn(),
  fileDetailsFetch: jest.fn(),
  downloadFile: jest.fn(),
  updateFile: jest.fn(),
  onUpdate: jest.fn(),
  titles: [
    {
      env: {
        id: 3,
      },
      environments: [
        {
          id: 3,
        },
      ],
      id: 3,
      name: 'mw2-PS3',
    },
    {
      env: {
        id: 5,
      },
      environments: [
        {
          id: 5,
        },
      ],
      id: 4,
      name: 'mw2-XBOX1',
    },
  ],
  selectedTitle: {
    id: 3,
  },
  noTitleSelected: false,
};

/* Activity Title */
export const activityTitleProps = {
  ...activitiesDetailsProps,
  titles: [
    {
      env: {
        id: 3,
        shortType: 'dev',
      },
      environments: [
        {
          id: 3,
          shortType: 'dev',
        },
      ],
      id: 3,
      name: 'mw2-PS3',
    },
    {
      env: {
        id: 5,
        shortType: 'dev',
      },
      environments: [
        {
          id: 5,
          shortType: 'dev',
        },
      ],
      id: 4,
      name: 'mw2-XBOX1',
    },
  ],
  onTitlesChange: jest.fn(),
  onNameChange: jest.fn(),
};

export const statelessActivityTitleProps = {
  ...activityTitleProps,
  selectedActivity: {},
  activityContext: { disabled: true, selectedActivity: {}, titles: [] },
  allowDuplication: true,
  allowMultiTitles: true,
  allowRevert: true,
  customComponent: {},
  disableTitleSelector: false,
  onNameChange: jest.fn(),
  onTitlesChange: jest.fn(),
  RevertDialog: jest.fn(),
  contextType: '',
  eventUrl: '',
  titles: [],
  history: {},
};

export const revertProps = {
  ...statelessActivityTitleProps,
  onRevertActivity: jest.fn(),
};

/* Activities */
export const motdProps = {
  ...activitiesDetailsProps,
  selectedActivity: {
    id: 50,
    activity: {
      languages: [
        {
          language: 'en-uk',
          text: '',
        },
      ],
    },
    title_envs: [],
    type: 'motd',
  },
  allowMultiTitles: true,
};

export const motdItemProps = {
  ...motdProps,
  id: 0,
  language: 'en-uk',
  languages: [
    {
      language: 'en-uk',
      text: '',
    },
    {
      language: 'ru',
      text: '',
    },
  ],
  text: '',
};

export const statelessMotdItemProps = {
  ...motdItemProps,
  error: null,
  isEditable: false,
  textInput: '',
  languageInput: '',
  languageValidation: '',
  onLanguageChange: jest.fn(),
  handleSubmit: jest.fn(),
  handleRemove: jest.fn(),
  onTextChange: jest.fn(),
  onToggle: jest.fn(),
};

export const pubstorageProps = {
  ...activitiesDetailsProps,
};

export const filestorageProps = {
  ...pubstorageProps,
  currentProject,
  allowMultiTitles: true,
  fetchContexts: jest.fn(),
  uploadFile: jest.fn().mockImplementation(() => ({
    finish: Promise.resolve(),
    fileDetails: {
      title: '',
      filename: 'newfile.txt',
      remoteFilename: 'newfile.txt',
      context: '1',
      comment: '',
      size: '7 bytes',
      progress: 0,
      download: false,
      'X-Progress-ID': 1563393000,
      id: 4,
    },
  })),
  selectedActivity: {
    id: 50,
    title_envs: [1],
    activity: {
      files: [3],
    },
    type: 'pubstorage',
  },
  files: {
    3: {
      title: '',
      filename: 'test.txt',
      remoteFilename: 'test.txt',
      context: '1',
      comment: '',
      size: '5 bytes',
      progress: 0,
      download: false,
      'X-Progress-ID': 1563392198,
      id: 3,
    },
  },
  agGridProps: {
    columnDefs: jest.fn().mockImplementation(() => []),
    noRowsUnlocked: '<div />',
    noRowsLocked: '<div />',
  },
};

export const uploadFileProps = {
  ...filestorageProps,
  setNewestFileDetails: jest.fn(),
  updateProgress: jest.fn(),
  failedProgress: jest.fn(),
  inProgress: false,
  setInProgress: jest.fn(),
  uploadDisabled: false,
  type: 'dropzone',
};

export const filestorageStatelessProps = {
  ...filestorageProps,
  onDrop: jest.fn(),
  onGridReady: jest.fn(),
  resizeGrid: jest.fn(),
  onFileUploadButton: jest.fn(),
  uploadDisabled: false,
  getCollection: jest.fn().mockImplementation(() => [
    {
      title: 'File Title',
      filename: 'test.txt',
      remoteFilename: 'doubleXp.txt',
      context: '1',
      size: 314535,
      comment: 'we have no comment',
      progress: 0,
      download: false,
      delete: undefined,
      index: 0,
    },
  ]),
  columnDefs: [
    {
      field: 'title',
    },
    {
      field: 'filename',
    },
    {
      field: 'remoteFilename',
    },
    {
      field: 'context',
    },
    {
      field: 'size',
    },
    {
      field: 'comment',
    },
    {
      field: 'progress',
    },
    {
      field: 'download',
    },
    {
      field: 'delete',
    },
    {
      field: 'index',
    },
  ],
};

export const pubvarsProps = {
  ...activitiesDetailsProps,
  allowMultiTitles: false,
  createVariable: jest.fn(),
  disabled: false,
  filterValues: { context: [], group_id: [], namespace: [] },
  getPubVars: jest.fn(),
  hideChangedVarSets: true,
  pubVarsActivity: {
    activity: {
      variable_sets: variableSets,
    },
  },
  selectedActivity: {
    activity: {
      id: 51,
      title_envs: [],
      type: 'pubvars',
      variable_sets: variableSets,
    },
    title_envs: [],
  },
  selectedNamespace: variableSets[0],
  selectedValues: { context: '', group_id: '', namespace: '' },
  updateSelectedValues: jest.fn(),
  variableSets,
};

export const statelessPubvarsProps = {
  ...pubvarsProps,
  clearVariable: jest.fn(),
  filterNamespaces: jest.fn(),
  modifyVariable: jest.fn(),
  toggleChangedVarSets: jest.fn(),
  updateSelectedActivity: jest.fn(),
  hasChanges: false,
  onSaveActivity: jest.fn(),
};

export const namespaceProps = {
  ...statelessPubvarsProps,
  filterValues: {
    context: ['1'],
    group_id: ['1'],
    namespace: ['Namespace1'],
  },
};

export const statelessCreateVariableProps = {
  ...namespaceProps,
  addVariable: jest.fn(),
  clearVariableAddDialog: jest.fn(),
  open: false,
  setOpen: jest.fn(),
  setValue: jest.fn(),
  setValueError: jest.fn(),
  setVarError: jest.fn(),
  setVariable: jest.fn(),
  validateValue: jest.fn(),
  validateVariable: jest.fn(),
  value: '',
  valueError: null,
  variable: '',
  variableError: null,
};

export const revertPubVarsProps = {
  ...statelessPubvarsProps,
  open: true,
  revertCallback: jest.fn(),
  selectedActivity: {
    activity: {
      variable_sets: [
        {
          context: '2',
          group_id: '1',
          is_major_update: false,
          major_version: 0,
          minor_version: 1,
          namespace: 'test',
          oldVariables: {
            test: 'test',
          },
          revertVariables: {
            newvar: '1',
            newvar2: '2',
            testttt: 'testtttt',
          },
          variables: {
            newvar: 'newval',
            newvar2: 'newval2',
            testttt: 'testtttt',
          },
        },
      ],
    },
    context: null,
    exec_order: 0,
    id: 1,
    name: null,
    publish_on: 'on_start',
    updated_by: {
      id: 1,
      name: 'Initial User',
    },
    title_envs: [1],
    type: 'pubvars',
  },
  toggleRevertDialog: jest.fn(),
  updateRevertActivity: jest.fn(),
};

export const pyscriptProps = {
  ...activitiesDetailsProps,
  templates,
  pyScript,
  needsUpdate: false,
  onSchemaModelUpdate: jest.fn(),
  onLoadFetchSchemas: jest.fn(),
  handleUpdate: jest.fn(),
};

export const achievementProps = {
  ...activitiesDetailsProps,
  selectedActivity: {
    id: 12,
    type: 'ae',
    activity: {
      ruleset_to_activate: {
        activationTimestamp: null,
        code: 'idiwoq03292kj4lsl',
        codeHash: '4mhdBfYBdYmeco1ve62h0b6rue8=',
        code_signature:
          'v/kWwu8MBe1GGSxK64a3OqKynmKpGJYGlylUMT0asJ+ZHiuonlDAl2igzISRqgMuPWJf/HqCxvAbxuAMxq+YCg==',
        codeSignatureTimestamp: 1565841879,
        creationTimestamp: 1565841879,
        isActive: true,
        label: 'stronghold-5',
        lastUpdateTimestamp: 1565842668,
      },
    },
    title_envs: [4],
    publish_on: 'on_start',
    exec_order: 1,
    updated_by: {
      id: 1,
      name: 'Initial User',
    },
  },
  match: { params: { tab: 'activities', tabId: 1 } },
  onUpdate: jest.fn(),
  onFetchRuleset: jest.fn(),
  selectedRuleset: {
    lastUpdateTimestamp: 1565842668,
    codeHash: '4mhdBfYBdYmeco1ve62h0b6rue8=',
    label: 'stronghold-5',
    codeSignature:
      'v/kWwu8MBe1GGSxK64a3OqKynmKpGJYGlylUMT0asJ+ZHiuonlDAl2igzISRqgMuPWJf/HqCxvAbxuAMxq+YCg==',
    activationTimestamp: null,
    creationTimestamp: 1565841879,
    isActive: true,
    codeSignatureTimestamp: 1565841879,
  },
};

export const achievementPropsStateless = {
  ...activitiesDetailsProps,
  isServiceConfigured: true,
  rulesetList: [
    {
      lastUpdateTimestamp: 1565842668,
      codeHash: '4mhdBfYBdYmeco1ve62h0b6rue8=',
      label: 'stronghold-5',
      codeSignature:
        'v/kWwu8MBe1GGSxK64a3OqKynmKpGJYGlylUMT0asJ+ZHiuonlDAl2igzISRqgMuPWJf/HqCxvAbxuAMxq+YCg==',
      activationTimestamp: null,
      creationTimestamp: 1565841879,
      isActive: true,
      codeSignatureTimestamp: 1565841879,
    },
  ],
  rulesetToActivate: {
    lastUpdateTimestamp: 1565842668,
    codeHash: '4mhdBfYBdYmeco1ve62h0b6rue8=',
    label: 'stronghold-0',
    codeSignature:
      'v/kWwu8MBe1GGSxK64a3OqKynmKpGJYGlylUMT0asJ+ZHiuonlDAl2igzISRqgMuPWJf/HqCxvAbxuAMxq+YCg==',
    activationTimestamp: null,
    creationTimestamp: 1565841878,
    isActive: false,
    codeSignatureTimestamp: 1565841878,
  },
  rulesetToDuplicate: '',
  rulesetToActivateLabel: 'stronghold-0',
  disabled: false,
  onAchievementUpdate: jest.fn(),
  showContext: true,
  noContextSelected: true,
};

/* Thunderpants Activity */
export const mockThunderpantsScheduledDeployments = {
  deploy: [
    {
      build_uid:
        'e36576c1fb46e4d60c9ccf1cb5ae2f01dfcd96c6e226b424c715aec84155bd9b',
      target_name: 'uidev:dev(mp)',
      uid: 'tp_deployment_1',
    },
  ],
  undeploy: [
    {
      build_uid:
        'e36576c1fb46e4d60c9ccf1cb5ae2f01dfcd96c6e226b424c715aec84155bd9b',
      uid: '84fe6b23-9eef-4fcd-b350-cef71c228eaa2',
    },
  ],
  modify: [
    {
      build_uid:
        'e36576c1fb46e4d60c9ccf1cb5ae2f01dfcd96c6e226b424c715aec84155bd9b',
      uid: '84fe6b23-9eef-4fcd-b350-cef71c228eaa3',
      user_params: {},
    },
  ],
};

export const thunderpantsProps = {
  ...activitiesDetailsProps,
  buildOptionHandlers: {},
  handleDeploy: jest.fn(),
  modalFormHandlers: {},
  onUpdate: jest.fn(),
  selectedActivity: {
    activity: mockThunderpantsScheduledDeployments,
    title_envs: [1],
    publish_on: 'on_start',
    exec_order: 0,
    updated_by: {
      id: 1,
      name: 'Initial User',
    },
  },
};

export const thunderpantsBadgeCellRendererProps = {
  classes: {},
  value: {
    live: 1,
    deploy: 1,
    undeploy: 1,
    modify: 1,
  },
};

export const thunderpantsBuildCellRendererProps = {
  buildOptionProps: {
    handleConfirmAction: jest.fn(),
    handleModify: jest.fn(),
    handleModifyLock: jest.fn(),
  },
  classes: {},
  context: {
    targetList: mockState.Scenes.Event.activity.thunderpants.targetList.data,
  },
  data: mockState.Scenes.Event.activity.thunderpants.buildList.data[0],
  deploymentList:
    mockState.Scenes.Event.activity.thunderpants.deploymentList.data,
  disabled: false,
  handleDeploy: jest.fn(),
  scheduled: mockThunderpantsScheduledDeployments,
  userParamsSchema:
    mockState.Scenes.Event.activity.thunderpants.userParamsSchema.data,
};

export const thunderpantsBuildOptionsCellRendererProps = {
  buildData: {},
  buildList: [],
  data: {
    ...mockState.Scenes.Event.activity.thunderpants.buildList.data[0],
    type: 'live',
  },
  disabled: false,
  handleConfirmAction: jest.fn(),
  handleModify: jest.fn(),
  handleModifyLock: jest.fn(),
  unlockedDeployments: {},
  userParamsSchema: [],
};

export const thunderpantsCustomTitleComponentProps = {
  currentProjectID: 0,
  deployer: {},
  deployerList: [],
  deploymentList: [],
  disabled: false,
  eventData: {},
  filterType: 'default',
  isScheduledEmpty: false,
  onUpdate: jest.fn(),
  permissions: {},
  selectedActivity: { activity: {} },
  setFilterType: jest.fn(),
  view: 'iw8linux',
  viewList: ['iw8linux'],
};

export const thunderpantsConfirmActionForm = {
  formData: {},
  formType: '',
  onSubmit: jest.fn(),
};

export const thunderpantsPasswordCheckForm = {
  currentProjectID: 1,
  deployer: {},
  formData: {},
  formNext: '',
  formType: '',
  onSubmit: jest.fn(),
  view: '',
};

export const thunderpantsDeploymentFormProps = {
  activityBuildList: [],
  formState: {},
  isFormDeploymentType: true,
  onSubmit: jest.fn(),
  schema: [],
  setFormState: jest.fn(),
  summaryData: {},
  targets: [],
  formData: {},
  formSchema: [],
  formSummaryData: {},
  formTargets: [],
  formType: '',
};

export const thunderpantsDeploymentFormStatelessProps = {
  activityBuildList: [],
  formState: {},
  isFormDeploymentType: true,
  onSubmit: jest.fn(),
  schema: [],
  setFormState: jest.fn(),
  summaryData: {},
  targets: [],
};

export const thunderpantsBuildSummaryProps = {
  schema: mockState.Scenes.Event.activity.thunderpants.buildSchema.data,
  summaryData: mockState.Scenes.Event.activity.thunderpants.buildList.data[0],
};

export const thunderpantsBuildTableProps = {
  ...activitiesDetailsProps,
  _onFetchBuildList: jest.fn(),
  _onFetchBuildSchema: jest.fn(),
  _onFetchDeploymentList: jest.fn(),
  _onFetchTargetList: jest.fn(),
  _onFetchUserParamsSchema: jest.fn(),
  buildList: mockState.Scenes.Event.activity.thunderpants.buildList.data,
  buildOptionHandlers: {},
  buildSchema: [],
  classes: {},
  currentProjectID: 1,
  deployer: {},
  deploymentList: [],
  disabled: false,
  handleDeploy: jest.fn(),
  isLoading: false,
  parsedBuildList: [],
  scheduled: {},
  selectedActivity: {
    activity: mockThunderpantsScheduledDeployments,
    title_envs: [1],
    publish_on: 'on_start',
    exec_order: 0,
    updated_by: {
      id: 1,
      name: 'Initial User',
    },
  },
  targetList: [],
  unlockedDeployments: {},
  userParamsSchema: [],
  view: 'iw8linux',
};

export const thunderpantsDeploymentModalFormProps = {
  formData: {},
  formSchema: [{}],
  formSummaryData: {},
  formTargets: [''],
  formType: '',
  handleSubmit: jest.fn(),
};

const thunderpantsModalFormProps = {
  formType: '',
  handleSubmit: jest.fn(),
};

export const thunderpantsConfirmActionModalForm = {
  ...thunderpantsModalFormProps,
};

export const thunderpantsDeploymentModalForm = {
  ...thunderpantsModalFormProps,
};

export const thunderpantsPasswordCheckModalForm = {
  ...thunderpantsModalFormProps,
};

/* Conflicts */
export const eventConflictsProps = {
  ...statelessEventProps,
  activitySettings,
  changeConflictType: jest.fn(),
  conflictDetails: {
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
      },
    ],
    conflicting_event: {
      id: 1,
      title: 'Overlapping Event',
      status: 'open',
      activities: [8],
      project: 1,
      publish_at: 1569870000,
      end_at: 1570212969,
    },
    severity: 'activity-title-conflict',
  },
  conflictActivityDetails: {
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
  },
  conflictTypeFilter: 'all',
  fileDetailsFetch: jest.fn(),
  getConflicts: jest.fn(),
  handleConflictSelection: jest.fn(),
  match: { params: { tab: 'conflicts', id: '1' } },
  onSelectItem: jest.fn(),
  searchConflicts: jest.fn(),
  selectedItemId: '1,5,8',
  titles: activitiesDetailsProps.titles,
  userTimezone: 'UTC',
};

export const conflictsSidebarProps = {
  ...eventConflictsProps,
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
        },
      ],
      conflicting_event: {
        id: 1,
        title: 'Overlapping Event',
        status: 'open',
        activities: [8],
        project: 1,
        publish_at: 1569870000,
        end_at: 1570212969,
      },
      severity: 'activity-title-conflict',
    },
  ],
  conflictType: 'all',
  searchQuery: '',
};

export const conflictListItemProps = {
  ...conflictsSidebarProps,
  conflict: conflictsSidebarProps.conflicts[0],
};

export const conflictOverviewProps = {
  ...eventConflictsProps,
  conflictDetails: conflictsSidebarProps.conflicts[0],
};

export const conflictActivityDetailsProps = {
  ...eventConflictsProps,
  activity: {
    activity:
      '{"variable_sets":[{"context":"2","group_id":"1","namespace":"test","variables":{"testvariable":"this is a test"}}]}',
    id: 1,
    title_envs: [3],
    type: 'pubvars',
  },
  activityConflictSeverity: 'activity-title-overlap',
  selectedTitles: [{ id: 1, name: 'MW-PS3', platform: 'PS3' }],
  details: [],
};

export const aeConflictDetailsProps = {
  ...conflictActivityDetailsProps,
  activity: {
    activity: '{"ruleset_to_activate":{"label":"stronghold-5"}}',
    id: 1,
    type: 'ae',
  },
  details: [],
};

export const pubobjectsConflictDetailsProps = {
  ...conflictActivityDetailsProps,
  activity: {
    activity:
      '{"files":[1],"objects":["{\\"acl\\":\\"public\\",\\"owner\\":2,\\"groupID\\":\\"0\\",\\"expiresOn\\":\\"0\\",\\"created\\":1569262428,\\"modified\\":1569262428,\\"name\\":\\"testname\\",\\"contentLength\\":4,\\"extraData\\":null,\\"checksumType\\":\\"b64_md5sum_digest\\"}"]}',
    id: 1,
    type: 'publisher_objects',
  },
  details: [],
};

export const pubstorageConflictDetailsProps = {
  ...conflictActivityDetailsProps,
  activity: {
    activity: '{"files":[4]}',
    id: 1,
    type: 'pubstorage',
  },
  details: [],
  fileInfo: {
    4: {
      comment: '',
      context: 1,
      filename: 'testfile',
      id: 4,
      remoteFilename: 'testfile',
      size: '4 bytes',
      title: '',
    },
  },
};

export const pubvarsConflictDetailsProps = {
  ...conflictActivityDetailsProps,
  activity: {
    activity:
      '{"variable_sets":[{"context":"2","group_id":"1","namespace":"test","variables":{"testvariable":"this is a test"}}]}',
    id: 1,
    type: 'pubvars',
  },
  details: [],
};

export const pyscriptConflictDetailsProps = {
  ...conflictActivityDetailsProps,
  activity: {
    activity:
      '{"name":"Double Xp","template_id":"double-xp","version":"v1.0.1"}',
    id: 1,
    type: 'pyscript',
  },
  details: [],
};

export const thunderpantsConflictDetailsProps = {
  ...conflictActivityDetailsProps,
  activity: {
    activity:
      '{"deploy": [],"deployer": {"id": 4,"name": "Thunderpants Dev 1 Deployer","base_url": "https://uidev-hq.tp.demonware.net/deployer/uidev_ng/api","environment": "Development"},"undeploy": [{"uid": "cd043371-4cf1-4f8a-af7c-c19283958600","build_uid": "b0022d8c636d58291b16dd61da22b7b41a20775c74139dad0faf728a8d832c5d","view_name": "iw8linux","target_name": "uidev:dev(mp)","user_params": {"max_instances_per_machine": 10,"extra_cmdline_args": ""},"type": "live"}],"modify": [],"view": "iw8linux"}',
    id: 1,
    type: 'tp_deployment',
  },
  details: [],
};

export const conflictSortTestProps = [
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
      },
      {
        activity_type: 'ae',
        details: [],
        event_activity: {
          activity: '{"ruleset_to_activate":{"label":"stronghold-5"}}',
          id: 3,
          type: 'ae',
        },
        overlapping_event_activity: {
          activity: '{"ruleset_to_activate":{"label":"stronghold-5"}}',
          id: 2,
          type: 'ae',
        },
        severity: 'activity-title-overlap',
      },
    ],
    conflicting_event: {
      id: 1,
      title: 'Overlapping Event',
      status: 'open',
      activities: [8],
      project: 1,
      publish_at: 1569870000,
      end_at: 1570212969,
    },
    severity: 'activity-title-overlap',
  },
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
      },
    ],
    conflicting_event: {
      id: 2,
      title: 'Conflicting Event',
      status: 'open',
      activities: [8],
      project: 1,
      publish_at: 1569870000,
      end_at: 1570212969,
    },
    severity: 'activity-title-conflict',
  },
];

/* Details */
export const eventDetailsProps = {
  ...statelessEventProps,
  hasEndDate: false,
  type: 'publish_at',
  removeActivitySelection: jest.fn(),
  setEndDate: jest.fn(),
};

export const editStatusProps = {
  ...eventDetailsProps,
  feedbackError: '',
  feedbackLoading: false,
  feedbackSaved: false,
  lockedBy: { id: 1, name: 'Initial User' },
};

export const eventActionsProps = {
  ...eventDetailsProps,
  conflicts: conflictsSidebarProps.conflicts,
  templateName: '',
  isNameTaken: false,
  onChangeTemplateName: jest.fn(),
  onSaveAsTemplate: jest.fn(),
  onDeleteEvent: jest.fn(),
  currentProject: {},
  baseUrl: '',
};

export const eventFieldsProps = {
  ...eventDetailsProps,
  clearable: true,
  detachedEvent: false,
  isConfigured: { stories: true },
  storiesData: [],
};

export const createdByFieldProps = {
  eventData: {
    created_by: {
      name: 'Test User',
    },
  },
};

export const eventPlatformFieldProps = {
  ...eventFieldsProps,
  platformSettings,
};

export const eventTypeFieldProps = {
  ...eventFieldsProps,
  eventTypeSettings,
};

export const eventDatesProps = {
  ...eventFieldsProps,
  type: 'publish_at',
  label: 'From',
  date: 1548547200,
  minDate: 1548547200,
  maxDate: null,
  disabled: false,
  dateTime: jest.fn(),
};

export const repeatEventFieldsProps = {
  ...eventDetailsProps,
  eventData: {
    ...eventDetailsProps.event,
    end_at: 1588276858,
    publish_at: 1542825180,
    repeat_event_settings: {
      end_repeat_at: 1544825180,
      frequency: 1,
      interval: 'weeks',
      iteration: 0,
    },
  },
};

export const repeatEventDatesProps = {
  ...repeatEventFieldsProps,
  label: 'Repeats end at',
  minDate: 1588276858,
};

export const duplicateEventProps = {
  availablePlatforms: ['CROSSPLAY', 'PC', 'PS4', 'SWITCH', 'XB1'],
  availableEnvs: ['Development', 'Certification', 'Live'],
  eventData,
  handleCreateEvent: jest.fn(),
  handleDuplicateEvent: jest.fn(),
  history: { push: jest.fn() },
  disabled: false,
  baseUrl: '/event-manager/3/',
};

export const duplicateEventStatelessProps = {
  onClick: jest.fn(),
  handleFormSubmit: jest.fn(),
  eventData,
};

export const duplicateEventFormProps = {
  currentPlatforms: ['PS4'],
  eventData,
  endAt: 2222222222,
  publishAt: 1111111111,
};

export const duplicateEventFormStatelessProps = {
  availableEnvs: ['Development', 'Certification', 'Live'],
  availablePlatforms: ['PS4', 'XB1', 'CROSSPLAY'],
  endAtMinDate: 1567544400,
  handleSubmit: () => jest.fn(),
  loading: false,
  onSubmit: jest.fn(),
  publishAtMaxDate: 1568317716,
  publishAtMinDate: 1567540522,
  setTargetEnvironment: jest.fn(),
  setTargetPlatforms: jest.fn(),
  targetEnvironment: 'Development',
  targetPlatforms: ['PS4'],
};

export const feedbackWrapperProps = {
  loading: false,
  error: '',
  resetFeedback: jest.fn(),
};

export const objectStoreProps = {
  ...activitiesDetailsProps,
};

export const publisherObjectsDetailsStatelessProps = {
  selectedTitle: {
    platform: 'PS3',
    id: 1,
    environments: [
      {
        usesAE: true,
        usesABTesting: true,
        usesMarketplace: true,
        usesLegacyStore: false,
        contentTypeId: 6,
        usesObjectStore: true,
        type: 'Certification',
        id: 2,
        usesAsyncMMP: true,
        shortType: 'cert',
      },
      {
        usesAE: true,
        usesABTesting: true,
        usesMarketplace: true,
        usesLegacyStore: false,
        contentTypeId: 6,
        usesObjectStore: true,
        type: 'Development',
        id: 1,
        usesAsyncMMP: true,
        shortType: 'dev',
      },
    ],
    name: 'PS3',
    env: {
      usesAE: true,
      usesABTesting: true,
      usesMarketplace: true,
      usesLegacyStore: false,
      contentTypeId: 6,
      usesObjectStore: true,
      type: 'Development',
      id: 1,
      usesAsyncMMP: true,
      shortType: 'dev',
    },
  },
};

export const messagePanelProps = {
  conditions: {
    isDeleted: false,
    isTemplate: false,
    isPrivate: false,
  },
};
