import { createSelector } from 'reselect';

export const usersSelector = state => state.Scenes.ProjectSettings.Users;

export const userListSelector = createSelector(
  usersSelector,
  usersState => usersState.availableUsers.data
);

export const usersNextPageSelector = createSelector(
  usersSelector,
  usersState => usersState.availableUsers.next
);

export const userListFiltersSelector = createSelector(
  usersSelector,
  usersState => usersState.userListFilters
);

export const userListFilteredSelector = createSelector(
  userListSelector,
  userListFiltersSelector,
  (users, { query }) =>
    query
      ? users.filter(
          user =>
            String(user.id).indexOf(query) !== -1 ||
            user.username.includes(query) ||
            user.name.includes(query)
        )
      : users
);
