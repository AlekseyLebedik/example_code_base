import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { makeStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

import { GVS_EDIT_DEFINITIONS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import Dialog from 'dw/core/components/Dialog';

import { gvsUrlPattern, SCENES } from '@gvs/constants';
import {
  usePropagateDefinitions,
  useTitleEnvByScopeUri,
} from '@gvs/graphql/hooks';
import { GVSTitleEnvSelect as TitleEnvSelect } from '@gvs/scenes/Compare/components/TitleEnvSelect';
import { generatePath, useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  title: {
    ...theme.typography.h6,
    display: 'flex',
    alignItems: 'center',
    '& .common-multi-select-field': {
      flexGrow: 1,
      marginLeft: theme.spacing(3),
    },
  },
  content: {
    display: 'flex',
    '& label': {
      fontWeight: '600',
    },
    '& span': {
      color: theme.palette.primary.main,
      textTransform: 'uppercase',
      margin: `0 ${theme.spacing(4)}px`,
    },
  },
  error: {
    color: theme.palette.error.main,
    lineHeight: 3,
    '& .material-icons': {
      marginLeft: theme.spacing(2),
      color: 'rgba(0, 0, 0, 0.35)',
    },
    display: 'flex',
    alignItems: 'center',
  },
  env: {
    marginLeft: theme.spacing(3),
  },
  row: {
    display: 'flex',
    lineHeight: 2.5,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.67)',
    '& .key': {
      minWidth: '250px',
    },
  },
  headers: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.35)',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  conflicts: {
    height: '200px',
    overflow: 'hidden',
    '& .scrollable': {
      height: '100%',
      overflowY: 'auto',
    },
  },
}));

const PropagateDialog = ({ onClose, gridApi }) => {
  const classes = useStyles();
  const [errorMsg, setErrorMsg] = useState();
  const [conflicts, setConflicts] = useState();
  const force = useMemo(() => Boolean(conflicts), [conflicts]);
  const reset = useCallback(() => {
    setErrorMsg();
    setConflicts();
  }, []);
  const [targetScopeURI, setTargetScopeURI] = useState('');
  const [propagateDefinitions, { loading, error }] =
    usePropagateDefinitions(targetScopeURI);
  useEffect(() => {
    if (!error) return;
    const {
      graphQLErrors: [{ message }],
    } = error;
    const {
      error: { msg, errors },
      status_code: statusCode,
    } = JSON.parse(message);
    setErrorMsg(msg);
    if (statusCode === 409) {
      setConflicts(errors);
    }
  }, [error]);
  const history = useHistory();

  const { env: targetEnv, titleId: targetTitleId } =
    useTitleEnvByScopeUri(targetScopeURI);
  const redirectToDefinitions = useCallback(() => {
    const url = generatePath(gvsUrlPattern, {
      scene: SCENES.VARIABLE_DEFINITIONS,
      env: targetEnv,
      titleId: targetTitleId,
      scopeURI: targetScopeURI,
    });
    history.push(url);
  }, [history, targetEnv, targetTitleId, targetScopeURI]);
  const onPropagate = useCallback(async () => {
    const keys = gridApi.getSelectedRows().map(({ key }) => key);
    try {
      await propagateDefinitions(keys, force);
      redirectToDefinitions();
    } catch (e) {
      // Handling errors as result of useMutation
    }
  }, [
    propagateDefinitions,
    force,
    redirectToDefinitions,
    targetScopeURI,
    gridApi,
  ]);
  const actions = useMemo(
    () => [
      <Button key="cancel" onClick={onClose} disabled={loading}>
        Cancel
      </Button>,
      <Button
        key="delete"
        color={force ? 'secondary' : 'primary'}
        onClick={onPropagate}
        disabled={loading || !targetScopeURI}
      >
        {loading
          ? 'Submitting ...'
          : `${
              force ? 'Force Propagate with conflicts' : 'Confirm Propagation'
            }`}
      </Button>,
    ],
    [onClose, onPropagate, loading, force, targetScopeURI]
  );
  useEffect(() => {
    reset();
  }, []);
  return (
    <Dialog
      modal
      open
      onRequestClose={onClose}
      actions={actions}
      maxWidth="sm"
      fullWidth
    >
      <div className={classes.title}>
        Propagate to
        <TitleEnvSelect
          className={classes.env}
          includeGameBuild={false}
          requiredPermission={GVS_EDIT_DEFINITIONS}
          targetScopeURI={targetScopeURI}
          setTargetScopeURI={setTargetScopeURI}
          excludeCurrent
        />
      </div>
      {errorMsg && <div className={classes.error}>{errorMsg}</div>}
      {conflicts && (
        <>
          <div className={cn(classes.row, classes.headers)}>
            <div className="key">Key</div>
            <div className="message">Message</div>
          </div>
          <div className={classes.conflicts}>
            <div className="scrollable">
              {conflicts.map(({ key, msg: m }) => (
                <div key={key} className={classes.row}>
                  <div className="key">{key}</div>
                  <div className="message">{m}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {force && (
        <div className={classes.error}>
          To continue you must Force the Propagation or Cancel
          <Tooltip title="This will override the definitions in the destination with the ones in the source">
            <Icon>help</Icon>
          </Tooltip>
        </div>
      )}
    </Dialog>
  );
};
PropagateDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  gridApi: PropTypes.object.isRequired,
};

export default PropagateDialog;
