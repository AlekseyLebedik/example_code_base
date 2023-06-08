import moment from 'moment';
import {
  GET_CONFIGURATION_QUERY,
  GET_DEFINITIONS_QUERY,
  GET_DRAFTS_QUERY,
  GET_POPULATIONS_QUERY,
  GET_SCOPES_QUERY,
} from './queries';
import {
  CREATE_DEFINITION_MUTATION,
  RELEASE_DRAFT_MUTATION,
} from './mutations';
import { GLOBAL_PLAYERS, PLAYER } from '../constants';

const MOCK_NOW = 1630576258;
const timestamp = (shift = 0) =>
  moment.unix(MOCK_NOW).subtract(shift, 'days').unix();

const populations = [
  { type: 'global', value: PLAYER },
  { type: 'group', value: 'QA Austin' },
  { type: 'group', value: 'Online Devs' },
  { type: 'user', value: 'glen-23123' },
  { type: 'user', value: 'user-456' },
  { type: 'user', value: 'user-789' },
  { type: 'abtesting', value: 'test-123' },
  { type: 'abtesting', value: 'test-456' },
].map(p => ({
  ...p,
  __typename: 'Population',
  displayValue: null,
  current: null,
}));

export const SCOPES_MOCK = {
  gvsScopes: [
    {
      scopeType: 'title',
      scopeName: '5830',
      scopeURI: 'cod:iw8:5830',
      parentScopeURI: 'cod:iw8',
      parentScopeType: 'game',
      parentScopeName: 'iw8',
      populations,
    },
    {
      scopeType: 'game_build',
      scopeName: 'tu_0',
      scopeURI: 'cod:iw8:5830:tu_0',
      parentScopeURI: 'cod:iw8:5830',
      parentScopeType: 'title',
      parentScopeName: '5830',
      populations,
    },
    {
      scopeType: 'game_build',
      scopeName: 'tu_1',
      scopeURI: 'cod:iw8:5830:tu_1',
      parentScopeURI: 'cod:iw8:5830',
      parentScopeType: 'title',
      parentScopeName: '5830',
      populations,
    },
  ].map(s => ({ ...s, __typename: 'Scope' })),
};

