import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import PaginatedTable from 'dw/player-tooling/components/PaginatedTable';
import ServiceView from '../ServiceView';
import {
  formatAchievementsServiceData,
  PLAYER_ACHIEVEMENTS_QUERY,
} from './utils';

const DetailRenderer = ({ values }) => (
  <PaginatedTable
    rows={values}
    titles={['Achievement Name', 'Progress', 'Activation Timestamp']}
    keys={[
      'name',
      row => `${row.progress} / ${row.progressTarget}`,
      'activationTimestamp',
    ]}
  />
);

DetailRenderer.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Achievements = ({ detailsProps, groupBy, linkToSection, variables }) => {
  const details = useCallback(({ data, ...props }) => {
    const { achievements } = data[0] || {};
    return <DetailRenderer values={achievements} {...props} />;
  }, []);
  const customDataCheck = useCallback(
    data => data.some(d => d.achievements.length),
    []
  );
  const graphQLProps = useMemo(
    () => ({
      customDataCheck,
      detailsProps,
      noDataMsg: 'No achievement data found',
      path: 'player.userAchievements.titleAchievements',
      query: PLAYER_ACHIEVEMENTS_QUERY,
      variables: { ...variables, limit: 5 },
    }),
    [customDataCheck, detailsProps, variables]
  );

  return groupBy === 'services' ? (
    <ServiceView
      DetailRenderer={DetailRenderer}
      formatData={formatAchievementsServiceData}
      linkToSection={linkToSection}
      {...graphQLProps}
    />
  ) : (
    <GraphQLStateRenderer DetailsRenderer={details} {...graphQLProps} />
  );
};

Achievements.propTypes = {
  detailsProps: PropTypes.object,
  groupBy: PropTypes.string,
  linkToSection: PropTypes.func,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
    titleId: PropTypes.string,
  }).isRequired,
};
Achievements.defaultProps = {
  detailsProps: {},
  groupBy: 'titles',
  linkToSection: () => {},
};

export default Achievements;
