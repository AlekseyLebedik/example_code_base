import compact from 'lodash/compact';

import { joinPath } from 'dw/core/helpers/path';

const onlineConfigLinkBuilder = (urlPath, { titleId, env, pathAdd, context }) =>
  joinPath(
    ...compact([
      '/online-configuration',
      titleId,
      env,
      urlPath,
      pathAdd ? `/${pathAdd}` : '',
      context ? `?context=${context}` : '',
    ])
  );

export const linkedServices = {
  ae: {
    name: 'Achievements Engine',
    url: paramaters =>
      onlineConfigLinkBuilder('achievements/rulesets', paramaters),
  },
  client_commands: {
    name: 'Client Commands',
    url: null,
  },
  motd: {
    name: 'Message of The Day',
    url: null,
  },
  publisher_objects: {
    name: 'Publisher Objects',
    url: paramaters =>
      onlineConfigLinkBuilder('object-store/publisher', paramaters),
  },
  pubstorage: {
    name: 'Publisher Storage',
    url: paramaters =>
      onlineConfigLinkBuilder('storage/publisher-storage', paramaters),
  },
  pubvars: {
    name: 'Publisher Variables',
    url: paramaters =>
      onlineConfigLinkBuilder(
        'storage/publisher-variables/variables-sets',
        paramaters
      ),
  },
  pyscript: {
    name: 'Python Script',
    url: null,
  },
  tp_deployment: {
    name: 'Thunderpants Deployment',
    url: null,
  },
};
