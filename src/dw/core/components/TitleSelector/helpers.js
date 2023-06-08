export function findEnvironmentFromTitleId(projects, titleId, envType) {
  /* eslint-disable guard-for-in,no-restricted-syntax,no-continue,no-unused-vars */
  for (const projectIndex in projects) {
    const project = projects[projectIndex];

    for (const titleIndex in project.titles) {
      const title = project.titles[titleIndex];
      if (title.id !== titleId) {
        continue;
      }

      for (const environmentIndex in title.environments) {
        const environment = title.environments[environmentIndex];
        if (environment.shortType === envType) {
          return { project, title, environment };
        }
      }
    }
  }
  /* eslint-enable guard-for-in,no-restricted-syntax,no-continue */

  return null;
}
