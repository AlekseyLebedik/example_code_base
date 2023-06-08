import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  generatePath,
  useHistory,
  useParams,
  withRouter,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import {
  useCancellablePromise,
  useCompare,
  useDebouncedCallback,
  useSnackbar,
} from 'dw/core/hooks';
import { SUPPORT_EMAIL, SUPPORT_SLACK } from 'dw/config';
import { getMailto } from 'dw/core/helpers/email';
import { AsyncAGGrid } from 'dw/core/components/AGGrid';
import Empty from 'dw/core/components/Empty';
import { useConfigOption } from 'dw/online-configuration/hooks';
import { getMatchDetails } from 'dw/online-configuration/services/matchmaking';
import { getLinkedAccounts } from 'dw/online-configuration/services/linked_accounts';

import { COLUMNS, getUnoId } from './constants';
import styles from './index.module.css';

const useStyles = makeStyles(theme => ({
  inputRoot: {
    '& label': {
      color: 'rgba(255, 255, 255, 0.63)',
    },
    '& label.Mui-focused': {
      color: 'rgba(255, 255, 255, 0.87)',
    },
    '& input': {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      color: 'white',
    },
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.63)',
    },
    '& input:hover + fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.87) !important',
    },
    '& .Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.87) !important',
    },
  },
  margin: {
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
}));

const MatchViewer = props => {
  const gridApiRef = useRef();
  const onGridReady = useCallback(({ api }) => {
    gridApiRef.current = api;
  }, []);
  const classes = useStyles();
  const history = useHistory();
  const matchParamsRaw = useParams();
  const matchParams = useCompare(matchParamsRaw);
  const { matchId, env } = matchParams;
  const [inputValue, setInputValue] = useState(matchId);
  const cancellablePromise = useCancellablePromise();
  const snackbarActions = useSnackbar();
  const options = useConfigOption('MATCHMAKING_MATCH_CONFIG');
  const updateUserNames = useCallback(
    async data => {
      try {
        const unoIDs = data.map(i => getUnoId({ data: i })).join(',');
        const {
          data: { data: linkedAccounts },
        } = await cancellablePromise(getLinkedAccounts, {
          provider: 'uno',
          q: unoIDs,
        });
        return data.map(item => {
          const unoId = getUnoId({ data: item });
          const userAccounts = linkedAccounts.find(umb =>
            umb.accounts.some(
              a => a.provider === 'uno' && a.accountID === unoId
            )
          );
          const unoAccount = userAccounts?.accounts?.find(
            a => a.provider === 'uno' && a.accountID === unoId
          );
          return {
            ...item,
            userName: unoAccount?.username,
            firstPartyAccounts: userAccounts?.accounts?.filter(
              a => a.provider !== 'uno'
            ),
          };
        });
      } catch (e) {
        snackbarActions.error(
          'Cannot update UNO usernames, see logs for details'
        );
        return data;
      }
    },
    [cancellablePromise, snackbarActions]
  );
  const onLoadData = useCallback(
    async (nextPageToken, { successCallback, failCallback }) => {
      try {
        const {
          data: { data, nextPageToken: newPageToken },
        } = await cancellablePromise(getMatchDetails, {
          matchId,
          nextPageToken,
          title: options?.title,
          // eslint-disable-next-line
          game_modes: options?.game_modes,
        });
        const dataWithUsernames = await updateUserNames(data);
        successCallback(dataWithUsernames, newPageToken);
      } catch (e) {
        if (e.isCanceled) return;
        const {
          response: { data },
        } = e;
        snackbarActions.error(data?.error?.msg);
        if (failCallback) failCallback();
      }
    },
    [matchId, snackbarActions, cancellablePromise, options, updateUserNames]
  );

  const changeMatchId = useCallback(
    value => {
      const matchPath = value
        ? props.match.path
        : props.match.path.split(':matchId')[0];
      history.push({
        pathname: generatePath(matchPath, {
          ...matchParams,
          matchId: value,
        }),
        search: history.location.search,
      });
    },
    [history, props.match.path, matchParams]
  );

  const onChange = useDebouncedCallback(changeMatchId);

  useEffect(() => onChange(inputValue), [inputValue, onChange]);
  return options && env === 'live' ? (
    <>
      <div className={styles.inputContainer}>
        <TextField
          classes={{ root: classes.inputRoot }}
          label="Match ID"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{ onFocus: event => event.target.select() }}
          variant="outlined"
          onChange={e => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      {matchId ? (
        <AsyncAGGrid
          key={matchId}
          columnDefs={COLUMNS}
          gridOptions={{
            defaultColDef: { autoHeight: false },
            suppressContextMenu: true,
            processCellForClipboard: params => {
              if (params.column.colDef.cellRenderer === 'jsonRenderer') {
                return JSON.stringify(params.value);
              }
              return params.value;
            },
            getRowId: getUnoId,
          }}
          onLoadData={onLoadData}
          onGridReady={onGridReady}
          searchProps={{ classes: { root: classes.margin } }}
        />
      ) : null}
    </>
  ) : (
    <Empty>
      <div>
        This Title does not support Match Viewer.
        <br />
        <br />
        <p>
          Please contact{' '}
          <a href={getMailto('Match Viewer is not available feedback')}>
            {SUPPORT_EMAIL}
          </a>
          {' or our Slack channel '}
          <a href={SUPPORT_SLACK.url} target="_blank" rel="noopener noreferrer">
            {SUPPORT_SLACK.channel}
          </a>{' '}
          for further details.
        </p>
      </div>
    </Empty>
  );
};

MatchViewer.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(MatchViewer);
