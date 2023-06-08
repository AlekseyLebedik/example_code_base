import React from 'react';
import PropTypes from 'prop-types';
import AppLoading from 'dw/devzone/components/App/components/AppLoading';
import GraphContainer from 'dw/reporting/components/GraphContainer';
import { getProjectName } from 'dw/reporting/selectors';

const FranchiseStatsStateless = ({ franchise, stats, start, end }) => {
  if (!franchise) return <AppLoading />;
  const series = franchise.projects.map(p => ({
    visible: true,
    id: p.id,
    name: getProjectName(franchise.name, p.name),
    short: p.shortcode.toUpperCase(),
  }));
  if (franchise.projects.length > 1) {
    series.push({
      visible: true,
      id: 'total',
      name: 'Total',
    });
  }
  return (
    <GraphContainer
      source={`franchises/${franchise.id}/stats`}
      series={series}
      stats={stats}
      start={start}
      end={end}
    />
  );
};

FranchiseStatsStateless.propTypes = {
  franchise: PropTypes.object,
  stats: PropTypes.arrayOf(PropTypes.string),
  start: PropTypes.number,
  end: PropTypes.number,
};

FranchiseStatsStateless.defaultProps = {
  franchise: null,
  stats: undefined,
  start: null,
  end: null,
};

export default FranchiseStatsStateless;
