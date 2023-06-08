const titlePath = (title, env) => `titles/${title}/envs/${env}`;

export const createApiUrl = (resource, titleId, envType) =>
  !resource
    ? `/${titlePath(titleId, envType)}/`
    : `/${titlePath(titleId, envType)}/${resource}/`;
