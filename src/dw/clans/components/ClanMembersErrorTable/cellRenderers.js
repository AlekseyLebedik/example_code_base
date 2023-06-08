import React from 'react';
import IconButton from 'dw/core/components/IconButton';
import PlayerCellRenderer from 'dw/clans/components/PlayerCellRenderer';

const ActionsRenderer = params => {
  const { addMember, changeOwner, deleteMember } = params.colDef;
  return (
    <div>
      {params.data.role === 'OWNER' ? (
        <IconButton
          color="primary"
          icon="swap_horiz"
          onClick={() => changeOwner(params.data)}
          tooltip="Set new owner on old clan"
        />
      ) : (
        <IconButton
          color="primary"
          icon="playlist_add"
          onClick={() => addMember(params.data)}
          tooltip="Add and remove member from old clan"
        />
      )}
      <IconButton
        color="secondary"
        icon="delete"
        onClick={() => deleteMember(params.data)}
        tooltip="Remove and ignore clan member addition"
      />
    </div>
  );
};

export default {
  actionsRenderer: ActionsRenderer,
  playerCellRenderer: PlayerCellRenderer,
};
