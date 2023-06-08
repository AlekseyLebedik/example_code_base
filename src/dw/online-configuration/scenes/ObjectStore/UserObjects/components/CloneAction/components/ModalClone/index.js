import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from 'dw/core/components/Dialog';
import { OBJECT_STORE_ADD_OBJECTS } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import { SERVICE_NAMES } from '@demonware/devzone-core/access/ServiceAvailability/constants';
import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import PlayerContextSelector from 'dw/core/components/PlayerContextSelector';

const useStyles = makeStyles(theme => ({
  backupNote: {
    marginTop: theme.spacing(1),
    fontWeight: 600,
    color: '#E8AD20',
  },
}));

const ModalClone = ({
  open,
  handleClose,
  handleClone,
  validationErrors,
  playerId,
}) => {
  const [targetPlayer, setTargetPlayer] = useState({});
  const { targetPlayerId } = targetPlayer;
  const classes = useStyles();
  const clone = React.useCallback(() => {
    handleClone(targetPlayer);
  }, [handleClone, targetPlayer]);

  const { ObjectStore: endpoints } = ServiceEndpoints;

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
      data-cy="cloneUserObjectsButton"
    >
      Clone
    </Button>,
  ];

  return (
    <Dialog
      title="Clone User Objects"
      actions={footerButtons}
      modal
      open={open}
      onRequestClose={handleClose}
      maxWidth="md"
    >
      <div>{`Clone ${playerId} to`}</div>
      <PlayerContextSelector
        onChange={setTargetPlayer}
        availabilityServiceName={SERVICE_NAMES.OBJECT_STORE}
        serviceName={Services.ObjectStore}
        endpoint={endpoints.createUserObject}
        titleEnvSelectProps={{
          excludeLive: true,
          filterByPermissionName: OBJECT_STORE_ADD_OBJECTS,
        }}
        validationErrors={validationErrors}
      />
      <div className={classes.backupNote}>
        User storage will be deleted as part of this operation
      </div>
    </Dialog>
  );
};

ModalClone.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClone: PropTypes.func.isRequired,
  validationErrors: PropTypes.object.isRequired,
  playerId: PropTypes.string.isRequired,
};

export default ModalClone;
