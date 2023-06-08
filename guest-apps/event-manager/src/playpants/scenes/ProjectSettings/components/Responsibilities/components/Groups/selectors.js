import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

import {
  availableUsersListSelector,
  envTypesSelector,
  groupListSelector,
  responsibilitiesSelector,
} from '../../selectors';

export const groupStateSelector = createSelector(
  responsibilitiesSelector,
  resp => resp.group
);

export const availableUsersSelector = createSelector(
  availableUsersListSelector,
  availableUsers =>
    sortBy(
      availableUsers.data.map(user => ({
        label: user.name || user.username,
        value: user.name || user.username,
        ...user,
      })),
      user => user.label?.toLowerCase()
    )
);

export const availableUsersNextSelector = createSelector(
  availableUsersListSelector,
  availableUsers => availableUsers.next
);

/** Members */
export const membersSelector = createSelector(
  groupStateSelector,
  group => group.members
);

export const memberListSelector = createSelector(
  membersSelector,
  membersState => membersState.data
);

/** For getting selected item */
export const selectedItemIdSelector = (_, props) => props.match.params.id;

const selectItemFn = (id, items) =>
  items && id
    ? items.find(item => item.id.toString() === id.toString())
    : undefined;

const createSelectedItemSelector = list =>
  createSelector(selectedItemIdSelector, list, selectItemFn);

export const makeSelectedItemSelector = () =>
  createSelectedItemSelector(groupListSelector);

/** Initial values */

// Selects the initial values for groups
const createInitialValuesSelector = (usersSelector = () => undefined) =>
  createSelector(usersSelector, envTypesSelector, (members, { envTypes }) => ({
    members,
    envTypes,
  }));

export const initialValuesSelector =
  createInitialValuesSelector(memberListSelector);
