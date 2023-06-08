import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { RESET_MARKETPLACE_PLAYER_INVENTORY } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import ConfirmActionComponent from 'dw/core/components/ConfirmActionComponent';
import { useCurrentEnvPermission, useSnackbar } from 'dw/core/hooks';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import { makeContextToUseSelector } from 'dw/online-configuration/components/ContextSelector/selectors';
import { deletePlayerInventory } from 'dw/online-configuration/services/marketplace';
import { getPlayerItems } from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/actions';
import { getPlayerBalances } from 'dw/online-configuration/scenes/Marketplace/PlayerAssets/PlayerBalances/actions';

const ResetPlayerInventoryButton = ({ playerId, setCreatingBackup }) => {
  const canResetInventory = useCurrentEnvPermission(
    RESET_MARKETPLACE_PLAYER_INVENTORY
  );
  const snackbarActions = useSnackbar();
  const dispatch = useDispatch();

  const { Marketplace: endpoints } = ServiceEndpoints;
  const context = useSelector(state =>
    makeContextToUseSelector(state, {
      serviceName: Services.Marketplace,
      endpoint: endpoints.resetPlayerInventory,
    })
  );
  const resetPlayerInventory = async (id, ctx) => {
    try {
      await deletePlayerInventory(id, { context: ctx });
      dispatch(getPlayerItems(id));
      dispatch(getPlayerBalances(id));
      setCreatingBackup(true);
      snackbarActions.success('Inventory reset successfully');
    } catch (e) {
      snackbarActions.error(e);
    }
  };

  return (
    <div>
      {canResetInventory && (
        <ConfirmActionComponent
          component="fab"
          color="secondary"
          onClick={() => resetPlayerInventory(playerId, context)}
          confirm={{
            title: 'Confirm Reset',
            confirmMsg: (
              <>
                Are you sure you want to reset this player&apos;s inventory?
                <br />
                <br />
                <b>
                  A temporary backup will be made of this Inventory before
                  changes are applied.
                </b>
              </>
            ),
            mainButtonLabel: 'Reset',
            destructive: true,
          }}
          tooltip="Reset this Player's Inventory"
          size="small"
        >
          delete
        </ConfirmActionComponent>
      )}
    </div>
  );
};

ResetPlayerInventoryButton.propTypes = {
  playerId: PropTypes.string,
  setCreatingBackup: PropTypes.func.isRequired,
};
ResetPlayerInventoryButton.defaultProps = {
  playerId: undefined,
};

export default ResetPlayerInventoryButton;
