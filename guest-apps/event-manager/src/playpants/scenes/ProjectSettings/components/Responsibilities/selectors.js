import { createSelector } from 'reselect';
import {
  OPTION_TYPE_GLOBAL,
  OPTION_TYPES,
  ENV_TYPE_UNKNOWN,
} from 'playpants/constants/responsibilities';

export const responsibilitiesSelector = state =>
  state.Scenes.ProjectSettings.Responsibilities;
export const usersBaseSelector = state => state.Scenes.ProjectSettings.Users;

/** Available Users */
export const availableUsersListSelector = createSelector(
  usersBaseSelector,
  usersState => usersState.availableUsers
);

/** Groups */
export const groupsSelector = createSelector(
  responsibilitiesSelector,
  resp => resp.groups
);
export const groupListSelector = createSelector(
  groupsSelector,
  groupsState => groupsState.data
);
export const groupLoadingSelector = createSelector(
  groupsSelector,
  groupsState => groupsState.loading
);
export const nextGroupsSelector = createSelector(
  groupsSelector,
  groupsState => groupsState.next
);

/** Group responsibilities selector */
export const responsibilityGroupsSelector = createSelector(
  responsibilitiesSelector,
  resp => resp.responsibilityGroups
);
export const responsibilityGroupsListSelector = createSelector(
  responsibilityGroupsSelector,
  responsibilityGroupsState => responsibilityGroupsState.data
);
export const responsibilityGroupsParamSelector = createSelector(
  responsibilityGroupsSelector,
  responsibilityGroupsState => responsibilityGroupsState.params
);

/** Responsibility options */
export const optionsSelector = createSelector(
  responsibilitiesSelector,
  resp => resp.responsibilityOptions
);
export const responsibilityOptionsSelector = createSelector(
  optionsSelector,
  optionsState => optionsState.data
);

/** Selecting content types */
export const optionTypesSelector = createSelector(
  responsibilityOptionsSelector,
  responsibilityOptions =>
    OPTION_TYPES.map(({ env_type: envType, id, option_type: optionType }) => ({
      envType,
      id,
      optionType,
      responsibilities:
        envType === ENV_TYPE_UNKNOWN
          ? responsibilityOptions.filter(
              option => option.option_type === optionType
            )
          : responsibilityOptions.filter(
              option => option.option_type === OPTION_TYPE_GLOBAL
            ),
      type: envType === ENV_TYPE_UNKNOWN ? optionType : envType,
    }))
);

/** Select envTypes for initial values for User/Groups */
export const envTypesSelector = createSelector(
  responsibilityGroupsListSelector,
  responsibilityGroupsList => ({
    envTypes: OPTION_TYPES.map(option => {
      const matchedEnv = responsibilityGroupsList.find(
        group =>
          group.env_type === option.env_type ||
          (group.option_type !== OPTION_TYPE_GLOBAL &&
            group.option_type === option.option_type)
      );

      return matchedEnv
        ? {
            id: matchedEnv.id,
            name:
              matchedEnv.option_type === OPTION_TYPE_GLOBAL
                ? matchedEnv.env_type
                : matchedEnv.option_type,
            responsibilities: matchedEnv.responsibilities,
          }
        : {};
    }),
  })
);
