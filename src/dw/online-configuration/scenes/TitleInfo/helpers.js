export const currentEnv = state =>
  state.Components.TitleSelector.currentEnv.shortType;

export const currentTitle = state =>
  state.Components.TitleSelector.currentTitle.id;

export const titlePath = state =>
  `titles/${currentTitle(state)}/envs/${currentEnv(state)}/`;

export const createApiUrl = state => titlePath(state);
