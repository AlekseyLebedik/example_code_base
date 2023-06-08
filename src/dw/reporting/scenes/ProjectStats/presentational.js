import React from 'react';
import PropTypes from 'prop-types';
import AppLoading from 'dw/devzone/components/App/components/AppLoading';
import GraphContainer from 'dw/reporting/components/GraphContainer';
import {
  PROJECTS_WITH_GAMEMODES,
  STAT_NAMES,
  STAT_NAMES_WITH_GAMEMODES,
} from 'dw/reporting/constants';

const ProjectStatsStateless = ({ project, platform, getProjectPlatforms }) => {
  if (!project) return <AppLoading />;
  const series = getProjectPlatforms(project.id).map(p => {
    const name = [p.platform];
    if (p.featureTag) name.push(p.featureTag);
    if (p.regionalTag) name.push(p.regionalTag);
    return {
      platform: p.platform,
      name: name.join('-'),
      id: p.id,
      visible: platform ? platform === p.platform : true,
    };
  });
  if (series.length > 1) {
    series.push({
      name: 'Total',
      id: 'total',
      visible: !platform,
    });
  }
  const stats =
    PROJECTS_WITH_GAMEMODES.indexOf(project.id) > -1
      ? STAT_NAMES_WITH_GAMEMODES
      : STAT_NAMES;
  return (
    <GraphContainer
      series={series}
      stats={stats}
      source={`projects/${project.id}/stats`}
    />
  );
};

ProjectStatsStateless.propTypes = {
  project: PropTypes.object,
  platform: PropTypes.string,
  getProjectPlatforms: PropTypes.func.isRequired,
};

ProjectStatsStateless.defaultProps = {
  project: null,
  platform: undefined,
};

export default ProjectStatsStateless;
