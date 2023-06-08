import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';
import intersection from 'lodash/intersection';
import isEmpty from 'lodash/isEmpty';

import { projectsSelector } from 'playpants/components/App/selectors';

import { getTitleNameSubstring } from 'playpants/components/App/helpers';
import {
  eventDataSelector,
  eventEnvSelector,
  eventProjectSelector,
} from '../../selectors';

const eventActivitiesSelector = createSelector(
  eventDataSelector,
  eventState => eventState.activities
);

export const eventActivitiesOnEndSelector = createSelector(
  eventActivitiesSelector,
  activitiesState =>
    activitiesState.filter(activity => activity.publish_on === 'on_end')
);

export const projectTitlesSelector = createSelector(
  projectsSelector,
  eventProjectSelector,
  eventEnvSelector,
  (projects, eventProject, eventEnv) =>
    projects
      .filter(project => project.id === eventProject)
      .map(project => project.titles)[0]
      .filter(
        title => title.environments.filter(e => e.type === eventEnv).length > 0
      )
      .map(title => ({
        ...title,
        env: title.environments.find(e => e.type === eventEnv),
        name: getTitleNameSubstring(title),
      }))
);

const getSelectedTitleEnvs = (state, props) => props.title_envs;

export const selectedTitlesSelector = createSelector(
  projectTitlesSelector,
  getSelectedTitleEnvs,
  (availableTitles, titlesEnvs) =>
    availableTitles.filter(
      title =>
        !isEmpty(
          intersection(
            titlesEnvs,
            title.environments.map(te => te.id)
          )
        )
    )
);

export const orderedActivitiesSelector = createSelector(
  eventActivitiesSelector,
  activities => sortBy(activities, ['exec_order'])
);
