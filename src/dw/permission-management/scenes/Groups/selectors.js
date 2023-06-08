import sortBy from 'lodash/sortBy';
import { createSelector } from 'reselect';

import {
  createSelectedItemSelector,
  createIsLoadingDetailsSelector,
  createInitialValuesSelector,
  companiesSelector,
} from '../selectors';

export const nextPageSelector = state => state.Scenes.Groups.Groups.next;

export const baseUrlSelector = (_, props) =>
  props.match.params.id ? props.match.path.split(':id')[0] : props.match.path;

export const contentTypesSelector = state =>
  Object.values(state.Scenes.Groups.ContentTypes.data);

export const objectPermissionsSelector = state =>
  state.Scenes.Groups.ObjectPermissions.data;

const isLoadingContentTypesSelector = state =>
  state.Scenes.Groups.ContentTypes.loading;

const groupsSelector = state => state.Scenes.Groups.Groups.data;

export const groupsListSelector = createSelector(
  groupsSelector,
  companiesSelector,
  (groups, companies) =>
    sortBy(companies, [company => company.name]).reduce((toReturn, company) => {
      const groupsCompany = groups.filter(x => x.company === company.id);
      if (groupsCompany && groupsCompany.length > 0) {
        return [
          ...toReturn,
          { ...company, isGroupOption: true, id: `${company.id}_company` },
          ...groupsCompany,
        ];
      }
      return [...toReturn];
    }, [])
);

export const selectedItemSelector = createSelectedItemSelector(groupsSelector);

const loadingDetailsSelector = createIsLoadingDetailsSelector(
  isLoadingContentTypesSelector,
  objectPermissionsSelector,
  selectedItemSelector
);

const companiesLoadingSelector = state =>
  state.permissions.loading || state.Scenes.companies.loading;

export const isLoadingDetailsSelector = createSelector(
  loadingDetailsSelector,
  companiesLoadingSelector,
  (loadingDetails, companiesLoading) => loadingDetails || companiesLoading
);

const groupUsersListSelector = state => state.Scenes.Groups.GroupUsers.data;

export const availableGroupUsersList = state =>
  state.Scenes.Groups.AvailableGroupUsers.data;

export const initialValuesSelector = createInitialValuesSelector(
  selectedItemSelector,
  objectPermissionsSelector,
  contentTypesSelector,
  groupUsersListSelector
);

export const userProfileSelector = state => state.user.profile;