export const DEFINITIONS_MOCK = {
  gvsDefinitions: [
    {
      scopeType: 'franchise',
      scopeName: 'cod',
      scopeURI: 'cod',
      parentScopeURI: '',
      parentScopeType: '',
      parentScopeName: '',
      definitions: [
        {
          key: 'log_event_corrupt_file_sample_rate',
          type: 'uint8',
          validation: JSON.stringify({ min: 0, max: 100 }),
          description: 'Log event corrupt file sample rate',
          createdBy: { id: 222, username: 'Glen' },
          createdAt: timestamp(1),
          category: 'new one',
        },
        {
          key: 'battle_pass_tab_position',
          type: 'uint8',
          validation: JSON.stringify({}),
          description: 'Battle Pass Tab Position',
          createdBy: { id: 222, username: 'Glen' },
          createdAt: timestamp(),
          category: 'AE',
        },
        {
          key: 'online_store_config',
          type: 'list_char',
          validation: JSON.stringify({
            min: 3,
            max: 200,
          }),
          description: 'Online store config',
          createdBy: { id: 222, username: 'Glen' },
          createdAt: timestamp(),
          category: 'MTX Store',
        },
      ],
    },
    {
      scopeType: 'game',
      scopeName: 'iw8',
      scopeURI: 'cod:iw8',
      parentScopeURI: 'cod',
      parentScopeType: 'franchise',
      parentScopeName: 'cod',
      definitions: [
        {
          key: 'challenge_map_names',
          type: 'char',
          validation: JSON.stringify({ min: 3, max: 20 }),
          description: 'Challenge map names used in game',
          createdBy: { id: 123, username: 'Maks R' },
          createdAt: timestamp(35),
          category: 'loot',
        },
        {
          key: 'lua_context',
          type: 'char',
          validation: JSON.stringify({
            min: 3,
            max: 200,
            enum: 'value1,value2,other value',
          }),
          description: 'LUA Context',
          createdBy: { id: 222, username: 'Glen' },
          createdAt: timestamp(40),
          category: 'awesome things',
        },
        {
          key: 'online_test_mode',
          type: 'char',
          validation: JSON.stringify({ min: 0, max: 200 }),
          description: 'Online store config',
          createdBy: { id: 333, username: 'Maks K' },
          createdAt: timestamp(75),
          category: 'GVS',
        },
        {
          key: 'ui_ng_blade_use_ings',
          type: 'list_char',
          validation: JSON.stringify({
            min: 0,
            max: 20,
            enum: 'top,top-right,right,bottom-right,bottom,bottom-left,left,top-left',
          }),
          description: 'List of positions to randomly display banner',
          createdBy: { id: 333, username: 'Maks K' },
          createdAt: timestamp(75),
          category: 'Client',
        },
        {
          key: 'welcome-banner-position',
          type: 'char',
          validation: JSON.stringify({
            min: 0,
            max: 200,
            enum: 'top,top-right,right,bottom-right,bottom,bottom-left,left,top-left',
          }),
          description: 'Something needed for the client',
          createdBy: { id: 333, username: 'Maks K' },
          createdAt: timestamp(75),
          category: 'Client',
        },
        {
          key: 'display-welcome-banner',
          type: 'bool',
          validation: JSON.stringify({}),
          description: 'Display that banner at all?',
          createdBy: { id: 333, username: 'Maks R' },
          createdAt: timestamp(75),
          category: 'Client',
        },
      ],
    },
  ].map(s => ({
    ...s,
    __typename: 'DefinitionScope',
    definitions: s.definitions.map(d => ({ ...d, __typename: 'Definition' })),
  })),
};

