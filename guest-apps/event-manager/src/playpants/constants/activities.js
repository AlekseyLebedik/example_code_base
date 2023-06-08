export const ACTIVITY_TYPES = {
  ACHIEVEMENTS_ENGINE: 'ae',
  CLIENT_COMMANDS: 'client_commands',
  MESSAGE_OF_THE_DAY: 'motd',
  PUBLISHER_OBJECTS: 'publisher_objects',
  PUBLISHER_STORAGE: 'pubstorage',
  PUBLISHER_VARIABLES: 'pubvars',
  PYTHON_SCRIPT: 'pyscript',
  THUNDERPANTS_DEPLOYMENT: 'tp_deployment',
  GVS: 'gvs',
};

export const NEW_ACTIVITY_SETTINGS = {
  motd: { languages: [] },
  playlist: { songs: [] },
  pubstorage: { files: [] },
  pubvars: { variable_sets: [] },
  pyscript: { inputs: [] },
  ae: {
    ruleset_to_activate: {
      activationTimestamp: null,
      code_signature: '',
      code: '',
      codeHash: '',
      codeSignatureTimestamp: null,
      creationTimestamp: null,
      isActive: null,
      label: '',
      lastUpdateTimestamp: null,
    },
    ruleset_to_duplicate: '',
  },
  publisher_objects: { files: [], objects: [] },
  client_commands: { commands: [] },
  tp_deployment: {
    buildList: [],
    deploy: [],
    deployer: {},
    undeploy: [],
    modify: [],
    view: '',
  },
  gvs: { draft_id: '', create_revert_draft: false },
};
