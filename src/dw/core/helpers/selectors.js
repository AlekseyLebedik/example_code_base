import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import { createSelector } from 'reselect';
import { CONFIG_OPTIONS } from '@demonware/devzone-core/config';
import { currentEnvSelector } from 'dw/core/helpers/title-env-selectors';

export const optionsSelector = createSelector(
  groups => groups,
  (_, props) => props,
  (groups, props) =>
    sortBy(
      Object.entries(groupBy(groups, props.groupBy)).map(
        ([groupName, options]) => ({
          label: groupName,
          options: sortBy(options, 'name').map(
            ({ [props.value]: value, [props.label]: label }) => ({
              value,
              label,
            })
          ),
        })
      ),
      'label'
    )
);

/**
 * Get user projects and find the one with this titleID/env in it
 */
export const projectByTitleIDSelector = (state, titleID) =>
  state.user.projects.filter(
    p => p.titles.filter(t => t.id === parseInt(titleID, 10)).length > 0
  );

export const formatOptions = createSelector(
  options => options,
  options =>
    options.map(option => {
      let [group, name] = option.name.split(' | ');
      if (name === undefined) {
        name = group;
        group = undefined;
      }
      return { ...option, name, group };
    })
);

export const configOptionsSelector = option =>
  createSelector(currentEnvSelector, env => {
    const { title, project } = env;
    const lookup = { title, project };
    const available = CONFIG_OPTIONS[option] || [];
    return available.find(opt => {
      const lookupValue = lookup[opt.type];
      return opt.entityIds.some(i => parseInt(i, 10) === lookupValue);
    })?.value;
  });
