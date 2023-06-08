import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Tooltip } from '@material-ui/core';

import Dialog from 'dw/core/components/Dialog';
import ClanMembersUpdateTable from 'dw/clans/components/ClanMembersUpdateTable';
import PrivacyLevelSelector from 'dw/clans/components/PrivacyLevelSelector';

export const useStyles = makeStyles({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    minWidth: '80vw',
    maxWidth: '80vw',
    '& .MuiDialogContent-root': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  clanDetails: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginBottom: 20,
    '& > div': { width: '80%', margin: '0 auto' },
  },
  clanMembers: { display: 'flex', flex: 1 },
});

const CreateClanDialog = ({
  failedMembers,
  onClose,
  onSubmit,
  open,
  setFailedMembers,
}) => {
  const classes = useStyles();
  const [clanName, setClanName] = useState('');
  const [clanTag, setClanTag] = useState('');
  const [clanTagError, setClanTagError] = useState(false);
  const [privacyLevel, setPrivacyLevel] = useState('OPEN');
  const [members, setMembers] = useState([]);
  const ownerUserID = useMemo(
    () => members.find(m => m.role === 'OWNER')?.player.userID,
    [members]
  );

  const handleCreateClan = () => {
    const successCallback = () => {
      setClanName('');
      setClanTag('');
      setPrivacyLevel('OPEN');
      setMembers([]);
    };
    const failedOwnerCallback = () => {
      setMembers(members.filter(m => m.role !== 'OWNER'));
    };
    onSubmit(
      { clanName, clanTag, privacyLevel, ownerUserID, members },
      failedOwnerCallback,
      successCallback
    );
  };

  const handleSetClanTag = value => {
    setClanTag(value);
    setClanTagError(value.length > 5);
  };

  const { disabled, disabledReason } = useMemo(() => {
    let error = true;
    let reason;
    if (!clanName) {
      reason = 'No clan name selected';
    } else if (!clanTag) {
      reason = 'No clan tag selected';
    } else if (clanTagError) {
      reason = 'Invalid clan tag';
    } else if (!ownerUserID) {
      reason = 'No owner provided';
    } else if (failedMembers.length) {
      reason = 'Please resolve failing members first';
    } else {
      error = false;
    }
    return { disabled: error, disabledReason: reason };
  }, [clanName, clanTag, clanTagError, ownerUserID, failedMembers]);

  const footerButtons = [
    <Button key="cancel" onClick={onClose}>
      Cancel
    </Button>,
    disabled ? (
      <Tooltip title={disabledReason} key="update">
        <span>
          <Button
            color="primary"
            disabled={disabled}
            onClick={handleCreateClan}
          >
            Create Clan
          </Button>
        </span>
      </Tooltip>
    ) : (
      <Button key="update" color="primary" onClick={handleCreateClan}>
        Create Clan
      </Button>
    ),
  ];

  return (
    <Dialog
      title="Create Clan"
      actions={footerButtons}
      classes={{ paper: classes.dialogPaper }}
      contentStyle={{ overflowY: 'hidden' }}
      modal
      open={open}
      onRequestClose={onClose}
    >
      <div className={classes.clanDetails}>
        <TextField
          className={classes.searchInput}
          label="Clan Name"
          margin="dense"
          onChange={({ target: { value } }) => setClanName(value)}
          value={clanName}
          variant="outlined"
        />
        <TextField
          className={classes.searchInput}
          error={clanTagError}
          helperText="Max character length of 5"
          label="Clan Tag"
          margin="dense"
          onChange={({ target: { value } }) => handleSetClanTag(value)}
          value={clanTag}
          variant="outlined"
        />
        <PrivacyLevelSelector
          privacyLevel={privacyLevel}
          setPrivacyLevel={setPrivacyLevel}
          variant="outlined"
        />
      </div>
      <div className={classes.clanMembers}>
        <ClanMembersUpdateTable
          failedMembers={failedMembers}
          members={members}
          setMembers={setMembers}
          setFailedMembers={setFailedMembers}
        />
      </div>
    </Dialog>
  );
};

CreateClanDialog.propTypes = {
  failedMembers: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setFailedMembers: PropTypes.func.isRequired,
};
CreateClanDialog.defaultProps = {
  failedMembers: [],
};

export default CreateClanDialog;
