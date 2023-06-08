import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import { useCancellablePromise, useSnackbar } from 'dw/core/hooks';
import Dialog from 'dw/core/components/Dialog';
import InputField from 'dw/core/components/FormFields/Input';
import { renameCompanyGroup } from 'dw/permission-management/services/permissions';
import { fetchGroups } from 'dw/permission-management/scenes/Groups/actions';

const RenameDialog = ({ open, handleClose, name, handleRename }) => {
  const [newName, setNewName] = useState(name);
  const actions = useMemo(
    () => [
      <Button key="cancel" onClick={handleClose}>
        Cancel
      </Button>,
      <Button
        key="rename"
        color="primary"
        disabled={name === newName}
        onClick={() => handleRename(newName)}
      >
        Rename
      </Button>,
    ],
    [handleClose, handleRename, name, newName]
  );

  return (
    <Dialog
      modal
      open={open}
      onRequestClose={handleClose}
      title="Rename group"
      actions={actions}
      contentStyle={{ width: '500px' }}
    >
      <InputField
        meta={{}}
        value={newName}
        onChange={e => setNewName(e.target.value)}
        fullWidth
      />
    </Dialog>
  );
};

RenameDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  handleRename: PropTypes.func.isRequired,
};

const RenameGroup = ({ itemId, name }) => {
  const [renameFormOpen, toggleRenameForm] = useState(false);
  const cancellablePromise = useCancellablePromise();
  const snackbarActions = useSnackbar();
  const dispatch = useDispatch();
  const handleRename = useCallback(
    async newName => {
      try {
        await cancellablePromise(renameCompanyGroup, itemId, newName);
        toggleRenameForm(false);
        dispatch(fetchGroups());
        snackbarActions.success('Group name successfully updated.');
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
      <Tooltip title="Rename Group">
        <IconButton onClick={() => toggleRenameForm(true)}>
          <Icon>edit</Icon>
        </IconButton>
      </Tooltip>
      {renameFormOpen && (
        <RenameDialog
          open={renameFormOpen}
          handleClose={() => toggleRenameForm(false)}
          name={name}
          handleRename={handleRename}
        />
      )}
    </>
  );
};

RenameGroup.propTypes = {
  itemId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default RenameGroup;
