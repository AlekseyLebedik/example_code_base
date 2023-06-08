import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import Dialog from 'dw/core/components/Dialog';
import ClanMembersUpdateTable from 'dw/clans/components/ClanMembersUpdateTable';

export const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vw',
    maxWidth: '80vw',
    '& .MuiDialogContent-root': {
      display: 'flex',
    },
  },
});

const AddClanMembersDialog = ({
  disabledOptions,
  failedMembers,
  onClose,
  onSubmit,
  open,
}) => {
  const classes = useStyles();
  const [members, setMembers] = useState([]);

  const handleAddClanMembers = () => {
    onSubmit(members);
    setMembers([]);
  };

  const footerButtons = [
    <Button key="cancel" onClick={onClose}>
      Cancel
    </Button>,
    <Button
      key="update"
      color="primary"
      disabled={!members.length}
      onClick={handleAddClanMembers}
    >
      Add Members
    </Button>,
  ];

  return (
    <Dialog
      title="Add Clan Members"
      actions={footerButtons}
      classes={{ paper: classes.dialogPaper }}
      contentStyle={{ overflowY: 'hidden' }}
      modal
      open={open}
      onRequestClose={onClose}
    >
      <ClanMembersUpdateTable
        disabledOptions={disabledOptions}
        failedMembers={failedMembers}
        members={members}
        setMembers={setMembers}
      />
    </Dialog>
  );
};

AddClanMembersDialog.propTypes = {
  disabledOptions: PropTypes.arrayOf(PropTypes.string),
  failedMembers: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
AddClanMembersDialog.defaultProps = {
  disabledOptions: [],
  failedMembers: [],
};

export default AddClanMembersDialog;
