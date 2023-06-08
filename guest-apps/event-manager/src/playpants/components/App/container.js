import React, { useEffect, lazy, Suspense } from 'react';
import isEqual from 'lodash/isEqual';
import { bindActionCreators } from 'redux';
import { useSelector } from 'react-redux';
import { connect } from 'dw/core/helpers/component';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import CircularProgress from '@material-ui/core/CircularProgress';
import { useEMPermissions } from 'playpants/hooks';
import { ROUTES, BASE_PATH } from './components/Navigation/routes';
import { setProjectFromUnsafeSource } from './components/ProjectSelector/actions';
import {
  currentProjectSelector,
  configuredProjectsSelector,
  hasCurrentProjectSettingsSelector,
  isMissingSettingsSelector,
  isConfiguredSelector,
} from './selectors';
import * as Actions from './actions';

const StatelessApp = lazy(() => import('./presentational'));

export const App = ({
  fetchProjectSettings,
  fetchSchedules,
  fetchStories,
  fetchTemplates,
  match: {
    params: { projectId },
  },
  setProject,
}) => {
  const [loading, error, permissions] = useEMPermissions();
  const hasCurrentProjectSettings = useSelector(
    hasCurrentProjectSettingsSelector
  );
  const currentProject = useSelector(currentProjectSelector, isEqual);
  const configuredProject = useSelector(configuredProjectsSelector, isEqual);
  const isMissingSettings = useSelector(isMissingSettingsSelector);
  const isConfigured = useSelector(isConfiguredSelector, isEqual);
  /** Sets project, and loads users */
  useEffect(() => {
    if (!isEmpty(configuredProject)) {
      const pID = parseInt(projectId, 10);
      if (configuredProject.includes(pID)) {
        setProject(projectId);
      } else {
        setProject(configuredProject[0]);
      }
    }
  }, [projectId, configuredProject]);

  /** Fetches project settings when current project is changed or initialized */
  useEffect(() => {
    const { id: project } = currentProject;
    if (project && !isEmpty(configuredProject)) {
      fetchProjectSettings({ project__in: `${project},null` });
      fetchTemplates({ project });
      fetchStories({ project });
      fetchSchedules({ project });
    }
  }, [currentProject.id]);
  return !loading && !error ? (
    <Suspense fallback={<CircularProgress size={80} thickness={5} />}>
      <StatelessApp
        basePath={BASE_PATH}
        currentProject={currentProject}
        hasCurrentProjectSettings={hasCurrentProjectSettings}
        isMissingSettings={isMissingSettings}
        routes={ROUTES(permissions, hasCurrentProjectSettings, isConfigured)}
      />
    </Suspense>
  ) : null;
};

const mapDispatchToProps = dispatch => ({
  setProject: bindActionCreators(setProjectFromUnsafeSource, dispatch),
  fetchProjectSettings: bindActionCreators(
    Actions.fetchProjectSettings,
    dispatch
  ),
  fetchTemplates: bindActionCreators(Actions.fetchTemplates, dispatch),
  fetchStories: bindActionCreators(Actions.fetchStories, dispatch),
  fetchSchedules: bindActionCreators(Actions.fetchSchedules, dispatch),
});

App.propTypes = {
  fetchProjectSettings: PropTypes.func.isRequired,
  fetchSchedules: PropTypes.func.isRequired,
  fetchStories: PropTypes.func.isRequired,
  fetchTemplates: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  setProject: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps, App);
