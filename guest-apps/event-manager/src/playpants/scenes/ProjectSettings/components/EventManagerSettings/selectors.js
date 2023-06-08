import isEmpty from 'lodash/isEmpty';

export const settingSchemaSelector = state =>
  isEmpty(state.Scenes.ProjectSettings.Schemas.data)
    ? {}
    : state.Scenes.ProjectSettings.Schemas.data;
