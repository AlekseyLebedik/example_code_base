import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

import { CLONE_PLAYER_ACHIEVEMENTS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { projectEnvsSelector } from 'dw/core/helpers/title-env-selectors';
import { hasData } from 'dw/core/helpers/object';
import { useCancellablePromise, useSnackbar } from 'dw/core/hooks';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { clonePlayerAchievements as clonePlayerAchievementsAPI } from 'dw/online-configuration/services/achievements';
import { getEnvsAccess as getEnvsAccessAPI } from 'dw/online-configuration/services/environment';
import CloneDialog from '../CloneDialog';

const useStyles = theme => ({
  cloneContainer: {
    margin: '0px 10px 0px 10px !important',
    minWidth: '40px',
  },
  cloneButton: {
    ...theme.grayButton,
  },
  cloneIcon: {
    color: 'white',
  },
});

const ClonePlayerAchievementsButton = ({
  playerId,
  setCloneLoading,
  classes,
}) => {
  const [open, setOpen] = useState(false);
  const [canCloneAchievements, setCanCloneAchievements] = useState(false);

  const snackbarActions = useSnackbar();
  const cancellablePromise = useCancellablePromise();
  const fetchEnvsAccess = useCallback(
    async (permission, env) => {
      try {
        const { data } = await cancellablePromise(getEnvsAccessAPI, {
          permission,
          env,
        });
        setCanCloneAchievements(hasData(data));
      } catch (e) {
        if (e.isCanceled) return;
        const {
          response: { data },
        } = e;
        snackbarActions.error(data?.error?.msg);
      }
    },
    [cancellablePromise]
  );

  const projectEnvs = useSelector(projectEnvsSelector);
  useEffect(() => {
    if (hasData(projectEnvs)) {
      const envIds = projectEnvs.map(e => e.id);
      fetchEnvsAccess(CLONE_PLAYER_ACHIEVEMENTS, envIds);
    }
  }, [projectEnvs, fetchEnvsAccess]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { AE: endpoints } = ServiceEndpoints;
  const context = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.AE,
      endpoint: endpoints.cloneUserAchievements,
    })
  );

  const clonePlayerAchievements = useCallback(
    async (id, targetPlayer, cxt) => {
      const {
        targetTitleEnv,
        targetPlayerId,
        targetContext,
        targetPlayerLabel,
      } = targetPlayer;
      const [targetTitle, targetEnvironment] = targetTitleEnv.split(':');
      const [targetPlayerName] = targetPlayerLabel.split(' | ');
      setCloneLoading(true);
      try {
        await clonePlayerAchievementsAPI(
          id,
          { targetTitle, targetEnvironment, targetPlayerId, targetContext },
          { context: cxt }
        );
        snackbarActions.success(
          `Achievements successfully copied to player '${targetPlayerName}'`
        );
      } catch (e) {
        const {
          response: { data },
        } = e;
        snackbarActions.error(data?.error?.msg);
      }
      setCloneLoading(false);
    },
    [setCloneLoading]
  );

  return (
    <div className={classes.cloneContainer}>
      {canCloneAchievements && (
        <>
          <Tooltip title="Clone player's achievements">
            <Fab
              className={classes.cloneButton}
              onClick={handleOpen}
              size="small"
              data-cy="cloneButton"
            >
              <Icon className={classes.cloneIcon}>copy_all</Icon>
            </Fab>
          </Tooltip>
          <CloneDialog
            open={open}
            handleClose={handleClose}
            handleClone={targetPlayer =>
              clonePlayerAchievements(playerId, targetPlayer, context)
            }
          />
        </>
      )}
    </div>
  );
};

ClonePlayerAchievementsButton.propTypes = {
  playerId: PropTypes.string,
  setCloneLoading: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
ClonePlayerAchievementsButton.defaultProps = {
  playerId: undefined,
};

export default withStyles(useStyles)(ClonePlayerAchievementsButton);
