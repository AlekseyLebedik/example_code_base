import { groupListSelector } from 'playpants/scenes/ProjectSettings/components/Responsibilities/selectors';

import mockState from './mockState';
import {
  activitySettings,
  colorSettings,
  currentProject,
  eventSettings,
  globalSettings,
  notificationSettings,
  permissions,
} from './appProps';

export const groups = groupListSelector(mockState);

const { ProjectSettings } = mockState.Scenes;
export const users = ProjectSettings.Users.availableUsers.data;

export const projectSettingsProps = {
  ...ProjectSettings,
  permissions,
  baseUrl: '',
  hasCurrentProjectSettings: true,
  match: { params: { id: 1 } },
  updateProjectSetting: jest.fn(),
  onFetchAvailableUsers: jest.fn(),
};

export const statelessProjectSettingsProps = {
  ...projectSettingsProps,
  currentProject,
  currentAuthSettings: [
    {
      title: 1,
      titleName: 'PS3',
      settingID: 4,
      setting: {
        motd: [3],
        playlist: [3],
        pubvars: [3],
        pubstorage: [3],
        pyscript: [3],
        objectStore: [3],
      },
      env: 'Certification',
    },
  ],
  addUserToast: jest.fn(),
  selectedTab: 'responsibilities',
  selectedSubTab: 'users',
  match: {
    params: {
      id: 1,
      category: 'responsibilities',
      subcategory: 'users',
    },
    path: '?category=responsibilities?subcategory=users?id=1',
  },
  baseUrl: '/event-manager/5681/',
};

export const availableUsers = [
  {
    label: 'Admin',
    value: 'Admin',
    id: 3,
    username: 'admin',
    enabled: true,
    isSuperuser: false,
    name: 'Admin',
    email: 'admin@test.com',
    _links: {
      self: {
        href: 'http://127.0.0.1:8081/api/v2/users/3/',
      },
    },
  },
  {
    label: 'Guest',
    value: 'Guest',
    id: 4,
    username: 'guest',
    enabled: true,
    isSuperuser: false,
    name: 'Guest',
    email: 'guest@test.com',
    _links: {
      self: {
        href: 'http://127.0.0.1:8081/api/v2/users/4/',
      },
    },
  },
  {
    label: 'Initial User',
    value: 'Initial User',
    id: 1,
    username: 'username',
    enabled: true,
    isSuperuser: true,
    name: 'Initial User',
    email: 'noreply@demonware.net',
    _links: {
      self: {
        href: 'http://127.0.0.1:8081/api/v2/users/1/',
      },
    },
  },
  {
    label: 'Readonly',
    value: 'Readonly',
    id: 2,
    username: 'readonly',
    enabled: true,
    isSuperuser: false,
    name: 'Readonly',
    email: 'readonly@test.com',
    _links: {
      self: {
        href: 'http://127.0.0.1:8081/api/v2/users/2/',
      },
    },
  },
];

export const responsibilitesAndGamertagsProps = {
  ...projectSettingsProps,
  settingsSubTabs: {
    users: 'Users',
    groups: 'Groups',
  },
  handleTabChange: jest.fn(),
  selectedSubTab: 'users',
  baseUrl: '/event-manager/5681/',
  onFetchGroups: jest.fn(),
  onFetchResponsibilityOptions: jest.fn(),
};

export const statelessGroupsProps = {
  ...projectSettingsProps,
  availableUsers,
  groupList: groups,
  groupLoading: false,
  handleCreateGroup: jest.fn(),
  handleDeleteGroup: jest.fn(),
  handleFetchGroups: jest.fn(),
  onFetchGroups: jest.fn(),
  onSetSelectedGroup: jest.fn(),
  selectedGroup: null,
};

export const statelessUsersProps = {
  ...projectSettingsProps,
  selectedTab: 'Groups',
  onTabChange: jest.fn(),
  selectedItem: {},
};

export const globalSettingsProps = {
  clearSchema: jest.fn(),
  fetchSchema: jest.fn(),
  globalSettings,
  settingSchema: {},
  updateProjectSetting: jest.fn(),
};

