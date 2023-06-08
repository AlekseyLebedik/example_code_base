import { store } from 'dw/online-configuration/store';

// TODO: don't use global store
const state = () => store.getState();
export const currentTitle = () =>
  state().Components.TitleSelector.currentTitle.id;
const currentEnv = () => state().Components.TitleSelector.currentEnv.shortType;
const titlePath = (title, env) =>
  `titles/${title || currentTitle()}/envs/${env || currentEnv()}`;

export const createApiUrl = (resource, titleId, envType, queryParams = '') =>
  !resource
    ? `/${titlePath(titleId, envType)}/`
    : `/${titlePath(titleId, envType)}/${resource}/${queryParams}`;
