import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import orderBy from 'lodash/orderBy';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import ServiceView from '../ServiceView';

import styles from './index.module.css';

const formatTimestamp = ({ timestamp, ...d }) => ({
  ...d,
  timestamp: parseInt(timestamp, 10) / 1000,
});

export const formatMatchmakingData = data => {
  const titles = new Map();
  // eslint-disable-next-line no-unused-expressions
  data.forEach(({ titleId, searches }) => {
    if (searches.length > 0) {
      const searchesSorted = orderBy(
        searches.map(formatTimestamp),
        'timestamp',
        'desc'
      );
      titles.set(titleId, searchesSorted);
    }
  });
  return titles;
};

export const DetailRenderer = ({ values, titleEnvs, titleId }) => {
  const titleEnv = useMemo(
    () => titleEnvs.find(e => String(e.title.id) === String(titleId)) || {},
    [titleId, titleEnvs]
  );
  const formatDateTime = useSelector(formatDateTimeSelector);
  return values.map(matchmaking => (
    <div className={styles.container} key={matchmaking.id}>
      <div>Lobby ID</div>
      <div>
        <Link
          to={`/online-configuration/${titleId}/${
            titleEnv.shortType || 'live'
          }/lobby-viewer/${matchmaking.lobbyId}`}
          className={styles.link}
        >
          {matchmaking.lobbyId}
        </Link>
      </div>
      <div>Lobby Host ID</div>
      <div>{matchmaking.lobbyHostId}</div>
      <div>MM ID</div>
      <div>{matchmaking.mmId}</div>
      <div>Ping</div>
      <div>{matchmaking.ping} mms</div>
      <div>Dedi v Listen</div>
      <div>{matchmaking.serverType}</div>
      <div>Best DC</div>
      <div>{matchmaking.bestDc}</div>
      <div>Time</div>
      <div>{formatDateTime(matchmaking.timestamp)}</div>
    </div>
  ));
};

DetailRenderer.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const MATCHMAKING_QUERY = gql`
  query Matchmaking($unoID: ID!, $accountsServiceConfigId: ID!, $titleId: Int) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      matchmaking(titleId: $titleId) {
        titleId
        searches {
          id
          lobbyHostId
          lobbyId
          mmId
          ping
          serverType
          bestDc
          timestamp
        }
      }
    }
  }
`;

const TitleDetailRenderer = ({ data, ...props }) => {
  const titleId = useMemo(() => data[0].titleId, [data]);
  const items = useMemo(
    () => formatMatchmakingData(data).get(titleId),
    [data, titleId]
  );
  return <DetailRenderer values={items} titleId={titleId} {...props} />;
};

TitleDetailRenderer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const RecentDetailRenderer = ({ data, ...props }) => {
  const items = useMemo(() => Array.from(formatMatchmakingData(data)), [data]);
  return items?.map(([title, values]) => (
    // Items are in ascending order so we need to return last as most recent
    <DetailRenderer
      values={[...values].splice(0, 1)}
      titleId={title}
      {...props}
    />
  ));
};

RecentDetailRenderer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Matchmaking = ({
  detailsProps,
  groupBy,
  linkToSection,
  variables,
  titleEnvs,
}) => {
  const formatData = useCallback(formatMatchmakingData, []);
  const graphQLProps = useMemo(
    () => ({
      detailsProps,
      noDataMsg: 'No matchmaking data found',
      path: 'player.matchmaking',
      query: MATCHMAKING_QUERY,
      variables,
    }),
    [detailsProps, variables]
  );
  const customDataCheck = useCallback(
    data => data.length > 0 && data.some(d => d.searches.length > 0),
    []
  );
  const DR = useCallback(
    props => <DetailRenderer titleEnvs={titleEnvs} {...props} />,
    [titleEnvs]
  );
  const TDR = useCallback(
    props => <TitleDetailRenderer titleEnvs={titleEnvs} {...props} />,
    [titleEnvs]
  );
  const RDR = useCallback(
    props => <RecentDetailRenderer titleEnvs={titleEnvs} {...props} />,
    [titleEnvs]
  );
  return groupBy === 'services' ? (
    <ServiceView
      addMostRecent
      DetailRenderer={DR}
      formatData={formatData}
      linkToSection={linkToSection}
      {...graphQLProps}
    />
  ) : (
    <GraphQLStateRenderer
      customDataCheck={customDataCheck}
      DetailsRenderer={variables.titleId ? TDR : RDR}
      {...graphQLProps}
    />
  );
};

Matchmaking.propTypes = {
  detailsProps: PropTypes.object,
  groupBy: PropTypes.string,
  linkToSection: PropTypes.func,
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
    titleId: PropTypes.string,
  }).isRequired,
  titleEnvs: PropTypes.arrayOf(PropTypes.object),
};
Matchmaking.defaultProps = {
  detailsProps: {},
  groupBy: 'titles',
  linkToSection: () => {},
  titleEnvs: [],
};

export default Matchmaking;
