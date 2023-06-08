import {
  createSelectedItemSelector,
  createIsLoadingDetailsSelector,
  createInitialValuesSelector,
} from '../selectors';

export const companiesDataSelector = state =>
  state.Scenes.Companies.Companies.data || [];

export const featureSwitchSelector = state => state.switches;

export const contentTypesSelector = state =>
  Object.values(state.Scenes.Companies.ContentTypes.data);

export const objectPermissionsSelector = state =>
  state.Scenes.Companies.ObjectPermissions.data;

export const isLoadingContentTypesSelector = state =>
  state.Scenes.Companies.ContentTypes.loading;

export const companiesLoadingSelector = state =>
  state.permissions.loading || state.Scenes.companies.loading;

export const nextPageSelector = state => state.Scenes.companies.next;

const companiesListSelector = state => state.Scenes.companies.data;
export const selectedItemSelector = createSelectedItemSelector(
  companiesListSelector
);

export const baseUrlSelector = (_, props) =>
  props.match.params.id ? props.match.path.split(':id')[0] : props.match.path;

export const loadingDetailsSelector = createIsLoadingDetailsSelector(
  isLoadingContentTypesSelector,
  objectPermissionsSelector,
  selectedItemSelector
);

const companyUsersListSelector = state => state.Scenes.Companies.Users.data;

export const availableCompanyUsersList = state =>
  state.Scenes.Companies.AvailableUsers.data;

export const initialValuesSelector = createInitialValuesSelector(
  selectedItemSelector,
  objectPermissionsSelector,
  contentTypesSelector,
  companyUsersListSelector
);
