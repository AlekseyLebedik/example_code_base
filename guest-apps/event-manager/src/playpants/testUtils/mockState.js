export default {
  Scenes: {
    ProjectSettings: {
      Users: {
        availableUsers: {
          data: [
            {
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
          ],
          next: null,
          params: {
            sort: 'name',
          },
          loading: false,
        },
        userListFilters: {
          query: '',
        },
      },
      Schemas: {
        data: [],
        loading: false,
      },

      Responsibilities: {
        groups: {
          data: [
            {
              id: 1,
              project: 1,
              name: 'GTR Group 1',
              description: '',
            },
            {
              id: 6,
              project: 1,
              name: 'asdf',
              description: '',
            },
            {
              id: 2,
              project: 1,
              name: 'GTR Group',
              description: 'asdf',
            },
            {
              id: 3,
              project: 1,
              name: 'New Group',
              description: '',
            },
            {
              id: 5,
              project: 1,
              name: 'sanghawk group test',
              description: '',
            },
            {
              id: 7,
              project: 1,
              name: 'sanghawk group testsdfgsdf',
              description: '',
            },
          ],
          next: null,
          params: {
            project: 1,
          },
          loading: false,
        },
        responsibilityOptions: {
          data: [
            {
              id: 1,
              code: 'authorize_pubstorage',
              name: 'Authorize | Publisher Storage',
            },
            {
              id: 2,
              code: 'authorize_motd',
              name: 'Authorize | MOTD',
            },
            {
              id: 3,
              code: 'authorize_playlist',
              name: 'Authorize | Playlists',
            },
            {
              id: 4,
              code: 'authorize_pubvars',
              name: 'Authorize | Publisher Variables',
            },
            {
              id: 5,
              code: 'authorize_pyscript',
              name: 'Authorize | PyScript',
            },
            {
              id: 6,
              code: 'authorize_publisher_objects',
              name: 'Authorize | Publisher Objects',
            },
          ],
          next: null,
          loading: false,
        },
        responsibilityGroups: {
          data: [
            {
              id: 25,
              project: 1,
              env_type: 'Certification',
              group: 7,
              user: null,
              responsibilities: [3],
            },
            {
              id: 26,
              project: 1,
              env_type: 'Development',
              group: 7,
              user: null,
              responsibilities: [],
            },
          ],
          next: null,
          params: {
            group: '7',
            project: 1,
          },
          loading: false,
        },
        group: {
          members: {
            data: [
              {
                id: 3,
                username: 'admin',
                name: 'Admin',
                email: 'admin@test.com',
              },
              {
                id: 1,
                username: 'username',
                name: 'Initial User',
                email: 'noreply@demonware.net',
              },
            ],
            next: null,
            params: {
              id: '7',
            },
            loading: false,
          },
        },
        user: {
          assignedGroups: {
            data: [
              {
                id: 1,
                project: 1,
                name: 'Group 1',
                description: '',
              },
            ],
            next: null,
            params: {
              userID: 1,
              project: 1,
            },
            loading: false,
          },
        },
      },
    },
    Schedule: {
      form: {
        defaultStartDate: 1546372800,
        defaultEndDate: 1546376400,
        isRange: false,
      },
      events: {
        eventList: {
          data: [
            {
              id: 1,
              title: 'Test Event',
              created_at: 1560983839,
              created_by: {
                id: 1,
                name: 'Initial User',
              },
              publish_at: 1561057200,
              end_at: 1561243001,
              status: 'open',
              activities: [
                {
                  id: 5,
                  type: 'motd',
                  activity:
                    '{"languages":[{"language":"sp","text":"Hola Amigo :D"}]}',
                  title_envs: [1],
                  publish_on: 'on_start',
                  exec_order: 0,
                  updated_by: {
                    id: 1,
                    name: 'Initial User',
                  },
                },
                {
                  id: 6,
                  type: 'pubstorage',
                  activity: '{"files":[1]}',
                  title_envs: [],
                  publish_on: 'on_start',
                  exec_order: 1,
                  updated_by: {
                    id: 1,
                    name: 'Initial User',
                  },
                },
                {
                  id: 7,
                  type: 'pyscript',
                  activity:
                    '{"template_id":"double_xp","name":"Double XP","version":"v1.0.4","inputs":[{"key":"icon","value":{}},{"key":"xp_multiplier","value":2}]}',
                  title_envs: [],
                  publish_on: 'on_start',
                  exec_order: 2,
                  updated_by: {
                    id: 1,
                    name: 'Initial User',
                  },
                },
                {
                  id: 8,
                  type: 'pubvars',
                  activity: '{"variable_sets":[]}',
                  title_envs: [1],
                  publish_on: 'on_end',
                  exec_order: 0,
                  updated_by: {
                    id: 1,
                    name: 'Initial User',
                  },
                },
              ],
              updated_at: 1560985348,
              updated_by: {
                id: 1,
                name: 'Initial User',
              },
              note: 'testing notes',
              project: 1,
              env_type: 'Development',
              event_type: 'event-manager',
              authorizations: [],
              authorizers: [
                {
                  id: 1,
                  name: 'Initial User',
                },
                {
                  id: 3,
                  name: 'Admin',
                },
              ],
              locked_by: null,
              task: null,
              start: '2019-06-20T19:00:00.000Z',
              end: '2019-06-22T22:36:41.000Z',
              allDay: true,
              type: 'eventManager',
              auto_tags: ['PS4'],
              manual_tags: ['PS4'],
              platforms: ['PS'],
            },
            {
              id: 2,
              title: 'Pending Event',
              created_at: 1560984234,
              created_by: {
                id: 1,
                name: 'Initial User',
              },
              publish_at: 1561402800,
              end_at: null,
              status: 'pending',
              activities: [
                {
                  id: 10,
                  type: 'motd',
                  activity: '{"languages":[]}',
                  title_envs: [],
                  publish_on: 'on_start',
                  exec_order: 0,
                  updated_by: {
                    id: 1,
                    name: 'Initial User',
                  },
                },
                {
                  id: 9,
                  type: 'publisher_objects',
                  activity: '{"files":[]}',
                  title_envs: [1],
                  publish_on: 'on_end',
                  exec_order: 1,
                  updated_by: {
                    id: 1,
                    name: 'Initial User',
                  },
                },
              ],
              updated_at: 1560984249,
              updated_by: {
                id: 1,
                name: 'Initial User',
              },
              note: '',
              project: 1,
              env_type: 'Development',
              authorizations: [],
              authorizers: [],
              locked_by: 1,
              task: null,
              start: '2019-06-24T19:00:00.000Z',
              end: '2019-06-24T20:00:00.000Z',
              allDay: false,
              type: 'eventManager',
              auto_tags: ['PS4'],
              manual_tags: ['PS4'],
              platforms: ['PS'],
            },
            {
              id: 3,
              title: 'Approved Event',
              created_at: 1560986351,
              created_by: {
                id: 1,
                name: 'Initial User',
              },
              publish_at: 1561575600,
              end_at: null,
              status: 'pending',
              activities: [
                {
                  id: 18,
                  type: 'pyscript',
                  activity: '{"inputs":[]}',
                  title_envs: [1],
                  publish_on: 'on_start',
                  exec_order: 0,
                  updated_by: {
                    id: 1,
                    name: 'Initial User',
                  },
                },
              ],
              updated_at: 1560986360,
              updated_by: {
                id: 1,
                name: 'Initial User',
              },
              note: '',
              project: 1,
              env_type: 'Development',
              authorizations: [
                {
                  id: 1,
                  user: 1,
                  status: 'approved',
                  timestamp: 1560986366,
                },
              ],
              authorizers: [],
              locked_by: null,
              task: null,
              start: '2019-06-26T19:00:00.000Z',
              end: '2019-06-26T20:00:00.000Z',
              allDay: false,
              type: 'eventManager',
              auto_tags: ['PS4'],
              manual_tags: ['PS4'],
              platforms: ['PS'],
            },
          ],
          error: null,
          loading: false,
        },
        infoEventsList: {
          data: [
            {
              id: 53,
              title: 'PMG Event',
              created_at: 1580168252,
              created_by: {
                id: 1,
                name: 'Initial User',
              },
              publish_at: 1581292800,
              event_type: 'pmg',
              end_at: null,
              status: 'open',
              activities: [],
              updated_at: 1580168255,
              updated_by: {
                id: 1,
                name: 'Initial User',
              },
              note: '',
              project: 1,
              env_type: 'Development',
              authorizations: [],
              locked_by: null,
              task: null,
              manual_tags: [],
              auto_tags: ['open', 'pmg', 'ps4', 'development'],
              platforms: ['PS4'],
              authorizers: [],
              is_private: false,
              is_deleted: false,
              is_manually_locked: false,
              is_template: false,
              is_restricted: false,
              watchers: [
                {
                  id: 1,
                  name: 'Initial User',
                },
              ],
            },
            {
              id: 54,
              title: 'Demonware Event',
              created_at: 1580168252,
              created_by: {
                id: 1,
                name: 'Initial User',
              },
              publish_at: 1581292800,
              event_type: 'demonware',
              end_at: null,
              status: 'open',
              activities: [],
              updated_at: 1580168255,
              updated_by: {
                id: 1,
                name: 'Initial User',
              },
              note: '',
              project: 1,
              env_type: 'Development',
              authorizations: [],
              locked_by: null,
              task: null,
              manual_tags: [],
              auto_tags: ['open', 'demonware', 'ps4', 'development'],
              platforms: ['PS4'],
              authorizers: [],
              is_private: false,
              is_deleted: false,
              is_manually_locked: false,
              is_template: false,
              is_restricted: false,
              watchers: [
                {
                  id: 1,
                  name: 'Initial User',
                },
              ],
            },
          ],
          error: null,
          loading: false,
        },
        abTests: {
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
          error: null,
          loading: false,
        },
      },
      selectedTemplate: {
        id: 1,
        project: 1,
        created_at: 1567793051,
        updated_at: 1567793051,
        created_by: null,
        updated_by: null,
        duration: null,
        name: 'template',
        description: '',
        is_available: true,
        restrict_activities: true,
        source_event: 2,
      },
      templateSourceEvent: {
        data: {
          id: 2,
          title: 'asdf',
          created_at: 1567792991,
          created_by: {
            id: 1,
            name: 'Initial User',
          },
          publish_at: 1567796400,
          end_at: null,
          status: 'open',
          activities: [
            {
              id: 2,
              type: 'pubstorage',
              activity: {
                files: [2],
              },
              title_envs: [],
              publish_on: 'on_start',
              exec_order: 0,
              updated_by: {
                id: 1,
                name: 'Initial User',
              },
            },
          ],
          updated_at: 1567793023,
          updated_by: {
            id: 1,
            name: 'Initial User',
          },
          note: '',
          project: 1,
          env_type: 'Development',
          authorizations: [],
          locked_by: null,
          task: null,
          manual_tags: ['a', 'b', 'c'],
          auto_tags: ['development', 'open', 'asdf', 'crossplay'],
          platforms: ['CROSSPLAY'],
          authorizers: [],
          is_private: false,
          is_deleted: false,
          is_manually_locked: false,
          is_template: true,
          is_restricted: true,
          watchers: [],
        },
        loading: true,
      },
    },
    Event: {
      activity: {
        searchAvailable: true,
        selectedActivityType: 'all',
        selectedActivity: 13,
        pyscripts: {
          templates: [
            {
              schema: {
                additionalProperties: false,
                required: ['xp_multiplier'],
                type: 'object',
                properties: {
                  icon: {
                    contentMediaType: 'application/octet-stream',
                    type: 'string',
                    contentEncoding: 'base64',
                  },
                  xp_multiplier: {
                    minimum: 1,
                    type: 'number',
                    multipleOf: 1,
                    maximum: 2,
                  },
                },
              },
              description: 'Double XP Activity',
              version: 'v1.0.1',
              id: 'double-xp',
              name: 'Double Xp',
            },
            {
              schema: {
                additionalProperties: false,
                required: [
                  'weapon_type',
                  'attachments',
                  'attachment_icons',
                  'cost',
                ],
                type: 'object',
                properties: {
                  weapon_type: {
                    minLength: 3,
                    type: 'string',
                    maxLength: 15,
                  },
                  attachment_icons: {
                    items: {
                      contentMediaType: 'image/png',
                      type: 'string',
                      contentEncoding: 'base64',
                    },
                    type: 'array',
                  },
                  cost: {
                    minimum: 10,
                    type: 'number',
                    multipleOf: 10,
                  },
                  attachments: {
                    uniqueItems: true,
                    items: {
                      type: 'string',
                      maxLength: 15,
                    },
                    type: 'array',
                  },
                },
              },
              description: 'Weapon Drop Activity',
              version: 'v1.0.0',
              id: 'weapon-drop',
              name: 'Weapon Drop',
            },
          ],
        },
        variableSets: [
          {
            context: '1',
            group_id: '1',
            is_major_update: false,
            major_version: 1,
            minor_version: 1,
            namespace: 'Namespace1',
            liveVariables: {
              test: 'var1',
            },
            oldVariables: {
              test: 'var1',
            },
            variables: {
              test: 'var1',
            },
          },
          {
            context: '1',
            group_id: '2',
            is_major_update: false,
            major_version: 1,
            minor_version: 1,
            namespace: 'Namespace2',
            liveVariables: {
              test: 'var1',
            },
            oldVariables: {
              test: 'var1',
            },
            variables: {},
          },
          {
            context: '1',
            group_id: '1',
            is_major_update: false,
            major_version: 1,
            minor_version: 1,
            namespace: 'Namespace3',
            liveVariables: {},
            oldVariables: {},
            variables: {
              test: 'var1',
            },
          },
          {
            context: '1',
            group_id: '2',
            is_major_update: false,
            major_version: 1,
            minor_version: 1,
            namespace: 'Namespace4',
            liveVariables: { test: 'var1' },
            oldVariables: { test: 'var1' },
            variables: { test: 'var1', test2: 'var2' },
          },
        ],
        filestorage: {
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
          uploadProgress: {
            1563392198: {
              received: 776,
              size: 776,
            },
          },
          contexts: {
            data: ['1', 'test', 'another'],
            loading: false,
          },
        },
        loading: false,
        achievements: {
          rulesetList: {
            data: [
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
            loading: false,
          },
          selectedRuleset: {
            data: {
              code: 'eoisduf0qe343',
              lastUpdateTimestamp: 1565842668,
              codeHash: '4mhdBfYBdYmeco1ve62h0b6rue8=',
              label: 'stronghold-8',
              codeSignature:
                'v/kWwu8MBe1GGSxK64a3OqKynmKpGJYGlylUMT0asJ+ZHiuonlDAl2igzISRqgMuPWJf/HqCxvAbxuAMxq+YCg==',
              activationTimestamp: null,
              creationTimestamp: 1565841879,
              isActive: false,
              codeSignatureTimestamp: 1565841879,
            },
            loading: false,
          },
        },
        thunderpants: {
          buildList: {
            data: [
              {
                uid: 'e36576c1fb46e4d60c9ccf1cb5ae2f01dfcd96c6e226b424c715aec84155bd9b',
                source_name: 'iw8-rebuildds',
                timestamp: 1581459817,
                base: {
                  relative_folder:
                    'autobuild/versions/submission_7431811_sub_tu13_ccs_2/linux/dedicated',
                  identifier: 'game_dh_server_linux.out',
                },
                properties: {
                  title: 'iw8',
                  platform: 'all',
                  flavor: 'test',
                  version: '7431811',
                  os: 'linux',
                  dw_flavor: 'vanilla',
                  branch: 'submission',
                  ccs_version: '1302',
                },
                ui_properties: {
                  folder: 'autobuild:submission_7431811_sub_tu13_ccs_2',
                  version: '7431811@1302',
                },
              },
            ],
            success: false,
            params: {
              view: 'iw8linux',
            },
            loading: false,
          },
          buildSchema: {
            data: [
              {
                name: 'Source',
                field: 'source_name',
              },
              {
                name: 'Folder',
                field: 'ui_properties.folder',
              },
              {
                name: 'Version',
                field: 'ui_properties.version',
              },
              {
                name: 'OS',
                field: 'properties.os',
              },
              {
                name: 'Flavor',
                field: 'properties.flavor',
              },
              {
                name: 'DW-Flavor',
                field: 'properties.dw_flavor',
              },
              {
                name: 'Timestamp',
                field: 'timestamp',
                type: 'timestamp',
              },
            ],
            success: false,
            params: {
              view: 'iw8linux',
            },
            loading: false,
          },
          deployerList: {
            data: [
              {
                base_url:
                  'https://uidev-hq.tp.demonware.net/deployer/uidev_ng/api',
                environment: 'Certification',
                id: 21,
                name: 'Thunderpants MTP Cert Deployer 1',
              },
            ],
            success: true,
          },
          deploymentList: {
            data: [
              {
                uid: '84fe6b23-9eef-4fcd-b350-cef71c228eaa',
                build_uid:
                  'e36576c1fb46e4d60c9ccf1cb5ae2f01dfcd96c6e226b424c715aec84155bd9b',
                view_name: 'iw8linux',
                target_name: 'uidev:dev(mp)',
                user_params: {
                  max_instances_per_machine: 1,
                },
                last_timestamp: 1581636361,
                status: 'deployed',
                tp_client: 'devdeployer',
                tp: {
                  env: 'uidev',
                  build_name:
                    'iw8-all-test-dev-7378641-autobuild_mp:7372969_7378641@7378641@(mp)@e36fc01f-linux',
                  tags: {
                    server_type: 'mp',
                    build_config_overrides: {
                      deployer: {
                        deploy: {
                          max: 1,
                        },
                      },
                    },
                    dw_flavor: 'vanilla',
                    __tp_auto_ng_uidev:
                      'eJwtzMsKwjAQQNFfKVkbSGYmD/2ZknlBoHZXK4j/LgXXl3M/4ZgaHkvo5FYZMN7NPJKLRsaSopi3LADdxgi3Jbymnes+nnahefZt7sf7CnzMTdf/zVUHqDiO1JCRKpdiWIs7GQ3rQki5VcgOhOZVcpfCeTTOoAklfH+MjSyT',
                  },
                  stats: {},
                  auto_tag: {
                    uid: '84fe6b23-9eef-4fcd-b350-cef71c228eaa',
                    view_name: 'iw8linux',
                    build_uid:
                      'fdda2dcf3a073b346b55e365ff4e4ae8c43417621f243ef6c18c5b1a7b12d03c',
                  },
                },
              },
              {
                uid: '84fe6b23-9eef-4fcd-b350-cef71c228eaa2',
                build_uid:
                  'e36576c1fb46e4d60c9ccf1cb5ae2f01dfcd96c6e226b424c715aec84155bd9b',
                view_name: 'iw8linux',
                target_name: 'uidev:dev(gw)',
                user_params: {
                  max_instances_per_machine: 1,
                },
                last_timestamp: 1581636361,
                status: 'deployed',
                tp_client: 'devdeployer',
                tp: {
                  env: 'uidev',
                  build_name:
                    'iw8-all-test-dev-7378641-autobuild_mp:7372969_7378641@7378641@(mp)@e36fc01f-linux',
                  tags: {
                    server_type: 'mp',
                    build_config_overrides: {
                      deployer: {
                        deploy: {
                          max: 1,
                        },
                      },
                    },
                    dw_flavor: 'vanilla',
                    __tp_auto_ng_uidev:
                      'eJwtzMsKwjAQQNFfKVkbSGYmD/2ZknlBoHZXK4j/LgXXl3M/4ZgaHkvo5FYZMN7NPJKLRsaSopi3LADdxgi3Jbymnes+nnahefZt7sf7CnzMTdf/zVUHqDiO1JCRKpdiWIs7GQ3rQki5VcgOhOZVcpfCeTTOoAklfH+MjSyT',
                  },
                  stats: {},
                  auto_tag: {
                    uid: '84fe6b23-9eef-4fcd-b350-cef71c228eaa',
                    view_name: 'iw8linux',
                    build_uid:
                      'fdda2dcf3a073b346b55e365ff4e4ae8c43417621f243ef6c18c5b1a7b12d03c',
                  },
                },
              },
              {
                uid: '84fe6b23-9eef-4fcd-b350-cef71c228eaa3',
                build_uid:
                  'e36576c1fb46e4d60c9ccf1cb5ae2f01dfcd96c6e226b424c715aec84155bd9b',
                view_name: 'iw8linux',
                target_name: 'uidev:dev(gw)',
                user_params: {
                  max_instances_per_machine: 1,
                },
                last_timestamp: 1581636361,
                status: 'deployed',
                tp_client: 'devdeployer',
                tp: {
                  env: 'uidev',
                  build_name:
                    'iw8-all-test-dev-7378641-autobuild_mp:7372969_7378641@7378641@(mp)@e36fc01f-linux',
                  tags: {
                    server_type: 'mp',
                    build_config_overrides: {
                      deployer: {
                        deploy: {
                          max: 1,
                        },
                      },
                    },
                    dw_flavor: 'vanilla',
                    __tp_auto_ng_uidev:
                      'eJwtzMsKwjAQQNFfKVkbSGYmD/2ZknlBoHZXK4j/LgXXl3M/4ZgaHkvo5FYZMN7NPJKLRsaSopi3LADdxgi3Jbymnes+nnahefZt7sf7CnzMTdf/zVUHqDiO1JCRKpdiWIs7GQ3rQki5VcgOhOZVcpfCeTTOoAklfH+MjSyT',
                  },
                  stats: {},
                  auto_tag: {
                    uid: '84fe6b23-9eef-4fcd-b350-cef71c228eaa',
                    view_name: 'iw8linux',
                    build_uid:
                      'fdda2dcf3a073b346b55e365ff4e4ae8c43417621f243ef6c18c5b1a7b12d03c',
                  },
                },
              },
            ],
            success: false,
            params: {
              view: 'iw8linux',
            },
            loading: false,
          },
          targetList: {
            data: [
              {
                name: 'uidev:dev(mp)',
              },
              {
                name: 'uidev:dev(gw)',
              },
            ],
            success: false,
            params: {
              view: 'iw8linux',
            },
            loading: false,
          },
          userParamsSchema: {
            data: [
              {
                name: 'max_instances_per_machine',
                type: 'integer',
                description:
                  'How many instances of the server to deploy per machine',
                default: 10,
                minimum: 0,
                maximum: 300,
              },
              {
                name: 'extra_cmdline_args',
                type: 'string',
                description: 'Any additional commandline parameters',
                default: '',
              },
            ],
            success: false,
            params: {
              view: 'iw8linux',
            },
            loading: false,
          },
          viewList: {
            data: ['iw8linux'],
            success: false,
            loading: false,
          },
          form: {
            data: {},
            schema: [],
            summary: {},
            targets: [],
            type: '',
          },
        },
      },
      discussion: {
        data: [
          {
            id: 2,
            user: { id: 2, name: 'John Snow' },
            timestamp: 1560985158,
            text: 'The king of the north!',
          },
          {
            id: 1,
            user: { id: 1, name: 'Initial User' },
            timestamp: 1560985107,
            text: 'Hey',
          },
        ],
        loading: false,
      },
      event: {
        loading: false,
        data: {
          id: 2,
          title: 'Test Event',
          created_at: 1560983839,
          created_by: {
            id: 1,
            name: 'Initial User',
          },
          publish_at: 1561057200,
          end_at: 1561243001,
          status: 'open',
          updated_at: 1560985103,
          updated_by: {
            id: 1,
            name: 'Initial User',
          },
          note: 'testing notes',
          project: 1,
          env_type: 'Development',
          is_schedule: false,
          authorizations: [],
          authorizers: [],
          locked_by: 1,
          task: null,
          event_type: 'event-manager',
          auto_tags: ['PS4'],
          manual_tags: ['PS4'],
          platforms: ['PS'],
          activities: [
            {
              id: 13,
              type: 'motd',
              activity: {
                inputs: [
                  {
                    language: 'sp',
                    text: 'Hola Amigo :D',
                  },
                ],
              },
              title_envs: [1],
              publish_on: 'on_start',
              exec_order: 0,
              updated_by: {
                id: 1,
                name: 'Initial User',
              },
            },
            {
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
            {
              id: 1,
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
              title_envs: [1],
              publish_on: 'on_start',
              exec_order: 0,
              updated_by: {
                id: 1,
                name: 'Initial User',
              },
            },
            {
              id: 2,
              type: 'tp_deployment',
              activity: {
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
                    uid: 'undeploy_1',
                    build_uid: '84fe6b23-9eef-4fcd-b350-cef71c228eaa2',
                  },
                ],
                modify: [
                  {
                    build_uid: '84fe6b23-9eef-4fcd-b350-cef71c228eaa3',
                    uid: 'modify_1',
                    user_params: {},
                  },
                ],
              },
              title_envs: [1],
              publish_on: 'on_start',
              exec_order: 0,
              updated_by: {
                id: 1,
                name: 'Initial User',
              },
            },
          ],
        },
      },
      status: {
        name: 'Open',
        readOnly: false,
        allowAuths: true,
        canOpen: false,
        canCancel: true,
        canDelete: true,
        showAuths: false,
        showTemplates: true,
        failed: false,
        locked: false,
      },
    },
    Templates: {
      searchedTemplates: {
        data: [],
        loading: false,
      },
    },
  },
  Components: {
    App: {
      projectSettings: {
        data: [
          {
            activitySettings: [
              {
                type: 'motd',
                enabled: false,
                name: 'Message of The Day',
                allow_multi_titles: true,
                allow_duplication: true,
                allow_revert: false,
                context: { is_enabled: false, type: 'title' },
              },
              {
                type: 'playlist',
                enabled: false,
                name: 'Playlists',
                allow_multi_titles: true,
                allow_duplication: true,
                allow_revert: false,
                context: { is_enabled: false, type: 'title' },
              },
              {
                type: 'pubvars',
                enabled: true,
                name: 'Publisher Variables',
                allow_multi_titles: false,
                allow_duplication: true,
                allow_revert: true,
                context: { is_enabled: false, type: 'title' },
                variable_mapping: {
                  LKKNORQKTP: 'mp_xp_mult_scale',
                  MSTMLNKSSO: 'mp_weapon_xp',
                },
              },
              {
                type: 'pubstorage',
                enabled: true,
                name: 'Publisher Storage',
                allow_multi_titles: false,
                allow_duplication: false,
                allow_revert: true,
                context: { is_enabled: false, type: 'title' },
              },
              {
                type: 'pyscript',
                enabled: true,
                name: 'Python Script',
                allow_multi_titles: false,
                allow_duplication: true,
                allow_revert: true,
                context: { is_enabled: false, type: 'title' },
              },
              {
                type: 'ae',
                enabled: true,
                name: 'Achievements Engine',
                allow_multi_titles: false,
                allow_duplication: true,
                allow_revert: true,
                context: { is_enabled: true, type: 'title' },
              },
              {
                type: 'publisher_objects',
                enabled: true,
                name: 'Publisher Objects',
                allow_multi_titles: false,
                allow_duplication: true,
                allow_revert: true,
                context: { is_enabled: true, type: 'title' },
              },
            ],
            colorSettings: [
              {
                title: 1,
                color: '#e16161',
              },
            ],
            eventSettings: {
              statuses: {
                scheduled: {
                  allow_delete: true,
                  is_read_only: true,
                  name: 'Scheduled',
                  allow_request_approval: false,
                  allow_open: false,
                  allow_authorization: false,
                  show_authorization: true,
                  allow_cancel: true,
                },
                cancelled: {
                  allow_delete: false,
                  is_read_only: true,
                  name: 'Cancelled',
                  allow_request_approval: false,
                  allow_open: false,
                  allow_authorization: false,
                  show_authorization: true,
                  allow_cancel: false,
                },
                expired: {
                  allow_delete: false,
                  is_read_only: true,
                  name: 'Expired',
                  allow_request_approval: false,
                  allow_open: false,
                  allow_authorization: false,
                  show_authorization: true,
                  allow_cancel: false,
                },
                rejected: {
                  allow_delete: true,
                  is_read_only: true,
                  name: 'Rejected',
                  allow_request_approval: false,
                  allow_open: true,
                  allow_authorization: false,
                  show_authorization: true,
                  allow_cancel: false,
                },
                ended: {
                  allow_delete: false,
                  is_read_only: true,
                  name: 'Ended',
                  allow_request_approval: false,
                  allow_open: false,
                  allow_authorization: false,
                  show_authorization: true,
                  allow_cancel: false,
                },
                published: {
                  allow_delete: false,
                  is_read_only: true,
                  name: 'Published',
                  allow_request_approval: false,
                  allow_open: false,
                  allow_authorization: false,
                  show_authorization: true,
                  allow_cancel: false,
                },
                active: {
                  allow_delete: false,
                  is_read_only: true,
                  name: 'Active',
                  allow_request_approval: false,
                  allow_open: false,
                  allow_authorization: false,
                  show_authorization: true,
                  allow_cancel: true,
                },
                open: {
                  allow_delete: true,
                  is_read_only: false,
                  name: 'Open',
                  allow_request_approval: true,
                  allow_open: false,
                  allow_authorization: false,
                  show_authorization: false,
                  allow_cancel: false,
                },
                approved: {
                  allow_delete: true,
                  is_read_only: true,
                  name: 'Approved',
                  allow_request_approval: false,
                  allow_open: false,
                  allow_authorization: false,
                  show_authorization: true,
                  allow_cancel: true,
                },
                pending: {
                  allow_delete: true,
                  is_read_only: true,
                  name: 'Pending Approval',
                  allow_request_approval: false,
                  allow_open: true,
                  allow_authorization: true,
                  show_authorization: true,
                  allow_cancel: true,
                },
              },
            },
            globalSettings: {
              is_multicontext: false,
              single_approver: true,
            },
            id: 1,
            notificationSettings: {
              email: {
                type_settings: {
                  event_cancel: {
                    enabled: false,
                  },
                  event_end: {
                    enabled: true,
                  },
                  event_open: {
                    enabled: true,
                  },
                  event_request_approval: {
                    enabled: false,
                  },
                  event_end_fail: {
                    enabled: true,
                  },
                  event_publish_now: {
                    enabled: false,
                  },
                  event_test: {
                    enabled: true,
                  },
                  event_reject: {
                    enabled: true,
                  },
                  event_publish_fail: {
                    enabled: true,
                  },
                  event_end_now: {
                    enabled: true,
                  },
                  event_approve: {
                    enabled: false,
                  },
                  event_test_fail: {
                    enabled: true,
                  },
                  event_end_success: {
                    enabled: true,
                  },
                  event_publish_success: {
                    enabled: true,
                  },
                  event_expire: {
                    enabled: true,
                  },
                  event_schedule: {
                    enabled: true,
                  },
                  event_publish: {
                    enabled: false,
                  },
                },
                address: 'james@gmail.com',
              },
              slack: {
                type_settings: {
                  event_cancel: {
                    enabled: true,
                  },
                  event_end: {
                    enabled: true,
                  },
                  event_open: {
                    enabled: true,
                  },
                  event_request_approval: {
                    enabled: true,
                  },
                  event_end_fail: {
                    enabled: true,
                  },
                  event_publish_now: {
                    enabled: false,
                  },
                  event_test: {
                    enabled: true,
                  },
                  event_reject: {
                    enabled: true,
                  },
                  event_publish_fail: {
                    enabled: false,
                  },
                  event_end_now: {
                    enabled: true,
                  },
                  event_approve: {
                    enabled: true,
                  },
                  event_test_fail: {
                    enabled: true,
                  },
                  event_end_success: {
                    enabled: true,
                  },
                  event_publish_success: {
                    enabled: true,
                  },
                  event_expire: {
                    enabled: true,
                  },
                  event_schedule: {
                    enabled: true,
                  },
                  event_publish: {
                    enabled: false,
                  },
                },
                channel: '#asdf',
              },
            },
            platformSettings: ['CROSSPLAY', 'PC', 'PS4', 'SWITCH', 'XB1'],
            eventTypeSettings: [
              { key: 'event-manager', name: 'Event Manager' },
              { key: 'pmg', name: 'PMG' },
              { key: 'demonware', name: 'Demonware' },
            ],
            calendarPresetsSettings: [
              {
                value: 'info',
                label: 'Info',
                path: 'customTags=%7B%22unspecified%22%3Atrue%2C%22userTags%22%3A%7B%7D%7D&customViewOn=true&datePickerProps=null&eventTimeOffset=0&envTypeFilters=%7B%22Development%22%3Atrue%2C%22Certification%22%3Atrue%2C%22Live%22%3Atrue%2C%22Cross+Environment%22%3Atrue%7D&groupCheckboxes=%7B%22abTesting%22%3A%7B%22active%22%3Afalse%2C%22analysis%22%3Afalse%2C%22archived%22%3Afalse%2C%22config%22%3Afalse%2C%22killed%22%3Afalse%7D%2C%22eventManager%22%3A%7B%22scheduled%22%3Afalse%2C%22cancelled%22%3Afalse%2C%22expired%22%3Afalse%2C%22rejected%22%3Afalse%2C%22ended%22%3Afalse%2C%22published%22%3Afalse%2C%22active%22%3Afalse%2C%22open%22%3Afalse%2C%22approved%22%3Afalse%2C%22pending%22%3Afalse%7D%2C%22informationalEvents%22%3A%7B%22pmg%22%3Atrue%2C%22demonware%22%3Atrue%7D%7D&isCalendarView=true&numberOfDays=31&platformCheckboxes=%7B%22CROSSPLAY%22%3Atrue%2C%22PC%22%3Atrue%2C%22PS4%22%3Atrue%2C%22SWITCH%22%3Atrue%2C%22XB1%22%3Atrue%2C%22Unspecified%22%3Atrue%7D&selectedView=month&showAllColors=true&tagText=&calendarSettingsVersion=1',
                version: 1,
              },
              {
                value: 'All sources',
                label: 'All sources',
                path: 'customTags=%7B%22unspecified%22%3Atrue%2C%22userTags%22%3A%7B%7D%7D&customViewOn=true&datePickerProps=null&eventTimeOffset=0&envTypeFilters=%7B%22Development%22%3Atrue%2C%22Certification%22%3Atrue%2C%22Live%22%3Atrue%2C%22Cross+Environment%22%3Atrue%7D&groupCheckboxes=%7B%22abTesting%22%3A%7B%22active%22%3Atrue%2C%22analysis%22%3Atrue%2C%22archived%22%3Atrue%2C%22config%22%3Atrue%2C%22killed%22%3Atrue%7D%2C%22eventManager%22%3A%7B%22scheduled%22%3Atrue%2C%22cancelled%22%3Atrue%2C%22expired%22%3Atrue%2C%22rejected%22%3Atrue%2C%22ended%22%3Atrue%2C%22published%22%3Atrue%2C%22active%22%3Atrue%2C%22open%22%3Atrue%2C%22approved%22%3Atrue%2C%22pending%22%3Atrue%7D%2C%22informationalEvents%22%3A%7B%22pmg%22%3Atrue%2C%22demonware%22%3Atrue%7D%7D&isCalendarView=true&numberOfDays=31&platformCheckboxes=%7B%22CROSSPLAY%22%3Atrue%2C%22PC%22%3Atrue%2C%22PS4%22%3Atrue%2C%22SWITCH%22%3Atrue%2C%22XB1%22%3Atrue%2C%22Unspecified%22%3Atrue%7D&selectedView=month&showAllColors=false&tagText=&calendarSettingsVersion=1',
                version: 1,
              },
            ],
          },
        ],
        params: {
          project: 1,
        },
        loading: false,
      },
      templates: {
        data: [
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
        next: null,
        params: {
          project: 1,
        },
        loading: false,
      },
      currentProject: {
        id: 1,
        name: 'GTR Project',
        contentTypeId: 19,
        titles: [
          {
            id: 1,
            platform: 'PS3',
            name: 'GTR-PS3',
            environments: [
              {
                contentTypeId: 8,
                id: 2,
                shortType: 'cert',
                type: 'Certification',
                usesABTesting: true,
                usesAE: true,
                usesAsyncMMP: false,
                usesLegacyStore: false,
                usesMarketplace: true,
                usesObjectStore: true,
              },
              {
                contentTypeId: 8,
                id: 1,
                shortType: 'dev',
                type: 'Development',
                usesABTesting: true,
                usesAE: true,
                usesAsyncMMP: false,
                usesLegacyStore: false,
                usesMarketplace: true,
                usesObjectStore: true,
              },
            ],
          },
        ],
      },
      schedules: {
        data: [
          {
            id: 1,
            created_at: 1585683534,
            created_by: {
              id: 1,
              name: 'Initial User',
            },
            name: 'schedule_ps4_default_v1.csv',
            filename: 'schedule_ps4.csv',
            version: 1,
            schedule_type: 'default',
            schedule_file:
              'https://dzqa-storage.s3.amazonaws.com/devzone/playpants_storage/1585683534_9JhNY9lp635TDwTC4yubBTuDUbbAJNLI?AWSAccessKeyId=AKIAJ7QBHV2NGW5NI5UQ&Signature=NUw%2BGLJ6oUbQVUuu3fayBmTc47I%3D&Expires=1595010488',
            project: 1,
          },
        ],
        next: null,
        project: 1,
        loading: false,
      },
    },
    ScheduleComponent: {
      form: {
        defaultStartDate: 1546372800,
        defaultEndDate: 1546376400,
        isRange: false,
      },
      selectedTemplate: {
        id: 1,
        project: 1,
        created_at: 1567793051,
        updated_at: 1567793051,
        created_by: null,
        updated_by: null,
        duration: null,
        name: 'template',
        description: '',
        is_available: true,
        restrict_activities: true,
        source_event: 2,
      },
      templateSourceEvent: {
        data: {
          id: 2,
          title: 'asdf',
          created_at: 1567792991,
          created_by: {
            id: 1,
            name: 'Initial User',
          },
          publish_at: 1567796400,
          end_at: null,
          status: 'open',
          activities: [
            {
              id: 2,
              type: 'pubstorage',
              activity: {
                files: [2],
              },
              title_envs: [],
              publish_on: 'on_start',
              exec_order: 0,
              updated_by: {
                id: 1,
                name: 'Initial User',
              },
            },
          ],
          updated_at: 1567793023,
          updated_by: {
            id: 1,
            name: 'Initial User',
          },
          note: '',
          project: 1,
          env_type: 'Development',
          authorizations: [],
          locked_by: null,
          task: null,
          manual_tags: ['a', 'b', 'c'],
          auto_tags: ['development', 'open', 'asdf', 'crossplay'],
          platforms: ['CROSSPLAY'],
          authorizers: [],
          is_private: false,
          is_deleted: false,
          is_manually_locked: false,
          is_template: true,
          is_restricted: true,
          watchers: [],
        },
        loading: true,
      },
    },
    GamertagManagement: {
      groups: {
        data: [
          {
            id: 1,
            project: 1,
            name: 'asdf',
            description: '',
          },
          {
            id: 2,
            project: 1,
            name: 'GTR Group',
            description: 'asdf',
          },
        ],
        next: null,
        params: {
          project: 1,
        },
        loading: false,
      },
      accounts: {
        data: [],
        loading: false,
      },
      timewarpSettings: {
        data: {
          id: 1,
          color: '#1c77c6',
          date_time: 1586565765,
          time_delta: null,
          priority: 'medium',
          type: 'frozen',
        },
        loading: false,
      },
    },
  },
  Core: {
    CriticalError: {},
    EventsCalendar: {
      checkboxes: {},
      customViewOn: false,
      eventTimeOffset: 0,
      isCalendarView: true,
      numberOfDays: 30,
      searchQuery: '',
      selectedDay: '2019-06-19T22:57:51.252Z',
      selectedView: 'month',
    },
    ModalHandlers: [],
  },
  errors: {
    requestErrorDialog: {
      open: false,
    },
    feedback: {
      loading: false,
      error: '',
      saved: false,
    },
    criticalError: null,
  },
  form: {},
  user: {
    projects: [
      {
        contentTypeId: 19,
        titles: [
          {
            platform: 'PS3',
            id: 1,
            environments: [
              {
                usesAE: true,
                usesABTesting: true,
                usesMarketplace: true,
                usesLegacyStore: false,
                contentTypeId: 8,
                usesObjectStore: true,
                type: 'Certification',
                id: 2,
                usesAsyncMMP: false,
                shortType: 'cert',
              },
              {
                usesAE: true,
                usesABTesting: true,
                usesMarketplace: true,
                usesLegacyStore: false,
                contentTypeId: 8,
                usesObjectStore: true,
                type: 'Development',
                id: 1,
                usesAsyncMMP: false,
                shortType: 'dev',
              },
            ],
            name: 'GTR-PS3',
          },
        ],
        name: 'GTR Project',
        id: 1,
      },
      {
        contentTypeId: 19,
        titles: [
          {
            platform: 'PS3',
            id: 2,
            environments: [
              {
                usesAE: false,
                usesABTesting: false,
                usesMarketplace: false,
                usesLegacyStore: true,
                contentTypeId: 8,
                usesObjectStore: false,
                type: 'Development',
                id: 4,
                usesAsyncMMP: false,
                shortType: 'dev',
              },
            ],
            name: 'mw2-PS3',
          },
        ],
        name: 'Call of Duty: Modern Warfare 2',
        id: 2,
      },
    ],
    profile: {
      id: 1,
      name: 'Initial User',
      userName: 'username',
      isStaff: true,
      isHijacked: false,
      defaultTitleEnv: {
        id: 1,
        titleId: 1,
        shortType: 'dev',
      },
      timezone: null,
    },
    fetchFailed: false,
  },
  permissions: {
    memberships: [
      {
        id: 3,
        isActive: true,
        companyId: 1,
        companyName: 'company',
        groups: [
          {
            id: 2,
            name: 'Coreviz',
            permissions: [],
          },
        ],
        permissions: [],
      },
    ],
    permissions: {},
    fetchFailed: false,
  },
};
