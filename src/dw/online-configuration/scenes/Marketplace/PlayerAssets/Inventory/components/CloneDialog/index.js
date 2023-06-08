import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from 'dw/core/components/Dialog';
import { CLONE_MARKETPLACE_PLAYER_INVENTORY } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import PlayerContextSelector from 'dw/core/components/PlayerContextSelector';

const useStyles = () => ({
  backupNote: {
    marginTop: '5px',
  },
});

const CloneDialog = ({
  open,
  handleClose,
  handleClone,
  validationErrors,
  classes,
}) => {
  const [targetPlayer, setTargetPlayer] = useState({});
  const { targetPlayerId } = targetPlayer;

  const clone = () => {
    handleClone(targetPlayer);
  };
  const { Marketplace: endpoints } = ServiceEndpoints;

  const footerButtons = [
    <Button key="cancel" onClick={handleClose}>
      Cancel
    </Button>,
    <Button
      key="primary"
      color="primary"
      focusRipple
      onClick={clone}
      disabled={!targetPlayerId}
      data-cy="clonePlayerInventoryButton"
    >
      Clone
    </Button>,
  ];

  return (
    <Dialog
      title="Clone player's inventory"
      actions={footerButtons}
      modal
      open={open}
      onRequestClose={handleClose}
      maxWidth="md"
    >
      <PlayerContextSelector
        onChange={setTargetPlayer}
        availabilityServiceName={SERVICE_NAMES.MARKETPLACE}
        serviceName={Services.Marketplace}
        endpoint={endpoints.clonePlayerInventory}
        titleEnvSelectProps={{
          excludeLive: true,
          filterByPermissionName: CLONE_MARKETPLACE_PLAYER_INVENTORY,
        }}
        validationErrors={validationErrors}
      />
      <div>
        Before cloning, the target player&apos;s inventory will be reset!
        <div className={classes.backupNote}>
          A temporary backup will be made of the targets Inventory before
          changes are applied.
        </div>
      </div>
    </Dialog>
  );
};

CloneDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClone: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(CloneDialog);
