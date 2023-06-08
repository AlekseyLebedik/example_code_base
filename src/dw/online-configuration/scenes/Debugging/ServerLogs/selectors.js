import { createSelector } from 'reselect';
import queryString from 'query-string';

import { DEFAULT_FORM_VALUES } from './components/SearchForm/constants';
import { parseBooleanValues } from './components/SearchForm/helpers';

const plainServerLogsSelector = state =>
  state.Scenes.Debugging.ServerLogs.serverLogs;

export const transactionIdSelector = (_, props) => props.match.params.id;

export const messageIdSelector = (_, props) => props.match.params.messageId;

export const querySelector = (_, props) => {
  const { ...queryValues } = queryString.parse(props.history.location.search);
  const parseBoolean = parseBooleanValues(queryValues);
  return {
    ...DEFAULT_FORM_VALUES,
    ...queryValues,
    ...parseBoolean,
  };
};

export const detailsSelector = state =>
  state.Scenes.Debugging.ServerLogs.details;

export const expandedDetailsSelector = state =>
  state.Scenes.Debugging.ServerLogs.expandedInfo;

const groupByConnection = logs => {
  let con;
  return logs.reduce((acc, log) => {
    if (con !== log.con) {
      // eslint-disable-next-line
      con = log.con;
      return [...acc, [log]];
    }
    const previous = acc[acc.length - 1];
    if (!previous.find(msg => msg.tr === log.tr)) {
      previous.push(log);
    }
    return acc;
  }, []);
};

export const serverLogsSelector = createSelector(
  plainServerLogsSelector,
  logs => groupByConnection(logs)
);

export const transactionsSelector = createSelector(
  transactionIdSelector,
  detailsSelector,
  (transId, details) => (details.transId === transId ? details.logs : undefined)
);

export const localTransactionsSelector = createSelector(
  plainServerLogsSelector,
  transactionIdSelector,
  (serverLogs, transId) => serverLogs.filter(item => item.tr === transId)
);

export const exportIsLoadingSelector = state =>
  state.Scenes.Debugging.ServerLogs.exportIsLoading;
