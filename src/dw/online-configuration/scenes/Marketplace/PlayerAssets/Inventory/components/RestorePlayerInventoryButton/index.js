import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { useCurrentEnvPermission, useSnackbar } from 'dw/core/hooks';

import { makeCancelable } from 'dw/core/helpers/promise';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import {
  getBackupPlayerInventory as getBackupPlayerInventoryAPI,
  restorePlayerInventory as restorePlayerInventoryAPI,
} from 'dw/online-configuration/services/marketplace';
import { getPlayerItems } from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/actions';
import { getPlayerBalances } from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/PlayerBalances/actions';

import { CLONE_MARKETPLACE_PLAYER_INVENTORY } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';

const useStyles = theme => ({
  restoreButton: {
    marginLeft: '7px',
    ...theme.grayButton,
  },
  restoreIcon: {
    color: 'white',
  },
});

const RestorePlayerInventoryButton = ({
  playerId,
  classes,
  setCreatingBackup,
  backupCreated,
}) => {
  const [hasBackup, setHasBackup] = useState(false);
  const [restoreDate, setRestoreDate] = useState(undefined);
  const { Marketplace: endpoints } = ServiceEndpoints;
  const canCloneInventory = useCurrentEnvPermission(
    CLONE_MARKETPLACE_PLAYER_INVENTORY
  );
  const formatDateTime = useSelector(formatDateTimeSelector);
  const snackbarActions = useSnackbar();
  const dispatch = useDispatch();

  const fetchPlayerInventoryBackup = async (id, context) => {
    const getBackupPromise = makeCancelable(
      getBackupPlayerInventoryAPI(id, { context })
    );
    const {
      data: { backup, date },
    } = await getBackupPromise.promise;
    setHasBackup(backup);
    setRestoreDate(formatDateTime(date));
  };

  const backupContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.Marketplace,
      endpoint: endpoints.backupPlayerInventory,
    })
  );
  const restoreContext = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.Marketplace,
      endpoint: endpoints.restorePlayerInventory,
    })
  );

  useEffect(() => {
    if (canCloneInventory && backupContext) {
      fetchPlayerInventoryBackup(playerId, backupContext);
    }
    if (backupCreated) setCreatingBackup(false);
  }, [canCloneInventory, playerId, backupContext, backupCreated]);

  const restorePlayerInventory = async (id, context, backupCtx) => {
    try {
      await restorePlayerInventoryAPI(id, { context });
      dispatch(getPlayerItems(id));
      dispatch(getPlayerBalances(id));
      fetchPlayerInventoryBackup(id, backupCtx);
      snackbarActions.success('Inventory restored successfully');
    } catch (e) {
      const {
        response: { data },
      } = e;
      snackbarActions.error(data?.error?.msg);
    }
  };

  return (
    <div>
      {canCloneInventory && hasBackup && (
        <ConfirmActionComponent
          component="fab"
          onClick={() =>
            restorePlayerInventory(playerId, restoreContext, backupContext)
          }
          confirm={{
            title: 'Confirm Restore',
            confirmMsg: `Are you sure you want to restore this player's inventory to ${restoreDate}?`,
            mainButtonLabel: 'Restore',
          }}
          iconClassName={classes.restoreIcon}
          className={classes.restoreButton}
          tooltip="Restore this Player's Inventory"
          size="small"
          data-cy="reset-player-inventory-button"
        >
          restore
        </ConfirmActionComponent>
      )}
    </div>
  );
};

RestorePlayerInventoryButton.propTypes = {
  playerId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  setCreatingBackup: PropTypes.func.isRequired,
  backupCreated: PropTypes.bool,
};
RestorePlayerInventoryButton.defaultProps = {
  backupCreated: false,
};

export default withStyles(useStyles)(RestorePlayerInventoryButton);
