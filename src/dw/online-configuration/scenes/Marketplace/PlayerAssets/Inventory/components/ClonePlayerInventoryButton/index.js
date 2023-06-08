import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

import { CLONE_MARKETPLACE_PLAYER_INVENTORY } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { projectEnvsSelector } from 'dw/core/helpers/title-env-selectors';
import { getFormError } from 'dw/core/helpers/form-error';
import { hasData } from 'dw/core/helpers/object';
import { useCancellablePromise, useSnackbar } from 'dw/core/hooks';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { clonePlayerInventory as clonePlayerInventoryAPI } from 'dw/online-configuration/services/marketplace';
import { getEnvsAccess as getEnvsAccessAPI } from 'dw/online-configuration/services/environment';
import CloneDialog from '../CloneDialog';

const useStyles = theme => ({
  cloneButton: {
    marginLeft: '7px',
    ...theme.grayButton,
  },
  cloneIcon: {
    color: 'white',
  },
});

const ClonePlayerInventoryButton = ({ playerId, setCloneLoading, classes }) => {
  const [open, setOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [canCloneInventory, setCanCloneInventory] = useState(false);

  const snackbarActions = useSnackbar();
  const cancellablePromise = useCancellablePromise();
  const fetchEnvsAccess = async (permission, env) => {
    try {
      const { data } = await cancellablePromise(getEnvsAccessAPI, {
        permission,
        env,
      });
      setCanCloneInventory(hasData(data));
    } catch (e) {
      if (e.isCanceled) return;
      const {
        response: { data },
      } = e;
      snackbarActions.error(data?.error?.msg);
    }
  };

  const projectEnvs = useSelector(projectEnvsSelector);
  useEffect(() => {
    if (hasData(projectEnvs)) {
      const envIds = projectEnvs.map(e => e.id);
      fetchEnvsAccess(CLONE_MARKETPLACE_PLAYER_INVENTORY, envIds);
    }
  }, [projectEnvs]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValidationErrors({});
  };

  const { Marketplace: endpoints } = ServiceEndpoints;
  const context = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.Marketplace,
      endpoint: endpoints.clonePlayerInventory,
    })
  );

  const clonePlayerInventory = async (id, targetPlayer, ctx) => {
    const {
      targetTitleEnv,
      targetPlayerId,
      targetContext,
      targetPlayerLabel,
      partialClone,
    } = targetPlayer;
    const [targetTitle, targetEnvironment] = targetTitleEnv.split(':');
    const [targetPlayerName] = targetPlayerLabel.split(' | ');
    setCloneLoading(true);
    try {
      await clonePlayerInventoryAPI(
        id,
        {
          targetTitle,
          targetEnvironment,
          targetPlayerId,
          targetContext,
          partialClone,
        },
        { context: ctx }
      );
      handleClose();
      snackbarActions.success(
        `Inventory successfully copied to player '${targetPlayerName}'`
      );
    } catch (e) {
      const valErrors = getFormError(e);
      if (valErrors === undefined) {
        const {
          response: { data },
        } = e;
        snackbarActions.error(data?.error?.msg);
      } else {
        setValidationErrors(valErrors);
      }
    }
    setCloneLoading(false);
  };

  return (
    <div>
      {canCloneInventory && (
        <>
          <Tooltip title="Clone player's inventory">
            <Fab
              className={classes.cloneButton}
              onClick={handleOpen}
              size="small"
              data-cy="clonePlayerInventoryDialog"
            >
              <Icon className={classes.cloneIcon}>copy_all</Icon>
            </Fab>
          </Tooltip>
          <CloneDialog
            open={open}
            handleClose={handleClose}
            handleClone={targetPlayer =>
              clonePlayerInventory(playerId, targetPlayer, context)
            }
            validationErrors={validationErrors}
          />
        </>
      )}
    </div>
  );
};

ClonePlayerInventoryButton.propTypes = {
  playerId: PropTypes.string,
  setCloneLoading: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
ClonePlayerInventoryButton.defaultProps = {
  playerId: undefined,
};

export default withStyles(useStyles)(ClonePlayerInventoryButton);
