import React, { Fragment, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import KeyValue from 'dw/core/components/KeyValue';
import { uuid } from 'dw/core/helpers/uuid';
import GraphQLStateRenderer from 'dw/player-tooling/components/GraphQLStateRenderer';
import ShowMore from 'dw/player-tooling/components/ShowMore';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const FILTERED_FIELDS = ['title', '__typename'];

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.primary.main,
  },
  key: {
    padding: '0 !important',
    paddingLeft: '10px !important',
  },
  value: {
    padding: '0 !important',
  },
  logGroup: {
    marginBottom: '15px !important',
  },
}));

const ENV_MAP = { DEV: 'dev', PROD: 'live' };

export const formatTitleLogs = (classes, logs = []) =>
  logs.map(
    ({ connectionId, env, message, source, time, title, transactionId }) => ({
      title,
      'Connection ID': (
        <Link
          className={classes.link}
          to={`/online-configuration/${title.titleId}/${
            ENV_MAP[title.env]
          }/debugging/server-logs?uno=true&connId=${connectionId}`}
        >
          {connectionId}
        </Link>
      ),
      'Transaction ID': (
        <Link
          className={classes.link}
          to={`/online-configuration/${title.titleId}/${
            ENV_MAP[title.env]
          }/debugging/server-logs?uno=true&transId=${transactionId}`}
        >
          {transactionId}
        </Link>
      ),
      time,
      source,
      env,
      message,
    })
  );

export const formatTitleLog = (log = {}) =>
  Object.entries(log)
    .filter(([key]) => !FILTERED_FIELDS.includes(key))
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {}
    );

const DetailsRenderer = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();
  const formatDateTime = useSelector(formatDateTimeSelector);
  const formattedTitleLogs = useMemo(
    () => formatTitleLogs(classes, data),
    [data]
  );
  const logsLength = formattedTitleLogs.length;
  const MIN = 1;
  return useMemo(
    () => (
      <>
        {formattedTitleLogs.slice(0, !expanded ? MIN : logsLength).map(log => (
          <Fragment key={uuid()}>
            <div className={classes.logGroup}>
              <Link
                className={classes.link}
                to={`/online-configuration/${log.title.titleId}/${
                  ENV_MAP[log.title.env]
                }/debugging/server-logs`}
              >
                {log.title.name}
              </Link>
              <KeyValue
                classes={classes}
                customFormats={{ time: 'datetime' }}
                formatDateTime={formatDateTime}
                item={formatTitleLog(log)}
              />
            </div>
          </Fragment>
        ))}
        {logsLength > MIN ? (
          <ShowMore
            key="show-more-button"
            expanded={expanded}
            handleClick={setExpanded}
            lessMsg="Show Fewer Logs"
            moreMsg="Show More Logs"
          />
        ) : null}
      </>
    ),
    [formattedTitleLogs, expanded]
  );
};

const PLAYER_LOGS_QUERY = gql`
  query PlayerLogs($unoID: ID!, $accountsServiceConfigId: ID!) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      logs {
        connectionId
        env
        message
        source
        time
        transactionId
        title {
          name
          titleId
          env
        }
      }
    }
  }
`;

const Logs = ({ variables }) => (
  <GraphQLStateRenderer
    DetailsRenderer={DetailsRenderer}
    noDataMsg="No server logs found"
    path="player.logs"
    query={PLAYER_LOGS_QUERY}
    variables={variables}
  />
);

Logs.propTypes = {
  variables: PropTypes.shape({
    accountsServiceConfigId: PropTypes.string.isRequired,
    unoID: PropTypes.string.isRequired,
  }).isRequired,
};

export default Logs;
