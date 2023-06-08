export function findEnvironmentFromId(projects, envId) {
  /* eslint-disable guard-for-in,no-restricted-syntax,no-unused-vars */
  for (const projectIndex in projects) {
    const project = projects[projectIndex];

    for (const titleIndex in project.titles) {
      const title = project.titles[titleIndex];

      for (const environmentIndex in title.environments) {
        const environment = title.environments[environmentIndex];
        if (environment.id === envId) {
          return {
            id: environment.id,
            titleId: title.id,
            shortType: environment.shortType,
          };
        }
      }
    }
  }
  /* eslint-enable guard-for-in,no-restricted-syntax */

  return null;
}

export const normalizeSettings = array =>
  Object.assign(
    {},
    ...array.map(({ key, value }) => ({ [key]: JSON.parse(value) }))
  );
