import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import flatten from 'lodash/flatten';
import orderBy from 'lodash/orderBy';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import {
  dateToUTCTimestamp,
  formatDateTimeSelector,
} from 'dw/core/helpers/date-time';

import Grid from '@material-ui/core/Grid';
import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import ShowMore from 'dw/player-tooling/components/ShowMore';

const LOGIN_QUERY = gql`
  query RecentLogins($unoID: ID!, $accountsServiceConfigId: ID!) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      gameData {
        env {
          id
          title {
            id
            platform
            nickname
          }
        }
        logins {
          gameMode
          lastLogin
          ip
        }
      }
    }
  }
`;

const useStyles = makeStyles(() => ({
  lastLoginRow: {
    marginBottom: '10px',
  },
}));

const DetailsRenderer = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const formatDateTime = useSelector(formatDateTimeSelector);
  const orderedLastLogins = useMemo(
    () =>
      orderBy(
        flatten(
          data?.map(game =>
            game.logins.map(login => ({
              nickname: game.env.title.nickname,
              lastLogin: login.lastLogin,
              ip: login.ip,
            }))
          )
        ),
        val => new Date(val.lastLogin),
        'desc'
      ),
    [data]
  );
  const MIN = 2;
  const MAX = 10;

  return useMemo(
    () => (
      <>
        {orderedLastLogins?.slice(0, !expanded ? MIN : MAX).map(game => (
          <Grid container key={game.lastLogin}>
            <Grid item xs={6} className={classes.lastLoginRow}>
              {game.nickname}
              {game.ip ? <div>IP: {game.ip}</div> : null}
            </Grid>
            <Grid item xs={6}>
              {formatDateTime(dateToUTCTimestamp(game.lastLogin))}
            </Grid>
          </Grid>
        ))}
        {orderedLastLogins.length > MIN ? (
          <ShowMore
            key="show-more-button"
            expanded={expanded}
            handleClick={setExpanded}
            lessMsg="Show Fewer Recent Title Logins"
            moreMsg="Show More Recent Title Logins"
          />
        ) : null}
      </>
    ),
    [orderedLastLogins, expanded]
  );
};

const RecentLogins = ({ variables }) => (
  <GraphQLStateRenderer
    DetailsRenderer={DetailsRenderer}
    noDataMsg="No game data found"
    path="player.gameData"
    query={LOGIN_QUERY}
    variables={variables}
  />
);

RecentLogins.propTypes = {
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecentLogins;
