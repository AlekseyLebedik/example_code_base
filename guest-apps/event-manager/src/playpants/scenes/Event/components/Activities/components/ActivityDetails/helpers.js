import compact from 'lodash/compact';

export const getTitleFromTitleEnv = (titles, titleEnv) =>
  titleEnv
    ? titles.find(t => t.environments.find(tEnv => tEnv.id === titleEnv))
    : undefined;

export const getTitleEnvsFromTitles = titles =>
  compact(
    titles.map(
      title =>
        title.environments.find(te => te.shortType === title.env.shortType).id
    )
  );