export const activitiesSettingsProps = {
  activitySettings,
  clearSchema: jest.fn(),
  fetchSchema: jest.fn(),
  settingSchema: {
    items: {
      required: [
        'type',
        'name',
        'allow_multi_titles',
        'allow_duplication',
        'allow_revert',
        'enabled',
        'context',
      ],
      type: 'object',
      properties: {
        allow_multi_titles: {
          type: 'boolean',
        },
        name: {
          type: 'string',
        },
        enabled: {
          type: 'boolean',
        },
        allow_revert: {
          type: 'boolean',
        },
        allow_duplication: {
          type: 'boolean',
        },
        type: {
          enum: ['ae', 'gvs'],
        },
      },
    },
    $schema: 'http://json-schema.org/draft-07/schema#',
    version: 1,
    type: 'array',
    description: 'Project Setting - Activity Settings',
  },
  updateProjectSetting: jest.fn(),
};

export const eventSettingsProps = {
  eventSettings,
  clearSchema: jest.fn(),
  fetchSchema: jest.fn(),
  settingSchema: {
    description: 'Project Setting - Event Settings',
    version: 1,
    additionalProperties: false,
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    properties: {
      statuses: {
        additionalProperties: false,
        type: 'object',
        properties: {
          scheduled: {
            additionalProperties: false,
            required: ['name', 'is_read_only'],
            type: 'object',
            properties: {
              allow_delete: {
                type: 'boolean',
              },
              is_read_only: {
                type: 'boolean',
              },
              name: {
                type: 'string',
              },
            },
          },
          cancelled: {
            additionalProperties: false,
            required: ['name', 'is_read_only'],
            type: 'object',
            properties: {
              allow_delete: {
                type: 'boolean',
              },
              is_read_only: {
                type: 'boolean',
              },
              name: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
  updateProjectSetting: jest.fn(),
};

export const notificationSettingsProps = {
  notificationSettings,
  clearSchema: jest.fn(),
  fetchSchema: jest.fn(),
  settingSchema: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    version: 1,
    type: 'object',
    description: 'Project Setting - Notification Settings',
    properties: {
      email: {
        required: ['address', 'type_settings'],
        type: 'object',
        properties: {
          type_settings: {
            type: 'object',
            properties: {
              event_cancel: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_end: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_open: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_request_approval: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_end_fail: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_publish_now: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_test: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_reject: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_publish_fail: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_end_now: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_approve: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_test_fail: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_end_success: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_publish_success: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_expire: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_schedule: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_publish: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
            },
          },
          address: {
            type: 'string',
          },
        },
      },
      slack: {
        required: ['channel', 'type_settings'],
        type: 'object',
        properties: {
          type_settings: {
            type: 'object',
            properties: {
              event_cancel: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_end: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_open: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_request_approval: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_end_fail: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_publish_now: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_test: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_reject: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_publish_fail: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_end_now: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_approve: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_test_fail: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_end_success: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_publish_success: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_expire: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_schedule: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
              event_publish: {
                additionalProperties: false,
                required: ['enabled'],
                type: 'object',
                properties: {
                  enabled: {
                    type: 'boolean',
                  },
                },
              },
            },
          },
          channel: {
            type: 'string',
          },
        },
      },
    },
  },
  updateProjectSetting: jest.fn(),
};

export const settingSchema = {
  ...projectSettingsProps,
  ...eventSettingsProps,
  formData: eventSettings,
  handleSubmit: jest.fn(),
};

export const statelessSettingSchemaProps = {
  ...settingSchema,
  expandAll: jest.fn(),
  handleSelection: jest.fn(),
  handleChange: jest.fn(),
  handleFormChange: jest.fn(),
  isExpanded: { root: true },
  formContext: {},
  formRef: jest.fn(),
  openKey: ['pending', 'active'],
};

/* Color Settings */
export const colorPickerProps = {
  colorSettings,
  currentProject,
  projectColors: [
    { name: 'test', color: '#000000', title: 1 },
    { name: 'target', color: '#FFFFFF', title: 3 },
  ],
  updateProjectSetting: jest.fn(),
};

export const statelessColorPickerProps = {
  ...colorPickerProps,
  open: false,
  selectedColor: '#000000',
  handleChangeComplete: jest.fn(),
  handleRowSelection: jest.fn(),
  handleAccept: jest.fn(),
  handleCancel: jest.fn(),
};

/* User List */
export const userListProps = {
  ...ProjectSettings,
  userList: users,
  filterGroups: jest.fn(),
  onSearch: jest.fn(),
  onSelectItem: jest.fn(),
  selectedItem: { id: 1 },
  nextPage: 'nextpageurl',
  onShowMore: jest.fn(),
};

export const groupListProps = {
  ...ProjectSettings,
  _createGroupModalLoading: false,
  _createGroupModalVisible: false,
  _createGroupOnRemoteSubmit: jest.fn(),
  _groupModalCancel: jest.fn(),
  _isCreateGroupModalPristine: true,
  _onSearch: jest.fn(),
  _onShowMore: jest.fn(),
  _onSubmit: jest.fn(),
  _openCreateGroupModal: jest.fn(),
  availableUsers,
  deleteGroup: jest.fn(),
  filterGroups: jest.fn(),
  groupList: groups,
  nextGroupsPage: 'nextpageurl',
  onSelectItem: jest.fn(),
  renderExtraFields: jest.fn(),
  selectedItem: {},
  showMore: true,
};

export const listItemProps = {
  connectDragSource: jest.fn(),
  user: { id: 1, username: 'JohnDoe' },
};

/** Responsibility Group */

export const responsibilityGroupProps = {
  envType: {
    id: 2,
    responsibilities: [
      {
        id: 1,
        code: 'authorize_pubstorage',
        name: 'Authorize | Publisher Storage',
      },
      { id: 2, code: 'authorize_motd', name: 'Authorize | MOTD' },
      { id: 3, code: 'authorize_playlist', name: 'Authorize | Playlists' },
      {
        id: 4,
        code: 'authorize_pubvars',
        name: 'Authorize | Publisher Variables',
      },
      { id: 5, code: 'authorize_pyscript', name: 'Authorize | PyScript' },
      {
        id: 6,
        code: 'authorize_objectstore',
        name: 'Authorize | Object Store',
      },
    ],
    type: 'Certification',
  },
  selection: 'envTypes[0]',
  index: 0,
};

/** Responsibility/Gamertag Form */
export const masterDetailFormProps = {
  form: 'GroupsForm',
  formFields: jest.fn(),
};

/** Responsibility/Gamertags Group Details */
export const groupDetailsProps = {
  match: { params: { id: 1 } },
};

export const userDetailsProps = {
  selectedItem: { id: 4, username: 'admin' },
  optionTypes: [],
  selectedTab: 'Groups',
  onTabChange: jest.fn(),
  fetchAssignedGroups: jest.fn(),
  fetchAvailableGroups: jest.fn(),
  addUserToGroup: jest.fn(),
  onSave: jest.fn(),
  assignedGroups: [],
  groups: [],
  isLoading: false,
  initialValuesAdvanced: {},
  initialValuesRespGroups: {},
  project: 1,
  baseUrl: '',
};

export const responsibilityUserGroupsProps = {
  userID: 1,
  assignedGroups: [],
  fetchAssignedGroups: jest.fn(),
  fetchAvailableGroups: jest.fn(),
  addUserToGroup: jest.fn(),
  groups: [
    { id: 10, name: 'group1' },
    { id: 20, name: 'group2' },
  ],
  handleSubmit: jest.fn(() => jest.fn()),
  onSubmit: jest.fn(),
  onReset: jest.fn(),
  classes: {},
  project: 1,
  baseUrl: '',
  initialValues: {},
};

export const formComponentProps = {
  defaultValue: [],
  options: [],
  addUserToGroup: jest.fn(),
  handleSubmit: jest.fn(() => jest.fn()),
  onSubmit: jest.fn(),
  onReset: jest.fn(),
  form: '',
  pristine: true,
  submitting: false,
};

export const usersContainerProps = {
  onFetchUserList: jest.fn(),
  onFetchGroupList: jest.fn(),
  onShowMore: jest.fn(),
  onSearch: jest.fn(),
  renderDetails: jest.fn(),
  selectedItem: {},
  nextPage: null,
  userList: [],
  groups: {},
  project: 1,
  match: { params: { id: 1 } },
  baseUrl: '',
};
