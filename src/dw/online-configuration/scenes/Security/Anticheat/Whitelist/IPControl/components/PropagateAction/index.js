import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { SECURITY_ADD_WHITELIST } from '@demonware/devzone-core/access/PermissionCheck/permissions';
import Dialog from 'dw/core/components/Dialog';

import { useCancellablePromise, useSnackbar } from 'dw/core/hooks';
import TitleEnvSelect from 'dw/core/components/TitleEnvSelect';
import { propagateIPControl } from 'dw/online-configuration/services/security';

const PropagateDialog = ({ open, handleClose, handlePropagate }) => {
  const [targetEnv, onChange] = useState();

  const actions = useMemo(
    () => [
      <Button key="cancel" onClick={handleClose}>
        Cancel
      </Button>,
      <Button
        key="propagate"
        color="primary"
        onClick={() => handlePropagate(targetEnv)}
      >
        Propagate IP Whitelist
      </Button>,
    ],
    [handleClose, handlePropagate, targetEnv]
  );

  return (
    <Dialog
      modal
      open={open}
      onRequestClose={handleClose}
      title="Propagate IP Whitelist"
      actions={actions}
      contentStyle={{ width: '500px' }}
    >
      <TitleEnvSelect
        input={{ value: targetEnv, onChange }}
        meta={{}}
        label="Environment"
        filterByPermissionName={SECURITY_ADD_WHITELIST}
        excludeCurrent
        sameProjectOnTop
      />
    </Dialog>
  );
};
PropagateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handlePropagate: PropTypes.func.isRequired,
};

const PropagateAction = ({ disabled }) => {
  const [propagateFormOpen, togglePropagateForm] = useState(false);

  const cancellablePromise = useCancellablePromise();
  const snackbarActions = useSnackbar();
  const handlePropagate = useCallback(
    async targetTitleEnv => {
      const [targetTitle, targetEnvironment] = targetTitleEnv.split(':');
      try {
        await cancellablePromise(propagateIPControl, {
          targetEnvironment,
          targetTitle,
        });
        togglePropagateForm(false);
        snackbarActions.success('Whitelist IP(s) successfully propagated.');
      } catch (e) {
        if (e.isCanceled) return;
        const {
          response: { data },
        } = e;
        snackbarActions.error(data?.error?.msg);
      }
    },
    [cancellablePromise, snackbarActions]
  );

  return (
    <>
      <Tooltip title="Propagate">
        <IconButton
          color="inherit"
          disabled={disabled}
          onClick={() => togglePropagateForm(true)}
        >
          <Icon>call_split</Icon>
        </IconButton>
      </Tooltip>
      {propagateFormOpen && (
        <PropagateDialog
          open={propagateFormOpen}
          handleClose={() => togglePropagateForm(false)}
          handlePropagate={handlePropagate}
        />
      )}
    </>
  );
};
PropagateAction.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default PropagateAction;
