import some from 'lodash/some';

import { getVarSetRowData } from 'playpants/scenes/Event/components/Activities/components/ActivityDetails/components/PubVarsDetails/components/ChangedVarSets/helpers';

export const SUBTITLE = (type, activity) => {
  switch (type) {
    case 'ae': {
      return some(Object.values(activity.ruleset_to_activate))
        ? `1 achievement`
        : `0 achievements`;
    }
    case 'motd':
      return `${activity.languages.length} language(s)`;
    case 'playlist':
      return `${activity.songs.length} song(s)`;
    case 'publisher_objects':
      return `${activity.files.length} object(s)`;
    case 'pubstorage':
      return `${activity.files.length} file(s)`;
    case 'pubvars':
      return `${getVarSetRowData(activity.variable_sets).length} variable(s)`;
    case 'pyscript':
      return `${activity.inputs.length} input(s)`;
    case 'tp_deployment':
      return `${
        activity.deploy.length +
        activity.undeploy.length +
        activity.modify.length
      } deployment(s)`;
    default:
      return '';
  }
};
