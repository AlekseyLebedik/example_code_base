import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import ServiceView from '../ServiceView';
import { useStyles, LEADERBOARDS_QUERY } from './utils';

export const DetailRenderer = ({ values: { env, leaderboards } }) => {
  const classes = useStyles({ fontWeight: 'normal' });
  const linkTo = useCallback(
    id =>
      `/online-configuration/${env.title.id}/${env.shortType}/leaderboards/${id}`,
    [env.shortType, env.title.id]
  );
  return leaderboards.map(leaderboard => (
    <Link
      className={classes.leaderboardLink}
      key={leaderboard.id}
      to={() => linkTo(leaderboard.id)}
    >
      {leaderboard.name}
    </Link>
  ));
};

DetailRenderer.propTypes = {
  values: PropTypes.object.isRequired,
};

export const DetailsRenderer = ({ data, hideTitles }) => {
  const classes = useStyles();
  return data.map(
    game =>
      game.leaderboards.length && (
        <div key={game.env.title.id} className={classes.titleSection}>
          {!hideTitles && (
            <Link
              className={classes.link}
              to={`/online-configuration/${game.env.title.id}/${game.env.shortType}/leaderboards`}
            >
              {game.env.title.name}
            </Link>
          )}
          <DetailRenderer values={game} />
        </div>
      )
  );
};

DetailsRenderer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  hideTitles: PropTypes.bool,
};
DetailsRenderer.defaultProps = {
  hideTitles: false,
};

const Leaderboards = ({
  detailsProps,
  groupBy,
  limit,
  linkToSection,
  variables,
}) => {
  const formatData = useCallback(
    data =>
      data.reduce(
        (map, obj) =>
          obj.leaderboards?.length ? map.set(obj.env?.title?.id, obj) : map,
        new Map()
      ),
    []
  );
  const customDataCheck = useCallback(
    data => data.some(game => game.leaderboards.length),
    []
  );
  const graphQLProps = useMemo(
    () => ({
      customDataCheck,
      detailsProps,
      noDataMsg: 'No leaderboard data found',
      path: 'player.gameData',
      query: LEADERBOARDS_QUERY,
      variables: { ...variables, limit },
    }),
    [customDataCheck, detailsProps, variables, limit]
  );
  return groupBy === 'services' ? (
    <ServiceView
      DetailRenderer={DetailRenderer}
      formatData={formatData}
      linkToSection={linkToSection}
      {...graphQLProps}
    />
  ) : (
    <GraphQLStateRenderer DetailsRenderer={DetailsRenderer} {...graphQLProps} />
  );
};

Leaderboards.propTypes = {
  detailsProps: PropTypes.object,
  groupBy: PropTypes.string,
  limit: PropTypes.number,
  linkToSection: PropTypes.func,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
    titleId: PropTypes.string,
  }).isRequired,
};
Leaderboards.defaultProps = {
  detailsProps: {},
  groupBy: 'titles',
  limit: 5,
  linkToSection: () => {},
};

export default Leaderboards;
