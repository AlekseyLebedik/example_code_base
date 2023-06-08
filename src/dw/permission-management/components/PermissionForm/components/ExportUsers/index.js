import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import download from 'downloadjs';

import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import { useCancellablePromise, useSnackbar } from 'dw/core/hooks';
import { exportUsers } from 'dw/permission-management/services/users';

const ExportUsers = ({ item }) => {
  const cancellablePromise = useCancellablePromise();
  const snackbarActions = useSnackbar();
  const handleExport = useCallback(
    async entity => {
      const isGroup = !('type' in entity);
      const { id, name } = entity;
      try {
        const { data } = await cancellablePromise(exportUsers, {
          id,
          isGroup,
        });
        download(data, `${name}_users.csv`);
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
    <Tooltip title="Export Users">
      <IconButton color="inherit" onClick={() => handleExport(item)}>
        <Icon>file_download</Icon>
      </IconButton>
    </Tooltip>
  );
};

ExportUsers.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ExportUsers;
