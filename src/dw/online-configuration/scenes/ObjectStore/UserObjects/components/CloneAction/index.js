import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { cloneUserObject as cloneUserObjectAPI } from 'dw/online-configuration/services/objectStore';
import { useSnackbar, useCancellablePromise } from 'dw/core/hooks';
import ModalClone from './components/ModalClone';

const useStyles = makeStyles(theme => ({
  cloneButton: {
    marginLeft: theme.spacing(1),
    boxShadow: 'unset',
    ...theme.grayButton,
  },
  cloneIcon: {
    color: 'white',
  },
}));

const CloneAction = ({ playerId, setCloneLoading }) => {
  const [open, setOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const snackbarActions = useSnackbar();
  const cancellablePromise = useCancellablePromise();
  const handleOpen = React.useCallback(() => {
    setOpen(true);
  }, [open]);
  const classes = useStyles();
  const handleClose = React.useCallback(() => {
    setOpen(false);
    setValidationErrors({});
  }, [open, setValidationErrors]);

  const { ObjectStore: endpoints } = ServiceEndpoints;
  const context = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.ObjectStore,
      endpoint: endpoints.createUserObject,
    })
  );

  const cloneUserObjects = React.useCallback(async (id, targetPlayer, ctx) => {
    const { targetTitleEnv, targetPlayerId, targetPlayerLabel } = targetPlayer;
    const [targetTitle, targetEnvironment] = targetTitleEnv.split(':');
    const [targetPlayerName] = targetPlayerLabel.split(' | ');
    setCloneLoading(true);
    try {
      await cancellablePromise(
        cloneUserObjectAPI,
        id,
        {
          targetEnvironment,
          targetTitle,
          targetAccountId: targetPlayerId,
        },
        { context: ctx }
      );
      handleClose();
      snackbarActions.success(
        `User storage successfully copied to user '${targetPlayerName}'`
      );
    } catch (e) {
      if (e.isCanceled) return;
      const {
        response: { data },
      } = e;
      snackbarActions.error(data?.error?.msg);
    }
    setCloneLoading(false);
  }, []);

  return (
    <div>
      <Tooltip title="Clone">
        <Fab
          className={classes.cloneButton}
          onClick={handleOpen}
          size="small"
          data-cy="cloneUserStorageDialog"
        >
          <Icon className={classes.cloneIcon}>copy_all</Icon>
        </Fab>
      </Tooltip>
      <ModalClone
        playerId={playerId}
        open={open}
        handleClose={handleClose}
        handleClone={targetPlayer =>
          cloneUserObjects(playerId, targetPlayer, context)
        }
        validationErrors={validationErrors}
      />
    </div>
  );
};

CloneAction.propTypes = {
  playerId: PropTypes.string,
  setCloneLoading: PropTypes.func.isRequired,
};
CloneAction.defaultProps = {
  playerId: undefined,
};

export default CloneAction;