const KEYS = {
  online_store_config: [
    {
      scopeURI: 'cod',
      platform: '*',
      population: GLOBAL_PLAYERS,
      value: 'franchise_only_store.json',
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: '*',
      population: 'group:QA Austin',
      value: 'austin-store.json',
    },
    {
      scopeURI: 'cod:iw8:5830',
      platform: 'xb1',
      population: 'group:QA Austin',
      value: 'title-store.json',
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: '*',
      population: 'user:glen-23123',
      value: 'austin-store.json',
    },
  ],
  ui_ng_blade_use_ings: [
    {
      scopeURI: 'cod:iw8:5830',
      platform: '*',
      population: GLOBAL_PLAYERS,
      value: false,
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: 'dedi',
      population: 'group:QA Austin',
      value: true,
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: 'psn',
      population: GLOBAL_PLAYERS,
      value: false,
    },
  ],
  online_test_mode: [
    {
      scopeURI: 'cod:iw8:5830',
      platform: '*',
      population: GLOBAL_PLAYERS,
      value: 0.0003,
    },
    {
      scopeURI: 'cod:iw8:5830',
      platform: 'psn',
      population: GLOBAL_PLAYERS,
      value: 0.0007,
    },
    {
      scopeURI: 'cod:iw8:5830',
      platform: '*',
      population: 'group:QA Austin',
      value: 0.0001,
    },
    {
      scopeURI: 'cod:iw8',
      platform: 'dedi',
      population: 'group:Online Devs',
      value: 0.0005,
    },
  ],
  log_event_corrupt_file_sample_rate: [
    {
      scopeURI: 'cod:iw8:5830',
      platform: '*',
      population: GLOBAL_PLAYERS,
      value: 7,
    },
    {
      scopeURI: 'cod:iw8:5830',
      platform: 'xb1',
      population: GLOBAL_PLAYERS,
      value: 12,
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: '*',
      population: 'user:glen-23123',
      value: 17,
    },
  ],
  lua_context: [
    {
      scopeURI: 'cod:iw8:5830',
      platform: '*',
      population: GLOBAL_PLAYERS,
      value: 100,
    },
    {
      scopeURI: 'cod:iw8:5830',
      platform: 'ios',
      population: GLOBAL_PLAYERS,
      value: 200,
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: '*',
      population: GLOBAL_PLAYERS,
      value: 200,
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: 'dedi',
      population: GLOBAL_PLAYERS,
      value: 5,
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: 'xb1',
      population: 'group:QA Austin',
      value: 5,
    },
    {
      scopeURI: 'cod:iw8:5830',
      platform: 'psn',
      population: 'user:glen-23123',
      value: 15,
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: 'ios',
      population: 'group:QA Austin',
      value: 7,
    },
  ],
  challenge_map_names: [
    {
      scopeURI: 'cod:iw8:5830',
      platform: '*',
      population: GLOBAL_PLAYERS,
      value: '5830-mp_making',
    },
    {
      scopeURI: 'cod:iw8:5830',
      platform: 'dedi',
      population: GLOBAL_PLAYERS,
      value: '5830:dedi:mp_making',
    },
    {
      scopeURI: 'cod:iw8',
      platform: 'ios',
      population: 'group:QA Austin',
      value: 'iw8-mp_making',
    },
    {
      scopeURI: 'cod',
      platform: 'psn',
      population: 'group:Online Devs',
      value: 'cod-mp_making',
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: '*',
      population: GLOBAL_PLAYERS,
      value: 'mp_making',
    },
    {
      scopeURI: 'cod:iw8:5830',
      platform: 'dedi',
      population: 'group:QA Austin',
      value: 'DEDI_Lua',
    },
    {
      scopeURI: 'cod:iw8:5830:tu_1',
      platform: 'xb1',
      population: 'user:glen-23123',
      value: 'XB7_lua_err',
    },
  ],
};
Object.values(KEYS).forEach(values =>
  values.forEach(v => {
    // eslint-disable-next-line
    v.unset = false;
    // eslint-disable-next-line
    v.draftID = null;
    // eslint-disable-next-line
    v.parentValue = null;
  })
);

const scopeTypeNames = {
  1: 'franchise',
  2: 'game',
  3: 'title',
  4: 'game_build',
};

const expandScope = scopeURI => {
  const scopes = scopeURI.split(':');
  return {
    scopeURI,
    scopeType: scopeTypeNames[scopes.length],
    scopeName: scopes[scopes.length - 1],
  };
};

