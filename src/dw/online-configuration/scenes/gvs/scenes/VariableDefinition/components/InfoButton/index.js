import React, { useCallback, useMemo, useState } from 'react';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import Dialog from 'dw/core/components/Dialog';

const InfoButton = ({ icon, tooltip, title, children }) => {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);
  const actions = useMemo(
    () => [
      <Button key="cancel" onClick={onClose}>
        Cancel
      </Button>,
    ],
    []
  );

  return (
    <>
      <Tooltip title={tooltip}>
        <IconButton onClick={() => setOpen(true)}>
          <Icon>{icon}</Icon>
        </IconButton>
      </Tooltip>
      <Dialog
        title={title}
        actions={actions}
        open={open}
        fullWidth
        onRequestClose={onClose}
      >
        {children}
      </Dialog>
    </>
  );
};
InfoButton.propTypes = {
  icon: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default InfoButton;
