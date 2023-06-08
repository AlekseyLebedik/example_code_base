import React, { useContext } from 'react';
import { Select, MenuItem } from '@material-ui/core';
import IconButton from 'dw/core/components/IconButton';
import UnoAccountSelector from 'dw/player-tooling/components/UnoAccountSelector';
import PlayerCellRenderer from 'dw/clans/components/PlayerCellRenderer';
import { ClansContext } from 'dw/clans/components/ClansProvider';
import { ROLES } from 'dw/clans/constants';

const PinnedRowPlayerRenderer = params => {
  const { accountsServiceConfigId } = useContext(ClansContext);
  const { setPinnedRow, classes, disabledOptions } = params.colDef;
  const player = params.value;

  const onSelectAccount = account => {
    const { value: userID, username } = account || {};
    if (userID && userID !== player.userID) {
      const newPlayer = { userID, username, accountType: 'uno' };
      setPinnedRow(prevRow => ({ ...prevRow, player: newPlayer }));
    }
  };

  return (
    <UnoAccountSelector
      accountsServiceConfigId={accountsServiceConfigId}
      classes={{ root: classes.accountsSelector }}
      disabledOptions={disabledOptions}
      hidelabel
      hideServiceConfigs
      menuPosition="absolute"
      onSelectAccount={onSelectAccount}
      placeholder="Enter Activision (Uno) Account Details"
      unoUserData={{
        accountID: player.userID,
        username: player.username,
      }}
      valuesOnly={false}
      valueContainerClass={classes.valueContainer}
    />
  );
};

const PinnedRowRoleRenderer = params => {
  const { ownerDisabled, setPinnedRow } = params.colDef;
  const roles = Object.keys(ROLES);
  const role = params.value ?? roles[0];
  return (
    <span style={params.style}>
      <Select
        name="role"
        onChange={({ target: { value } }) => {
          setPinnedRow(prevRow => ({ ...prevRow, role: value }));
        }}
        value={role}
        fullWidth
      >
        {roles.map(r => (
          <MenuItem disabled={ownerDisabled && r === 'OWNER'} key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </Select>
    </span>
  );
};

const ActionsRenderer = params => {
  const { addMember, deleteMember, editMember } = params.colDef;
  if (params.node.rowPinned) {
    const disabled = !params.data.player.userID;
    return (
      <IconButton
        color="primary"
        disabled={disabled}
        icon="add"
        onClick={() => {
          addMember(params.data);
        }}
        tooltip={disabled ? 'Select a player first' : 'Add Clan Member'}
      />
    );
  }
  return (
    <div>
      <IconButton
        color="primary"
        icon="edit"
        onClick={() => editMember(params.data)}
        tooltip="Edit Clan Member"
      />
      <IconButton
        color="secondary"
        icon="delete"
        onClick={() => deleteMember(params.data)}
        tooltip="Remove Clan Member"
      />
    </div>
  );
};

export default {
  actionsRenderer: ActionsRenderer,
  pinnedRowPlayerRenderer: PinnedRowPlayerRenderer,
  pinnedRowRoleRenderer: PinnedRowRoleRenderer,
  playerCellRenderer: PlayerCellRenderer,
};
