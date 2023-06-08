import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { generatePath, withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import AutoComplete from 'dw/core/components/AutocompleteGeneral';
import { ConfirmDefaultTitle } from 'dw/core/components/TitleSelector/components';

import { plainProjectsSelector } from 'dw/core/helpers/title-env-selectors';
import {
  selectedProjectDropdownSelector,
  projectsDropdownSelector,
  configuredProjectsFilterSelector,
} from './selectors';
import * as actions from './actions';

import styles from './index.module.css';

function ProjectSelector(props) {
  const dispatch = useDispatch();
  const setProject = useCallback(
    (...args) => dispatch(actions.setProject(...args)),
    [dispatch]
  );
  const fetchConfiguredProjects = useCallback(
    (...args) => dispatch(actions.fetchConfiguredProjects(...args)),
    [dispatch]
  );

  const { history, match } = props;
  const configuredProjects = useSelector(
    configuredProjectsFilterSelector,
    isEqual
  );
  const selectedProject = useSelector(selectedProjectDropdownSelector, isEqual);
  const projectOptions = useSelector(projectsDropdownSelector, isEqual);
  const projects = useSelector(plainProjectsSelector, isEqual);

  useEffect(() => {
    if (isEmpty(configuredProjects)) {
      const userProjectsID = projectOptions.map(pr => pr.value);
      fetchConfiguredProjects(userProjectsID);
    }
  }, [dispatch, projectOptions, fetchConfiguredProjects]);

  const onSelectProject = useCallback(
    projectId => {
      if (selectedProject.value !== projectId) {
        const { project } = projects.find(
          group => group.project.id === projectId
        );
        const url = generatePath(match.path, {
          projectId,
        });

        history.push(url);
        setProject(project);
      }
    },
    [selectedProject, projects, match, history, setProject]
  );

  const onConfirmDefaultTitle = useCallback(
    project => onSelectProject(project.id),
    [onSelectProject]
  );

  const { className, autoCompleteProps } = props;

  return selectedProject?.value ? (
    <span className={className}>
      <AutoComplete
        defaultValue={selectedProject}
        isClearable={false}
        key={selectedProject.value}
        onChange={onSelectProject}
        options={configuredProjects}
        className={styles.projectSelector}
        {...autoCompleteProps}
      />
      <ConfirmDefaultTitle
        currentEnv={{ id: null }}
        onSelectTitle={onConfirmDefaultTitle}
        projects={projects}
        type="project-env"
      />
    </span>
  ) : null;
}

ProjectSelector.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  className: PropTypes.string,
  autoCompleteProps: PropTypes.object,
};

ProjectSelector.defaultProps = {
  className: undefined,
  autoCompleteProps: {},
};

export default withRouter(ProjectSelector);
