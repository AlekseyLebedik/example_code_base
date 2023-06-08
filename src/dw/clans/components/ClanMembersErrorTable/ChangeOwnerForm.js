import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import UnoAccountSelector from 'dw/player-tooling/components/UnoAccountSelector';
import Dialog from 'dw/core/components/Dialog';
import { ClansContext } from 'dw/clans/components/ClansProvider';
import { PLAYER_PROPTYPE } from 'dw/clans/constants';

export const useStyles = makeStyles({
  dialogPaper: {
    overflow: 'visible',
    '& .MuiDialogContent-root': {
      overflow: 'visible',
    },
  },
});

const ChangeOwnerForm = ({ onSubmit, open, owner, setOpen }) => {
  const classes = useStyles();
  const { accountsServiceConfigId } = useContext(ClansContext);
  const [newOwner, setNewOwner] = useState(null);

  const onSelectAccount = account => {
    const { value: userID, username } = account || {};
    if (userID && userID !== owner?.player?.userID) {
      const newPlayer = { userID, username, accountType: 'uno' };
      setNewOwner({ player: newPlayer });
    }
  };

  const handleSubmit = () => {
    const callback = () => {
      setNewOwner(null);
      setOpen(false);
    };
    onSubmit(owner, newOwner, callback);
  };

  const footerButtons = [
    <Button key="cancel" onClick={() => setOpen(false)}>
      Cancel
    </Button>,
    <Button
      key="update"
      color="primary"
      disabled={!newOwner}
      onClick={handleSubmit}
    >
      Change Clan Owner
    </Button>,
  ];

  return (
    <Dialog
      title={`Change Clan (${owner?.clan?.id} | ${owner?.clan?.name}) Owner`}
      actions={footerButtons}
      classes={{ paper: classes.dialogPaper }}
      modal
      open={Boolean(open && owner)}
      onRequestClose={() => setOpen(false)}
    >
      <UnoAccountSelector
        accountsServiceConfigId={accountsServiceConfigId}
        classes={{ root: classes.accountsSelector }}
        hidelabel
        hideServiceConfigs
        onSelectAccount={onSelectAccount}
        placeholder="Enter Activision (Uno) Account Details"
        unoUserData={{
          accountID: owner?.player?.userID,
          username: owner?.player?.username,
        }}
        valuesOnly={false}
        valueContainerClass={classes.valueContainer}
      />
    </Dialog>
  );
};

ChangeOwnerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  owner: PLAYER_PROPTYPE,
  setOpen: PropTypes.func.isRequired,
};
ChangeOwnerForm.defaultProps = {
  owner: null,
};

export default ChangeOwnerForm;
