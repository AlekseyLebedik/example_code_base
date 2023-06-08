import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from 'dw/core/components/Dialog';
import { CLONE_PLAYER_ACHIEVEMENTS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import PlayerContextSelector from 'dw/core/components/PlayerContextSelector';

const CloneDialog = ({ open, handleClose, handleClone }) => {
  const [targetPlayer, setTargetPlayer] = useState({});
  const { targetPlayerId } = targetPlayer;
  const onClose = useCallback(() => handleClose(), [handleClose]);

  const clone = () => {
    onClose();
    handleClone(targetPlayer);
  };
  const { AE: endpoints } = ServiceEndpoints;

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
    >
      Clone
    </Button>,
  ];

  return (
    <Dialog
      title="Clone player's achievements"
      actions={footerButtons}
      modal
      open={open}
      onRequestClose={handleClose}
    >
      <PlayerContextSelector
        onChange={setTargetPlayer}
        availabilityServiceName={SERVICE_NAMES.ACHIEVEMENTS}
        serviceName={Services.AE}
        endpoint={endpoints.cloneUserAchievements}
        titleEnvSelectProps={{
          excludeLive: true,
          filterByPermissionName: CLONE_PLAYER_ACHIEVEMENTS,
        }}
      />
      <div>
        A temporary backup will be made of the targets Achievements before
        changes are applied.
      </div>
    </Dialog>
  );
};

CloneDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClone: PropTypes.func.isRequired,
};

export default CloneDialog;
