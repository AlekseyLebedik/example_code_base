import { createSelector } from 'reselect';
import get from 'lodash/get';
import unionBy from 'lodash/unionBy';

import {
  createSelectedItemSelector,
  createIsLoadingDetailsSelector,
  createInitialValuesSelector,
  companiesSelector,
  companiesDataSelector,
} from '../selectors';

export const usersListSelector = state => state.Scenes.Users.Users.data;

export const selectedItemSelector =
  createSelectedItemSelector(usersListSelector);

const availableGroupsListDataSelector = state => state.Scenes.Users.Groups.data;

export const availableGroupsListSelector = createSelector(
  availableGroupsListDataSelector,
  companiesSelector,
  (availableGroups, companies) =>
    availableGroups.map(group => ({
      ...group,
      companyName: get(
        companies.find(company => company.id === group.company),
        'name',
        ''
      ),
    }))
);

export const availableGroupsLoadingSelector = state =>
  state.Scenes.Users.Groups.loading;

export const userListLoadingSelector = state =>
  state.Scenes.Users.Users.loading;

export const nextPageSelector = state => state.Scenes.Users.Users.next;
export const querySelector = state =>
  state.Scenes.Users.Users.params && state.Scenes.Users.Users.params.q;

export const contentTypesSelector = state =>
  Object.values(state.Scenes.Users.ContentTypes.data);

export const objectPermissionsSelector = state =>
  state.Scenes.Users.ObjectPermissions.data;

const isLoadingContentTypesSelector = state =>
  state.Scenes.Users.ContentTypes.loading;

export const isLoadingDetailsSelector = createIsLoadingDetailsSelector(
  isLoadingContentTypesSelector,
  objectPermissionsSelector,
  selectedItemSelector
);

export const initialValuesAdvancedUsersSelector = createInitialValuesSelector(
  selectedItemSelector,
  objectPermissionsSelector,
  contentTypesSelector
);

export const companyMembershipsLoading = state =>
  state.Scenes.Users.CompanyMemberships.loading;

export const companyAndMembershipSelector = createSelector(
  state => state.Scenes.Users.CompanyMemberships.data || [],
  companiesDataSelector,
  (memberships, companies) =>
    unionBy(
      companies,
      memberships.map(obj => {
        return {
          id: obj.companyId,
          name: obj.companyName,
        };
      }),
      'id'
    )
);

export const companyMembershipsSelector = createSelector(
  state => state.Scenes.Users.CompanyMemberships.data || [],
  (_, props) => get(props, 'flat', false),
  (memberships, flat) =>
    flat ? memberships.map(m => m.companyId) : memberships
);