export const mocks = [
  {
    request: {
      query: GET_SCOPES_QUERY,
      variables: { titleId: '5830', env: 'dev' },
    },
    result: { data: SCOPES_MOCK },
  },

  ...SCOPES_MOCK.gvsScopes.map(scope => ({
    request: {
      query: GET_DEFINITIONS_QUERY,
      variables: { titleId: '5830', env: 'dev', scopeURI: scope.scopeURI },
    },
    result: { data: DEFINITIONS_MOCK },
  })),
  ...SCOPES_MOCK.gvsScopes.map(scope => ({
    request: {
      query: GET_POPULATIONS_QUERY,
      variables: { titleId: '5830', env: 'dev', scopeURI: scope.scopeURI },
    },
    result: {
      data: { gvsPopulations: [{ ...scope, __typename: 'PopulationScope' }] },
    },
  })),
  {
    request: {
      query: CREATE_DEFINITION_MUTATION,
      variables: {
        titleId: '5830',
        env: 'dev',
        scopeURI: 'cod:iw8',
        definitionData: {
          key: 'test-mutation-key',
          type: 'char',
          validation: '{"min":"0","max":"512"}',
          category: '',
          description: '',
        },
      },
    },
    result: {
      data: {
        gvsCreateDefinition: { ok: true },
      },
    },
  },
  {
    request: {
      query: GET_DRAFTS_QUERY,
      variables: {
        titleId: '5830',
        env: 'dev',
        scopeURI: 'cod:iw:5830',
      },
    },
    result: {
      data: {
        gvsDrafts: [
          {
            scopeType: 'title',
            scopeName: '5830',
            scopeURI: 'cod:iw:5830',
            __typename: 'DraftScope',
            drafts: [
              { id: 1, name: 'Draft 1', edits: [], createdAt: 1234567890 },
              {
                id: 2,
                name: 'One more draft',
                edits: [],
                createdAt: 2345678901,
              },
            ],
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_DRAFTS_QUERY,
      variables: {
        titleId: '5830',
        env: 'dev',
        scopeURI: 'cod:iw:5830',
      },
    },
    result: {
      data: {
        gvsDrafts: [
          {
            scopeType: 'title',
            scopeName: '5830',
            scopeURI: 'cod:iw:5830',
            __typename: 'DraftScope',
            drafts: [
              { id: 1, name: 'Draft 1', edits: [], createdAt: 1234567890 },
              {
                id: 2,
                name: 'One more draft',
                edits: [],
                createdAt: 2345678901,
              },
            ],
          },
        ],
      },
    },
  },
  {
    request: {
      query: RELEASE_DRAFT_MUTATION,
      variables: {
        titleId: '5830',
        env: 'dev',
        event: {
          type: 'release',
          draftId: '201',
          comment: 'Releasing the draft null',
          ifMatch: '1234567890',
        },
        notificationSettings: { sendPushMessage: true },
      },
    },
    result: {
      data: {
        gvsReleaseDraft: { statusCode: 201, body: null },
      },
    },
  },
  {
    request: {
      query: RELEASE_DRAFT_MUTATION,
      variables: {
        titleId: '5830',
        env: 'dev',
        event: {
          type: 'release',
          draftId: '409',
          comment: 'Releasing the draft null',
          ifMatch: '1234567890',
        },
        notificationSettings: { sendPushMessage: true },
      },
    },
    result: {
      data: {
        gvsReleaseDraft: { statusCode: 409, body: null },
      },
    },
  },
  {
    request: {
      query: RELEASE_DRAFT_MUTATION,
      variables: {
        titleId: '5830',
        env: 'dev',
        event: {
          type: 'release',
          draftId: '404',
          comment: 'Releasing the draft null',
          ifMatch: '1234567890',
        },
        notificationSettings: { sendPushMessage: true },
      },
    },
    result: {
      data: {
        gvsReleaseDraft: { statusCode: 404, body: 'NOT_FOUND' },
      },
    },
  },
  {
    request: {
      query: GET_CONFIGURATION_QUERY,
      variables: {
        titleId: '5830',
        env: 'dev',
        scopeURI: 'cod:iw8:5830',
        populationType: 'user',
        populationValue: '123',
      },
    },
    result: {
      data: {
        gvsConfigurations: [
          {
            ...expandScope('cod:iw8:5830'),
            populationType: 'user',
            populationValue: '123',
            lastModifiedAt: '1234567890',
            variables: [
              {
                key: 'key-001',
                valuesPerPlatform: [
                  {
                    platform: '*',
                    value: '001',
                    parentValue: null,
                    source: {
                      scopeType: 'title',
                      scopeName: '5830',
                      scopeURI: 'cod:iw8:5830',
                      populationType: 'global',
                      populationValue: PLAYER,
                      draftID: null,
                    },
                  },
                ],
                type: 'char',
                validation: '{}',
                category: null,
              },
              {
                key: 'key-002',
                valuesPerPlatform: [
                  {
                    platform: 'ps4',
                    value: '004',
                    parentValue: '001',
                    source: {
                      scopeType: 'title',
                      scopeName: '5830',
                      scopeURI: 'cod:iw8:5830',
                      populationType: 'user',
                      populationValue: '123',
                      draftID: null,
                    },
                  },
                ],
                type: 'char',
                validation: '{}',
                category: 'live',
              },
            ],
          },
        ],
      },
    },
  },
];
