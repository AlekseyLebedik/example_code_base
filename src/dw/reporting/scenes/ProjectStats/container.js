import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dw/core/helpers/component';
import Error404 from 'dw/core/components/Error404';
import {
  selectedProjectSelector,
  selectedFranchiseSelector,
} from 'dw/reporting/selectors';
import { getProjectPlatformsSelector } from 'dw/reporting/scenes/Dashboard/selectors';

import ProjectStatsStateless from './presentational';

const stateToProps = (state, props) => {
  const franchise = selectedFranchiseSelector(state, props);
  return {
    project: selectedProjectSelector(state, props),
    getProjectPlatforms: getProjectPlatformsSelector(state, { franchise }),
    platform: props.match.params.platform,
  };
};

const ProjectStats = props => {
  if (props.project !== undefined) {
    return <ProjectStatsStateless {...props} />;
  }
  const redirectTo = props.match.path.split(':franchiseId')[0];
  return <Error404 redirectTo={redirectTo} />;
};

ProjectStats.propTypes = {
  project: PropTypes.object,
  match: PropTypes.object.isRequired,
};

ProjectStats.defaultProps = {
  project: undefined,
};

export default connect(stateToProps, null, ProjectStats);
